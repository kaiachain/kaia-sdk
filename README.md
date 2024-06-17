[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

# NO LONGER MAINTAINED

Since the launch of Kaia Blockchain this repository has been parked in favour of the new open-source projects in [Kaia's Github](https://github.com/kaiachain). Contributors have now moved there continuing with massive open-source contributions to our blockchain ecosystem. A big thank you to everyone who has contributed to this repository. For more information about Klaytn's chain merge with Finschia blockchain please refer to the launching of Kaia blockchain - [kaia.io](https://kaia.io/).

---

![logo.png](<logo.png>)

# Overview
**web3klaytn** is a set of SDKs to interact with Klaytn. It includes 4 SDKs (ethers-ext, web3js-ext, web3j-ext, web3py-ext) and allows developer to easily interact with klaytn without very few changes. Furthermore **OAS 3.0** ([OpenAPI Specification 3.0](https://swagger.io/specification/)) is used to generate automatically the klaytn NodeAPI **specification** and web API provider **source code** named web3rpc.

### web3rpc wtih OpenAPI
Klaytn has extended the RPC APIs over early Ethereum to allow developers to get various or klaytn-specific data. Considering that would increasingly be mismatch between documentation and source code, OpenAPI specification is adopted to **generate automatically the documentation and source code in the same time**. You can see all the API specifications for Klaytn Node in the [rpc-specs](https://github.com/klaytn/web3klaytn/tree/dev/web3rpc/rpc-specs) directory

### extension strategies for existing web3 SDKs
The extension is focused on seamless development for web3 developers. Being able to develop web3 service from other chain without feeling differences will make the developers comfortable and more productivity. It also makes developers easy to build a service among several chains with a single SDK and same pattern. Except web3j-ext SDK for java language, what you need to do is just importing the extension with the existing SDK.

- ethers extension : **ethers-ext** (javascript) [NPM](https://www.npmjs.com/package/@klaytn/ethers-ext) [Github](https://github.com/klaytn/web3klaytn/tree/main/ethers-ext)
- web3js extension : **web3js-ext** (javascript) [NPM](https://www.npmjs.com/package/@klaytn/web3js-ext) [Github](https://github.com/klaytn/web3klaytn/tree/main/web3js-ext)
- web3j extension : **web3j-ext** (java) [MVN](https://mvnrepository.com/artifact/foundation.klaytn/web3j-ext) [Github](https://github.com/klaytn/web3klaytn/tree/main/web3j-ext)
- web3py extension : **web3py-ext** (python) [pypi](https://pypi.org/project/web3py-ext/) [Github](https://github.com/klaytn/web3klaytn/tree/main/web3py-ext)
