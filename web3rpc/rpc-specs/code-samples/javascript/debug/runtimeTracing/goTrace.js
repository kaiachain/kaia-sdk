const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const file = "go.trace";
  const seconds = 5;

  provider.debug
    .goTrace(file, seconds, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
