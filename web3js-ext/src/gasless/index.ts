import { Web3Context } from "web3-core";
import { EthExecutionAPI, Numbers, Transaction, Web3Eth } from "web3";
import {
  GaslessSwapRouter,
  getGaslessSwapRouter,
  getApproveTx,
  getAmountRepay,
  getMinAmountOut,
  getAmountIn,
  getSwapTx,
} from "./gasless.js";

export function context_gasless(context: Web3Context<EthExecutionAPI>, eth: Web3Eth) {
  return {
    getGaslessSwapRouter: async function(address?: string): Promise<GaslessSwapRouter> {
      return await getGaslessSwapRouter(context, address);
    },
    getApproveTx: async function(
      fromAddress: string,
      tokenAddr: string,
      routerAddress: string,
      gasPrice: Numbers,
    ): Promise<Transaction> {
      return await getApproveTx(context, eth, fromAddress, tokenAddr, routerAddress, gasPrice);
    },
    getSwapTx: async function(
      fromAddress: string,
      tokenAddr: string,
      routerAddress: string,
      amountIn: Numbers,
      minAmountOut: Numbers,
      amountRepay: Numbers,
      gasPrice: Numbers,
      approveRequired: boolean = false,
      deadlineBuffer: Numbers = 1800,
    ): Promise<Transaction> {
      return await getSwapTx(eth, fromAddress, tokenAddr, routerAddress, amountIn, minAmountOut, amountRepay, gasPrice, approveRequired, deadlineBuffer);
    },
    getAmountRepay: getAmountRepay,
    getMinAmountOut: getMinAmountOut,
    getAmountIn: getAmountIn,
  };
}