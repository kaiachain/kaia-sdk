import { EthExecutionAPI, Web3Context } from "web3";
import { Contract } from "web3-eth-contract";
import { GaslessSwapRouterAbi } from "../abi/GaslessSwapRouter.js";
import { RegistryAbi } from "../abi/Registry.js";

// GaslessSwapRouterAddress registry key
// https://github.com/kaiachain/kaia/blob/v2.0.0/contracts/contracts/system_contracts/multicall/MultiCallContract.sol#L140
const GASLESS_SWAP_ROUTER_NAME = "GaslessSwapRouter";
const REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000401";

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
  } else {
    contractAddress = address;
  }
  return new Contract(GaslessSwapRouterAbi, contractAddress, context);
}