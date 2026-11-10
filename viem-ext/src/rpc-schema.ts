import type { WalletRpcSchema } from 'viem'

export type CustomRpcSchema = [
  ...WalletRpcSchema,
  {
    Method: 'klay_sendRawTransaction'
    Parameters: [string]
    ReturnType: string
  },
  {
    Method: 'klay_sendTransaction'
    Parameters: [object]
    ReturnType: string
  },
  {
    Method: 'klay_gasPrice'
    Parameters: []
    ReturnType: string
  },
  {
    Method: 'klay_estimateGas'
    Parameters: [object]
    ReturnType: string
  },
]
