import { AccountKeyType, createWalletClient, http, kairos, privateKeyToAccount, TxType } from "@kaiachain/viem-ext";
import { ethers } from "ethers";

const senderWallet = createWalletClient({
  chain: kairos,
  transport: http(),
  account: privateKeyToAccount(
    "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8"
  ),
})
const feePayerWallet = createWalletClient({
  chain: kairos,
  transport: http(),
  account: privateKeyToAccount(
    "0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4"
  ),
});
(async () => {
  const txRequest = await senderWallet.prepareTransactionRequest({
    account: senderWallet.account,
    type: TxType.FeeDelegatedCancel,
    feeRatio: 30
  });
  const signedTx = await senderWallet.signTransaction(txRequest);
  console.log(signedTx);

  const feePayerSignedTx = await feePayerWallet.signTransactionAsFeePayer(
    signedTx
  );
  const res = await feePayerWallet.request({
    method: "kaia_sendRawTransaction",
    params: [feePayerSignedTx],
  });
  console.log("fee delegated cancel tx", res);
})();
