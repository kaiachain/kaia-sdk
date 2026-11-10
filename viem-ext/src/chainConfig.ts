import { formatters } from './formatter.js'
import { serializers } from './serializer.js'
import { kairos as testnet, kaia as mainnet } from 'viem/chains'
export const chainConfig = {
  formatters,
  serializers,
} as const

export const kairos = {
  ...testnet,
  ...chainConfig
}

export const kaia = {
  ...mainnet,
  ...chainConfig
}