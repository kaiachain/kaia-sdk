# Viem Extension for Kaia

Viem Extension for Kaia offers:

- Supports both Ethereum and kaia transaction types.
- Work with both MetaMask (`window.ethereum`) and Kaikas (`window.klaytn`)

## Install

> **_NOTE:_**
> @kaiachain/viem-ext@^2.0.5 recommends node 20 or later if you have issues with ES Module resolution.

### Node.js

- Install
    ```sh
    npm install --save @kaiachain/viem-ext
    ```
- ESM or TypeScript
    ```ts
    import { http, createPublicClient, kairos } from "@kaiachain/viem-ext";
    const publicClient = createPublicClient({
        chain: kairos,
        transport: http(),
    })
    ```
- CommonJS
    ```js
    const { http, createPublicClient, kairos } = require("@kaiachain/viem-ext");
    const publicClient = createPublicClient({
        chain: kairos,
        transport: http(),
    })

## Usage

See [example](./examples) and [test](./tests).