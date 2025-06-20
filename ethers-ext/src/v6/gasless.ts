import { JsonRpcApiProvider, assert, ethers, TransactionLike, MaxUint256 } from "ethers";

import { GaslessSwapRouterAbi } from "./abi/GaslessSwapRouter.js";
import { RegistryAbi } from "./abi/Registry.js";
import { getTransactionRequest } from "./txutil.js";

const SUPPORTED_CHAIN_IDS: { [key: number]: string } = {
  8217: "mainnet",
  1001: "testnet",
  1000: "local"
};

// GaslessSwapRouterAddress registry key
// https://github.com/kaiachain/kaia/blob/v2.0.0/contracts/contracts/system_contracts/multicall/MultiCallContract.sol#L140
const GASLESS_SWAP_ROUTER_NAME = "GaslessSwapRouter";
const REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000401";

function validateChainId(chainId: number): string {
  const networkName = SUPPORTED_CHAIN_IDS[chainId];
  if (!networkName) {
    throw new Error(`Chain ID ${chainId} is not supported by this SDK. This SDK only supports Kaia networks.`);
  }
  return networkName;
}

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

/**
 * Get the gasless swap router for the specified chain
 * @param provider The ethers provider
 * @param chainId The chain ID
 * @param address Override the address of the gasless swap router (optional)
 * @returns The gasless swap router contract
 */
export async function getGaslessSwapRouter(provider: ethers.Provider, chainId: number, address?: string): Promise<any> {
  let routerAddr: string;
  if (!address) {
    // Attempt to get the address from the KIP-149 registry
    validateChainId(chainId);
    const registry = new ethers.Contract(
      REGISTRY_ADDRESS,
      RegistryAbi,
      provider
    );
    const addr = await registry.getActiveAddr(GASLESS_SWAP_ROUTER_NAME);
    if (addr === undefined || addr === null || addr === ethers.ZeroHash) {
      throw new Error(`There is no GaslessSwapRouter registered in the target chain (chainId: ${chainId})`);
    }
    routerAddr = addr;
  } else {
    // Otherwise use specified address
    routerAddr = address;
  }

  const contract = new ethers.Contract(
    routerAddr,
    GaslessSwapRouterAbi.abi,
    provider
  );

  const contractWithAddress = Object.assign(contract, { address: routerAddr });

  return contractWithAddress;
}

/**
 * Get the commission rate for the specified gasless swap router
 * @param gsr The gasless swap router contract
 * @returns The commission rate
 */
export async function getCommissionRate(gsr: ethers.Contract): Promise<number> {
  const rate = await gsr.commissionRate();
  return Number(rate);
}

/**
 * Calculate the minimum amount out based on amount to repay, app transaction fee, and commission rate
 * @param amountRepay The amount to repay
 * @param appTxFee The application transaction fee
 * @param commissionRateBasisPoints The commission rate in basis points (e.g., 1000 = 10%)
 * @returns The minimum amount out
 */
export function getMinAmountOut(
  amountRepay: string,
  appTxFee: string,
  commissionRateBasisPoints: number
): string {
  if (!Number.isInteger(commissionRateBasisPoints)) {
    throw new Error("Commission rate must be an integer value in basis points");
  }

  if (commissionRateBasisPoints < 0 || commissionRateBasisPoints >= 10000) {
    throw new Error("Commission rate must be between 0 and 9999 basis points");
  }

  // Calculate minimum amount out: appTxFee/(1 - commissionRate) + amountRepay
  const appTxFeeBN = BigInt(appTxFee);
  const amountRepayBN = BigInt(amountRepay);

  const commissionRateBN = BigInt(commissionRateBasisPoints);
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
 * @param slippageBasisPoints The slippage basis point (e.g., 50 basis points = 0.5%)
 * @returns The amount in
 */
export async function getAmountIn(
  gsr: ethers.Contract,
  token: string,
  minAmountOut: string,
  slippageBasisPoints: number
): Promise<string> {
  const minAmountOutBN = BigInt(minAmountOut);
  const slippageBN = BigInt(slippageBasisPoints);
  const denominator = BigInt(10000);

  const adjustedMinAmountOut = minAmountOutBN * (denominator + slippageBN) / denominator;

  const amountIn = await gsr.getAmountIn(token, adjustedMinAmountOut.toString());
  return amountIn.toString();
}

/**
 * Generate a approve transaction
 * @param provider The ethers provider
 * @param fromAddress The sender address
 * @param tokenAddr The token address
 * @param routerAddress The router address
 * @param amount The amount to approve
 * @returns The approve transaction
 */
export async function getApproveTx(
  provider: ethers.Provider,
  fromAddress: string,
  tokenAddr: string,
  routerAddress: string
): Promise<ethers.TransactionRequest> {
  try {
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);

    validateChainId(chainId);

    const tokenAbi = [
      "function approve(address spender, uint256 amount) external returns (bool)"
    ];

    const tokenInterface = new ethers.Interface(tokenAbi);

    // GaslessApproveTx's allowance is only set to MaxUint256.
    // ref: https://github.com/kaiachain/kips/pull/64
    const approveData = tokenInterface.encodeFunctionData("approve", [
      routerAddress,
      MaxUint256.toString()
    ]);

    const nonce = await provider.getTransactionCount(fromAddress);
    const feeData = await provider.getFeeData();
    const gasPriceBN = feeData.gasPrice?.toString() || "25000000000";

    return {
      type: 0,
      to: tokenAddr,
      from: fromAddress,
      nonce: nonce,
      gasLimit: 100000,
      gasPrice: gasPriceBN,
      data: approveData,
      value: 0n,
      chainId: chainId,
    };
  } catch (error) {
    console.error("Error in getApproveTx:", error);
    throw error;
  }
}

/**
 * Generate an swap transaction
 * @param provider The ethers provider
 * @param fromAddress The sender address
 * @param tokenAddr The token address to swap
 * @param amountIn The amount to swap
 * @param minAmountOut The minimum amount out
 * @param amountRepay The amount to repay
 * @param isSingle Whether this is a single transaction (default: true)
 * @param deadline The deadline in seconds (default: 1800)
 * @returns The swap transaction
 */
export async function getSwapTx(
  provider: ethers.Provider,
  fromAddress: string,
  tokenAddr: string,
  amountIn: string,
  minAmountOut: string,
  amountRepay: string,
  isSingle: boolean = true,
  deadline: number = 1800
): Promise<ethers.TransactionRequest> {
  try {
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);

    validateChainId(chainId);

    const routerInfo = await getGaslessSwapRouter(provider, chainId);
    const routerAddress = routerInfo.address;

    const currentBlock = await provider.getBlock("latest");
    if (!currentBlock) {
      throw new Error("Failed to get latest block");
    }
    const deadlineTimestamp = currentBlock.timestamp + deadline;

    const routerInterface = new ethers.Interface(GaslessSwapRouterAbi.abi);

    const swapData = routerInterface.encodeFunctionData("swapForGas", [
      tokenAddr,
      amountIn,
      minAmountOut,
      amountRepay,
      deadlineTimestamp
    ]);

    const baseNonce = await provider.getTransactionCount(fromAddress);
    const nonceIncrement = isSingle ? 0 : 1;
    const nonce = baseNonce + nonceIncrement;

    const feeData = await provider.getFeeData();
    const gasPriceBN = feeData.gasPrice?.toString() || "25000000000";

    // Construct the transaction object
    const tx: ethers.TransactionRequest = {
      type: 0,
      to: routerAddress,
      from: fromAddress,
      nonce: nonce,
      gasLimit: 500000,
      gasPrice: gasPriceBN,
      data: swapData,
      value: 0n,
      chainId: chainId,
    };

    return tx;
  } catch (error) {
    console.error("Error in getSwapTx:", error);
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
  provider: ethers.Provider
): Promise<string[]> {
  try {
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    validateChainId(chainId);

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
  provider: ethers.Provider,
  token: string,
  chainId: number,
): Promise<boolean> {
  try {
    const gsr = await getGaslessSwapRouter(provider, chainId);

    return await gsr.isTokenSupported(token);
  } catch (error) {
    console.error("Error in isGaslessSupportedToken:", error);
    return false;
  }
}

/**
 * Check if a transaction is a gasless approve transaction
 * @param provider The ethers provider
 * @param tx The transaction
 * @param chainId The chain ID
 * @returns True if the transaction is a gasless approve transaction, false otherwise
 */
export async function isGaslessApprove(
  provider: ethers.Provider,
  tx: string | any,
  chainId: number,
): Promise<boolean> {
  try {
    const txRequest = await getTransactionRequest(tx);

    if (!txRequest.data || !txRequest.to) {
      return false;
    }

    // A1: GaslessApproveTx.to is a whitelisted ERC-20 token.
    const isTokenSupported = await isGaslessSupportedToken(provider, txRequest.to.toString(), chainId);
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
    const router = await getGaslessSwapRouter(provider, chainId);
    if (spenderData.toLowerCase() !== router.address.toLowerCase()) {
      return false;
    }

    // A4: amount is MaxUint256.
    const amount = BigInt(amountData);
    if (amount !== MaxUint256) {
      return false;
    }

    // A5: nonce is getNonce(tx.from).
    if (txRequest.nonce !== undefined && txRequest.nonce !== null && txRequest.from) {
      const expectedNonce = await provider.getTransactionCount(txRequest.from);
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
  provider: ethers.Provider,
  txRequest: TransactionLike<string>,
  chainId: number
): Promise<boolean> {
  if (!txRequest.to) { return false; }

  const router = await getGaslessSwapRouter(provider, chainId);
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
    const paramTypes = ["address", "uint256", "uint256", "uint256", "uint256"];

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
  provider: ethers.Provider,
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
  if (swapTxRequest.from) {
    try {
      const currentNonce = await provider.getTransactionCount(swapTxRequest.from);
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
  provider: ethers.Provider,
  swapTxRequest: TransactionLike<string>
): Promise<boolean> {
  if (swapTxRequest.nonce === undefined || swapTxRequest.nonce === null) {
    return false;
  }

  if (swapTxRequest.from) {
    try {
      const currentNonce = await provider.getTransactionCount(swapTxRequest.from);
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
  provider: ethers.Provider,
  approveTx: string | any,
  swapTxRequest: TransactionLike<string>,
  tokenData: string,
  amountInData: string,
  amountRepayData: string,
  chainId: number
): Promise<boolean> {
  const isApprove = await isGaslessApprove(provider, approveTx, chainId);
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
  if (!await validateNonceWithApprove(provider, approveTxRequest, swapTxRequest)) {
    return false;
  }

  // SP4: amountRepay is the correct value
  if (!validateAmountRepayWithApprove(swapTxRequest, amountRepayData)) {
    return false;
  }

  return true;
}

export async function validateWithoutApprove(
  provider: ethers.Provider,
  swapTxRequest: TransactionLike<string>,
  amountRepayData: string
): Promise<boolean> {
  // SP3: Nonce is the correct value
  if (!await validateNonceWithoutApprove(provider, swapTxRequest)) {
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
 * @param provider The ethers provider
 * @returns True if the transactions form a valid gasless swap, false otherwise
 */
export async function isGaslessSwap(
  provider: ethers.Provider,
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
    if (!await isValidRouterAddress(provider, swapTxRequest, chainId)) {
      return false;
    }

    // S2: Function selector validation and parameter decoding
    const { isValid, decodedParams } = validateAndDecodeSwapFunction(swapTxRequest.data?.toString() || "");
    if (!isValid || !decodedParams) {
      return false;
    }

    const { tokenData, amountInData, amountRepayData } = decodedParams;

    // S3: Token support validation
    const isTokenSupported = await isGaslessSupportedToken(provider, tokenData, chainId);
    if (!isTokenSupported) {
      return false;
    }

    // Validation with or without approve transaction
    if (approveTxOrNull) {
      if (!await validateWithApprove(
        provider,
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
        provider,
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
