import { JsonRpcApiProvider } from "ethers";
import { assert } from "ethers";
import { ethers, TransactionLike } from "ethers";
import { getTransactionRequest } from "./txutil.js";

const GASLESS_SWAP_ROUTER_ABI = [
  {
      "inputs": [
          { "internalType": "address", "name": "token", "type": "address" },
          { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
          { "internalType": "uint256", "name": "minAmountOut", "type": "uint256" },
          { "internalType": "uint256", "name": "amountRepay", "type": "uint256" },
          { "internalType": "uint256", "name": "deadline", "type": "uint256" }
      ],
      "name": "swapForGas",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          { "internalType": "address", "name": "token", "type": "address" }
      ],
      "name": "isTokenSupported",
      "outputs": [
          { "internalType": "bool", "name": "", "type": "bool" }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "commissionRate",
      "outputs": [
          { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          { "internalType": "address", "name": "token", "type": "address" },
          { "internalType": "uint256", "name": "amountOut", "type": "uint256" }
      ],
      "name": "getAmountIn",
      "outputs": [
          { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
  }
];

/**
 * Calculate the amount to repay based on whether approval is required and gas price
 * @param approveRequired Whether approval transaction is required
 * @param gasPrice Gas price in gkei (default: 25gkei)
 * @returns The amount to repay
 */
export function getAmountRepay(approveRequired: boolean, gasPrice: number = 25): string {
  const gasPriceBN = BigInt(Math.floor(gasPrice * 1e9));

  const lendTxGas = BigInt(21000);
  const approveTxGas = approveRequired ? BigInt(100000) : BigInt(0);
  const swapTxGas = BigInt(500000);

  const R1 = gasPriceBN * lendTxGas;
  const R2 = gasPriceBN * approveTxGas;
  const R3 = gasPriceBN * swapTxGas;

  const amountRepay = R1 + R2 + R3;

  return amountRepay.toString();
}

// Contract addresses for gasless swap routers
const MainnetGaslessSwapRouterAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // Actual address from JSON
const KairosGaslessSwapRouterAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // Using same address for testnet for now
const LocalGaslessSwapRouterAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

/**
 * Get the gasless swap router for the specified chain
 * @param signer The ethers signer
 * @param chainId The chain ID
 * @returns The gasless swap router contract
 */
export function getGaslessSwapRouter(signer: ethers.Signer, chainId: number): any {
  const MAINNET_CHAIN_ID = 8217; // Kaia mainnet
  const KAIROS_CHAIN_ID = 1001; // Kaia testnet (Kairos)
  const LOCAL = 1000;

  let routerAddress: string;

  if (chainId === MAINNET_CHAIN_ID) {
    routerAddress = MainnetGaslessSwapRouterAddress;
  } else if (chainId === KAIROS_CHAIN_ID) {
    routerAddress = KairosGaslessSwapRouterAddress;
  } else if (chainId === LOCAL) {
    routerAddress = LocalGaslessSwapRouterAddress;
  } else {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }

  const contract = new ethers.Contract(
    routerAddress,
    GASLESS_SWAP_ROUTER_ABI,
    signer
  );

  const contractWithAddress = Object.assign(contract, { address: routerAddress });

  return contractWithAddress;
}

/**
 * Get the commission rate for the specified gasless swap router
 * @param gsr The gasless swap router contract
 * @returns The commission rate
 */
export async function getCommissionRate(gsr: ethers.Contract): Promise<number> {
  const rate = await gsr.commissionRate();
  return Number(rate) / 10000;
}

/**
 * Calculate the minimum amount out based on amount to repay, app transaction fee, and commission rate
 * @param amountRepay The amount to repay
 * @param appTxFee The application transaction fee
 * @param commissionRate The commission rate
 * @returns The minimum amount out
 */
export function getMinAmountOut(
  amountRepay: string,
  appTxFee: string,
  commissionRate: number
): string {
  // Calculate minimum amount out: appTxFee/(1 - commissionRate) + amountRepay
  const appTxFeeBN = BigInt(appTxFee);
  const amountRepayBN = BigInt(amountRepay);

  const commissionRateBN = BigInt(Math.floor(commissionRate * 10000));
  const denominator = BigInt(10000);

  const adjustedFee = appTxFeeBN * denominator / (denominator - commissionRateBN);
  const minAmountOut = adjustedFee + amountRepayBN;

  return minAmountOut.toString();
}

/**
 * Calculate the amount in based on minimum amount out and slippage
 * @param gsr The gasless swap router contract
 * @param token The token address
 * @param minAmountOut The minimum amount out
 * @param slippage The slippage percentage (e.g., 0.5 for 0.5%)
 * @returns The amount in
 */
export async function getAmountIn(
  gsr: ethers.Contract,
  token: string,
  minAmountOut: string,
  slippage: number
): Promise<string> {
  const minAmountOutBN = BigInt(minAmountOut);
  const slippageBN = BigInt(Math.floor(slippage * 10000));
  const denominator = BigInt(10000);

  const adjustedMinAmountOut = minAmountOutBN * (denominator + slippageBN) / denominator;

  const amountIn = await gsr.getAmountIn(token, adjustedMinAmountOut.toString());
  return amountIn.toString();
}

/**
 * Generate a raw approve transaction
 * @param signer The signer
 * @param token The token address or contract
 * @param amount The amount to approve (default: MaxUint256)
 * @returns The raw approve transaction
 */
export async function getApproveRawTx(
  signer: ethers.Signer,
  tokenAddr: string,
  amount: string
): Promise<string> {
  try {
    if (!signer.provider) {
      throw new Error("Signer provider is null");
    }

    const network = await signer.provider.getNetwork();
    const chainId = Number(network.chainId);

    const gsr = getGaslessSwapRouter(signer, chainId);

    const tokenAbi = [
      "function approve(address spender, uint256 amount) external returns (bool)"
    ];

    const tokenContract = new ethers.Contract(
      tokenAddr,
      tokenAbi,
      signer
    );

    const amountBN = BigInt(amount);
    if (amountBN <= BigInt(0)) {
      throw new Error("Amount must be greater than 0");
    }

    const approveData = tokenContract.interface.encodeFunctionData("approve", [
      gsr.address,
      amountBN.toString()
    ]);

    const nonce = await signer.provider.getTransactionCount(await signer.getAddress());
    const feeData = await signer.provider.getFeeData();
    const gasPriceBN = feeData.gasPrice?.toString() || "25000000000";

    const tx = {
      type: 0,
      to: tokenAddr,
      nonce: nonce,
      gasLimit: 100000,
      gasPrice: gasPriceBN,
      data: approveData,
      value: 0n,
      chainId: chainId,
    };

    return await signer.signTransaction(tx);
  } catch (error) {
    console.error("Error in getApproveRawTx:", error);
    throw error;
  }
}

/**
 * Generate a raw swap transaction
 * @param signer The signer
 * @param tokenAddr The token address to swap
 * @param amountIn The amount to swap
 * @param minAmountOut The minimum amount out
 * @param amountRepay The amount to repay
 * @param isSingle Whether this is a single transaction (default: true)
 * @param deadline The deadline in seconds (default: 1800)
 * @returns The raw swap transaction
 */
export async function getSwapRawTx(
  signer: ethers.Signer,
  tokenAddr: string,
  amountIn: string,
  minAmountOut: string,
  amountRepay: string,
  isSingle: boolean = true,
  deadline: number = 1800
): Promise<string> {
  try {
    if (!signer.provider) {
      throw new Error("Signer provider is null");
    }

    const network = await signer.provider.getNetwork();
    const chainId = Number(network.chainId);

    const gsr = getGaslessSwapRouter(signer, chainId);

    const currentBlock = await signer.provider.getBlock("latest");
    if (!currentBlock) {
      throw new Error("Failed to get latest block");
    }
    const deadlineTimestamp = currentBlock.timestamp + deadline;

    const routerContract = new ethers.Contract(
      gsr.address,
      GASLESS_SWAP_ROUTER_ABI,
      signer
    );

    const swapData = routerContract.interface.encodeFunctionData("swapForGas", [
      tokenAddr,
      amountIn,
      minAmountOut,
      amountRepay,
      deadlineTimestamp
    ]);

    const address = await signer.getAddress();
    const baseNonce = await signer.provider.getTransactionCount(address);
    const nonceIncrement = isSingle ? 0 : 1;
    const nonce = baseNonce + nonceIncrement;
    const feeData = await signer.provider.getFeeData();
    const gasPriceBN = feeData.gasPrice?.toString() || "25000000000";

    const tx = {
      type: 0,
      to: gsr.address,
      nonce: nonce,
      gasLimit: 500000,
      gasPrice: gasPriceBN,
      data: swapData,
      value: 0n,
      chainId: chainId,
    };

    return await signer.signTransaction(tx);
  } catch (error) {
    console.error("Error in getSwapRawTx:", error);
    throw error;
  }
}

/**
 * Send gasless transactions
 * @param approveTxOrNull The approve transaction or null if not needed
 * @param swapTx The swap transaction
 * @param provider Optional provider to use for sending transactions
 * @returns Array of transaction hashes
 */
export async function sendGaslessTx(
  approveTxOrNull: string | null,
  swapTx: string,
  provider?: ethers.Provider
): Promise<string[]> {
  try {
    if (provider) {
      // Assert that provider is JsonRpcApiProvider
      assert(
        provider instanceof JsonRpcApiProvider,
        "Provider is not JsonRpcApiProvider: cannot send kaia_sendRawTransactions",
        "UNSUPPORTED_OPERATION",
        {
          operation: "sendGaslessTx",
        }
      );

      if (approveTxOrNull) {
        console.log("Sending both approve and swap transactions via RPC...");
        return await provider.send("kaia_sendRawTransactions", [[approveTxOrNull, swapTx]]);
      } else {
        return await provider.send("kaia_sendRawTransactions", [[swapTx]]);
      }
    } else {
      console.log("No provider available, simulating transaction sending...");
      if (approveTxOrNull) {
        return [
          `0x${approveTxOrNull.slice(2, 10).padEnd(64, '0')}`,
          `0x${swapTx.slice(2, 10).padEnd(64, '0')}`
        ];
      } else {
        return [`0x${swapTx.slice(2, 10).padEnd(64, '0')}`];
      }
    }
  } catch (error) {
    console.error("Error in sendGaslessTx:", error);
    throw error;
  }
}

/**
 * Check if a token is supported for gasless transactions
 * @param signer The ethers signer
 * @param token The token address
 * @param chainId The chain ID
 * @returns True if the token is supported, false otherwise
 */
export async function isGaslessSupportedToken(
  signer: ethers.Signer,
  token: string,
  chainId: number,
): Promise<boolean> {
  try {
    const gsr = getGaslessSwapRouter(signer, chainId);

    return await gsr.isTokenSupported(token);
  } catch (error) {
    console.error("Error in isGaslessSupportedToken:", error);
    return false;
  }
}

/**
 * Check if a transaction is a gasless approve transaction
 * @param signer The ethers signer
 * @param tx The transaction
 * @param chainId The chain ID
 * @returns True if the transaction is a gasless approve transaction, false otherwise
 */
export async function isGaslessApprove(
  signer: ethers.Signer,
  tx: string | any,
  chainId: number,
): Promise<boolean> {
  try {
    const txRequest = await getTransactionRequest(tx);

    if (!txRequest.data || !txRequest.to) {
      return false;
    }

    // A1: GaslessApproveTx.to is a whitelisted ERC-20 token.
    const isTokenSupported = await isGaslessSupportedToken(signer, txRequest.to.toString(), chainId);
    if (!isTokenSupported) {
      return false;
    }

    // A2: GaslessApproveTx.data is approve(spender, amount).
    const dataPrefix = txRequest.data.toString().slice(0, 10);
    const approveMethodId = "0x095ea7b3";

    if (dataPrefix !== approveMethodId) {
      return false;
    }

    const data = txRequest.data.toString();
    const spenderData = "0x" + data.slice(34, 74);
    const amountData = "0x" + data.slice(74);

    // A3: spender is a whitelisted GaslessSwapRouter.
    const router = getGaslessSwapRouter(signer, chainId);
    if (spenderData.toLowerCase() !== router.address.toLowerCase()) {
      return false;
    }

    // A4: amount is a nonzero.
    const amount = BigInt(amountData);
    if (amount === BigInt(0)) {
      return false;
    }

    // A5: nonce is getNonce(tx.from).
    if (signer.provider && txRequest.nonce !== undefined && txRequest.nonce !== null && txRequest.from) {
      const expectedNonce = await signer.provider.getTransactionCount(txRequest.from);
      if (BigInt(txRequest.nonce.toString()) !== BigInt(expectedNonce)) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error in isGaslessApprove:", error);
    return false;
  }
}

// Add this helper function near the top of the file after imports
function getFunctionSelector(func: string): string {
  return ethers.id(func).slice(0, 10);
}

// Helper functions for isGaslessSwap
export function isValidSwapTxFormat(txRequest: TransactionLike<string>): boolean {
  return !!(txRequest.data && txRequest.to);
}

export async function isValidRouterAddress(
  signer: ethers.Signer,
  txRequest: TransactionLike<string>,
  chainId: number
): Promise<boolean> {
  if (!txRequest.to) return false;
  
  const router = getGaslessSwapRouter(signer, chainId);
  return txRequest.to.toLowerCase() === router.address.toLowerCase();
}

export function validateAndDecodeSwapFunction(data: string): { 
  isValid: boolean; 
  decodedParams?: { 
    tokenData: string; 
    amountInData: string; 
    amountRepayData: string; 
  } 
} {
  try {
    const functionSelector = data.slice(0, 10);
    const expectedSelector = getFunctionSelector("swapForGas(address,uint256,uint256,uint256,uint256)");
    
    if (functionSelector !== expectedSelector) {
      return { isValid: false };
    }
    
    const inputData = "0x" + data.slice(10);
    const abiCoder = ethers.AbiCoder.defaultAbiCoder();
    const paramTypes = ['address', 'uint256', 'uint256', 'uint256', 'uint256'];
    
    const decodedParams = abiCoder.decode(paramTypes, inputData);
    
    return { 
      isValid: true, 
      decodedParams: {
        tokenData: decodedParams[0],
        amountInData: decodedParams[1].toString(),
        amountRepayData: decodedParams[3].toString()
      }
    };
  } catch (error) {
    console.error("Error decoding swap parameters:", error);
    return { isValid: false };
  }
}

export function validateApproveToken(
  approveTxRequest: TransactionLike<string>,
  tokenData: string
): boolean {
  return approveTxRequest.to?.toLowerCase() === tokenData.toLowerCase();
}

export function validateApproveAmount(
  approveTxRequest: TransactionLike<string>,
  amountInData: string
): boolean {
  const approveData = approveTxRequest.data?.toString() || "";
  const approveAmountData = "0x" + approveData.slice(74);
  const approveAmount = BigInt(approveAmountData);
  const amountIn = BigInt(amountInData);
  
  return approveAmount >= amountIn;
}

export async function validateNonceWithApprove(
  signer: ethers.Signer,
  approveTxRequest: TransactionLike<string>,
  swapTxRequest: TransactionLike<string>
): Promise<boolean> {
  if (swapTxRequest.nonce === undefined || swapTxRequest.nonce === null ||
      approveTxRequest.nonce === undefined || approveTxRequest.nonce === null) {
    return false;
  }
  
  // Approve transaction nonce + 1 = Swap transaction nonce
  if (BigInt(approveTxRequest.nonce.toString()) + BigInt(1) !== BigInt(swapTxRequest.nonce.toString())) {
    return false;
  }
  
  // Approve transaction nonce = Current nonce
  if (signer.provider && swapTxRequest.from) {
    try {
      const currentNonce = await signer.provider.getTransactionCount(swapTxRequest.from);
      if (BigInt(approveTxRequest.nonce.toString()) !== BigInt(currentNonce)) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  
  return true;
}

export function validateAmountRepayWithApprove(
  swapTxRequest: TransactionLike<string>,
  amountRepayData: string
): boolean {
  const gasPrice = swapTxRequest.gasPrice?.toString() || "25000000000";
  const expectedAmountRepay = getAmountRepay(true, Number(gasPrice) / 1000000000);
  
  if (BigInt(amountRepayData) !== BigInt(expectedAmountRepay)) {
    return false;
  }
  
  return true;
}

export async function validateNonceWithoutApprove(
  signer: ethers.Signer,
  swapTxRequest: TransactionLike<string>
): Promise<boolean> {
  if (swapTxRequest.nonce === undefined || swapTxRequest.nonce === null) {
    return false;
  }
  
  if (signer.provider && swapTxRequest.from) {
    try {
      const currentNonce = await signer.provider.getTransactionCount(swapTxRequest.from);
      if (BigInt(swapTxRequest.nonce.toString()) !== BigInt(currentNonce)) {
        return false;
      }
    } catch (error) {
      console.error("Error checking nonce:", error);
      return false;
    }
  }
  
  return true;
}

export function validateAmountRepayWithoutApprove(
  swapTxRequest: TransactionLike<string>,
  amountRepayData: string
): boolean {
  const gasPrice = swapTxRequest.gasPrice?.toString() || "25000000000";
  const expectedAmountRepay = getAmountRepay(false, Number(gasPrice) / 1000000000);
  
  if (BigInt(amountRepayData) !== BigInt(expectedAmountRepay)) {
    return false;
  }
  
  return true;
}

export async function validateWithApprove(
  signer: ethers.Signer,
  approveTx: string | any,
  swapTxRequest: TransactionLike<string>,
  tokenData: string,
  amountInData: string,
  amountRepayData: string,
  chainId: number
): Promise<boolean> {
  const isApprove = await isGaslessApprove(signer, approveTx, chainId);
  if (!isApprove) {
    return false;
  }
  
  const approveTxRequest = await getTransactionRequest(approveTx);
  
  // SP1: GaslessApproveTx.to=token
  if (!validateApproveToken(approveTxRequest, tokenData)) {
    return false;
  }
  
  // SP2: GaslessApproveTx.data.amount>=amountIn
  if (!validateApproveAmount(approveTxRequest, amountInData)) {
    return false;
  }
  
  // SP3: Nonce is the correct value
  if (!await validateNonceWithApprove(signer, approveTxRequest, swapTxRequest)) {
    return false;
  }
  
  // SP4: amountRepay is the correct value
  if (!validateAmountRepayWithApprove(swapTxRequest, amountRepayData)) {
    return false;
  }
  
  return true;
}

export async function validateWithoutApprove(
  signer: ethers.Signer,
  swapTxRequest: TransactionLike<string>,
  amountRepayData: string
): Promise<boolean> {
  // SP3: Nonce is the correct value
  if (!await validateNonceWithoutApprove(signer, swapTxRequest)) {
    return false;
  }
  
  // SP4: amountRepay is the correct value
  if (!validateAmountRepayWithoutApprove(swapTxRequest, amountRepayData)) {
    return false;
  }
  
  return true;
}

/**
 * Check if transactions form a valid gasless swap
 * @param approveTxOrNull The approve transaction or null if not needed
 * @param swapTx The swap transaction
 * @param chainId The chain ID
 * @param signer The ethers signer
 * @returns True if the transactions form a valid gasless swap, false otherwise
 */
export async function isGaslessSwap(
  signer: ethers.Signer,
  approveTxOrNull: string | any | null,
  swapTx: string | any,
  chainId: number
): Promise<boolean> {
  try {
    const swapTxRequest = await getTransactionRequest(swapTx);
    
    // Basic validation
    if (!isValidSwapTxFormat(swapTxRequest)) {
      return false;
    }
    
    // S1: Router address validation
    if (!await isValidRouterAddress(signer, swapTxRequest, chainId)) {
      return false;
    }
    
    // S2: Function selector validation and parameter decoding
    const { isValid, decodedParams } = validateAndDecodeSwapFunction(swapTxRequest.data?.toString() || "");
    if (!isValid || !decodedParams) {
      return false;
    }
    
    const { tokenData, amountInData, amountRepayData } = decodedParams;
    
    // S3: Token support validation
    const isTokenSupported = await isGaslessSupportedToken(signer, tokenData, chainId);
    if (!isTokenSupported) {
      return false;
    }
    
    // Validation with or without approve transaction
    if (approveTxOrNull) {
      if (!await validateWithApprove(
        signer, 
        approveTxOrNull, 
        swapTxRequest, 
        tokenData, 
        amountInData, 
        amountRepayData, 
        chainId
      )) {
        return false;
      }
    } else {
      if (!await validateWithoutApprove(
        signer, 
        swapTxRequest, 
        amountRepayData
      )) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error in isGaslessSwap:", error);
    return false;
  }
}
