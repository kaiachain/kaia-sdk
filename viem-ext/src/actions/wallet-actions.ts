import type { Address } from 'abitype'
import type {
  Chain,
  LocalAccount,
  JsonRpcAccount
} from 'viem'
import type { Account } from 'viem/accounts'
import { prepareTransactionRequest } from '../methods/prepare-transaction-request.js'
import { sendTransactionAsFeePayer } from '../methods/send-transaction-as-fee-payer.js'
import { sendTransaction } from '../methods/send-transaction.js'
import { signTransactionAsFeePayer } from '../methods/sign-transaction-as-fee-payer.js'
import { signTransaction } from '../methods/sign-transaction.js'
import type { KaiaTransactionRequest, KaiaTransactionResponse } from '../types/transactions.js'
import { KaiaWalletClient } from '../types/client.js'
export type KaiaWalletAction<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
> = {
  signTransactionAsFeePayer: (
    parameters: string | KaiaTransactionRequest,
  ) => Promise<string>
  signTransaction: (
    parameters: string | KaiaTransactionRequest,
  ) => Promise<string>
  sendTransactionAsFeePayer: (
    parameters: string | KaiaTransactionRequest,
  ) => Promise<string>
  // arccording to `viem/clients/createClient.ts` prepareTransactionRequest is protected and we must copy its function params and returned types.
  prepareTransactionRequest: <
    chainOverride extends Chain | undefined = chain,
    accountOverride extends Account | Address | undefined = account,
  >(
    args: KaiaTransactionRequest,
  ) => Promise<KaiaTransactionResponse>
  sendTransaction: (
    args: KaiaTransactionRequest,
  ) => Promise<`0x${string}`>
}

export function kaiaWalletAction() {
  return <
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
  >(
    client: KaiaWalletClient<LocalAccount | JsonRpcAccount>,
  ): KaiaWalletAction<chain, account> => {
    return {
      signTransactionAsFeePayer: (senderSignedTransaction) =>
        signTransactionAsFeePayer(client, senderSignedTransaction),
      signTransaction: (senderSignedTransaction) =>
        signTransaction(client, senderSignedTransaction),
      sendTransactionAsFeePayer: (tx) =>
        sendTransactionAsFeePayer(client, tx),
      prepareTransactionRequest: (tx) =>
        prepareTransactionRequest(client as unknown as KaiaWalletClient, tx),
      sendTransaction: (tx) =>
        sendTransaction(
          client,
          tx,
        ),
    }
  }
}
