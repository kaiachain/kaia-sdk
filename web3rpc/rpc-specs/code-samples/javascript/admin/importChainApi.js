const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const fileName = "/tmp/chain.txt";

  provider.admin
    .importChain(fileName, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
