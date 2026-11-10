import { serializeTransactionForFeePayerKaia } from '../serializer.js'
import type { KaiaTransactionRequest } from '../types/transactions.js'
import { getTransactionRequestForSigning } from '../utils.js'
import { KaiaWalletClient } from '../types/client.js'
import { JsonRpcAccount, LocalAccount } from 'viem'

export const signTransactionAsFeePayer = async (
  client: KaiaWalletClient<LocalAccount | JsonRpcAccount>,
  senderTxHashRLP: string | KaiaTransactionRequest,
): Promise<string> => {
  const txObj = await getTransactionRequestForSigning(client, senderTxHashRLP)

  if (!client?.account) {
    throw new Error("invalid account for signTransactionAsFeePayer")
  }
  if ((client.account as LocalAccount)?.signTransaction) {
    return (client.account as LocalAccount).signTransaction(txObj, {
      serializer: serializeTransactionForFeePayerKaia(client.account.address),
    })
  }
  return (await client.request({
    method: 'klay_signTransactionAsFeePayer',
    params: [txObj],
  })) as string
}
