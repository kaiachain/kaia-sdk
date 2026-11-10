import type { Address } from 'abitype'
import type {
  PrepareTransactionRequestParameters,
  PrepareTransactionRequestReturnType,
  Chain
} from 'viem'
import type { Account } from 'viem/accounts'
import type { KaiaChain } from '../types/client.js'
import type { KaiaPublicClient } from '../types/client.js'
import { getEstimateGasPayload } from '../utils.js'
import { isKlaytnTxType } from '@kaiachain/js-ext-core'
import { KaiaTransactionRequest, KaiaTransactionResponse } from '../types/transactions.js'

export const prepareTransactionRequest = async <
  account extends Account | undefined = Account | undefined,
>(
  client: KaiaPublicClient,
  txObj: KaiaTransactionRequest,
): Promise<
  KaiaTransactionResponse
> => {
  const req = await client.prepareTransactionRequest(
    txObj as unknown as PrepareTransactionRequestParameters<
      KaiaChain,
      account,
      KaiaChain
    >,
  )
  if (
    isKlaytnTxType(req.type) || req.type === 0
  ) {
    // only tx type 1, 2 use dynamic fee
    delete (req as any)?.maxPriorityFeePerGas;
    delete (req as any)?.maxFeePerGas;
    req.gasPrice = await client.request({
      method: 'klay_gasPrice',
      params: [],
    })
    req.gasLimit = await getEstimateGasPayload(client, {
      from: req?.from,
      to: req?.to,
      data: req?.data,
      key: req?.key,
      type: req?.type,
    })
  }
  return req as unknown as KaiaTransactionResponse;
}
