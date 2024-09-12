const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const kipType = "kip113";
  const blockNumber = "latest";

  provider.klay
    .getAllRecordsFromRegistry(
      kipType,
      blockNumber,
      {},
      (err, data, response) => {}
    )
    .then((data) => {
      console.log(data);
    });
})();
