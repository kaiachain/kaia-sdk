// AccountKeyLegacy
// https://docs.klaytn.foundation/docs/learn/accounts/

const { ethers } = require("ethers");

const { Wallet, TxType } = require("@klaytn/ethers-ext");

const senderAddr = "0xb2ba72e1f84b7b8cb15487a2bf20328f2cf40c25";
const senderPriv = "0xebceaca693ea3740231be94f38af6090d3aded336725d26a09b7d14e8e485e1e";
const recieverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";

const provider = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net");
const wallet = new Wallet(senderPriv, provider);

async function main() {
  const tx = {
    // for should not be called by a legacy transaction for calling klay_recoverFromTransaction
    type: TxType.ValueTransfer,
    from: senderAddr,
    to: recieverAddr,
    value: 0,
  };

  const populatedTx = await wallet.populateTransaction(tx);
  const rawTx = await wallet.signTransaction(populatedTx);
  console.log("rawTx", rawTx);

  const sentTx = await wallet.sendTransaction(tx);
  console.log("sentTx", sentTx.hash);

  const receipt = await sentTx.wait();
  console.log("receipt", receipt);

  const addr = await provider.send("klay_recoverFromTransaction", [rawTx, "latest"]);
  console.log("recoveredAddr rpc", addr, addr.toLowerCase() === senderAddr.toLowerCase());
}

main().catch(console.error);
