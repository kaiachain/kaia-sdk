const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  provider.klay.nodeAddress({}, (err, data, response) => {
    console.log(data);
  });
})();
