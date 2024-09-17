const { JsonRpcProvider } = require("@kaiachain/ethers-ext");

(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  provider
    .getBlockNumber({}, (err, data, response) => {
      console.log(data);
    })
    .then((data) => {
      console.log(data);
    });
})();
