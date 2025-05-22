import { privateKeyToAccount } from 'viem/accounts'
import type { PrivateKeyAccount } from 'viem'

export function kaiaAccount(
  address: `0x${string}`,
  privateKey: `0x${string}`,
): PrivateKeyAccount {
  const defaultAccount = privateKeyToAccount(privateKey)
  // in role-based, multi-sig account, the from address and the signer address can be different.
  defaultAccount.address = address

  return defaultAccount
}
