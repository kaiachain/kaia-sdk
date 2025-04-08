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
// Taken from https://github.com/web3/web3.js/blob/v4.3.0/packages/web3-eth/src/utils/send_tx_helper.ts

import { Web3Context, Web3EventEmitter, Web3PromiEvent } from "web3-core";
import {
  ContractExecutionError,
  InvalidResponseError,
  TransactionRevertedWithoutReasonError,
  TransactionRevertInstructionError,
  TransactionRevertWithCustomError,
} from "web3-errors";
import {
  ALL_EVENTS_ABI,
  decodeEventABI,
  SendSignedTransactionEvents,
  SendTransactionEvents,
  SendTransactionOptions,
} from "web3-eth";
import { ethRpcMethods } from "web3-rpc-methods";
import {
  ETH_DATA_FORMAT,
  FormatType,
  DataFormat,
  EthExecutionAPI,
  TransactionWithSenderAPI,
  Web3BaseWalletAccount,
  HexString,
  TransactionReceipt,
  Transaction,
  TransactionCall,
  TransactionWithFromLocalWalletIndex,
  TransactionWithToLocalWalletIndex,
  TransactionWithFromAndToLocalWalletIndex,
  LogsInput,
  TransactionHash,
  ContractAbiWithSignature,
} from "web3-types";
import { isNullish } from "web3-validator";

import { getRevertReason } from "./get_revert_reason.js";
import { getTransactionError } from "./get_transaction_error.js";
import { getTransactionGasPricing } from "./get_transaction_gas_pricing.js";
import { trySendTransaction } from "./try_send_transaction.js";
import { watchTransactionForConfirmations } from "./watch_transaction_for_confirmations.js";

export class SendTxHelper<
  ReturnFormat extends DataFormat,
  ResolveType = FormatType<TransactionReceipt, ReturnFormat>,
  TxType =
  | Transaction
  | TransactionWithFromLocalWalletIndex
  | TransactionWithToLocalWalletIndex
  | TransactionWithFromAndToLocalWalletIndex,
> {
  private readonly web3Context: Web3Context<EthExecutionAPI>;
  private readonly promiEvent: Web3PromiEvent<
    ResolveType,
    SendSignedTransactionEvents<ReturnFormat> | SendTransactionEvents<ReturnFormat>
  >;

  private readonly options: SendTransactionOptions<ResolveType> = {
    checkRevertBeforeSending: true,
  };

  private readonly returnFormat: ReturnFormat;
  public constructor({
    options,
    web3Context,
    promiEvent,
    returnFormat,
  }: {
    web3Context: Web3Context<EthExecutionAPI>;
    options: SendTransactionOptions<ResolveType>;
    promiEvent: Web3PromiEvent<
      ResolveType,
      SendSignedTransactionEvents<ReturnFormat> | SendTransactionEvents<ReturnFormat>
    >;
    returnFormat: ReturnFormat;
  }) {
    this.options = options;
    this.web3Context = web3Context;
    this.promiEvent = promiEvent;
    this.returnFormat = returnFormat;
  }

  public getReceiptWithEvents(data: TransactionReceipt): ResolveType {
    const result = { ...(data ?? {}) };
    if (this.options?.contractAbi && result.logs && result.logs.length > 0) {
      result.events = {};
      for (const log of result.logs) {
        const event = decodeEventABI(
          ALL_EVENTS_ABI,
          log as LogsInput,
          this.options?.contractAbi as ContractAbiWithSignature,
          this.returnFormat,
        );
        if (event.event) {
          result.events[event.event] = event;
        }
      }
    }

    return result as unknown as ResolveType;
  }

  public async checkRevertBeforeSending(tx: TransactionCall) {
    if (this.options.checkRevertBeforeSending !== false) {
      const reason = await getRevertReason(this.web3Context, tx, this.options.contractAbi);
      if (reason !== undefined) {
        throw await getTransactionError<ReturnFormat>(
          this.web3Context,
          tx,
          undefined,
          undefined,
          this.options.contractAbi,
          reason,
        );
      }
    }
  }

  public emitSending(tx: TxType | HexString) {
    if (this.promiEvent.listenerCount("sending") > 0) {
      // @ts-ignore: web3.js has the same error
      this.promiEvent.emit("sending", tx);
    }
  }

  public async populateGasPrice({
    transactionFormatted,
    transaction,
  }: {
    transactionFormatted: TxType;
    transaction: TxType;
  }): Promise<TxType> {
    let result = transactionFormatted;
    if (
      !this.options?.ignoreGasPricing &&
      isNullish((transactionFormatted as Transaction).gasPrice) &&
      (isNullish((transaction as Transaction).maxPriorityFeePerGas) ||
        isNullish((transaction as Transaction).maxFeePerGas))
    ) {
      result = {
        ...transactionFormatted,
        // TODO gasPrice, maxPriorityFeePerGas, maxFeePerGas
        // should not be included if undefined, but currently are
        ...(await getTransactionGasPricing(
          // @ts-ignore: web3.js has the same error
          transactionFormatted,
          this.web3Context,
          ETH_DATA_FORMAT,
        )),
      };
    }

    return result;
  }

  public async signAndSend({
    wallet,
    tx,
  }: {
    wallet: Web3BaseWalletAccount | undefined;
    tx: TxType;
  }) {
    if (wallet) {
      // @ts-ignore: web3.js has the same error
      const signedTransaction = await wallet.signTransaction(tx);

      return trySendTransaction(
        this.web3Context,
        async (): Promise<string> =>
          ethRpcMethods.sendRawTransaction(
            this.web3Context.requestManager,
            signedTransaction.rawTransaction,
          ),
        signedTransaction.transactionHash,
      );
    }
    return trySendTransaction(
      this.web3Context,
      async (): Promise<string> =>
        ethRpcMethods.sendTransaction(
          this.web3Context.requestManager,
          tx as Partial<TransactionWithSenderAPI>,
        ),
    );
  }

  public emitSent(tx: TxType | HexString) {
    if (this.promiEvent.listenerCount("sent") > 0) {
      // @ts-ignore: web3.js has the same error
      this.promiEvent.emit("sent", tx);
    }
  }

  public emitTransactionHash(hash: string & Uint8Array) {
    if (this.promiEvent.listenerCount("transactionHash") > 0) {
      this.promiEvent.emit("transactionHash", hash);
    }
  }

  public emitReceipt(receipt: ResolveType) {
    if (this.promiEvent.listenerCount("receipt") > 0) {
      (
        this.promiEvent as Web3EventEmitter<
          SendTransactionEvents<ReturnFormat> | SendSignedTransactionEvents<ReturnFormat>
        >
      ).emit(
        "receipt",
        // @ts-expect-error unknown type fix
        receipt,
      );
    }
  }

  public async handleError({ error, tx }: { error: unknown; tx: TransactionCall }) {
    let _error = error;

    if (_error instanceof ContractExecutionError && this.web3Context.handleRevert) {
      _error = await getTransactionError(
        this.web3Context,
        tx,
        undefined,
        undefined,
        this.options?.contractAbi,
      );
    }

    if (
      (_error instanceof InvalidResponseError ||
        _error instanceof ContractExecutionError ||
        _error instanceof TransactionRevertWithCustomError ||
        _error instanceof TransactionRevertedWithoutReasonError ||
        _error instanceof TransactionRevertInstructionError) &&
      this.promiEvent.listenerCount("error") > 0
    ) {
      this.promiEvent.emit("error", _error);
    }

    return _error;
  }

  public emitConfirmation({
    receipt,
    transactionHash,
  }: {
    receipt: ResolveType;
    transactionHash: TransactionHash;
  }) {
    if (this.promiEvent.listenerCount("confirmation") > 0) {
      watchTransactionForConfirmations<
        ReturnFormat,
        SendSignedTransactionEvents<ReturnFormat> | SendTransactionEvents<ReturnFormat>,
        ResolveType
      >(
        this.web3Context,
        this.promiEvent,
        receipt as unknown as TransactionReceipt,
        transactionHash,
        this.returnFormat,
      );
    }
  }

  public async handleResolve({ receipt, tx }: { receipt: ResolveType; tx: TransactionCall }) {
    if (this.options?.transactionResolver) {
      return this.options?.transactionResolver(receipt as unknown as TransactionReceipt);
    }
    if ((receipt as unknown as TransactionReceipt).status === BigInt(0)) {
      const error = await getTransactionError<ReturnFormat>(
        this.web3Context,
        tx,
        // @ts-ignore: web3.js has the same error
        receipt,
        undefined,
        this.options?.contractAbi,
      );
      if (this.promiEvent.listenerCount("error") > 0) {
        this.promiEvent.emit("error", error);
      }

      throw error;
    } else {
      return receipt;
    }
  }
}
