import { AccountKeyType, createWalletClient, http, privateKeyToAccount, TxType } from "@kaiachain/viem-ext";
import { ethers } from "ethers";
import { kairos } from "viem/chains";
const senderWallet = createWalletClient({
  chain: kairos,
  transport: http(),
  account: privateKeyToAccount(
    "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8"
  ),
});
// Example usage
(async () => {
  const txRequest = await senderWallet.prepareTransactionRequest({
    account: senderWallet.account,
    type: TxType.Cancel,
  });
  console.log("txRequest", txRequest);
  const sentTx = await senderWallet.sendTransaction(txRequest);
  console.log("Cancel tx", sentTx);
  // account update
})();
