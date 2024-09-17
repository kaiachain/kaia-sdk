const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const filterId = "0xb";

  provider.eth
    .uninstallFilter(filterId, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
