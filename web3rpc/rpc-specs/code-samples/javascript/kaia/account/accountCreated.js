const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const address = "0xa4f42d4d2a3a13874406435500950c9bf2d783db";
  const blockTag = "latest";
  provider.kaia
    .accountCreated(address, blockTag, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
