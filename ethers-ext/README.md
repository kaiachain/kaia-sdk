# Ethers.js Extension for Klaytn

Ethers.js Extension for Klaytn offers:

- Drop-in replacement to `ethers.Wallet` that handles both Ethereum and Klaytn transaction types
  involving AccountKey and TxTypes.
- Drop-in replacement to `ethers.providers.JsonRpcProvider` that provides accesses to both Ethereum RPCs and
  Klaytn-specific RPCs.
- Drop-in replacement to `ethers.Web3Provider` to work with both MetaMask (`window.ethereum`) and Kaikas (`window.klaytn`)

## Note for ethers v6

`@kaiachain/ethers-ext` was developed based on ethers v5. As a result, ethers v6 classes are incompatible with ethers-ext classes. If you are using ethers v6 in your codebase, do not mix ethers v6 classes and ethers-ext classes. e.g. ethers v6 JsonRpcProvider cannot be supplied to ethers-ext Wallet.

- **Don't**: mix ethers v6 and ethers-ext
    ```js
    const ethers = require("ethers");
    const { Wallet } = require("@kaiachain/ethers-ext");

    const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");
    const wallet = new Wallet("<private key>", provider);
    ```
- **Do**: mix ethers v5 and ethers-ext
    ```js
    const ethers = require("ethers");
    const { Wallet } = require("@kaiachain/ethers-ext");

    const provider = new ethers.providers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");
    const wallet = new Wallet("<private key>", provider);
    ```
- **Do**: ethers-ext only
    ```js
    const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext");

    const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
    const wallet = new Wallet("<private key>", provider);
    ```

## Install

### Node.js

- Install
    ```sh
    npm install --save @kaiachain/ethers-ext ethers@5
    ```
- ESM or TypeScript
    ```ts
    import { Wallet, JsonRpcProvider } from "@kaiachain/ethers-ext";
    const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
    const wallet = new Wallet("<private key>", provider);
    ```
- CommonJS
    ```js
    const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext");
    const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
    const wallet = new Wallet("<private key>", provider);
    ```

### Browser

It is not recommended to use CDNs in production, But you can use below for quick prototyping.

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/ethers-ext@latest/dist/ethers-ext.bundle.js"></script>
<script>
const provider = new ethers_ext.providers.Web3Provider(window.klaytn);
</script>
```

## Usage

See [example](./example) and [test](./test).


## Class extension design

```mermaid
classDiagram
    namespace ethers_v5 {
        class ethers_Signer["ethers.Signer"] {
            provider
            checkTransaction()
            populateTransaction()
            sendTransaction()
        }
        class ethers_Wallet["ethers.Wallet"] {
            connect()
            getAddress()
            signMessage()
            signTransaction()
            static fromEncryptedJson()
            static fromEncryptedJsonSync()
        }
        class ethers_JsonRpcSigner["ethers.JsonRpcSigner"] {
            connect()
            connectUnchecked()
            getAddress()
            signMessage()
            signTransaction()
            sendUncheckedTransaction()
            _legacySignMessage()
            _signTypedData()
            override sendTransaction()
        }

        class ethers_Provider["ethers.Provider"] {
        }
        class ethers_BaseProvider["ethers.BaseProvider"] {
        }
        class ethers_JsonRpcProvider["ethers.JsonRpcProvider"] {
            getSigner()
            send()
        }
        class ethers_Web3Provider["ethers.Web3Provider"] {
            override send()
        }
        class ethers_ExternalProvider["ethers.ExternalProvider"] {
            isMetaMask
            request()
        }
    }
    namespace klaytn_ethers_ext {
        class Wallet {
            override getAddress()
            override checkTransaction()
            override populateTransaction()
            override signTransaction()
            override sendTransaction()
            override static fromEncryptedJson()
            override static fromEncryptedJsonSync()
            signTransactionAsFeePayer()
            sendTransactionAsFeePayer()
            static fromEncryptedJsonList()
            static fromEncryptedJsonListSync()
        }
        class JsonRpcSigner {
            override connectUnchecked()
            override getAddress()
            override signMessage()
            override checkTransaction()
            override populateTransaction()
            override signTransaction()
            override _legacySignMessage()
            override _signTypedData()
            override sendTransaction()
            override sendUncheckedTransaction()
        }

        class JsonRpcProvider {
            admin
            debug
            governance
            klay
            net
            personal
            txpool

            override getSigner()
            override send()
        }
        class Web3Provider {
            admin
            debug
            governance
            klay
            net
            personal
            txpool

            override getSigner()
        }
        class ExternalProvider {
            isKaikas
        }
    }

    ethers_Signer <|-- ethers_Wallet
    ethers_Signer <|-- ethers_JsonRpcSigner

    ethers_Wallet <|-- Wallet
    ethers_JsonRpcSigner <|-- JsonRpcSigner


    ethers_Provider <|-- ethers_BaseProvider
    ethers_BaseProvider <|-- ethers_JsonRpcProvider
    ethers_JsonRpcProvider <|-- ethers_Web3Provider

    ethers_JsonRpcProvider <|-- JsonRpcProvider
    ethers_Web3Provider <|-- Web3Provider
    ethers_ExternalProvider <|-- ExternalProvider

```
