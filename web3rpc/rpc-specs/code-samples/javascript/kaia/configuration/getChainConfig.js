const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const blockNumberOrTag = 100;
  provider.kaia
    .getChainConfig({ blockNumberOrTag }, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
