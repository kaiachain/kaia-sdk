import { type SignatureLike, parseTransaction } from '@kaiachain/js-ext-core'
import type { Client } from 'viem'
import type { Signature } from 'viem'
import type { ExactPartial } from 'viem'
import { toHex } from 'viem'
import type { KaiaTransactionRequest } from './types/transactions.js'
import { KaiaPublicClient, KaiaWalletClient } from './types/client.js'
export function isKaiaTransactionRequest(
  transactionOrRLP: string | KaiaTransactionRequest,
): transactionOrRLP is KaiaTransactionRequest {
  return typeof transactionOrRLP === 'object'
}
export async function getTransactionRequestForSigning(
  client: Client,
  transactionOrRLP: KaiaTransactionRequest | string,
): Promise<KaiaTransactionRequest> {
  let txObj: KaiaTransactionRequest
  switch (typeof transactionOrRLP) {
    case 'string':
      txObj = parseTransaction(transactionOrRLP) as KaiaTransactionRequest
      break
    case 'object':
      txObj = transactionOrRLP as KaiaTransactionRequest
      break
    default:
      throw new Error('Invalid transaction')
  }

  if (typeof client?.chain?.id !== 'undefined') {
    txObj.chainId = client.chain.id
  }
  // wallet such as kaia wallet will pre populated the fee payers signature will zero value, which cause r,s,v error.
  if (Array.isArray(txObj.feePayerSignatures)) {
    txObj.feePayerSignatures = txObj.feePayerSignatures.filter((sig) => {
      return !(
        Array.isArray(sig) &&
        sig.length == 3 &&
        sig[0] == "0x01" &&
        sig[1] == "0x" &&
        sig[2] == "0x"
      );
    });
  }

  return txObj
}

export function convertSignatureToKaiaFormat(
  signature: Signature,
  chainId: number,
): SignatureLike {
  const { r, s, yParity } = signature
  const v = Number(yParity) + chainId * 2 + 35
  return {
    r,
    s,
    v,
  }
}

export const getValidRawRpcObj = (
  txObj: ExactPartial<
    Pick<
      KaiaTransactionRequest,
      | 'key'
      | 'from'
      | 'to'
      | 'value'
      | 'data'
      | 'type'
      | 'gasLimit'
      | 'gasPrice'
    >
  >,
) => {
  const result: Partial<KaiaTransactionRequest> = {}
  if (txObj.from) {
    result.from = txObj.from
  }
  if (txObj.to) {
    result.to = txObj.to
  }
  if (txObj.value) {
    result.value = toHex(txObj.value)
  }
  if (txObj.data) {
    result.data = txObj.data
  }
  if (txObj.type) {
    result.type = txObj.type
  }
  if (txObj.key) {
    result.key = txObj.key
  }
  if (txObj.gasPrice) {
    result.gasPrice = txObj.gasPrice
  }
  if (txObj.gasLimit) {
    result.gasLimit = txObj.gasLimit
  }
  return result
}
export const getEstimateGasPayload = async (
  client: KaiaWalletClient & KaiaPublicClient,
  txObj: ExactPartial<
    Pick<
      KaiaTransactionRequest,
      'key' | 'from' | 'to' | 'value' | 'data' | 'type' | 'codeFormat' | 'humanReadable' | 'feeRatio'
    >
  >,
) => {
  const estimatedGas = (await client.request({
    method: 'klay_estimateGas',
    params: [getValidRawRpcObj(txObj)],
  })) as `0x${string}`
  return Math.floor(Number.parseInt(estimatedGas, 16) * 2.5)
}
