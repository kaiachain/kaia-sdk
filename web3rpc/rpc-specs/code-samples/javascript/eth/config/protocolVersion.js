const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  provider.eth
    .protocolVersion({}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
