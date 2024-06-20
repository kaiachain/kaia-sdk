// AccountKeyPublic
// https://docs.klaytn.foundation/docs/learn/accounts/

const { ethers } = require("ethers");

const { Wallet, TxType, parseKlay } = require("@klaytn/ethers-ext");

const senderAddr = "0xe15cd70a41dfb05e7214004d7d054801b2a2f06b";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const senderNewPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const recieverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";

const provider = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net");
const newWallet = new Wallet(senderAddr, senderNewPriv, provider); // decoupled account

async function main() {
  let tx = { // use Klaytn TxType to send transaction from Klaytn typed account
    type: TxType.ValueTransfer,
    from: senderAddr,
    to: recieverAddr,
    value: parseKlay("0.01"),
  };

  const populatedTx = await newWallet.populateTransaction(tx);
  const rawTx = await newWallet.signTransaction(populatedTx);
  console.log("rawTx", rawTx);

  const sentTx = await newWallet.sendTransaction(tx);
  console.log("sentTx", sentTx.hash);

  const receipt = await sentTx.wait();
  console.log("receipt", receipt);

  const addr = await provider.send("klay_recoverFromTransaction", [rawTx, "latest"]);
  console.log("recoveredAddr rpc", addr, addr.toLowerCase() === senderAddr.toLowerCase());
}

main().catch(console.error);
