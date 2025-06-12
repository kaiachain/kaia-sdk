import {
  getKaikasTxType,
  getRpcTxObject,
  isKlaytnTxType,
} from '@kaiachain/js-ext-core'
import type { LocalAccount, JsonRpcAccount } from 'viem'
import { type Account, parseAccount } from 'viem/accounts'
import type { KaiaWalletClient } from '../types/client.js'
import type { KaiaTransactionRequest } from '../types/transactions.js'
import { getValidRawRpcObj } from '../utils.js'
import { signTransaction } from './sign-transaction.js'
export const sendTransaction = async (
  client: KaiaWalletClient<LocalAccount | JsonRpcAccount>,
  tx: KaiaTransactionRequest,
): Promise<`0x${string}`> => {
  if (!isKlaytnTxType(tx.type)) {
    return client.sendTransaction(tx)
  }
  if (!tx.account && !client.account) {
    throw new Error('Parameters for account missing!')
  }
  const thisAccount = parseAccount(
    (tx.account ?? client.account) as unknown as `0x${string}` | Account,
  )
  // json-rpc account
  if (thisAccount.type === 'json-rpc') {
    return (await client.request(
      {
        method: 'klay_sendTransaction',
        params: [
          {
            ...getRpcTxObject(
              getValidRawRpcObj(tx as unknown as KaiaTransactionRequest),
            ),
            type: getKaikasTxType(tx.type),
          },
        ],
      },
      { retryCount: 0 },
    )) as `0x${string}`
  }
  // local account
  const signedTx = await signTransaction(
    client,
    tx as unknown as KaiaTransactionRequest,
  )

  return (await client.request({
    method: 'klay_sendRawTransaction',
    params: [signedTx],
  })) as `0x${string}`
}
