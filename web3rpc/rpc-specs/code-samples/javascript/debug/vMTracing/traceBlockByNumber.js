const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const block = 2459;

  provider.debug
    .traceBlockByNumber(block, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
