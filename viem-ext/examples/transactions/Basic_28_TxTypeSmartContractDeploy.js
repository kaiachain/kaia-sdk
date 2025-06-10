import {
  http,
  createWalletClient, kairos,
  TxType,
  privateKeyToAccount
} from "@kaiachain/viem-ext";


const senderWallet = createWalletClient({
  chain: kairos,
  transport: http(),
  account: privateKeyToAccount(
    "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8"
  ),
});
// Example usage
(async () => {
  const tx = await senderWallet.prepareTransactionRequest({
    type: TxType.SmartContractDeploy,
    account: senderWallet.account,
    value: 0,
    humanReadable: false,
    codeFormat: 0,
    data: '0x608060405234801561001057600080fd5b5060f78061001f6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220e0f4e7861cb6d7acf0f61d34896310975b57b5bc109681dbbfb2e548ef7546b364736f6c63430008120033',
  });
  const sentTx = await senderWallet.sendTransaction(tx);
  console.log("contract deploy tx", sentTx);

})();
