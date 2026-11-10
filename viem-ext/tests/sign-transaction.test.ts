import { TxType } from '@kaiachain/js-ext-core'
import { describe, expect, it } from 'vitest'
import { createWalletClient, http, kairos } from '../src'
import { privateKeyToAccount } from 'viem/accounts'

const senderWallet = createWalletClient({
  chain: kairos,
  transport: http(),
  account: privateKeyToAccount(
    '0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8',
  ),
})

describe('kaia/signTransaction', () => {
  it('sign a tx', async () => {
    const txRequest = await senderWallet.prepareTransactionRequest({
      account: senderWallet.account,
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: 0n,
      type: TxType.FeeDelegatedValueTransfer,
    })
    const sentTx = await senderWallet.signTransaction(txRequest)

    expect(sentTx.startsWith('0x')).toBeTruthy()
  })
})
