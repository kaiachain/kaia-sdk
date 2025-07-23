const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const blockNumber = "latest";

  provider.kaia
    .getBlsInfos(blockNumber, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
