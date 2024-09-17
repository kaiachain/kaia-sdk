const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const blockNumber = 119189116;
  const uncleIndex = "0x1";

  provider.eth
    .getUncleByBlockNumberAndIndex(
      blockNumber,
      uncleIndex,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
