// Legacy
// https://docs.klaytn.foundation/docs/learn/transactions/

const ethers = require("ethers6");

import { parseKlay, TxType, Wallet } from "../../src/v6";
const recieverAddr = "0xec8d2d57f76b39959116fb3b6879418e7b1baa18";
const senderAddr = "0xec8d2d57f76b39959116fb3b6879418e7b1baa18";
const senderPriv =
  "0x45ea7d3bb5722828ecc236c68bf4d0a9a8f3c7d62571012b7e802d8dc031344e";

const provider = new ethers.JsonRpcProvider(
  "https://public-en-baobab.klaytn.net"
);
const wallet = new Wallet(senderPriv, provider);

async function main() {
  const tx = {
    // when type is empty it will be automatically set to type 0 or 2
    // depending on the gasPrice, maxFeePerGas, maxPriorityFeePerGas fields.
    // here, type will be 2 because no gas-related fields are set.
    type: TxType.ValueTransfer,
    from: senderAddr,
    to: recieverAddr,
    value: parseKlay("0.01").toString(),
  };

  const sentTx = await wallet.sendTransaction(tx);
  console.log("sentTx", sentTx.hash);

  const receipt = await sentTx.wait();
  console.log("receipt", receipt);
}

main();
