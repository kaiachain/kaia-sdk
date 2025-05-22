export {
  type KaiaWalletAction,
  kaiaWalletAction,
} from './actions/wallet-actions.js'

export type { CustomRpcSchema as KaiaRpcSchema } from './rpc-schema.js'

export * from 'viem'
export { privateKeyToAccount, parseAccount } from 'viem/accounts'
export { kairos, kaia } from './chainConfig.js'
export { createPublicClient, createWalletClient } from './client.js'
export { kaiaAccount } from './accounts'
// js-ext-core passthrough
export * from '@kaiachain/js-ext-core'
// override viem similar function
export { parseTransaction, formatUnits } from '@kaiachain/js-ext-core'
export { parseKaia, parseKaiaUnits, parseUnits } from '@kaiachain/js-ext-core/ethers-v6'
export type { KaiaWalletClient, KaiaPublicClient } from './types/client.js'
export { KaiaTransactionRequest, KaiaTransactionResponse, KaiaTransactionSerializable, KaiaTransactionSerialized } from './types/transactions.js'