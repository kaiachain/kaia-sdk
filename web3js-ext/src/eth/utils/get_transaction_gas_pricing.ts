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
// Taken from https://github.com/web3/web3.js/blob/v4.3.0/packages/web3-eth/src/utils/get_transaction_gas_pricing.ts

import { Web3Context } from "web3-core";
import { Eip1559NotSupportedError, UnsupportedTransactionTypeError } from "web3-errors";
import { getBlock, getGasPrice, InternalTransaction } from "web3-eth";
import {
  EthExecutionAPI,
  Numbers,
  Transaction,
  DataFormat,
  FormatType,
  ETH_DATA_FORMAT,
} from "web3-types";
import { format } from "web3-utils";
import { isNullish } from "web3-validator";

import { getTransactionType } from "./transaction_builder.js";

async function getEip1559GasPricing<ReturnFormat extends DataFormat>(
  transaction: FormatType<Transaction, typeof ETH_DATA_FORMAT>,
  web3Context: Web3Context<EthExecutionAPI>,
  returnFormat: ReturnFormat,
): Promise<FormatType<{ maxPriorityFeePerGas?: Numbers; maxFeePerGas?: Numbers }, ReturnFormat>> {
  const block = await getBlock(web3Context, web3Context.defaultBlock, false, returnFormat);

  if (isNullish(block.baseFeePerGas)) { throw new Eip1559NotSupportedError(); }

  if (!isNullish(transaction.gasPrice)) {
    const convertedTransactionGasPrice = format(
      { format: "uint" },
      transaction.gasPrice as Numbers,
      returnFormat,
    );

    return {
      maxPriorityFeePerGas: convertedTransactionGasPrice,
      maxFeePerGas: convertedTransactionGasPrice,
    };
  }
  return {
    maxPriorityFeePerGas: format(
      { format: "uint" },
      transaction.maxPriorityFeePerGas ?? web3Context.defaultMaxPriorityFeePerGas,
      returnFormat,
    ),
    maxFeePerGas: format(
      { format: "uint" },
      (transaction.maxFeePerGas ??
        BigInt(block.baseFeePerGas) * BigInt(2) +
        BigInt(
          transaction.maxPriorityFeePerGas ?? web3Context.defaultMaxPriorityFeePerGas,
        )) as Numbers,
      returnFormat,
    ),
  };
}

export async function getTransactionGasPricing<ReturnFormat extends DataFormat>(
  transaction: InternalTransaction,
  web3Context: Web3Context<EthExecutionAPI>,
  returnFormat: ReturnFormat,
): Promise<
  | FormatType<
    { gasPrice?: Numbers; maxPriorityFeePerGas?: Numbers; maxFeePerGas?: Numbers },
    ReturnFormat
  >
  | undefined
> {
  const transactionType = getTransactionType(transaction, web3Context);
  if (!isNullish(transactionType)) {
    if (transactionType.startsWith("-")) { throw new UnsupportedTransactionTypeError(transactionType); }

    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-2718.md#transactions
    if (Number(transactionType) < 0 || Number(transactionType) > 127) { throw new UnsupportedTransactionTypeError(transactionType); }

    if (
      isNullish(transaction.gasPrice) &&
      (transactionType === "0x0" || transactionType === "0x1")
    ) {
      return {
        gasPrice: await getGasPrice(web3Context, returnFormat),
        maxPriorityFeePerGas: undefined,
        maxFeePerGas: undefined,
      };
    }

    if (transactionType === "0x2") {
      return {
        gasPrice: undefined,
        ...(await getEip1559GasPricing(transaction, web3Context, returnFormat)),
      };
    }
  }

  return undefined;
}