const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const data = "0x11223344";

  provider.kaia
    .sha3(data, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
