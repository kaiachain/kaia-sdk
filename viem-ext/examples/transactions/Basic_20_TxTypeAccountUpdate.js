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
  const pub = ethers.SigningKey.computePublicKey(
    "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8",
    true
  );
  const txRequest = await senderWallet.prepareTransactionRequest({
    account: senderWallet.account,
    to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    type: TxType.AccountUpdate,
    key: {
      type: AccountKeyType.Public,
      key: pub,
    },
  });
  console.log("populated tx request", txRequest);

  const signedTx = await senderWallet.signTransaction(txRequest);
  const sentTx = await senderWallet.request({
    method: "kaia_sendRawTransaction",
    params: [signedTx],
  });
  console.log("account update tx", sentTx);
})();
