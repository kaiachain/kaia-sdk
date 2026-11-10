import {
  getKaikasTxType,
  getRpcTxObject,
  isKlaytnTxType,
} from '@kaiachain/js-ext-core'
import type { LocalAccount, JsonRpcAccount } from 'viem'
import { serializeTransactionKaia } from '../serializer.js'
import type { KaiaTransactionRequest } from '../types/transactions.js'
import { getTransactionRequestForSigning } from '../utils.js'
import { KaiaWalletClient } from '../types/client.js'

export const signTransaction = async (
  client: KaiaWalletClient<LocalAccount | JsonRpcAccount>,
  senderTxHashRLP: string | KaiaTransactionRequest,
): Promise<string> => {
  const txObj = await getTransactionRequestForSigning(client, senderTxHashRLP)

  if ((client?.account as LocalAccount)?.signTransaction) {
    return (client.account as LocalAccount).signTransaction(txObj, {
      serializer: serializeTransactionKaia,
    })
  }
  // kaia tx type
  if (isKlaytnTxType(txObj.type)) {
    const response = await client.request(
      {
        method: 'klay_signTransaction',
        params: [
          { ...getRpcTxObject(txObj), type: getKaikasTxType(txObj.type) },
        ],
      } as any,
      { retryCount: 0 },
    )
    if (typeof response === 'object') {

      return (response as any)['rawTransaction'] as `0x${string}`
    }
    return response as `0x${string}`
  }
  // legacy tx
  return client.request(
    {
      method: 'eth_signTransaction',
      params: [txObj],
    },
    {
      retryCount: 0,
    },
  )
}
