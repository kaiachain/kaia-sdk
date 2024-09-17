const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const quantity = "0xd32fd16b6906e67f6e2b65dcf48fc272";

  provider.kaia
    .uninstallFilter(quantity, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
