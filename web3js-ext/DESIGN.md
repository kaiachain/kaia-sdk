# Design

## Source code structure

```
src/
  accounts/     # Components for web3.eth.accounts.*
    index.ts      # web3.eth.accounts
    create.ts     # web3.eth.accounts.{create,privateKeyToAccount,decrypt,decryptList}
    klaytn_tx.ts  # KlaytnTypedTransaction class
    recover.ts    # web3.eth.accounts.{recoverTransaction}
    sign.ts       # web3.eth.accounts.{signTransaction,signTransactinAsFeePayer}
    wallet.ts     # web3.eth.accounts.{wallet}
  eth/          # Components for web3.eth.*
    index.ts      # web3.eth
    send.ts       # web3.eth.{sendTransaction,sendSignedTransaction}
    sign.ts       # web3.eth.{signTransaction}
    rpc.ts        # web3.eth.{getProtocolVersion}
    utils/        # Util functions taken from web3-eth/src/utils/
  gasless/      # Components for web3.gasless.*
    index.ts      # web3.gasless
    gasless.ts    # web3.gasless.*
  index.ts
  types.ts      # Types and interfaces
  web3.ts       # The Web3 class
```

## Klaytn tx signing flow

```
User app.js
  | Transaction{ from, to, ... }
  | KlaytnTransaction{ from, to, key, feePayer, ... }
  | string
  V
account.signTransaction                      @ account/sign.ts:context_signTransaction
account.signTransactionAsFeePayer            @ account/sign.ts:context_signTransactionAsFeePayer
web3.eth.accounts.signTransaction            @ account/sign.ts:context_signTransaction
web3.eth.accounts.signTransactionAsFeePayer  @ account/sign.ts:context_signTransactionAsFeePayer
  | Transaction
  | KlaytnTransaction
  | string
  V
resolveTransaction      @ account/sign.ts
  | KlaytnTransaction
  V
prepareTransaction      @ account/sign.ts
  | TypedTransaction
  | - LegacyTransaction             @ web3-eth-accounts/src/tx/legacyTransaction.ts
  | - FeeMarketEIP1559Transaction   @ web3-eth-accounts/src/tx/eip1559Transaction.ts
  | - AccessListEIP2930Transaction  @ web3-eth-accounts/src/tx/eip2930Transaction.ts
  | - KlaytnTypedTransaction        @ account/klaytn_tx.ts
  V
signTransaction            @ web3-eth-accounts/src/account.ts:signTransaction
signTransactionAsFeePayer  @ account/sign.ts
  | preparedTx: TypedTransaction
  V
preparedTx.sign              @ account/klaytn_tx.ts
preparedTx.signAsFeePayer    @ account/klaytn_tx.ts
  | signedTx: TypedTransaction
  V
signedTx.validate                                  @ account/klaytn_tx.ts
signedTx.serialize                                 @ account/klaytn_tx.ts
signedTx.getMessageToSign                          @ account/klaytn_tx.ts
signedTx.{v,r,s,feePayer_v,feePayer_r,feePayer_s}  @ account/klaytn_tx.ts
  | SignTransactionResult
  V
User app.js
```
