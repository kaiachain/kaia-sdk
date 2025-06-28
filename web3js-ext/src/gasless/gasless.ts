import { EthExecutionAPI, Numbers, Transaction, Web3Context, Web3Eth } from "web3";
import { Contract } from "web3-eth-contract";
import { GaslessSwapRouterAbi } from "../abi/GaslessSwapRouter.js";
import { RegistryAbi } from "../abi/Registry.js";
import { ERC20Abi } from "../abi/ERC20.js";

// GaslessSwapRouterAddress registry key
// https://github.com/kaiachain/kaia/blob/v2.0.0/contracts/contracts/system_contracts/multicall/MultiCallContract.sol#L140
const GASLESS_SWAP_ROUTER_NAME = "GaslessSwapRouter";
const REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000401";
const MAX_UINT256 = '0x' + 'f'.repeat(64);

// Using fixed constants to simplify amountRepay calculation.
const GAS_LIMIT_LEND = 21000;
const GAS_LIMIT_APPROVE = 100000;
const GAS_LIMIT_SWAP = 500000;

export type GaslessSwapRouter = Contract<typeof GaslessSwapRouterAbi>;

export async function getGaslessSwapRouter(
  context: Web3Context<EthExecutionAPI>,
  address?: string
): Promise<GaslessSwapRouter> {
  let contractAddress: string;
  if (!address) { // Read from the KIP-149 registry.
    const registry = new Contract(RegistryAbi, REGISTRY_ADDRESS, context);
    const address = await registry.methods.getActiveAddr(GASLESS_SWAP_ROUTER_NAME).call();
    if (!address) {
      throw new Error("GaslessSwapRouter not found in the registry");
    }
    contractAddress = address;
  } else { // Use the custom address.
    contractAddress = address;
  }
  return new Contract(GaslessSwapRouterAbi, contractAddress, context);
}

export async function getApproveTx(
  context: Web3Context<EthExecutionAPI>,
  eth: Web3Eth,
  fromAddress: string,
  tokenAddress: string,
  routerAddress: string,
  gasPrice: Numbers,
): Promise<Transaction> {
  const token = new Contract(ERC20Abi, tokenAddress, context);
  const data = token.methods.approve(routerAddress, MAX_UINT256).encodeABI();
  const nonce = await eth.getTransactionCount(fromAddress);

  const tx: Transaction = {
    type: 0,
    from: fromAddress,
    to: tokenAddress,
    nonce: nonce,
    gas: GAS_LIMIT_APPROVE,
    gasPrice: gasPrice,
    value: 0n,
    data: data,
  };
  return tx;
}

export async function getSwapTx(
  eth: Web3Eth,
  fromAddress: string,
  tokenAddress: string,
  routerAddress: string,
  amountIn: Numbers,
  minAmountOut: Numbers,
  amountRepay: Numbers,
  gasPrice: Numbers,
  approveRequired: boolean,
  deadlineBuffer: Numbers,
): Promise<Transaction> {
  const latestBlock = await eth.getBlock("latest");
  if (!latestBlock) {
    throw new Error("Failed to get latest block");
  }
  const deadlineTimestamp = latestBlock.timestamp + BigInt(deadlineBuffer);

  let nonce = await eth.getTransactionCount(fromAddress);
  if (approveRequired) {
    nonce += 1n;
  }

  const routerInterface = new Contract(GaslessSwapRouterAbi);
  const data = routerInterface.methods.swapForGas(
    tokenAddress,
    amountIn,
    minAmountOut,
    amountRepay,
    deadlineTimestamp,
  ).encodeABI();

  const tx: Transaction = {
    type: 0,
    from: fromAddress,
    to: routerAddress,
    nonce: nonce,
    gas: GAS_LIMIT_SWAP,
    gasPrice: gasPrice,
    value: 0n,
    data: data,
  };
  return tx;
}

export function getAmountRepay(
  approveRequired: boolean,
  gasPrice: Numbers,
): bigint {
  const gasPriceBN = BigInt(gasPrice);

  const lendTxGas = BigInt(GAS_LIMIT_LEND);
  const approveTxGas = approveRequired ? BigInt(GAS_LIMIT_APPROVE) : BigInt(0);
  const swapTxGas = BigInt(GAS_LIMIT_SWAP);

  const R1 = gasPriceBN * lendTxGas;
  const R2 = gasPriceBN * approveTxGas;
  const R3 = gasPriceBN * swapTxGas;

  return R1 + R2 + R3;
}

export function getMinAmountOut(
  amountRepay: Numbers,
  appTxFee: Numbers,
  commissionRateBps: Numbers,
): bigint {
  const amountRepayBN = BigInt(amountRepay);
  const appTxFeeBN = BigInt(appTxFee);
  const commissionRateBpsBN = BigInt(commissionRateBps);
  const denominator = BigInt(10000);

  // minAmountOut = appTxFee / (1 - commissionRate) + amountRepay
  // i.e. (amountOut - amountRepay) * (1 - commissionRate) >= appTxFee
  // because the swap output has to be enough to repay and pay the commission.
  const beforeCommission = appTxFeeBN * denominator / (denominator - commissionRateBpsBN);
  return beforeCommission + amountRepayBN;
}

export async function getAmountIn(
  router: GaslessSwapRouter,
  tokenAddress: string,
  minAmountOut: Numbers,
  slippageBps: Numbers,
): Promise<bigint> {
  const minAmountOutBN = BigInt(minAmountOut);
  const slippageBpsBN = BigInt(slippageBps);
  const denominator = BigInt(10000);

  // minAmountIn = DEX.getAmountIn(tokenAddress, minAmountOut * (1 + slippage))
  // Have DEX calculate the required input to produce minAmountOut plus slippage.
  const withSlippage = minAmountOutBN * (denominator + slippageBpsBN) / denominator;

  const amountIn = await router.methods.getAmountIn(tokenAddress, withSlippage).call();
  return BigInt(amountIn);
}