const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const file = "block.profile";
  const seconds = 10;

  provider.debug
    .cpuProfile(file, seconds, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
