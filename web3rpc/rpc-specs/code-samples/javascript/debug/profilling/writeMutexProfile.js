const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const file = "mutex.profile";

  provider.debug
    .writeMutexProfile(file, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
