import {
  http,
  encodeFunctionData,
  createWalletClient, createPublicClient, kairos,
  TxType,
  privateKeyToAccount
} from "@kaiachain/viem-ext";

const publicClient = createPublicClient({
  chain: kairos,
  transport: http(),
});
const senderWallet = createWalletClient({
  chain: kairos,
  transport: http(),
  account: privateKeyToAccount(
    "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8"
  ),
});
// Example usage
(async () => {
  const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";
  const abi = [{ "inputs": [{ "internalType": "uint256", "name": "initNumber", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "number", "type": "uint256" }], "name": "SetNumber", "type": "event" }, { "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "number", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newNumber", "type": "uint256" }], "name": "setNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
  const data = encodeFunctionData({
    abi,
    args: [Date.now()],
    functionName: "setNumber",
  });
  const tx = await senderWallet.prepareTransactionRequest({
    type: TxType.SmartContractExecution,
    account: senderWallet.account,
    to: contractAddr,
    value: 0,
    data,
  });
  console.log("preparedTx", tx);

  const sentTx = await senderWallet.sendTransaction(tx);
  console.log("contract interaction tx", sentTx);

  const result = await publicClient.readContract({
    address: contractAddr,
    abi,
    functionName: 'number'
  })
  console.log('Current contract value', result);
})();
