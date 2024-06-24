const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const transactionHash =
    "0x21b2919b89278ca786226f10edbaadced7381dbd73df546a4823547aaebffa58";

  provider.kaia
    .getTransactionBySenderTxHash(
      transactionHash,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
