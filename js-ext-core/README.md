# JavaScript Extension Core for Klaytn

Sub-components of Klaytn JavaScript SDKs.

For dApp developers and blockchain users, use the SDKs like [@kaiachain/ethers-ext](https://www.npmjs.com/package/@kaiachain/ethers-ext) and [@kaiachain/web3js-ext](https://www.npmjs.com/package/@kaiachain/web3js-ext).

- `FieldSetFactory` to easily build custom RLP-encodable types
- `AccountKeyFactory` for Klaytn account objects
- `KlaytnTxFactory` for Klaytn transaction objects
- `AccountKeyType` and `TxType` enums
- `getRpcTxObject` to normalize `eth_call` RPC parameters
- `getCompressedPublicKey` and `getSignatureTuple` to normalize cryptographic data
- `splitKeystoreKIP3` for handling KIP-3 JSON keystore
- `formatKlay` and `parseKlay` to convert KLAY denominations
- `asyncOpenApi` to promisify [@kaiachain/web3rpc](https://www.npmjs.com/package/@kaiachain/web3rpc) methods

## Install

```
npm install --save @kaiachain/js-ext-core
```

## Usage

See test.

