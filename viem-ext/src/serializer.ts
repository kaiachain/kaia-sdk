import {
  KlaytnTxFactory,
  type TxType,
  isFeePayerSigTxType,
  isKlaytnTxType,
} from '@kaiachain/js-ext-core'
import type { ChainSerializers } from 'viem'
import type { Signature } from 'viem'
import type { TransactionSerializable } from 'viem'
import { serializeTransaction as serializeTransactionDefault } from 'viem'
import type {
  KaiaTransactionSerializable,
  KaiaTransactionSerialized,
} from './types/transactions.js'
import { convertSignatureToKaiaFormat } from './utils.js'
// move this to helper

export const serializers = {
  transaction: serializeTransaction,
} as const satisfies ChainSerializers

export function serializeTransaction<
  const transaction extends KaiaTransactionSerializable,
>(
  transaction: transaction,
  signature?: Signature | undefined,
): KaiaTransactionSerialized {
  return serializeTransactionKaia(transaction, signature)
}

export function serializeTransactionKaia(
  transaction: KaiaTransactionSerializable,
  signature?: Signature,
): KaiaTransactionSerialized {
  if (!isKlaytnTxType(transaction.type as TxType)) {
    return serializeTransactionDefault(
      transaction as TransactionSerializable,
      signature,
    )
  }

  const klaytnTx = KlaytnTxFactory.fromObject(transaction)
  if (!signature) {
    return klaytnTx.sigRLP() as `0x${string}`
  }
  klaytnTx.addSenderSig(
    convertSignatureToKaiaFormat(signature, Number(transaction.chainId)),
  )
  if (isFeePayerSigTxType(klaytnTx.type)) {
    return klaytnTx.senderTxHashRLP() as `0x${string}`
  }
  return klaytnTx.txHashRLP() as `0x${string}`
}
export function serializeTransactionForFeePayerKaia(expectedFeePayer: string) {
  return (
    transaction: KaiaTransactionSerializable,
    signature?: Signature,
  ): KaiaTransactionSerialized => {
    const txObj = { ...transaction }

    txObj.feePayer = expectedFeePayer

    const klaytnTx = KlaytnTxFactory.fromObject(txObj)

    if (!signature) {
      return klaytnTx.sigFeePayerRLP() as `0x${string}`
    }
    klaytnTx.addFeePayerSig(
      convertSignatureToKaiaFormat(signature, Number(txObj.chainId)),
    )
    return klaytnTx.txHashRLP() as `0x${string}`
  }
}
