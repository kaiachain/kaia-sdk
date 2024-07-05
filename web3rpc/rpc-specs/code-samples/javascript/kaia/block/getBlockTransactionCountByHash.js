const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const blockHash =
    "0xba647d41423faeebe8a7c64737d284fc2eba6f0388a3e1ebf6243db509ec1577";

  provider.kaia
    .getBlockTransactionCountByHash(blockHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
