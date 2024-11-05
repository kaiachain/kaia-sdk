# Web3.js Extension for kaia

Web3.js Extension for kaia offers:

- Drop-in replacement to `new Web3(...)` that supports both Ethereum and kaia transaction types involving AccountKey and TxTypes. See [Modifications to the Web3 object](#modifications-to-the-web3-object) section for details

## Install

### Node.js

- Install
    ```sh
    npm install --save @kaiachain/web3js-ext
    ```
- ESM or TypeScript
    ```ts
    import { Web3 } from "@kaiachain/web3js-ext";
    const web3 = new Web3("https://public-en-kairos.node.kaia.io");
    ```
- CommonJS
    ```js
    const { Web3 } = require("@kaiachain/web3js-ext");
    const web3 = new Web3("https://public-en-kairos.node.kaia.io");
    ```

### Browser

It is not recommended to use CDNs in production, But you can use below for quick prototyping.

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/web3js-ext@latest/dist/web3js-ext.bundle.js"></script>
<script>
const web3 = new web3_ext.Web3(window.klaytn);
</script>
```

## Usage

See [example](./example) and [test](./test).

## Modifications to the Web3 object

See [DESIGN](./DESIGN.md) for source code organization.

### Accounts

- Following functions can handle Klaytn TxTypes. See [src/account/index.ts](./src/account/index.ts)
  ```js
  // account independent functions
  web3.eth.accounts.recoverTransaction(rlp)
  web3.eth.accounts.signTransaction(obj or rlp)
  web3.eth.accounts.signTransactionAsFeePayer(obj or rlp)

  // account-bound functions
  var account = web3.eth.accounts.create()
  var account = web3.eth.accounts.privateKeyToAccount(priv)
  var account = web3.eth.accounts.decrypt(keystore)
  account.signTransaction(obj or rlp)
  account.signTransactionAsFeePayer(obj or rlp)
  ```
- Following functions can handle the [KIP-3 Klaytn keystore format v4](https://kips.kaia.io/KIPs/kip-3)
  ```js
  web3.eth.accounts.decrypt(keystore)
  web3.eth.accounts.decryptList(keystore)
  ```

### Eth RPC wrappers

- Following functions calls different RPC, and handle Klaytn TxTypes. See [src/eth/index.ts](./src/eth/index.ts)
  ```js
  // Try klay_protocolVersion, falls back to eth_protocolVersion
  web3.eth.getProtocolVersion()

  // klay_sendTransaction if Klaytn TxType, otherwise eth_sendTransaction
  // Additional treatment for Kaikas compatibility
  web3.eth.sendTransaction(obj)

  // klay_sendRawTransaction if Klaytn TxType, otherwise eth_sendRawTransaction
  web3.eth.sendSignedTransaction(rlp)

  // klay_signTransaction if Klaytn TxType, otherwise eth_signTransaction
  // Additional treatment for Kaikas compatibility
  web3.eth.signTransaction(obj)
  ```

### Klaytn RPCs

- Following functions calls Klaytn RPCs. See [src/web3.ts](./src/web3.ts)
  ```js
  web3.klay.blockNumber() // klay_blockNumber
  web3.net.networkID() // net_networkID
  ```
