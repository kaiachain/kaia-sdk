import type { Client } from 'viem'
import type { WalletActions } from 'viem'
import type { Transport } from 'viem'
import type { Account } from 'viem'
import type { RpcSchema } from 'viem'
import type { Prettify } from 'viem'
import type { CustomRpcSchema } from '../rpc-schema.js'
import { kaia, kairos } from '../chainConfig.js'
import { KaiaWalletAction } from '../actions/wallet-actions.js'
export type KaiaChain = typeof kaia | typeof kairos
export type KaiaWalletClient<
  account extends Account | undefined = undefined,
> = Prettify<
  Client<
    Transport,
    KaiaChain,
    account,
    RpcSchema | CustomRpcSchema,
    WalletActions<KaiaChain, account> & KaiaWalletAction
  >
>

export type KaiaPublicClient = Prettify<
  Client<
    Transport,
    KaiaChain,
    undefined,
    RpcSchema & CustomRpcSchema,
    WalletActions<KaiaChain, undefined> & KaiaWalletAction
  >
>