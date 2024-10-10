const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const quantity = "0x16";
  provider.kaia
    .getFilterLogs(quantity, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
