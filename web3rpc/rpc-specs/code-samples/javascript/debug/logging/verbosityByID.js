const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const id = 1;
  const level = 3;

  provider.debug
    .verbosityByID(id, level, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
