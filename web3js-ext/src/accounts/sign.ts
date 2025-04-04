import { isKlaytnTxType, KlaytnTxFactory, parseTxType, getChainIdFromSignatureTuples, isFeePayerSigTxType } from "@kaiachain/js-ext-core";
import _ from "lodash";
import { Web3Context } from "web3-core";
import { TransactionSigningError } from "web3-errors";
import { prepareTransactionForSigning } from "web3-eth";
import { privateKeyToAddress, signTransaction, SignTransactionResult } from "web3-eth-accounts";
import { EthExecutionAPI, Bytes, HexString } from "web3-types";
import { bytesToHex, hexToBytes, sha3Raw } from "web3-utils";
import { isNullish } from "web3-validator";

import { getTransactionFromOrToAttr } from "../eth/utils/transaction_builder.js";
import { KlaytnTransaction, KlaytnTxData, TypedTransaction } from "../types.js";

import { KlaytnTypedTransaction } from "./klaytn_tx.js";

// Analogous to web3/src/accounts.ts:signTransactionWithContext
export function context_signTransaction(context: Web3Context<EthExecutionAPI>) {
  return async (transaction: KlaytnTransaction | string, privateKey: Bytes) => {
    const tx = resolveTransaction(transaction);
    const priv = bytesToHex(privateKey);

    const preparedTx = await prepareTransaction(tx, context, privateKey);

    // Relies on the original web3-eth-accounts:signTransaction()
    // Klaytn-specific logic are realized in `preparedTx` of class KlaytnTypedTransaction.
    return signTransaction(preparedTx, priv);
  };
}

// Analogous to web3/src/accounts.ts:signTransactionWithContext
// but instead calls signTransactionAsFeePayer.
export function context_signTransactionAsFeePayer(context: Web3Context<EthExecutionAPI>) {
  return async (transaction: KlaytnTransaction | string, privateKey: Bytes) => {
    const tx = resolveTransaction(transaction);
    const priv = bytesToHex(privateKey);

    if (!isFeePayerSigTxType(_parseTxType(tx.type))) {
      throw new Error(`signTransactionAsFeePayer not supported for tx type ${tx.type}`);
    }

    populateFeePayerAndSignatures(tx, privateKeyToAddress(privateKey));
    const preparedTx = await prepareTransaction(tx, context, privateKey);

    // Not using the original web3-eth-accounts:signTransaction()
    // Use the separate signTransactionAsFeePayer() instead.
    return signTransactionAsFeePayer(preparedTx, priv);
  };
}

// Convert 'Transaction | string' type to 'Transaction' by decoding the RLP string.
function resolveTransaction(transaction: KlaytnTransaction | string): KlaytnTransaction {
  if (_.isString(transaction)) {
    return KlaytnTxFactory.fromRLP(transaction).toObject();
  } else {
    return transaction;
  }
}

// Fill feePayer field if empty. Filters out dummy feePayer and feePayerSignatures from caver.
async function populateFeePayerAndSignatures(transaction: KlaytnTransaction, expectedFeePayer: string) {
  // A SenderTxHashRLP returned from caver may have dummy feePayer even if SenderTxHashRLP shouldn't have feePayer.
  // So ignore AddressZero in the feePayer field.
  if (!transaction.feePayer || transaction.feePayer == "0x0000000000000000000000000000000000000000") {
    transaction.feePayer = expectedFeePayer;
  }

  // A SenderTxHashRLP returned from caver may have dummy feePayerSignatures if SenderTxHashRLP shouldn't have feePayerSignatures.
  // So ignore [ '0x01', '0x', '0x' ] in the feePayerSignatures field.
  if (_.isArray(transaction.feePayerSignatures)) {
    transaction.feePayerSignatures = transaction.feePayerSignatures.filter((sig) => {
      return !(_.isArray(sig) && sig.length == 3 && sig[0] == "0x01" && sig[1] == "0x" && sig[2] == "0x");
    });
  }
}

// Analogous to web3-eth-accounts:signTransaction,
// but instead calls KlaytnTx.*AsFeePayer methods.
export async function signTransactionAsFeePayer(
  transaction: TypedTransaction | KlaytnTypedTransaction,
  privateKey: HexString,
): Promise<SignTransactionResult> {
  if (!(transaction instanceof KlaytnTypedTransaction)) {
    throw new Error("attempted signTransactionAsFeePayer with non-klaytn tx");
  }

  const signedTx: any = transaction.signAsFeePayer(hexToBytes(privateKey));
  if (isNullish(signedTx.feePayer_v) || isNullish(signedTx.feePayer_r) || isNullish(signedTx.feePayer_s)) { throw new TransactionSigningError("Signer Error"); }

  const validationErrors = signedTx.validate(true);

  if (validationErrors.length > 0) {
    let errorString = "Signer Error ";
    for (const validationError of validationErrors) {
      errorString += `${errorString} ${validationError}.`;
    }
    throw new TransactionSigningError(errorString);
  }

  const rawTx = bytesToHex(signedTx.serializeAsFeePayer());
  const txHash = sha3Raw(rawTx); // using keccak in web3-utils.sha3Raw instead of SHA3 (NIST Standard) as both are different

  return {
    messageHash: bytesToHex(signedTx.getMessageToSignAsFeePayer(true)),
    v: `0x${signedTx.feePayer_v.toString(16)}`,
    r: `0x${signedTx.feePayer_r.toString(16).padStart(64, "0")}`,
    s: `0x${signedTx.feePayer_s.toString(16).padStart(64, "0")}`,
    rawTransaction: rawTx,
    transactionHash: bytesToHex(txHash),
  };
}

// Fill required fields from the context. Analogous to prepareTransactionForSigning from web3-eth,
// but also support Klaytn TxTypes.
// See web3-eth/src/utils/prepare_transaction_for_signing.ts:prepareTransactionForSigning
export async function prepareTransaction(
  transaction: KlaytnTransaction,
  context: Web3Context,
  privateKey: Bytes,
): Promise<TypedTransaction> {
  const fillGasPrice = true;
  const fillGasLimit = true;

  // fall back to original web3-eth prepareTransactionForSigning
  if (!isKlaytnTxType(_parseTxType(transaction.type))) {
    return await prepareTransactionForSigning(
      transaction, context, privateKey, fillGasPrice, fillGasLimit);
  }

  // If gasLimit is not specified, prepareTransactionForSigning will call eth_estimateGas.
  // But in that case, we have to add some buffer thereafter.
  const gasLimitWasEmpty = isNullish(transaction.gasLimit) && isNullish(transaction.gas);

  // To fill tx.chainId field if provider is not available.
  const chainIdFromTx = getChainIdFromTx(transaction);

  // Save klaytn-specific fields and the 'type' field.
  transaction = _.clone(transaction);
  const savedFields = saveCustomFields(transaction);

  // getTransactionFromOrToAttr is the function used in prepareTransactionForSigning.
  // But because prepareTransactionForSigning does not return 'from' field,
  // we calculate separately here.
  const txFrom = getTransactionFromOrToAttr("from", context, transaction, privateKey);
  transaction.from ??= txFrom;

  // prepareTransactionForSigning fills or converts:
  // - nonce:      call eth_getTransactionCount on tx.from
  // - value:      0
  // - data:       ensure tx.data == tx.input
  // - common:     web3 internal data
  // - chain:      web3 internal data
  // - hardfork:   web3 internal data
  // - chainId:    call eth_chainId
  // - networkId:  call net_version
  // - gasPrice:   call eth_gasPrice because transaction.type is set to 0 by saveCustomFields()
  // - gasLimit:   copy tx.gasLimit = tx.gas if defined. call eth_estimateGas if not defined.
  // prepareTransactionForSigning will return a web3-eth-accounts:Transaction (LegacyTransaction)
  // because transaction.type == 0.
  const preparedTx: TypedTransaction = await prepareTransactionForSigning(
    transaction, context, privateKey, fillGasPrice, fillGasLimit);

  // Assemble all fields. Upper entry is overwritten by lower entry.
  const txData: KlaytnTxData = {
    // All fields from LegacyTransaction, filled by prepareTransactionForSigning
    ...preparedTx,

    // If gasLimitWasEmpty (i.e. was filled in prepareTransactionForSigning),
    // then add some buffer. Otherwise, use the original value (i.e. supplied by user).
    gasLimit: (
      gasLimitWasEmpty ? bufferedGasLimit(preparedTx.gasLimit) : preparedTx.gasLimit
    ),

    // Note that LegacyTransaction has no 'from' attribute.
    // Therefore we need to find 'from' using getTransactionFromOrToAttr.
    from: txFrom,

    // chainId from input transaction or from Web3Context.
    chainId: (chainIdFromTx ?? preparedTx.common.chainId()),

    // Add Klaytn-specific fields such as 'feePayer' and overwrite the 'type' field.
    ...savedFields,
  };

  // Extract the private field BaseTransaction.txOptions.
  const txOptions = (preparedTx as any).txOptions;

  // Wrap in the KlaytnTypedTransaction class.
  return new KlaytnTypedTransaction(txData, txOptions);
}

// Attempt to extract chainId from transaction. Returns bigint to be compatible with web3.js.
function getChainIdFromTx(transaction: KlaytnTransaction): bigint | undefined {
  if (transaction.chainId) {
    return BigInt(transaction.chainId);
  }

  const chainIdFromSig: number | undefined =
    getChainIdFromSignatureTuples(transaction.txSignatures) ??
    getChainIdFromSignatureTuples(transaction.feePayerSignatures);
  if (chainIdFromSig) {
    return BigInt(chainIdFromSig);
  }

  return undefined;
}

export function bufferedGasLimit(gasLimit: bigint | number): number {
  // Sometimes Klaytn node's eth_estimateGas may return insufficient amount.
  // To avoid this, add buffer to the estimated gas.
  // References:
  // - web3.js uses estimateGas result as-is.
  //   https://github.com/web3/web3.js/blob/v4.3.0/packages/web3-eth/src/utils/transaction_builder.ts#L238
  // - Metamask multiplies by 1 or 1.5 depending on chainId
  //   https://github.com/MetaMask/metamask-extension/blob/v11.3.0/ui/ducks/send/helpers.js#L126
  // TODO: To minimize buffer, add constant intrinsic gas overhead instead of multiplier.
  // Chose 2.5 because of high intrinsic gas overhead of multisig and feepayer txs.
  const gasLimitMultiplier = 2.5;

  return Math.ceil(Number(gasLimit) * gasLimitMultiplier);
}

// See web3-types/src/eth_types.ts:TransactionBase and its child interfaces
const web3jsAllowedTransactionKeys = [
  "value", "accessList", "common", "gas", "gasPrice", "type", "maxFeePerGas",
  "maxPriorityFeePerGas", "data", "input", "nonce", "chain", "hardfork",
  "chainId", "networkId", "gasLimit", "yParity", "v", "r", "s",
  "from", "to",
];

// web3.js may strip or reject some Klaytn-specific transaction fields.
// To preserve transaction fields around web3js function calls, use saveCustomFields.
function saveCustomFields(tx: any): any {
  // Save fields that are not allowed in web3.js
  const savedFields: any = {};
  for (const key in tx) {
    if (web3jsAllowedTransactionKeys.indexOf(key) === -1) {
      savedFields[key] = _.get(tx, key);
      _.unset(tx, key);
    }
  }

  // Save txtype that is not supported in web3.js.
  // and disguise as legacy (type 0) transaction
  // because web3js-ext's KlaytnTx is based on web3js's LegacyTransaction.
  if (KlaytnTxFactory.has(tx.type)) {
    savedFields["type"] = tx.type;
    tx.type = 0;
  }

  return savedFields;
}

// TODO: Remove it after js-ext-core parseTxType() accepts bigint and null
export function _parseTxType(type: string | number | bigint | null | undefined): number {
  if (typeof type === "bigint") {
    type = Number(type);
  }
  if (type === null) {
    return 0;
  }
  return parseTxType(type);
}
