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

import { getKaikasTxType, getRpcTxObject, isKlaytnTxType, parseTransaction } from "@kaiachain/js-ext-core";
import { Web3Context, Web3PromiEvent } from "web3-core";
import {
  estimateGas,
  SendTransactionEvents,
  SendTransactionOptions,
  SendSignedTransactionEvents,
  SendSignedTransactionOptions,
  sendSignedTransaction as ethSendSignedTransaction,
  transactionReceiptSchema,
} from "web3-eth";
import {
  ETH_DATA_FORMAT,
  FormatType,
  DataFormat,
  EthExecutionAPI,
  Bytes,
  HexString,
  TransactionReceipt,
  Transaction,
  TransactionWithFromLocalWalletIndex,
  TransactionWithToLocalWalletIndex,
  TransactionWithFromAndToLocalWalletIndex,
  Web3BaseWalletAccount,
  Web3BaseProvider,
} from "web3-types";
import { format, bytesToHex, hexToNumber } from "web3-utils";
import { isNullish } from "web3-validator";

import { _parseTxType, bufferedGasLimit } from "../accounts/sign.js";
import { KlaytnTransaction } from "../types.js";

import { SendTxHelper } from "./utils/send_tx_helper.js";
import { getTransactionFromOrToAttr } from "./utils/transaction_builder.js";
import { trySendTransaction } from "./utils/try_send_transaction.js";
import { waitForTransactionReceipt } from "./utils/wait_for_transaction_receipt.js";

// sendTransaction sends a transaction object.
//
// It eventually calls one of the following RPC methods:
// - eth_sendTransaction
// - eth_sendRawTransaction
// - klay_sendTransaction
// - klay_sendRawTransaction
//
// High-level logic is as follows:
// - Populate some fields
//   - from, to: resolve wallet index to address
//   - gasPrice, maxFeePerGas, maxPriorityFeePerGas: do not fill them
//   - gasLimit:
//     - Copy tx.gas -> tx.gasLimit.
//     - Call estimateGas
//     - If Klaytn TxType, add some buffer
// - Convert transaction to be suitable for eth_call RPC
//   - Use getRpcTxObject()
// - Try to find the wallet for the 'from' address.
// - Call signAndSend()
//   - If the wallet is found, sign the transaction to get rawTransaction RLP.
//     - If Ethereum TxType, call eth_sendRawTransaction
//     - If Klaytn TxType, call klay_sendRawTransaction
//   - If the wallet is not found
//     - If Ethereum TxType, call eth_sendTransaction
//     - If Klaytn TxType
//       - If provider is Kaikas, translate the 'type' field to upper snake case string.
//       - Then call klay_sendTransaction
//
export function sendTransaction<
  ReturnFormat extends DataFormat,
  ResolveType = FormatType<TransactionReceipt, ReturnFormat>,
>(
  web3Context: Web3Context<EthExecutionAPI>,
  transaction:
    | Transaction
    | TransactionWithFromLocalWalletIndex
    | TransactionWithToLocalWalletIndex
    | TransactionWithFromAndToLocalWalletIndex,
  returnFormat: ReturnFormat,
  options: SendTransactionOptions<ResolveType> = { checkRevertBeforeSending: true },
): Web3PromiEvent<ResolveType, SendTransactionEvents<ReturnFormat>> {
  // Below PromiEvent is a modified version of web3-eth sendTransaction
  const promiEvent = new Web3PromiEvent<ResolveType, SendTransactionEvents<ReturnFormat>>(
    (resolve, reject) => {
      setImmediate(() => {
        (async () => {
          const sendTxHelper = new SendTxHelper<ReturnFormat, ResolveType>({
            web3Context,
            promiEvent,
            options,
            returnFormat,
          });

          // Klaytn: replaced formatTransaction() call with getRpcTxObject() to allow Klaytn TxTypes
          // Resolve 'from' and 'to' field, like in the original web3-eth source
          const tx: KlaytnTransaction = {
            ...transaction,
            from: getTransactionFromOrToAttr("from", web3Context, transaction),
            to: getTransactionFromOrToAttr("to", web3Context, transaction),
          };

          // Klaytn: fill 'gasLimit' field. The Original web3-eth did not fill 'gasLimit',
          // but Kaikas (window.klaytn) requires 'gas' field nonempty.
          // Fill 'tx.gasLimit' here, then rename to 'gas' in getRpcTxObject() below.
          if (isNullish(tx.gasLimit) && !options.ignoreFillingGasLimit) {
            if (!isNullish(tx.gas)) {
              tx.gasLimit = tx.gas;
            } else {
              const gasLimitHex = await estimateGas(web3Context, tx, "latest", ETH_DATA_FORMAT);
              const gasLimitNum = Number(gasLimitHex);
              const bufferedNum = bufferedGasLimit(gasLimitNum);
              tx.gasLimit = format({ format: "uint" }, bufferedNum, ETH_DATA_FORMAT);
            }
          }

          // Note: getRpcTxObject() renames 'gasLimit' to 'gas'
          // transactionFormattedForCall: contains only Ethereum fields. Used to find revert reasons using eth_call.
          // transactionFormattedForSend: contains all fields including Klaytn-specific fields. This is the transaction to be sent.
          const transactionFormattedForCall = {
            ...getRpcTxObject(tx), // first get formatted fields (only Ethereum fields)
            type: undefined, // then delete the 'type' field, so that it's interpreted as an Ethereum Tx.
          };
          const transactionFormattedForSend = {
            ...tx, // first copy all fields from tx (including Klaytn-specific fields)
            ...getRpcTxObject(tx), // then overwrite with formatted fields (only Ethereum fields)
          };

          try {
            // Klaytn: removed sendTxHelper.populateGasPrice() call at here.
            // - Removed for simplicity, because it's not necessary.
            // - If wallet is found, then tx is signed locally and be sent via sendRawTransaction.
            //   In this case gas price will be filled by prepareTransaction()
            // - If wallet isn't found, then tx is sent via sendTransaction,
            //   where gas price will be determined by the RPC endpoint or Browser wallet.

            await sendTxHelper.checkRevertBeforeSending(
              transactionFormattedForCall,
            );

            sendTxHelper.emitSending(transactionFormattedForSend);

            let wallet: Web3BaseWalletAccount | undefined;

            if (web3Context.wallet && !isNullish(tx.from)) {
              wallet = web3Context.wallet.get(tx.from);
            }

            // Klaytn: replaced sendTxHelper.signAndSend() call with signOrSend() to handle Klaytn TxTypes
            const transactionHash: HexString = await signAndSend(
              web3Context,
              transactionFormattedForSend,
              wallet,
            );

            const transactionHashFormatted = format(
              { format: "bytes32" },
              transactionHash,
              returnFormat,
            );
            sendTxHelper.emitSent(transactionFormattedForSend);
            sendTxHelper.emitTransactionHash(
              transactionHashFormatted as string & Uint8Array,
            );

            const transactionReceipt = await waitForTransactionReceipt(
              web3Context,
              transactionHash,
              returnFormat,
            );

            const transactionReceiptFormatted = sendTxHelper.getReceiptWithEvents(
              format(transactionReceiptSchema, transactionReceipt, returnFormat),
            );

            sendTxHelper.emitReceipt(transactionReceiptFormatted);

            resolve(
              await sendTxHelper.handleResolve({
                receipt: transactionReceiptFormatted,
                tx: transactionFormattedForCall,
              }),
            );

            sendTxHelper.emitConfirmation({
              receipt: transactionReceiptFormatted,
              transactionHash,
            });
          } catch (error) {
            reject(
              await sendTxHelper.handleError({
                error,
                tx: transactionFormattedForCall,
              }),
            );
          }
        })() as unknown;
      });
    },
  );

  return promiEvent;
}

// sendSignedTransaction sends a signed raw transaction.
//
// It eventually calls one of the following RPC methods:
// - eth_sendRawTransaction
// - klay_sendRawTransaction
export function sendSignedTransaction<
  ReturnFormat extends DataFormat,
  ResolveType = FormatType<TransactionReceipt, ReturnFormat>,
>(
  web3Context: Web3Context<EthExecutionAPI>,
  signedTransaction: Bytes,
  returnFormat: ReturnFormat,
  options: SendSignedTransactionOptions<ResolveType> = { checkRevertBeforeSending: true },
): Web3PromiEvent<ResolveType, SendSignedTransactionEvents<ReturnFormat>> {
  // If not Klaytn TxType, fall back to web3-eth's original implementation
  const txRLP = normalizeSignedTransaction(signedTransaction);
  const txType = hexToNumber(txRLP.substring(0, 4)) as number;
  if (!isKlaytnTxType(txType)) {
    return ethSendSignedTransaction(web3Context, signedTransaction, returnFormat, options);
  }

  // Below PromiEvent is a modified version of web3-eth sendSignedTransaction
  const promiEvent = new Web3PromiEvent<ResolveType, SendSignedTransactionEvents<ReturnFormat>>(
    (resolve, reject) => {
      setImmediate(() => {
        (async () => {
          const sendTxHelper = new SendTxHelper<ReturnFormat, ResolveType>({
            web3Context,
            promiEvent,
            options,
            returnFormat,
          });

          // Klaytn: using js-ext-core:KlaytnTxFactory (inside parseTransaction) instead of
          // web3-eth-accounts:TransactionFactory
          const signedTransactionFormattedHex = normalizeSignedTransaction(signedTransaction);
          const txCallObject = getRpcTxObject(parseTransaction(signedTransactionFormattedHex)); // argument for eth_call

          try {
            // Klaytn: removed v,r,s field removal
            await sendTxHelper.checkRevertBeforeSending(
              txCallObject,
            );

            sendTxHelper.emitSending(signedTransactionFormattedHex);

            const transactionHash = await trySendTransaction(
              web3Context,
              // Klaytn: Using klay_sendRawTransaction instead of eth_sendRawTransaction
              async (): Promise<string> =>
                web3Context.requestManager.send({
                  method: "klay_sendRawTransaction",
                  params: [signedTransactionFormattedHex],
                }),
            );

            sendTxHelper.emitSent(signedTransactionFormattedHex);

            const transactionHashFormatted = format(
              { format: "bytes32" },
              transactionHash as Bytes,
              returnFormat,
            );

            sendTxHelper.emitTransactionHash(
              transactionHashFormatted as string & Uint8Array,
            );

            const transactionReceipt = await waitForTransactionReceipt(
              web3Context,
              transactionHash,
              returnFormat,
            );

            const transactionReceiptFormatted = sendTxHelper.getReceiptWithEvents(
              format(transactionReceiptSchema, transactionReceipt, returnFormat),
            );

            sendTxHelper.emitReceipt(transactionReceiptFormatted);

            resolve(
              await sendTxHelper.handleResolve({
                receipt: transactionReceiptFormatted,
                tx: txCallObject,
              }),
            );

            sendTxHelper.emitConfirmation({
              receipt: transactionReceiptFormatted,
              transactionHash,
            });
          } catch (error) {
            reject(
              await sendTxHelper.handleError({
                error,
                tx: txCallObject,
              }),
            );
          }
        })() as unknown;
      });
    },
  );

  return promiEvent;
}

// Convert Bytes(string | Uint8Array) to hex string
function normalizeSignedTransaction(signedTransaction: Bytes): string {
  if (signedTransaction instanceof Uint8Array) {
    signedTransaction = bytesToHex(signedTransaction);
  }
  if (signedTransaction.length < 4 || !signedTransaction.startsWith("0x")) {
    throw new Error(`Invalid signed transaction '${signedTransaction}'`);
  }
  return signedTransaction;
}

// Call one of the following RPC methods:
// - eth_sendTransaction
// - eth_sendRawTransaction
// - klay_sendTransaction
// - klay_sendRawTransaction
//
// Modified from web3-eth/src/send_tx/send_tx_helper.ts:signAndSend()
async function signAndSend(
  web3Context: Web3Context,
  tx: KlaytnTransaction,
  senderAccount?: Web3BaseWalletAccount): Promise<string> {
  if (senderAccount) {
    // senderAccount (i.e. private key) is given. Sign and sendRawTransaction.
    const signResult = await senderAccount.signTransaction(tx);

    let method: string;
    if (isKlaytnTxType(_parseTxType(tx.type))) {
      method = "klay_sendRawTransaction";
    } else {
      method = "eth_sendRawTransaction";
    }

    return await trySendTransaction(
      web3Context,
      async (): Promise<string> =>
        web3Context.requestManager.send({
          method: method,
          params: [signResult.rawTransaction],
        }),
      signResult.transactionHash,
    );
  } else {
    // senderAccount (i.e. private key) is not given. Call sendTransaction
    // and let provider (remote RPC endpoint or Browser wallet) do the rest.

    // Translate to string 'type' field that Kaikas understands.
    if (isKlaytnTxType(_parseTxType(tx.type)) && isKaikas(web3Context.provider)) {
      tx.type = getKaikasTxType(_parseTxType(tx.type));
    }

    let method: string;
    if (isKlaytnTxType(_parseTxType(tx.type))) {
      method = "klay_sendTransaction";
    } else {
      method = "eth_sendTransaction";
    }

    return await trySendTransaction(
      web3Context,
      async (): Promise<string> =>
        web3Context.requestManager.send({
          method: method,
          params: [tx],
        }),
    );
  }
}

function isKaikas(provider?: Web3BaseProvider<unknown>): boolean {
  return !isNullish(provider) && ((provider as any).isKaikas == true);
}