import { isKlaytnTxType, parseTransaction } from "@kaiachain/js-ext-core";
import { recoverTransaction as ethRecoverTransaction } from "web3-eth-accounts";
import { Address } from "web3-types";
import { toChecksumAddress } from "web3-utils";

import { _parseTxType } from "./sign.js";


// Analogous to: web3-eth-accounts/src/accounts.ts:recoverTransaction
// Replaces: web3.eth.accounts.recoverTransaction
// Because: Klaytn Tx sender can be decoupled from the signer address recovered from ecrecover.
// For Klaytn Tx, return the explicit "from" field from the Tx RLP.
export function recoverTransaction(rawTransaction: string): Address {
  const tx = parseTransaction(rawTransaction);
  if (!isKlaytnTxType(_parseTxType(tx.type))) {
    // fall back to original web3.eth.accounts.recoverTransaction
    return ethRecoverTransaction(rawTransaction);
  }

  if (!tx.from) {
    // this should never happen because Klaytn Tx RLP always contains `from`.
    throw new Error(`missing tx.from in tx type ${tx.type}`);
  }
  return toChecksumAddress(tx.from);
}