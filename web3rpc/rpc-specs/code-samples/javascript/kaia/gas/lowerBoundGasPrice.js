const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  provider.kaia.lowerBoundGasPrice({}, (err, data, response) => {
    console.log(data);
  });
})();
