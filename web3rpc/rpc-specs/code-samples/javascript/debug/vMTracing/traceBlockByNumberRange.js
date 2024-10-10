const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const startBlock = 21;
  const endBlock = 30;

  provider.debug
    .traceBlockByNumberRange(
      startBlock,
      endBlock,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
