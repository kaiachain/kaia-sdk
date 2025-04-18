// TxTypeFeeDelegatedCancelWithRatio
// https://docs.kaia.io/docs/learn/transactions/

const ethers = require("ethers6");

const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv =
  "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const feePayerAddr = "0xcb0eb737dfda52756495a5e08a9b37aab3b271da";
const feePayerPriv =
  "0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4";

const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);
const senderWallet = new Wallet(senderPriv, provider);
const feePayerWallet = new Wallet(feePayerPriv, provider);

async function main() {
  const tx = {
    type: TxType.FeeDelegatedCancelWithRatio,
    from: senderAddr,
    feeRatio: 30,
  };

  // Sign transaction by sender
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);

  // Sign and send transaction by fee payer
  const sentTx = await feePayerWallet.sendTransactionAsFeePayer(
    senderTxHashRLP
  );
  console.log("sentTx", sentTx.hash);

  const receipt = await sentTx.wait();
  console.log("receipt", receipt);
}

main();
