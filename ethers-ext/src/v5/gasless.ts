import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { Zero } from "@ethersproject/constants";
import { defaultAbiCoder } from "@ethersproject/abi";
import { id } from "@ethersproject/hash";
import { Signer } from "@ethersproject/abstract-signer";
import { JsonRpcProvider, Provider } from "@ethersproject/providers";

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
  const gasPriceBN = BigNumber.from(Math.floor(gasPrice * 1e9));
  const lendTxGas = BigNumber.from(21000);
  const approveTxGas = approveRequired ? BigNumber.from(100000) : BigNumber.from(0);
  const swapTxGas = BigNumber.from(500000);

  const R1 = gasPriceBN.mul(lendTxGas);
  const R2 = gasPriceBN.mul(approveTxGas);
  const R3 = gasPriceBN.mul(swapTxGas);

  const amountRepay = R1.add(R2).add(R3);

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
export function getGaslessSwapRouter(signer: Signer, chainId: number): Contract {
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

  const contract = new Contract(
    routerAddress,
    GASLESS_SWAP_ROUTER_ABI,
    signer
  );

  return contract;
}

/**
 * Get the commission rate for the specified gasless swap router
 * @param gsr The gasless swap router contract
 * @returns The commission rate
 */
export async function getCommissionRate(gsr: Contract): Promise<number> {
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
  const appTxFeeBN = BigNumber.from(appTxFee);
  const amountRepayBN = BigNumber.from(amountRepay);

  const commissionRateBN = BigNumber.from(Math.floor(commissionRate * 10000));
  const denominator = BigNumber.from(10000);

  const adjustedFee = appTxFeeBN.mul(denominator).div(denominator.sub(commissionRateBN));
  const minAmountOut = adjustedFee.add(amountRepayBN);

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
  gsr: Contract,
  token: string,
  minAmountOut: string,
  slippage: number
): Promise<string> {
  const minAmountOutBN = BigNumber.from(minAmountOut);
  const slippageBN = BigNumber.from(Math.floor(slippage * 10000));
  const denominator = BigNumber.from(10000);

  const adjustedMinAmountOut = minAmountOutBN.mul(denominator.add(slippageBN)).div(denominator);

  const amountIn = await gsr.getAmountIn(token, adjustedMinAmountOut.toString());
  return amountIn.toString();
}

/**
 * Generate a raw approve transaction
 * @param signer The signer
 * @param tokenAddr The token address
 * @param amount The amount to approve
 * @returns The raw approve transaction
 */
export async function getApproveRawTx(
  signer: Signer,
  tokenAddr: string,
  amount: string
): Promise<string> {
  try {
    if (!signer.provider) {
      throw new Error("Signer provider is null");
    }

    const network = await signer.provider.getNetwork();
    const chainId = network.chainId;

    const gsr = getGaslessSwapRouter(signer, chainId);

    const tokenAbi = [
      "function approve(address spender, uint256 amount) external returns (bool)"
    ];

    const tokenContract = new Contract(
      tokenAddr,
      tokenAbi,
      signer
    );

    const amountBN = BigNumber.from(amount);
    if (amountBN.lte(BigNumber.from(0))) {
      throw new Error("Amount must be greater than 0");
    }

    const approveData = tokenContract.interface.encodeFunctionData("approve", [
      gsr.address,
      amountBN.toString()
    ]);

    const nonce = await signer.provider.getTransactionCount(await signer.getAddress());
    const feeData = await signer.provider.getFeeData();

    const gasPriceBN = feeData.gasPrice || BigNumber.from("25000000000");

    const tx = {
      type: 0,
      to: tokenAddr,
      nonce: nonce,
      gasLimit: 100000,
      gasPrice: gasPriceBN,
      data: approveData,
      value: Zero,
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
  signer: Signer,
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
    const chainId = network.chainId;

    const gsr = getGaslessSwapRouter(signer, chainId);

    const currentBlock = await signer.provider.getBlock("latest");
    if (!currentBlock) {
      throw new Error("Failed to get latest block");
    }
    const deadlineTimestamp = currentBlock.timestamp + deadline;

    const routerContract = new Contract(
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
    const gasPriceBN = feeData.gasPrice || BigNumber.from("25000000000");

    const tx = {
      type: 0,
      to: gsr.address,
      nonce: nonce,
      gasLimit: 500000,
      gasPrice: gasPriceBN,
      data: swapData,
      value: Zero,
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
  provider?: Provider
): Promise<string[]> {
  try {
    if (provider) {
      if (!(provider instanceof JsonRpcProvider)) {
        throw new Error("Provider is not JsonRpcProvider: cannot send kaia_sendRawTransactions");
      }

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
  signer: Signer,
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

export async function isGaslessApprove(
  signer: Signer,
  tx: string | any,
  chainId: number,
): Promise<boolean> {
  try {
    const txRequest = await getTransactionRequest(tx);

    if (!txRequest.data || !txRequest.to) {
      return false;
    }

    const isTokenSupported = await isGaslessSupportedToken(signer, txRequest.to.toString(), chainId);
    if (!isTokenSupported) {
      return false;
    }

    const dataPrefix = txRequest.data.toString().slice(0, 10);
    const approveMethodId = "0x095ea7b3";

    if (dataPrefix !== approveMethodId) {
      return false;
    }

    const data = txRequest.data.toString();
    const spenderData = "0x" + data.slice(34, 74);
    const amountData = "0x" + data.slice(74);

    const router = getGaslessSwapRouter(signer, chainId);
    if (spenderData.toLowerCase() !== router.address.toLowerCase()) {
      return false;
    }

    const amount = BigNumber.from(amountData);
    if (amount.isZero()) {
      return false;
    }

    if (signer.provider && txRequest.nonce !== undefined && txRequest.nonce !== null && txRequest.from) {
      const expectedNonce = await signer.provider.getTransactionCount(txRequest.from);
      if (BigNumber.from(txRequest.nonce).toNumber() !== expectedNonce) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error in isGaslessApprove:", error);
    return false;
  }
}

// Helper functions for isGaslessSwap

export function getFunctionSelector(func: string): string {
  return id(func).slice(0, 10);
}

export function isValidSwapTxFormat(txRequest: any): boolean {
  return !!(txRequest.data && txRequest.to);
}

export async function isValidRouterAddress(
  signer: Signer,
  txRequest: any,
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
    const abiCoder = defaultAbiCoder;
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
  approveTxRequest: any,
  tokenData: string
): boolean {
  return approveTxRequest.to?.toLowerCase() === tokenData.toLowerCase();
}

export function validateApproveAmount(
  approveTxRequest: any,
  amountInData: string
): boolean {
  const approveData = approveTxRequest.data?.toString() || "";
  const approveAmountData = "0x" + approveData.slice(74);
  const approveAmount = BigNumber.from(approveAmountData);
  const amountIn = BigNumber.from(amountInData);

  return !approveAmount.lt(amountIn);
}

export async function validateNonceWithApprove(
  signer: Signer,
  approveTxRequest: any,
  swapTxRequest: any
): Promise<boolean> {
  if (swapTxRequest.nonce === undefined || swapTxRequest.nonce === null ||
    approveTxRequest.nonce === undefined || approveTxRequest.nonce === null) {
    return false;
  }

  const approveTxNonce = BigNumber.from(approveTxRequest.nonce);
  const swapTxNonce = BigNumber.from(swapTxRequest.nonce);

  // Approve transaction nonce + 1 = Swap transaction nonce
  if (!approveTxNonce.add(1).eq(swapTxNonce)) {
    return false;
  }

  // Approve transaction nonce = Current nonce
  if (signer.provider && swapTxRequest.from) {
    try {
      const currentNonce = await signer.provider.getTransactionCount(swapTxRequest.from);
      if (approveTxNonce.toNumber() !== currentNonce) {
        console.log(`Approve nonce mismatch: approveTx.nonce=${approveTxNonce}, currentNonce=${currentNonce}`);
        return false;
      }
    } catch (error) {
      console.error("Error checking nonce:", error);
      return false;
    }
  }

  return true;
}

export function validateAmountRepayWithApprove(
  swapTxRequest: any,
  amountRepayData: string
): boolean {
  const gasPrice = swapTxRequest.gasPrice?.toString() || "25000000000"; // Default to 25 gkei
  const expectedAmountRepay = getAmountRepay(true, Number(gasPrice) / 1000000000); // Convert to gkei

  return BigNumber.from(amountRepayData).toString() === expectedAmountRepay;
}

export async function validateNonceWithoutApprove(
  signer: Signer,
  swapTxRequest: any
): Promise<boolean> {
  if (swapTxRequest.nonce === undefined || swapTxRequest.nonce === null) {
    return false;
  }

  if (signer.provider && swapTxRequest.from) {
    try {
      const currentNonce = await signer.provider.getTransactionCount(swapTxRequest.from);
      const swapTxNonce = BigNumber.from(swapTxRequest.nonce).toNumber();
      if (swapTxNonce !== currentNonce) {
        console.log(`Swap nonce mismatch: swapTx.nonce=${swapTxNonce}, currentNonce=${currentNonce}`);
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
  swapTxRequest: any,
  amountRepayData: string
): boolean {
  const gasPrice = swapTxRequest.gasPrice?.toString() || "25000000000";
  const expectedAmountRepay = getAmountRepay(false, Number(gasPrice) / 1000000000);

  return BigNumber.from(amountRepayData).toString() === expectedAmountRepay;
}

export async function validateWithApprove(
  signer: Signer,
  approveTx: string | any,
  swapTxRequest: any,
  tokenData: string,
  amountInData: string,
  amountRepayData: string,
  chainId: number
): Promise<boolean> {
  // Validate approve transaction
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
  signer: Signer,
  swapTxRequest: any,
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
 * @param signer The signer
 * @param approveTxOrNull The approve transaction or null if not needed
 * @param swapTx The swap transaction
 * @param chainId The chain ID
 * @returns True if the transactions form a valid gasless swap, false otherwise
 */
export async function isGaslessSwap(
  signer: Signer,
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
