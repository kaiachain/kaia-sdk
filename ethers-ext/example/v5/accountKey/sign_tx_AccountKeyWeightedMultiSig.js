// AccountKeyWeightedMultiSig
// https://docs.klaytn.foundation/docs/learn/accounts/

const { ethers } = require("ethers");

const { Wallet, TxType, AccountKeyType, parseKlay } = require("@klaytn/ethers-ext");

const senderAddr = "0x82c6a8d94993d49cfd0c1d30f0f8caa65782cc7e";
const senderPriv = "0xa32c30608667d43be2d652bede413f12a649dd1be93440878e7f712d51a6768a";
const senderNewPriv1 = "0xa32c30608667d43be2d652bede413f12a649dd1be93440878e7f712d51a6768a";
const senderNewPriv2 = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const senderNewPriv3 = "0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac";
const recieverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";

const provider = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net");
const wallet1 = new Wallet(senderAddr, senderNewPriv1, provider);
const wallet2 = new Wallet(senderAddr, senderNewPriv2, provider);
const wallet3 = new Wallet(senderAddr, senderNewPriv3, provider);

async function main() {
  let tx = { // use Klaytn TxType to send transaction from Klaytn typed account
    type: TxType.ValueTransfer,
    from: senderAddr,
    to: recieverAddr,
    value: parseKlay("0.01"),
    gasLimit: 100000,
  };

  // The example senderAddr actually requires only 2 signature (threshold = 2),
  // but we use 3 signatures to show different ways to sign a transaction.

  // sign 1: First signer sign from the tx object
  const populatedTx = await wallet1.populateTransaction(tx);
  const rawTx1 = await wallet1.signTransaction(populatedTx);
  console.log("rawTx1", rawTx1);

  // sign 2: Middle signer sign from the rawTx
  const rawTx2 = await wallet2.signTransaction(rawTx1);
  console.log("rawTx2", rawTx2);

  // sign 3: Last signer sign and send from the rawTx
  const sentTx3 = await wallet3.sendTransaction(rawTx2);
  console.log("sentTx3", sentTx3.hash);

  const receipt = await sentTx3.wait();
  console.log("receipt", receipt);

  const addr = await provider.send("klay_recoverFromTransaction", [rawTx2, "latest"]);
  console.log("recoveredAddr rpc", addr, addr.toLowerCase() === senderAddr.toLowerCase());
}

main().catch(console.error);
