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
// Taken from https://github.com/web3/web3.js/blob/v4.3.0/packages/web3-eth/src/utils/watch_transaction_for_confirmations.ts

import { Web3Context, Web3PromiEvent } from "web3-core";
import {
  TransactionMissingReceiptOrBlockHashError,
  TransactionReceiptMissingBlockNumberError,
} from "web3-errors";
import { transactionReceiptSchema } from "web3-eth";
import { Bytes, EthExecutionAPI, Web3BaseProvider, TransactionReceipt, DataFormat } from "web3-types";
import { format } from "web3-utils";
import { isNullish } from "web3-validator";


import {
  watchTransactionByPolling,
  Web3PromiEventEventTypeBase,
} from "./watch_transaction_by_pooling.js";
import { watchTransactionBySubscription } from "./watch_transaction_by_subscription.js";

export function watchTransactionForConfirmations<
  ReturnFormat extends DataFormat,
  Web3PromiEventEventType extends Web3PromiEventEventTypeBase<ReturnFormat>,
  ResolveType = TransactionReceipt,
>(
  web3Context: Web3Context<EthExecutionAPI>,
  transactionPromiEvent: Web3PromiEvent<ResolveType, Web3PromiEventEventType>,
  transactionReceipt: TransactionReceipt,
  transactionHash: Bytes,
  returnFormat: ReturnFormat,
) {
  if (isNullish(transactionReceipt) || isNullish(transactionReceipt.blockHash)) {
    throw new TransactionMissingReceiptOrBlockHashError({
      receipt: transactionReceipt,
      blockHash: format({ format: "bytes32" }, transactionReceipt?.blockHash, returnFormat),
      transactionHash: format({ format: "bytes32" }, transactionHash, returnFormat),
    });
  }

  if (!transactionReceipt.blockNumber) { throw new TransactionReceiptMissingBlockNumberError({ receipt: transactionReceipt }); }

  // As we have the receipt, it's the first confirmation that tx is accepted.
  // @ts-ignore: web3.js has the same error
  transactionPromiEvent.emit("confirmation", {
    confirmations: format({ format: "uint" }, 1, returnFormat),
    receipt: format(transactionReceiptSchema, transactionReceipt, returnFormat),
    latestBlockHash: format({ format: "bytes32" }, transactionReceipt.blockHash, returnFormat),
  });

  // so a subscription for newBlockHeaders can be made instead of polling
  const provider: Web3BaseProvider = web3Context.requestManager.provider as Web3BaseProvider;
  if (provider && "supportsSubscriptions" in provider && provider.supportsSubscriptions()) {
    watchTransactionBySubscription({
      web3Context,
      transactionReceipt,
      transactionPromiEvent,
      returnFormat,
    });
  } else {
    watchTransactionByPolling({
      web3Context,
      transactionReceipt,
      transactionPromiEvent,
      returnFormat,
    });
  }
}
