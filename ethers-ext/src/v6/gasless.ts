import { ethers, BigNumberish, Contract, TransactionLike, MaxUint256 } from "ethers";

import { GaslessSwapRouterAbi } from "./abi/GaslessSwapRouter.js";
import { RegistryAbi } from "./abi/Registry.js";
import { getTransactionRequest } from "./txutil.js";
import { TransactionRequest } from "./types.js";

// GaslessSwapRouterAddress registry key
// https://github.com/kaiachain/kaia/blob/v2.0.0/contracts/contracts/system_contracts/multicall/MultiCallContract.sol#L140
const GASLESS_SWAP_ROUTER_NAME = "GaslessSwapRouter";
const REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000401";

// Using fixed constants to simplify amountRepay calculation.
const GAS_LIMIT_LEND = 21000;
const GAS_LIMIT_APPROVE = 100000;
const GAS_LIMIT_SWAP = 500000;

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

/**
 * Check if transactions form a valid gasless swap
 * @param approveTxOrNull The approve transaction or null if not needed
 * @param transactionOrRLP The swap transaction
 * @param chainId The chain ID
 * @param provider The ethers provider
 * @returns True if the transactions form a valid gasless swap, false otherwise
 */
export async function isGaslessSwap(
  provider: ethers.Provider,
  router: Contract,
  approveTxOrNull: TransactionLike | string | null,
  transactionOrRLP: TransactionLike | string,
): Promise<{ ok: boolean, error?: string }> {
  const routerAddress = await router.getAddress();
  const swapTx = await getTransactionRequest(transactionOrRLP);
  if (!swapTx.from || !swapTx.to || !swapTx.nonce || !swapTx.data) {
    return { ok: false, error: "Invalid transaction" };
  }

  // S1: GaslessSwapTx.to is a whitelisted GaslessSwapRouter.
  if (swapTx.to.toLowerCase() !== routerAddress.toLowerCase()) {
    return { ok: false, error: "S1: Invalid router address" };
  }

  // S2. GaslessSwapTx.data is swapForGas(token, amountIn, minAmountOut, amountRepay, deadline).
  let token: string;
  let amountIn: bigint;
  let minAmountOut: bigint;
  let amountRepay: bigint;
  let deadline: bigint;
  try {
    const routerInterface = new ethers.Interface(GaslessSwapRouterAbi.abi);
    [token, amountIn, minAmountOut, amountRepay, deadline] = routerInterface.decodeFunctionData("swapForGas", swapTx.data);
  } catch (error) {
    return { ok: false, error: "S2: Invalid data" };
  }

  // S3. token is a whitelisted ERC20 token.
  const isTokenSupported = await router.isTokenSupported(token);
  if (!isTokenSupported) {
    return { ok: false, error: "S3: Token not supported" };
  }

  const senderNonce = await provider.getTransactionCount(swapTx.from);

  if (approveTxOrNull) {
    const isApprove = await isGaslessApprove(provider, router, approveTxOrNull);
    if (!isApprove.ok) {
      return isApprove;
    }
    const approveTx = await getTransactionRequest(approveTxOrNull);
    if (!approveTx.from || !approveTx.to || !approveTx.nonce || !approveTx.data) {
      return { ok: false, error: "Invalid transaction" };
    }

    // SP1: GaslessApproveTx.to=token.
    if (!approveTx.to || approveTx.to.toLowerCase() !== token.toLowerCase()) {
      return { ok: false, error: "SP1: Invalid token" };
    }

    // SP2: GaslessApproveTx.data.amount>=amountIn.
    let approveSpender: string;
    let approveAmount: bigint;
    try {
      const tokenInterface = new ethers.Interface([
        "function approve(address spender, uint256 amount) external returns (bool)"
      ]);
      [approveSpender, approveAmount] = tokenInterface.decodeFunctionData("approve", approveTx.data);
    } catch (error) {
      return { ok: false, error: "A2: Invalid data" };
    }
    if (approveAmount < amountIn) {
      return { ok: false, error: "SP2: Invalid amount" };
    }

    // SP3: GaslessApproveTx.nonce+1 = tx.nonce = getNonce(tx.from)+1.
    if (approveTx.nonce !== senderNonce) {
      return { ok: false, error: "SP3: Invalid nonce" };
    }
    if (swapTx.nonce !== senderNonce + 1) {
      return { ok: false, error: "SP3: Invalid nonce" };
    }

    // SP4: amountRepay = CalcRepayAmount(GaslessApproveTx, GaslessSwapTx).
    const expectedAmountRepay = getAmountRepay(true, Number(swapTx.gasPrice));
    if (BigInt(amountRepay) !== BigInt(expectedAmountRepay)) {
      console.log("amountRepay", amountRepay, expectedAmountRepay);
      return { ok: false, error: "SP4: Invalid amount repay" };
    }
    return { ok: true };
  } else {
    // SP3: tx.nonce = getNonce(tx.from).
    if (swapTx.nonce !== senderNonce) {
      return { ok: false, error: "SP3: Invalid nonce" };
    }

    // SP4: amountRepay = CalcRepayAmount(GaslessSwapTx).
    const expectedAmountRepay = getAmountRepay(false, Number(swapTx.gasPrice));
    if (BigInt(amountRepay) !== BigInt(expectedAmountRepay)) {
      console.log("amountRepay", amountRepay, expectedAmountRepay);
      return { ok: false, error: "SP4: Invalid amount repay" };
    }
    return { ok: true };
  }
}
