// AccountKeyLegacy
// https://docs.kaia.io/docs/learn/accounts/

const { Web3, TxType, AccountKeyType, getPublicKeyFromPrivate } = require("@kaiachain/web3js-ext");

// Using legacy AccountKey to execute this example repeatedly.
// But you might want to register a different Accountkey.
const senderAddr = "0xecbf243ac167a3b5097fef758e07881582a89027";
const senderPriv = "0xc696ccd259792f2ffb87e0012e4a37ae3526a3224686225af679e3aaa2aeab0d";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);
const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPriv);

async function main() {
  const tx = {
    type: TxType.AccountUpdate,
    from: senderAddr,
    key: {
      type: AccountKeyType.Legacy,
    }
  };

  const signResult = await senderAccount.signTransaction(tx);
  console.log("signedTx", signResult.transactionHash);

  const receipt = await web3.eth.sendSignedTransaction(signResult.rawTransaction);
  console.log("receipt", receipt);
}

main().catch(console.error);