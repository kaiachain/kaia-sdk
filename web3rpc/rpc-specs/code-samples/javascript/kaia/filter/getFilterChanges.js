const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const quantity = "0x16";
  provider.kaia
    .getFilterChanges(quantity, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
