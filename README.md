# Overview
**kaia SDK** is a set of SDKs to interact with kaia (mono repo). It includes 4 SDKs (ethers-ext, web3js-ext, web3j-ext, web3py-ext) and allows developer to easily interact with kaia without very few changes. Furthermore **OAS 3.0** ([OpenAPI Specification 3.0](https://swagger.io/specification/)) is used to generate automatically the kaia NodeAPI **specification** and web API provider **source code** named web3rpc.

### web3rpc wtih OpenAPI
kaia has extended the RPC APIs over early Ethereum to allow developers to get various or kaia-specific data. Considering that would increasingly be mismatch between documentation and source code, OpenAPI specification is adopted to **generate automatically the documentation and source code in the same time**. You can see all the API specifications for kaia Node in the [rpc-specs](https://github.com/kaiachain/kaia-sdk/tree/dev/web3rpc/rpc-specs) directory

### extension strategies for existing web3 SDKs
The extension is focused on seamless development for web3 developers. Being able to develop web3 service from other chain without feeling differences will make the developers comfortable and more productivity. It also makes developers easy to build a service among several chains with a single SDK and same pattern. Except web3j-ext SDK for java language, what you need to do is just importing the extension with the existing SDK.

- ethers extension : **ethers-ext** (javascript) [NPM]() [Github](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext)
- web3js extension : **web3js-ext** (javascript) [NPM]() [Github](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext)
- viem extension : **viem-ext** (javascript) [NPM]() [Github](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext)
- web3j extension : **web3j-ext** (java) [MVN]() [Github](https://github.com/kaiachain/kaia-sdk/tree/main/web3j-ext)
- web3py extension : **web3py-ext** (python) [pypi]() [Github](https://github.com/kaiachain/kaia-sdk/tree/main/web3py-ext)
