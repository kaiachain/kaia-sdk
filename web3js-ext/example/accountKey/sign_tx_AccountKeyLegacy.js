// AccountKeyLegacy
// https://docs.klaytn.foundation/docs/learn/accounts/

const { Web3, toPeb } = require("@kaiachain/web3js-ext");

const senderAddr = "0xb2ba72e1f84b7b8cb15487a2bf20328f2cf40c25";
const senderPriv = "0xebceaca693ea3740231be94f38af6090d3aded336725d26a09b7d14e8e485e1e";
const receiverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";

const provider = new Web3.providers.HttpProvider("https://public-en-baobab.klaytn.net");
const web3 = new Web3(provider);
const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPriv);

async function main() {
  let tx = {
    from: senderAddr,
    to: receiverAddr,
    value: toPeb("0.01", "KLAY"),
  };

  const signResult = await senderAccount.signTransaction(tx);
  console.log("signedTx", signResult.transactionHash);

  const receipt = await web3.eth.sendSignedTransaction(signResult.rawTransaction);
  console.log("receipt", receipt);

  const sig = signResult.signature;
  const addr2 = await web3.klay.recoverFromTransaction(senderAddr, sig, "latest");
  console.log("recoveredAddr rpc", addr2, addr2.toLowerCase() === senderAddr);
}

main().catch(console.error);