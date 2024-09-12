const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const number = "0x100";

  provider.debug
    .setHead(number, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
