const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const blockNumberOrHash = "latest";
  provider.eth
    .createAccessList(
      transactionArgs,
      blockNumberOrHash,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
