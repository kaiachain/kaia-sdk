import type { AccountKeyType, TxType } from '@kaiachain/js-ext-core'
import type {
  TransactionRequest as EthersTransactionRequest,
  TransactionResponse,
} from 'ethers'
import type { Account } from 'viem'
import type { TransactionSerializable } from 'viem'
import type { OneOf } from 'viem'

export interface KaiaTransactionResponse extends TransactionResponse { }

export interface KaiaTransactionRequest
  extends Omit<EthersTransactionRequest, 'kzg' | 'account' | 'from'> {
  from?: `${string}` | undefined
  account?: Account | string | undefined

  txSignatures?: string[]

  feePayer?: `${string}`
  feeRatio?: number;
  feePayerSignatures?: string[]

  type?: TxType | number
  humanReadable?: boolean
  codeFormat?: number
  key?: {
    type: AccountKeyType
    keys?: {
      type: AccountKeyType
      key: string
    }[]
    key?: string
  }
}
export type KaiaTransactionSerializable = OneOf<
  TransactionSerializable | KaiaTransactionRequest
>
export type KaiaTransactionSerialized = `0x${string}`
