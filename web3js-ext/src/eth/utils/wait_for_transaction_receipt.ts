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
// Taken from https://github.com/web3/web3.js/blob/v4.3.0/packages/web3-eth/src/utils/wait_for_transaction_receipt.ts

import { Web3Context } from "web3-core";
import { TransactionPollingTimeoutError } from "web3-errors";
import { getTransactionReceipt } from "web3-eth";
import { EthExecutionAPI, Bytes, TransactionReceipt, DataFormat } from "web3-types";
import { pollTillDefinedAndReturnIntervalId, rejectIfTimeout } from "web3-utils";

import { rejectIfBlockTimeout } from "./reject_if_block_timeout.js";

export async function waitForTransactionReceipt<ReturnFormat extends DataFormat>(
  web3Context: Web3Context<EthExecutionAPI>,
  transactionHash: Bytes,
  returnFormat: ReturnFormat,
): Promise<TransactionReceipt> {
  const pollingInterval =
    web3Context.transactionReceiptPollingInterval ?? web3Context.transactionPollingInterval;

  const [awaitableTransactionReceipt, IntervalId] = pollTillDefinedAndReturnIntervalId(async () => {
    try {
      return getTransactionReceipt(web3Context, transactionHash, returnFormat);
    } catch (error) {
      console.warn("An error happen while trying to get the transaction receipt", error);
      return undefined;
    }
  }, pollingInterval);

  const [timeoutId, rejectOnTimeout] = rejectIfTimeout(
    web3Context.transactionPollingTimeout,
    new TransactionPollingTimeoutError({
      numberOfSeconds: web3Context.transactionPollingTimeout / 1000,
      transactionHash,
    }),
  );

  const [rejectOnBlockTimeout, blockTimeoutResourceCleaner] = await rejectIfBlockTimeout(
    web3Context,
    transactionHash,
  );

  try {
    // If an error happened here, do not catch it, just clear the resources before raising it to the caller function.
    return await Promise.race([
      awaitableTransactionReceipt,
      rejectOnTimeout, // this will throw an error on Transaction Polling Timeout
      rejectOnBlockTimeout, // this will throw an error on Transaction Block Timeout
    ]);
  } finally {
    if (timeoutId) { clearTimeout(timeoutId); }
    if (IntervalId) { clearInterval(IntervalId); }
    blockTimeoutResourceCleaner.clean();
  }
}