import {
  Provider,
  TransactionLike,
  TransactionResponse,
  resolveProperties,
  ZeroAddress,
  SigningKey,
  resolveAddress,
  Transaction,
} from "ethers6";
import _ from "lodash";

import {
  getChainIdFromSignatureTuples,
  parseTransaction,
  SignatureLike,
} from "@klaytn/js-ext-core";

import { EKlaytnErrorCode, TransactionRequest } from "./types";

// Normalize transaction request in Object or RLP format
export async function getTransactionRequest(
  transactionOrRLP: TransactionRequest | string | Transaction
): Promise<TransactionLike<string>> {
  if (_.isString(transactionOrRLP)) {
    return parseTransaction(transactionOrRLP);
  } else {
    if (transactionOrRLP instanceof Transaction) {
      return transactionOrRLP.toJSON();
    }
    return resolveProperties(transactionOrRLP) as TransactionLike<string>;
  }
}

export async function populateFrom(
  tx: TransactionRequest,
  expectedFrom: string
) {
  if (!tx.from || tx.from == "0x") {
    tx.from = expectedFrom;
  } else {
    if (tx.from?.toString().toLowerCase() != expectedFrom?.toLowerCase()) {
      throwErr(
        `from address mismatch (wallet address=${expectedFrom}) (tx.from=${tx.from})`,
        EKlaytnErrorCode.INVALID_ARGUMENT,
        { name: "transaction", value: tx }
      );
    }
    tx.from = expectedFrom;
  }
}

export async function populateTo(
  tx: TransactionRequest,
  provider: Provider | null
) {
  if (!tx.to || tx.to == "0x") {
    tx.to = ZeroAddress;
  } else {
    tx.to = await resolveAddress(tx.to, provider);
  }
}

export async function populateNonce(
  tx: TransactionRequest,
  provider: Provider | null,
  fromAddress: string
) {
  if (!tx.nonce) {
    tx.nonce = await provider?.getTransactionCount(fromAddress);
  }
}

export async function populateGasLimit(
  tx: TransactionRequest,
  provider: Provider | null
) {
  if (!provider) {
    throwErr("provider is undefined");
  }
  if (!tx.gasLimit) {
    // Sometimes Klaytn node's eth_estimateGas may return insufficient amount.
    // To avoid this, add buffer to the estimated gas.
    // References:
    // - ethers.js uses estimateGas result as-is.
    // - Metamask multiplies by 1 or 1.5 depending on chainId
    //   (https://github.com/MetaMask/metamask-extension/blob/v11.3.0/ui/ducks/send/helpers.js#L126)
    // TODO: To minimize buffer, add constant intrinsic gas overhead instead of multiplier.
    try {
      const bufferMultiplier = 2.5;
      const gasLimit = await provider?.estimateGas(tx);
      tx.gasLimit = Math.ceil(Number(gasLimit) * bufferMultiplier); // overflow risk when gasLimit exceed Number.MAX_SAFE_INTEGER
    } catch (error) {
      throwErr(
        "cannot estimate gas; transaction may fail or may require manual gas limit",
        EKlaytnErrorCode.UNPREDICTABLE_GAS_LIMIT,
        {
          error: error,
          tx: tx,
        }
      );
    }
  }
}

export async function populateGasPrice(
  tx: TransactionRequest,
  provider: Provider | null
) {
  if (!tx.gasPrice) {
    tx.gasPrice = (await provider?.getFeeData())?.gasPrice?.toString(); // https://github.com/ethers-io/ethers.js/discussions/4219
  }
}

export function eip155sign(
  key: SigningKey,
  digest: string,
  chainId: number
): SignatureLike {
  const sig = key.sign(digest);
  const recoveryParam = sig.v === 27 ? 0 : 1;
  const v = recoveryParam + +chainId * 2 + 35;
  return { r: sig.r, s: sig.s, v };
}

export async function populateChainId(
  tx: TransactionRequest,
  provider: Provider | null
) {
  if (!tx.chainId) {
    tx.chainId =
      getChainIdFromSignatureTuples(tx.txSignatures) ??
      getChainIdFromSignatureTuples(tx.feePayerSignatures) ??
      (await provider?.getNetwork())?.chainId.toString();
  }
}

export async function populateFeePayerAndSignatures(
  tx: TransactionRequest,
  expectedFeePayer: string
) {
  // A SenderTxHashRLP returned from caver may have dummy feePayer even if SenderTxHashRLP shouldn't have feePayer.
  // So ignore AddressZero in the feePayer field.
  if (!tx.feePayer || tx.feePayer == ZeroAddress) {
    tx.feePayer = expectedFeePayer;
  } else {
    if (tx.feePayer.toLowerCase() != expectedFeePayer.toLowerCase()) {
      throwErr("feePayer address mismatch", EKlaytnErrorCode.INVALID_ARGUMENT, {
        name: "transaction",
        value: tx,
      });
    }
  }

  // A SenderTxHashRLP returned from caver may have dummy feePayerSignatures if SenderTxHashRLP shouldn't have feePayerSignatures.
  // So ignore [ '0x01', '0x', '0x' ] in the feePayerSignatures field.
  if (_.isArray(tx.feePayerSignatures)) {
    tx.feePayerSignatures = tx.feePayerSignatures.filter((sig) => {
      return !(
        _.isArray(sig) &&
        sig.length == 3 &&
        sig[0] == "0x01" &&
        sig[1] == "0x" &&
        sig[2] == "0x"
      );
    });
  }
}
export async function sleep(time: number): Promise<void> {
  await new Promise((res, _) => {
    setTimeout(() => res(true), time);
  });
}
export async function poll<T>(
  callback: CallableFunction,
  retries = 100
): Promise<T> {
  let result: T;
  for (let i = 1; i <= retries; i++) {
    const output = await callback();
    if (!output) {
      if (i === retries) {
        throwErr("Transaction timeout!", EKlaytnErrorCode.NETWORK_ERROR, {
          operation: "pollTransactionInPool",
        });
      } else {
        await sleep(250);
        continue;
      }
    }
    result = output;
    break;
  }
  return result!;
}
// Poll for `eth_getTransaction` until the transaction is found in the transaction pool.
export async function pollTransactionInPool(
  txhash: string,
  provider: Provider
): Promise<TransactionResponse> {
  return poll<TransactionResponse>(() => provider.getTransaction(txhash));
}

export function throwErr(
  message: string,
  code: string = EKlaytnErrorCode.UNKNOWN_ERROR,
  params?: any
): never {
  const error: any = new Error(message);
  error.reason = message;
  error.code = code;

  Object.keys(params).forEach(function (key) {
    error[key] = params[key];
  });

  throw error;
}
