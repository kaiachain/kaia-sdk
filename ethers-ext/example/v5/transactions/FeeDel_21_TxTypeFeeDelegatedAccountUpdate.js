// TxTypeFeeDelegatedAccountUpdate
// https://docs.klaytn.foundation/docs/learn/transactions/

const ethers = require("ethers");

const { Wallet, TxType, AccountKeyType } = require("@klaytn/ethers-ext");

// Using senderPriv == senderNewPriv to execute this example repeatedly.
// But you might want to register a different private key.
const senderAddr = "0xe15cd70a41dfb05e7214004d7d054801b2a2f06b";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const senderNewPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const feePayerAddr = "0xcb0eb737dfda52756495a5e08a9b37aab3b271da";
const feePayerPriv = "0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4";

const provider = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net");
const senderWallet = new Wallet(senderAddr, senderPriv, provider); // decoupled account
const feePayerWallet = new Wallet(feePayerPriv, provider);

async function main() {
  const pub = ethers.utils.computePublicKey(senderNewPriv, true);
  console.log("pub", pub);

  const tx = {
    type: TxType.FeeDelegatedAccountUpdate,
    from: senderAddr,
    key: {
      type: AccountKeyType.Public,
      key: pub,
    }
  };

  // Sign transaction by sender
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);

  // Sign and send transaction by fee payer
  const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
  console.log("sentTx", sentTx.hash);

  const receipt = await sentTx.wait();
  console.log("receipt", receipt);
}

main();
