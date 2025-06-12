import { TxType } from '@kaiachain/js-ext-core'
import { createWalletClient, http, rpcSchema } from 'viem'
import { describe, expect, it } from 'vitest'
import { kaiaWalletAction, kairos } from '../src'
import { CustomRpcSchema } from '../src/rpc-schema'
import { privateKeyToAccount } from 'viem/accounts'


const senderWallet = createWalletClient({
  chain: kairos,
  transport: http(),
  rpcSchema: rpcSchema<CustomRpcSchema>(),
  account: privateKeyToAccount(
    '0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8',
  ),
}).extend(kaiaWalletAction())

describe('kaia/sendTransaction', () => {
  it('send a value transfer tx tx', async () => {
    const txRequest = await senderWallet.prepareTransactionRequest({
      account: senderWallet.account,
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: 0n,
      type: TxType.ValueTransfer,
    })
    const sentTx = await senderWallet.sendTransaction(txRequest)
    expect(sentTx).toBeDefined()
  })
})
