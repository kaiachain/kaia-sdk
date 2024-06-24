import { Logger } from "@ethersproject/logger";
import { Deferrable } from "@ethersproject/properties";
import { poll } from "@ethersproject/web";
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

import { TransactionRequest } from "./types";

const logger = new Logger("@klaytn/ethers-ext");

// Normalize transaction request in Object or RLP format
export async function getTransactionRequest(
  transactionOrRLP: Deferrable<TransactionRequest> | string | Transaction
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

// Below populateX() methods are partial replacements to:
// - ethers.Signer.checkTransaction()
// - ethers.Signer.populateTransaction()
// - ethers.JsonRpcSigner.sendUncheckedTransaction()

// populateFromSync is a synchronous method so it can be used in checkTransaction().
export function populateFromSync(
  tx: Deferrable<TransactionRequest>,
  expectedFrom: string | Promise<string>
) {
  // See @ethersproject/abstract-signer/src/index.ts:Signer.checkTransaction()
  if (!tx.from || tx.from == "0x") {
    tx.from = expectedFrom;
  } else {
    tx.from = Promise.all([Promise.resolve(tx.from), expectedFrom]).then(
      ([from, expectedFrom]) => {
        if (from?.toString().toLowerCase() != expectedFrom?.toLowerCase()) {
          logger.throwArgumentError(
            `from address mismatch (wallet address=${expectedFrom}) (tx.from=${from})`,
            "transaction",
            tx
          );
        }
        return from;
      }
    );
  }
}

export async function populateFrom(
  tx: TransactionRequest,
  expectedFrom: string
) {
  populateFromSync(tx, expectedFrom);
  tx.from = await tx.from;
}

export async function populateTo(
  tx: TransactionRequest,
  provider: Provider | null
) {
  if (!tx.to || tx.to == "0x") {
    tx.to = ZeroAddress;
  } else {
    return resolveAddress(tx.to);
    // const address = await provider?.resolveName(tx.to.toString());
    // if (address == null) {
    //   logger.throwArgumentError(
    //     "provided ENS name resolves to null",
    //     "tx.to",
    //     tx.to
    //   );
    // }
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
    logger.throwError("provider is undefined");
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
      logger.throwError(
        "cannot estimate gas; transaction may fail or may require manual gas limit",
        Logger.errors.UNPREDICTABLE_GAS_LIMIT,
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
      logger.throwArgumentError("feePayer address mismatch", "transaction", tx);
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

// Poll for `eth_getTransaction` until the transaction is found in the transaction pool.
export async function pollTransactionInPool(
  txhash: string,
  provider: Provider
): Promise<TransactionResponse> {
  // Retry until the transaction shows up in the txpool
  // Using poll() like in the ethers.JsonRpcSigner.sendTransaction
  // https://github.com/ethers-io/ethers.js/blob/v5.7/packages/providers/src.ts/json-rpc-provider.ts#L283
  const pollFunc = async () => {
    const tx = await provider.getTransaction(txhash);
    if (tx == null) {
      return undefined; // retry
    } else {
      return tx; // success
    }
  };
  return poll(pollFunc) as Promise<TransactionResponse>;
}
