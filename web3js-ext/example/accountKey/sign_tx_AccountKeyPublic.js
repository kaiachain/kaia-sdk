// AccountKeyPublic
// https://docs.klaytn.foundation/docs/learn/accounts/

const { Web3, TxType, toPeb } = require("@kaiachain/web3js-ext");

// Using senderPriv == senderNewPriv to execute this example repeatedly.
// But you might want to register a different private key.
const senderAddr = "0xfb60ded0ae96fe04eed6450aead860aa9d57128e";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const receiverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";

const provider = new Web3.providers.HttpProvider("https://public-en-baobab.klaytn.net");
const web3 = new Web3(provider);
const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPriv);

async function main() {
  let tx = {
    type: TxType.ValueTransfer,
    to: receiverAddr,
    value: toPeb("0.01", "KLAY"),
    from: senderAddr,
  };

  const signResult = await senderAccount.signTransaction(tx);
  console.log("signedTx", signResult.transactionHash);

  const receipt = await web3.eth.sendSignedTransaction(signResult.rawTransaction);
  console.log("receipt", receipt);

  const addr2 = await web3.klay.recoverFromTransaction(
    signResult.rawTransaction,
    "latest"
  );
  console.log("recoveredAddr rpc", addr2, addr2.toLowerCase() === senderAddr);
}

main().catch(console.error);
