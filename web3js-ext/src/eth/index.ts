// Analogous to https://github.com/web3/web3.js/blob/v4.3.0/packages/web3-eth/src/web3_eth.ts
// Create web3.eth.* functions bound to the given Web3Context.

import { Web3Context } from "web3-core";
import {
  SendTransactionOptions,
} from "web3-eth";
import {
  Bytes,
  DEFAULT_RETURN_FORMAT,
  DataFormat,
  Transaction,
  TransactionWithFromLocalWalletIndex,
  TransactionWithToLocalWalletIndex,
  TransactionWithFromAndToLocalWalletIndex,
} from "web3-types";

import { getProtocolVersion } from "./rpc.js";
import { sendTransaction, sendSignedTransaction } from "./send.js";
import { signTransaction } from "./sign.js";

// Analogous to: web3-eth/src/web3_eth.ts:Web3Eth.getProtocolVersion()
// Replaces: web3.eth.getProtocolVersion()
// Because: eth_getProtocolVersion is not supported in Klaytn node.
export function context_getProtocolVersion(context: Web3Context) {
  return async (): Promise<string> => {
    return getProtocolVersion(context.requestManager);
  };
}

// Analogous to: web3-eth/src/web3_eth.ts:Web3Eth.sendTransaction()
// Replaces: web3.eth.sendTransaction()
// Because: eth_sendTransaction cannot accept Klaytn TxTypes.
// For Klaytn TxTypes, call klay_sendTransaction instead.
// Optionally converts tx.type field to Kaikas-friendly.
export function context_sendTransaction(context: Web3Context) {
  return function <ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
    transaction:
      | Transaction
      | TransactionWithFromLocalWalletIndex
      | TransactionWithToLocalWalletIndex
      | TransactionWithFromAndToLocalWalletIndex,
    returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
    options?: SendTransactionOptions,
  ) {
    return sendTransaction(context, transaction, returnFormat, options);
  };
}

// Analogous to: web3-eth/src/web3_eth.ts:Web3Eth.sendSignedTransaction()
// Replaces: web3.eth.sendSignedTransaction()
// Because: eth_sendRawTransaction cannot accept Klaytn TxTypes.
// For Klaytn TxTypes, call klay_sendRawTransaction instead.
export function context_sendSignedTransaction(context: Web3Context) {
  return function <ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
    transaction: Bytes,
    returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
    options?: SendTransactionOptions) {
    return sendSignedTransaction(context, transaction, returnFormat, options);
  };
}

// Analogous to: web3-eth/src/web3_eth.ts:Web3Eth.signTransaction()
// Replaces: web3.eth.signTransaction()
// Because: eth_signTransaction cannot accept Klaytn TxTypes.
// For Klaytn TxTypes, call klay_signTransaction instead.
// Optionally converts tx.type field to Kaikas-friendly.
export function context_signTransaction(context: Web3Context) {
  return function <ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
    transaction: Transaction,
    returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
  ) {
    return signTransaction(context, transaction, returnFormat);
  };
}