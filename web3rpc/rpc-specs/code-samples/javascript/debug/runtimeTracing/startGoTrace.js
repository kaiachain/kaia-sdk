const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const file = "go.trace";

  provider.debug
    .startGoTrace(file, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
