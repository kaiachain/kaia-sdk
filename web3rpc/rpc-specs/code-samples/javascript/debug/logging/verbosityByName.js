const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const name = "API";
  const level = 1;

  provider.debug
    .verbosityByName(name, level, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
