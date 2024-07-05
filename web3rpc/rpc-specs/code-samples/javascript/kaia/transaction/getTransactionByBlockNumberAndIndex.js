const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const blockNumber = 118593751;
  const transactionIndexPosition = "0x0";

  provider.kaia
    .getTransactionByBlockNumberAndIndex(
      blockNumber,
      transactionIndexPosition,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
