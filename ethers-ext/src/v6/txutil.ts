import {
  Provider,
  TransactionLike,
  TransactionResponse,
  resolveProperties,
  ZeroAddress,
  SigningKey,
  resolveAddress,
  Transaction,
  assert,
} from "ethers6";
import _ from "lodash";

import {
  getChainIdFromSignatureTuples,
  parseTransaction,
  parseTxType,
  SignatureLike,
} from "@kaiachain/js-ext-core";

import { TransactionRequest } from "./types";

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
    const resolvedTx = await resolveProperties(transactionOrRLP);

    // tx values transformation
    if (typeof resolvedTx?.type === "string") {
      resolvedTx.type = parseTxType(resolvedTx.type);
    }

    return resolvedTx as TransactionLike<string>;
  }
}

export async function populateFrom(
  tx: TransactionRequest,
  expectedFrom: string
) {
  if (!tx.from || tx.from == "0x") {
    tx.from = expectedFrom;
  } else {
    assert(
      tx.from?.toString().toLowerCase() === expectedFrom?.toLowerCase(),
      `from address mismatch (wallet address=${expectedFrom}) (tx.from=${tx.from})`,
      "INVALID_ARGUMENT",
      { argument: "from", value: tx.from }
    );
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
  assert(!!provider, "provider is undefined", "MISSING_ARGUMENT");
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
      assert(
        false,
        "cannot estimate gas; transaction may fail or may require manual gas limit",
        "UNKNOWN_ERROR",
        {
          data: tx,
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
    assert(
      tx.feePayer.toLowerCase() === expectedFeePayer.toLowerCase(),
      "feePayer address mismatch",
      "INVALID_ARGUMENT",
      {
        argument: "feePayer",
        value: tx.feePayer,
      }
    );
    tx.feePayer = expectedFeePayer;
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
/**
 * Delay the execution inside an async function in miliseconds.
 *
 * @param   time  (miliseconds) the amount of time to be delayed.
 */
export function sleep(time: number): Promise<void> {
  return new Promise((res, _) => {
    setTimeout(() => res(), time);
  });
}
/**
 * The poll function implements a retry mechanism for asynchronous operations.
 * It repeatedly calls the callback function to fetch data and then uses the
 * verify function to check if the retrieved data meets the desired criteria.
 *
 * @param   callback  A callback function that is responsible for fetching or retrieving data. It should be an asynchronous function that returns a Promise.
 * @param   verify    A callback function that determines if the retrieved data meets the desired criteria. It should accept the data returned by callback and return a boolean value (true if the data is valid, false otherwise).
 * @param   retries   (optional): An integer specifying the maximum number of times the function will attempt to poll before giving up. Defaults to 100.
 * @returns A Promise that resolves to the data retrieved by callback when the verify function returns true, or rejects with an error if the maximum number of retries is reached.
 */
export async function poll<T>(
  callback: () => Promise<T | null>,
  verify: CallableFunction,
  retries = 100
): Promise<T> {
  let result: T;
  for (let i = 0; i < retries; i++) {
    try {
      const output = await callback();
      if (output && verify(output)) {
        result = output;
        break;
      }
    } catch (_) {
      continue;
    }
    await sleep(250);
  }

  assert(result!, "Transaction timeout!", "NETWORK_ERROR", {
    event: "pollTransactionInPool",
  });

  return result!;
}
// Poll for `eth_getTransaction` until the transaction is found in the transaction pool.
export async function pollTransactionInPool(
  txhash: string,
  provider: Provider
): Promise<TransactionResponse> {
  return poll<TransactionResponse>(
    (): Promise<TransactionResponse | null> => provider.getTransaction(txhash),
    (value: TransactionResponse) => typeof value?.hash === "string"
  );
}
