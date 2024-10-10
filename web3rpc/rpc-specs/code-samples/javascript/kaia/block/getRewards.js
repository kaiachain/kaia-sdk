const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const blockNumberOrTag = "latest";
  provider.kaia
    .getRewards(blockNumberOrTag, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
