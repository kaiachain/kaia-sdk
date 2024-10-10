// TxTypeSmartContractExecution
// https://docs.klaytn.foundation/docs/learn/transactions/

const { Web3, TxType } = require("@kaiachain/web3js-ext");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);
const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPriv);

const contractAddr = "0xD7fA6634bDDe0B2A9d491388e2fdeD0fa25D2067";
const contractAbi = JSON.parse('[{"inputs":[{"internalType":"uint256","name":"newNumber","type":"uint256"}],"name":"setNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}]');


async function main() {
  // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-encodeabi
  const contract = new web3.eth.Contract(contractAbi, contractAddr);
  const data = contract.methods.setNumber(0x123).encodeABI();

  const tx = {
    type: TxType.SmartContractExecution,
    from: senderAddr,
    to: contractAddr,
    data: data,
  };

  const signResult = await senderAccount.signTransaction(tx);
  console.log("signedTx", signResult.transactionHash);

  const receipt = await web3.eth.sendSignedTransaction(signResult.rawTransaction);
  console.log("receipt", receipt);
}

main();
