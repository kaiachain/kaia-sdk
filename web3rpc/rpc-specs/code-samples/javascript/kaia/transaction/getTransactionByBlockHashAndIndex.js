const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const blockHash =
    "0x4c4cbf242a80183d2ea2daf047c578d5fc89c0b14c4262606c8b6bb0b36715be";
  const transactionIndexPosition = "0x0";

  provider.kaia
    .getTransactionByBlockHashAndIndex(
      blockHash,
      transactionIndexPosition,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
