// AccountKeyRoleBased
// https://docs.klaytn.foundation/docs/learn/accounts/

const { ethers } = require("ethers");

const { Wallet, TxType, parseKlay } = require("@klaytn/ethers-ext");

const senderAddr = "0x5bd2fb3c21564c023a4a735935a2b7a238c4ccea";
const senderPriv = "0x9ba8cb8f60044058a9e6f815c5c42d3a216f47044c61a1750b6d29ddc7f34bda";
const senderRoleTransactionPriv = "0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac";
const senderRoleAccountUpdatePriv = "0x9ba8cb8f60044058a9e6f815c5c42d3a216f47044c61a1750b6d29ddc7f34bda";
const senderRoleFeePayerPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const recieverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";

const provider = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net");
const txWallet = new Wallet(senderAddr, senderRoleTransactionPriv, provider);

async function main() {
  let tx = { // use Klaytn TxType to send transaction from Klaytn typed account
    type: TxType.ValueTransfer,
    from: senderAddr,
    to: recieverAddr,
    value: parseKlay("0.01"),
    gasLimit: 100000,
  };

  const populatedTx = await txWallet.populateTransaction(tx);
  const rawTx = await txWallet.signTransaction(populatedTx);
  console.log("rawTx", rawTx);

  const sentTx = await txWallet.sendTransaction(tx);
  console.log("sentTx", sentTx.hash);

  const receipt = await sentTx.wait();
  console.log("receipt", receipt);

  const addr = await provider.send("klay_recoverFromTransaction", [rawTx, "latest"]);
  console.log("recoveredAddr rpc", addr, addr.toLowerCase() === senderAddr.toLowerCase());
}

main().catch(console.error);
