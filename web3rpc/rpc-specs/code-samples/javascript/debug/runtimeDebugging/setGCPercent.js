const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const percent = 100;

  provider.debug
    .setGCPercent(percent, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
