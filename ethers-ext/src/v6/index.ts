// Pass-through js-ext-core exports
export * from "@kaiachain/js-ext-core/util";
export {
  AccountKey,
  AccountKeyFactory,
  KlaytnTx,
  KlaytnTxFactory,
  parseTransaction,
} from "@kaiachain/js-ext-core";

// ethers-ext classes and functions
export * from "./accountStore";
export * from "./keystore";
export * from "./signer";

// Follow ethers v6 convention like `ethers.JsonRpcProvider`
export * from "./provider";
// Follow ethers v5 convention like `ethers.providers.JsonRpcProvider`
import { JsonRpcProvider, Web3Provider } from "./provider";
export const providers = {
  JsonRpcProvider,
  Web3Provider,
};
// this will override parseKaia, parseKaiaUnits, parseUnits from line 2
export {
  parseKaia,
  parseKaiaUnits,
  parseUnits,
} from "@kaiachain/js-ext-core/ethers-v6";
