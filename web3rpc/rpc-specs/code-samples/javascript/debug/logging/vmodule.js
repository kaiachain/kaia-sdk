const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const module = "p2p=4";

  provider.debug
    .vmodule(module, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
