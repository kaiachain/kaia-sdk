// Legacy
// https://docs.klaytn.foundation/docs/learn/transactions/

const ethers = require("ethers6");

const { Wallet, parseKlay } = require("@kaiachain/ethers-ext/v6");

const recieverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";
const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv =
  "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);
const wallet = new Wallet(senderPriv, provider);

async function main() {
  const tx = {
    // when type is empty it will be automatically set to type 0 or 2
    // depending on the gasPrice, maxFeePerGas, maxPriorityFeePerGas fields.
    // here, type will be 2 because no gas-related fields are set.
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
