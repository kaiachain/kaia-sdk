
/* eslint-disable import/export */
// Pass-through js-ext-core exports
export * from "@kaiachain/js-ext-core";
// ethers-ext classes and functions
export * from "./accountStore.js";
export * from "./keystore.js";
export * from "./signer.js";
export * as gasless from "./gasless.js";

// Follow ethers v6 convention like `ethers.JsonRpcProvider`
export * from "./provider.js";
// Follow ethers v5 convention like `ethers.providers.JsonRpcProvider`
import { JsonRpcProvider, Web3Provider } from "./provider.js";
export const providers = {
  JsonRpcProvider,
  Web3Provider,
};

// Import specific v6 versions of functions to override the previous exports
import { v6 } from '@kaiachain/js-ext-core';
// Explicitly re-export the overridden versions
export const parseKaia = v6.parseKaia;
export const parseKaiaUnits = v6.parseKaiaUnits;
export const parseUnits = v6.parseUnits;
