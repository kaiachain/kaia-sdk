const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const target = 3;

  provider.debug
    .setVMLogTarget(target, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
