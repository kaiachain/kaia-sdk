const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const file = "mem.profile";

  provider.debug
    .writeMemProfile(file, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
