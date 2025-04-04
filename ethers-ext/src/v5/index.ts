// Pass-through js-ext-core exports
export * from "@kaiachain/js-ext-core";
export {
  AccountKey,
  AccountKeyFactory,
  KlaytnTx,
  KlaytnTxFactory,
  parseTransaction,
} from "@kaiachain/js-ext-core";

// ethers-ext classes and functions
export * from "./accountStore.js";
export * from "./keystore.js";
export * from "./signer.js";

// Follow ethers v6 convention like `ethers.JsonRpcProvider`
export * from "./provider.js";
// Follow ethers v5 convention like `ethers.providers.JsonRpcProvider`
import { JsonRpcProvider, Web3Provider } from "./provider.js";
export const providers = {
  JsonRpcProvider,
  Web3Provider,
};