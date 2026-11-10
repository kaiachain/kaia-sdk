import { createWalletClient, http, kairos, privateKeyToAccount } from "@kaiachain/viem-ext";

const legacyWallet = createWalletClient({
  chain: kairos,
  transport: http(),
  account: privateKeyToAccount(
    "0x28d06bfebe5447d798ec7d1f208a045a15a1d6872b2a3cbb74cc896817bbb90d"
  ),
});
(async () => {
  // legacy tx
  const legacyRequest = await legacyWallet.prepareTransactionRequest({
    to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    value: 0,
  });

  console.log("populated legacy request", legacyRequest);

  const sentLegacyTx = await legacyWallet.sendTransaction(legacyRequest);
  console.log("value transfer legacy tx", sentLegacyTx);
})();
