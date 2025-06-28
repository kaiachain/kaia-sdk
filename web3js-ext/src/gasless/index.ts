import { Web3Context } from "web3-core";
import { getGaslessSwapRouter, GaslessSwapRouter } from "./gasless.js";

export function context_gasless(context: Web3Context) {
  return {
    getGaslessSwapRouter: async function(address?: string): Promise<GaslessSwapRouter> {
      return await getGaslessSwapRouter(context, address);
    },
  };
}