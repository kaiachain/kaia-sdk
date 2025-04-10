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
// Taken from https://github.com/web3/web3.js/blob/v4.3.0/packages/web3-eth/src/utils/watch_transaction_by_subscription.ts

import { transactionReceiptSchema, NewHeadsSubscription } from "web3-eth";
import { Bytes, Numbers, BlockHeaderOutput, TransactionReceipt, DataFormat } from "web3-types";
import { format } from "web3-utils";

import { WaitProps, watchTransactionByPolling } from "./watch_transaction_by_pooling.js";

/**
 * This function watches a Transaction by subscribing to new heads.
 * It is used by `watchTransactionForConfirmations`, in case the provider supports subscription.
 */
export const watchTransactionBySubscription = <
  ReturnFormat extends DataFormat,
  ResolveType = TransactionReceipt,
>({
  web3Context,
  transactionReceipt,
  transactionPromiEvent,
  returnFormat,
}: WaitProps<ReturnFormat, ResolveType>) => {
  // The following variable will stay true except if the data arrived,
  //	or if watching started after an error had occurred.
  let needToWatchLater = true;
  let lastCaughtBlockHash: string;
  setImmediate(() => {
    web3Context.subscriptionManager
      ?.subscribe("newHeads")
      .then((subscription: NewHeadsSubscription) => {
        subscription.on("data", async (newBlockHeader: BlockHeaderOutput) => {
          needToWatchLater = false;
          if (
            !newBlockHeader?.number ||
            // For some cases, the on-data event is fired couple times for the same block!
            // This needs investigation but seems to be because of multiple `subscription.on('data'...)` even this should not cause that.
            lastCaughtBlockHash === newBlockHeader?.parentHash
          ) {
            return;
          }
          lastCaughtBlockHash = newBlockHeader?.parentHash as string;

          const confirmations =
            BigInt(newBlockHeader.number) -
            BigInt(transactionReceipt.blockNumber) +
            BigInt(1);

          transactionPromiEvent.emit("confirmation", {
            confirmations: format(
              { format: "uint" },
              confirmations as Numbers,
              returnFormat,
            ),
            receipt: format(transactionReceiptSchema, transactionReceipt, returnFormat),
            latestBlockHash: format(
              { format: "bytes32" },
              newBlockHeader.parentHash as Bytes,
              returnFormat,
            ),
          });
          if (confirmations >= web3Context.transactionConfirmationBlocks) {
            await web3Context.subscriptionManager?.removeSubscription(subscription);
          }
        });
        subscription.on("error", async () => {
          await web3Context.subscriptionManager?.removeSubscription(subscription);

          needToWatchLater = false;
          watchTransactionByPolling({
            web3Context,
            transactionReceipt,
            transactionPromiEvent,
            returnFormat,
          });
        });
      })
      .catch(() => {
        needToWatchLater = false;
        watchTransactionByPolling({
          web3Context,
          transactionReceipt,
          transactionPromiEvent,
          returnFormat,
        });
      });
  });

  // Fallback to polling if tx receipt didn't arrived in "blockHeaderTimeout" [10 seconds]
  setTimeout(() => {
    if (needToWatchLater) {
      watchTransactionByPolling({
        web3Context,
        transactionReceipt,
        transactionPromiEvent,
        returnFormat,
      });
    }
  }, web3Context.blockHeaderTimeout * 1000);
};