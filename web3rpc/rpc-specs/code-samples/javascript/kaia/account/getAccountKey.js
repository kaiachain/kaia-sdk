const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const address = "0xa36a5fdc679ecaabe057556ccec2f3558068bdc8";
  const blockNumberOrHash = "latest";

  provider.kaia
    .getAccountKey(address, blockNumberOrHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
