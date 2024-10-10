// TxTypeValueTransferMemo
// https://docs.klaytn.foundation/docs/learn/transactions/

const ethers = require("ethers6");

const { Wallet, TxType, parseKlay } = require("@kaiachain/ethers-ext/v6");

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
    type: TxType.ValueTransferMemo,
    from: senderAddr,
    to: recieverAddr,
    value: parseKlay("0.01").toString(),
    data: "0x1234567890",
  };

  const sentTx = await wallet.sendTransaction(tx);
  console.log("sentTx", sentTx.hash);

  const receipt = await sentTx.wait();
  console.log("receipt", receipt);
}

main();
