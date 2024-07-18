/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
// Taken from https://github.com/web3/web3.js/blob/v4.3.0/packages/web3-eth/src/rpc_method_wrappers.ts
// Modified to support Klaytn TxTypes

import { HexStr, getKaikasTxType, getRpcTxObject, isKlaytnTxType, parseTransaction } from "@kaiachain/js-ext-core";
import { Web3Context } from "web3-core";
import {
  estimateGas,
  signTransaction as ethSignTransaction,
} from "web3-eth";
import {
  ETH_DATA_FORMAT,
  DataFormat,
  EthExecutionAPI,
  SignedTransactionInfoAPI,
  TransactionSignedAPI,
  Transaction,
  Web3BaseProvider,
} from "web3-types";
import { format } from "web3-utils";
import { isNullish } from "web3-validator";

import { _parseTxType, bufferedGasLimit } from "../accounts/sign";
import { KlaytnTransaction } from "../types";

import { getTransactionFromOrToAttr } from "./utils/transaction_builder";

export async function signTransaction<ReturnFormat extends DataFormat>(
  web3Context: Web3Context<EthExecutionAPI>,
  transaction: Transaction,
  returnFormat: ReturnFormat,
): Promise<SignedTransactionInfoAPI> {
  // If not Klaytn TxType, fall back to web3-eth's original implementation
  if (!isKlaytnTxType(_parseTxType(transaction.type))) {
    return ethSignTransaction(web3Context, transaction, returnFormat);
  }

  // Resolve 'from' and 'to' field, like in the original web3-eth source
  const tx: KlaytnTransaction = {
    ...transaction,
    from: getTransactionFromOrToAttr("from", web3Context, transaction),
    to: getTransactionFromOrToAttr("to", web3Context, transaction),
  };

  // Fill 'gasLimit' field. Kaikas (window.klaytn) requires 'gas' field nonempty.
  // Fill 'tx.gasLimit' here, then rename to 'gas' in getRpcTxObject() below.
  if (isNullish(tx.gasLimit)) {
    if (!isNullish(tx.gas)) {
      tx.gasLimit = tx.gas;
    } else {
      const gasLimitHex = await estimateGas(web3Context, tx, "latest", ETH_DATA_FORMAT);
      const gasLimitNum = Number(gasLimitHex);
      const bufferedNum = bufferedGasLimit(gasLimitNum);
      tx.gasLimit = format({ format: "uint" }, bufferedNum, ETH_DATA_FORMAT);
    }
  }

  // transactionFormatted contains all fields including Klaytn-specific fields. This is the transaction to be signed.
  const transactionFormatted = {
    ...tx, // first copy all fields from tx (including Klaytn-specific fields)
    ...getRpcTxObject(tx), // then overwrite with formatted fields (only Ethereum fields)
  };

  // Translate to string 'type' field that Kaikas understands.
  if (isKaikas(web3Context.provider)) {
    transactionFormatted.type = getKaikasTxType(transactionFormatted.type);
  }

  // The result may be:
  // - a string
  // - an object { raw: string, tx: Transaction } (e.g. Klaytn node)
  // - an object { rawTranasction: string, ... }  (e.g. Kaikas)
  const response = await web3Context.requestManager.send({
    method: "klay_signTransaction",
    params: [transactionFormatted],
  });

  let rawTransaction: string;
  if (typeof response === "string") {
    rawTransaction = response;
  } else if (typeof response.rawTransaction === "string") {
    rawTransaction = response.rawTransaction;
  } else if (typeof response.raw === "string") {
    rawTransaction = response.raw;
  } else {
    throw new Error(`Unabled to parse signTransaction response: ${JSON.stringify(response)}`);
  }

  try {
    return {
      raw: rawTransaction,
      tx: getTransactionSignedAPI(rawTransaction),
    };
  } catch (e) {
    return {
      raw: rawTransaction,
      tx: {} as TransactionSignedAPI,
    };
  }
}

function getTransactionSignedAPI(rawTransaction: string): TransactionSignedAPI {
  const tx = parseTransaction(rawTransaction);

  return {
    type: HexStr.fromNumber(tx.type || 0),
    to: tx.to || "0x",
    gasPrice: HexStr.fromNumber(tx.gasPrice || 0),
    gas: HexStr.fromNumber(tx.gasLimit),
    nonce: HexStr.fromNumber(tx.nonce),
    value: HexStr.fromNumber(tx.value),
    input: tx.data || "0x",
    data: tx.data || "0x",
    chainId: HexStr.fromNumber(tx.chainId || 0),
    // Becuase Klaytn Tx may contain multiple signatures,
    // we do not return v,r,s to avoid confusion.
    v: "",
    r: "",
    s: "",
  };
}

function isKaikas(provider?: Web3BaseProvider<unknown>): boolean {
  return !isNullish(provider) && ((provider as any).isKaikas == true);
}