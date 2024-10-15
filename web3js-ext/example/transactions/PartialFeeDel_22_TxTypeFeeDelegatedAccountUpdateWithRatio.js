// TxTypeFeeDelegatedAccountUpdateWithRatio
// https://docs.kaia.io/docs/learn/transactions/

const { Web3, TxType, AccountKeyType, getPublicKeyFromPrivate } = require("@kaiachain/web3js-ext");

// Using senderPriv == senderNewPriv to execute this example repeatedly.
// But you might want to register a different private key.
const senderAddr = "0x30908464d76604420162a6c880c0e1c7e641bad7";
const senderPriv = "0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b";
const senderNewPriv = "0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b";
const feePayerAddr = "0xcb0eb737dfda52756495a5e08a9b37aab3b271da";
const feePayerPriv = "0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);
const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPriv);
const feePayerAccount = web3.eth.accounts.privateKeyToAccount(feePayerPriv);

async function main() {
  const publicKey = getPublicKeyFromPrivate(senderNewPriv);
  console.log({ publicKey });

  const tx = {
    type: TxType.FeeDelegatedAccountUpdateWithRatio,
    from: senderAddr,
    key: {
      type: AccountKeyType.Public,
      key: publicKey
    },
    feeRatio: 30,
  };

  // Sign transaction by sender
  const signResult1 = await senderAccount.signTransaction(tx);
  console.log("senderTxHashRLP", signResult1.rawTransaction);

  // Sign and send transaction by fee payer
  const signResult2 = await feePayerAccount.signTransactionAsFeePayer(signResult1.rawTransaction);
  console.log("signedTx", signResult2.transactionHash);

  const receipt = await web3.eth.sendSignedTransaction(signResult2.rawTransaction);
  console.log("receipt", receipt);
}

main();
