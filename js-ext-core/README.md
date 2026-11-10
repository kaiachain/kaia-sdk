# JavaScript Extension Core for Kaia

Sub-components of Kaia JavaScript SDKs.

> **_NOTE:_**
> @kaiachain/js-ext-core@^1.2.0 recommends node 22 or later if you have issues with ES Module resolution.

For dApp developers and blockchain users, use the SDKs like [@kaiachain/ethers-ext](https://www.npmjs.com/package/@kaiachain/ethers-ext) and [@kaiachain/web3js-ext](https://www.npmjs.com/package/@kaiachain/web3js-ext).

- `FieldSetFactory` to easily build custom RLP-encodable types
- `AccountKeyFactory` for Kaia account objects
- `KlaytnTxFactory` for Kaia transaction objects
- `AccountKeyType` and `TxType` enums
- `getRpcTxObject` to normalize `eth_call` RPC parameters
- `getCompressedPublicKey` and `getSignatureTuple` to normalize cryptographic data
- `splitKeystoreKIP3` for handling KIP-3 JSON keystore
- `formatKaia` and `parseKaia` to convert KAIA denominations
- `asyncOpenApi` to promisify [@kaiachain/web3rpc](https://www.npmjs.com/package/@kaiachain/web3rpc) methods

## Install

```
npm install --save @kaiachain/js-ext-core
```

## Usage

See test.

