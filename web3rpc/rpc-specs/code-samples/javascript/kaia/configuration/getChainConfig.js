const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const blockNumberOrTag = 100;
  provider.kaia
    .getChainConfig({ blockNumberOrTag }, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
