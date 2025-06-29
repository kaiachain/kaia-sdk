import { JsonRpcApiProvider, assert, ethers, BigNumberish, Contract, TransactionLike, MaxUint256 } from "ethers";

import { GaslessSwapRouterAbi } from "./abi/GaslessSwapRouter.js";
import { RegistryAbi } from "./abi/Registry.js";
import { getTransactionRequest } from "./txutil.js";
import { TransactionRequest } from "./types.js";

const SUPPORTED_CHAIN_IDS: { [key: number]: string } = {
  8217: "mainnet",
  1001: "testnet",
  1000: "local"
};

// GaslessSwapRouterAddress registry key
// https://github.com/kaiachain/kaia/blob/v2.0.0/contracts/contracts/system_contracts/multicall/MultiCallContract.sol#L140
const GASLESS_SWAP_ROUTER_NAME = "GaslessSwapRouter";
const REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000401";

// Using fixed constants to simplify amountRepay calculation.
const GAS_LIMIT_LEND = 21000;
const GAS_LIMIT_APPROVE = 100000;
const GAS_LIMIT_SWAP = 500000;

function validateChainId(chainId: number): string {
  const networkName = SUPPORTED_CHAIN_IDS[chainId];
  if (!networkName) {
    throw new Error(`Chain ID ${chainId} is not supported by this SDK. This SDK only supports Kaia networks.`);
  }
  return networkName;
}

/**
 * Get the gasless swap router for the specified chain
 * @param provider The ethers provider
 * @param chainId The chain ID
 * @param address Override the address of the gasless swap router (optional)
 * @returns The gasless swap router contract
 */
export async function getGaslessSwapRouter(provider: ethers.Provider, address?: string): Promise<Contract> {
  let contractAddress: string;
  if (!address) { // Read from the KIP-149 registry.
    const registry = new ethers.Contract(
      REGISTRY_ADDRESS,
      RegistryAbi,
      provider
    );
    const addr = await registry.getActiveAddr(GASLESS_SWAP_ROUTER_NAME);
    if (addr === undefined || addr === null || addr === ethers.ZeroAddress) {
      throw new Error("GaslessSwapRouter not found in the registry");
    }
    contractAddress = addr;
  } else { // Use the custom address.
    contractAddress = address;
  }

  return new ethers.Contract(
    contractAddress,
    GaslessSwapRouterAbi.abi,
    provider
  );
}

/**
 * Calculate the amount to repay based on whether approval is required and gas price
 * @param approveRequired Whether approval transaction is required
 * @param gasPrice Gas price in gkei
 * @returns The amount to repay
 */
export function getAmountRepay(approveRequired: boolean, gasPrice: number): bigint {
  const gasPriceBN = BigInt(gasPrice);

  const lendTxGas = BigInt(GAS_LIMIT_LEND);
  const approveTxGas = approveRequired ? BigInt(GAS_LIMIT_APPROVE) : BigInt(0);
  const swapTxGas = BigInt(GAS_LIMIT_SWAP);

  const R1 = gasPriceBN * lendTxGas;
  const R2 = gasPriceBN * approveTxGas;
  const R3 = gasPriceBN * swapTxGas;

  return R1 + R2 + R3;
}

/**
 * Calculate the minimum amount out based on amount to repay, app transaction fee, and commission rate
 * @param amountRepay The amount to repay
 * @param appTxFee The application transaction fee
 * @param commissionRateBps The commission rate in basis points (e.g., 1000 = 10%)
 * @returns The minimum amount out
 */
export function getMinAmountOut(
  amountRepay: BigNumberish,
  appTxFee: BigNumberish,
  commissionRateBps: BigNumberish,
): bigint {
  const appTxFeeBN = BigInt(appTxFee);
  const amountRepayBN = BigInt(amountRepay);
  const commissionRateBpsBN = BigInt(commissionRateBps);
  const denominator = BigInt(10000);
  if (commissionRateBpsBN < 0 || commissionRateBpsBN >= 10000) {
    throw new Error("Commission rate must be between 0 and 9999 basis points");
  }
  // minAmountOut = appTxFee / (1 - commissionRate) + amountRepay
  // i.e. (amountOut - amountRepay) * (1 - commissionRate) >= appTxFee
  // because the swap output has to be enough to repay and pay the commission.
  const adjustedFee = appTxFeeBN * denominator / (denominator - commissionRateBpsBN);
  return adjustedFee + amountRepayBN;
}

/**
 * Calculate the amount in based on minimum amount out and slippage
 * @param router The gasless swap router contract
 * @param tokenAddress The token address
 * @param minAmountOut The minimum amount out
 * @param slippageBps The slippage basis point (e.g., 50 basis points = 0.5%)
 * @returns The amount in
 */
export async function getAmountIn(
  router: ethers.Contract,
  tokenAddress: string,
  minAmountOut: BigNumberish,
  slippageBps: BigNumberish,
): Promise<bigint> {
  const minAmountOutBN = BigInt(minAmountOut);
  const slippageBN = BigInt(slippageBps);
  const denominator = BigInt(10000);

  // minAmountIn = DEX.getAmountIn(tokenAddress, minAmountOut * (1 + slippage))
  // Have DEX calculate the required input to produce minAmountOut plus slippage.
  const withSlippage = minAmountOutBN * (denominator + slippageBN) / denominator;

  const amountIn = await router.getAmountIn(tokenAddress, withSlippage);
  return BigInt(amountIn);
}

/**
 * Generate a approve transaction
 * @param provider The ethers provider
 * @param fromAddress The sender address
 * @param tokenAddress The token address
 * @param routerAddress The router address
 * @param amount The amount to approve
 * @returns The approve transaction
 */
export async function getApproveTx(
  provider: ethers.Provider,
  fromAddress: string,
  tokenAddress: string,
  routerAddress: string,
  gasPrice: BigNumberish,
): Promise<ethers.TransactionRequest> {
  const tokenInterface = new ethers.Interface([
    "function approve(address spender, uint256 amount) external returns (bool)"
  ]);
  const data = tokenInterface.encodeFunctionData("approve", [
    routerAddress,
    MaxUint256.toString()
  ]);
  const nonce = await provider.getTransactionCount(fromAddress);

  return {
    type: 0,
    from: fromAddress,
    to: tokenAddress,
    nonce: nonce,
    gasLimit: GAS_LIMIT_APPROVE,
    gasPrice: gasPrice,
    value: 0n,
    data: data,
  };
}

/**
 * Generate an swap transaction
 * @param provider The ethers provider
 * @param fromAddress The sender address
 * @param tokenAddress The token address to swap
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
  tokenAddress: string,
  routerAddress: string,
  amountIn: BigNumberish,
  minAmountOut: BigNumberish,
  amountRepay: BigNumberish,
  gasPrice: BigNumberish,
  approveRequired: boolean = false,
  deadlineBuffer: BigNumberish = 1800,
): Promise<ethers.TransactionRequest> {
  const latestBlock = await provider.getBlock("latest");
  if (!latestBlock) {
    throw new Error("Failed to get latest block");
  }
  const deadlineTimestamp = BigInt(latestBlock.timestamp) + BigInt(deadlineBuffer);

  let nonce = await provider.getTransactionCount(fromAddress);
  if (approveRequired) {
    nonce += 1;
  }

  const routerInterface = new ethers.Interface(GaslessSwapRouterAbi.abi);
  const data = routerInterface.encodeFunctionData("swapForGas", [
    tokenAddress,
    amountIn,
    minAmountOut,
    amountRepay,
    deadlineTimestamp
  ]);

  // Construct the transaction object
  const tx: ethers.TransactionRequest = {
    type: 0,
    from: fromAddress,
    to: routerAddress,
    nonce: nonce,
    gasLimit: GAS_LIMIT_SWAP,
    gasPrice: gasPrice,
    value: 0n,
    data: data,
  };

  return tx;
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
    const gsr = await getGaslessSwapRouter(provider);

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
 * @returns True if the transaction is a gasless approve transaction, false otherwise
 */
export async function isGaslessApprove(
  provider: ethers.Provider,
  router: Contract,
  transactionOrRLP: TransactionRequest | string,
): Promise<{ ok: boolean, error?: string }> {
  const routerAddress = await router.getAddress();
  const tx = await getTransactionRequest(transactionOrRLP);
  if (!tx.from || !tx.to || !tx.nonce || !tx.data) {
    return { ok: false, error: "Invalid transaction" };
  }

  // A1: GaslessApproveTx.to is a whitelisted ERC-20 token.
  const isTokenSupported = await router.isTokenSupported(tx.to);
  if (!isTokenSupported) {
    return { ok: false, error: "A1: Token not supported" };
  }

  // A2: GaslessApproveTx.data is approve(spender, amount).
  let spender: string;
  let amount: bigint;
  try {
    const tokenInterface = new ethers.Interface([
      "function approve(address spender, uint256 amount) external returns (bool)"
    ]);
    [spender, amount] = tokenInterface.decodeFunctionData("approve", tx.data);
    if (spender === undefined || amount === undefined) {
      return { ok: false, error: "A2: Invalid data" };
    }
  } catch (error) {
    return { ok: false, error: "A2: Invalid data" };
  }

  // A3: spender is a whitelisted GaslessSwapRouter.
  if (spender.toLowerCase() !== routerAddress.toLowerCase()) {
    return { ok: false, error: "A3: Invalid spender" };
  }

  // A4: amount is MaxUint256.
  if (BigInt(amount) !== MaxUint256) {
    return { ok: false, error: "A4: Invalid amount" };
  }

  // A5: nonce is getNonce(tx.from).
  const expectedNonce = await provider.getTransactionCount(tx.from);
  if (BigInt(tx.nonce) !== BigInt(expectedNonce)) {
    return { ok: false, error: "A5: Invalid nonce" };
  }

  return { ok: true };
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

  const router = await getGaslessSwapRouter(provider);
  return txRequest.to.toLowerCase() === (await router.getAddress()).toLowerCase();
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
  router: Contract,
  approveTx: string | any,
  swapTxRequest: TransactionLike<string>,
  tokenData: string,
  amountInData: string,
  amountRepayData: string,
): Promise<boolean> {
  const isApprove = await isGaslessApprove(provider, router, approveTx);
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
  router: Contract,
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
        router,
        approveTxOrNull,
        swapTxRequest,
        tokenData,
        amountInData,
        amountRepayData,
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
