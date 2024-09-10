const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const address = "0x1cbd3b2770909d4e10f157cabc84c7264073c9ec";
  const blockNumberOrHash = "latest";

  provider.klay
    .getBalance(address, blockNumberOrHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
