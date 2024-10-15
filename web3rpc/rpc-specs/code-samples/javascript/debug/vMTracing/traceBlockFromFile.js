const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const fileName = "/home/kaia/block.rlp";

  provider.debug
    .traceBlockFromFile(fileName, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
