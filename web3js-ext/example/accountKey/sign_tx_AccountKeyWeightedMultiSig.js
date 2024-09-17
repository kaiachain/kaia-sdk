// AccountKeyWeightedMultiSig
// https://docs.klaytn.foundation/docs/learn/accounts/

const { Web3, TxType, toPeb } = require("@kaiachain/web3js-ext");

const senderAddr = "0x2bf611d14d330fd3688d10f2201321eacc8aa2ce";
const senderPriv1 = "0x31fadf868e68fd2e3f7a1c528023c9a86a45db850e9d6b82c1a82d4c75b469d1";
const senderPriv2 = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const senderPriv3 = "0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac";
const receiverAddr = "0x2bf611d14d330fd3688d10f2201321eacc8aa2ce";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);
const senderAccount1 = web3.eth.accounts.privateKeyToAccount(senderPriv1);
const senderAccount2 = web3.eth.accounts.privateKeyToAccount(senderPriv2);
const senderAccount3 = web3.eth.accounts.privateKeyToAccount(senderPriv3);

async function main() {
  let tx = {
    type: TxType.ValueTransfer,
    from: senderAddr,
    to: receiverAddr,
    value: toPeb("0.01", "KLAY"),
    gasLimit: 100000,
  };

  // The example senderAddr actually requires only 2 signature,
  // but we use 3 signatures to show different ways to sign a transaction.

  // sign 1: First signer sign from the tx object
  const signResult1 = await senderAccount1.signTransaction(tx);
  console.log("rawTx1", signResult1.rawTransaction);

  // sign 2: Rest of the signers sign from the rawTx
  const signResult2 = await senderAccount2.signTransaction(signResult1.rawTransaction);
  console.log("rawTx2", signResult2.rawTransaction);

  // sign 3: Last signer sign from the rawTx then send it
  const signResult3 = await senderAccount3.signTransaction(signResult2.rawTransaction);
  console.log("signedTx3", signResult3.transactionHash);

  const receipt = await web3.eth.sendSignedTransaction(signResult3.rawTransaction);
  console.log("receipt", receipt);

  const addr2 = await web3.klay.recoverFromTransaction(
    signResult3.rawTransaction,
    "latest"
  );
  console.log("recoveredAddr rpc", addr2, addr2.toLowerCase() === senderAddr);
}

main().catch(console.error);