const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  provider.kaia.newPendingTransactionFilter({}, (err, data, response) => {
    console.log(data);
  });
})();
