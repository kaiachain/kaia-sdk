const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const blockNumber = 1;
  const returnTransactionObject = true;

  provider.kaia
    .getBlockByNumber(
      blockNumber,
      returnTransactionObject,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
