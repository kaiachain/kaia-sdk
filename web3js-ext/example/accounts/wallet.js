const { Web3 } = require("@kaiachain/web3js-ext");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);

async function main() {
  // Access the shared wallet object web3.eth.accounts.wallet.

  // Create random
  await web3.eth.accounts.wallet.create(2);
  listWallet(web3.eth.accounts.wallet);

  // Add from private key
  await web3.eth.accounts.wallet.add(senderPriv);
  listWallet(web3.eth.accounts.wallet);

  // Find by address
  const senderAccount = web3.eth.accounts.wallet.get(senderAddr);
  console.log("senderAccount", senderAccount);

  // Find by index
  const account1 = web3.eth.accounts.wallet.get(1);
  console.log("account1", account1);

  // Remove by address
  await web3.eth.accounts.wallet.remove(senderAddr);
  listWallet(web3.eth.accounts.wallet);

  // Remove all accounts
  await web3.eth.accounts.wallet.clear();
  listWallet(web3.eth.accounts.wallet);
}

function listWallet(wallet) {
  console.log("listWallet count =", wallet.length);
  wallet.forEach((account, index) => console.log("-", index, account.address));
}

main().catch(console.err);
