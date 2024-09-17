const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const blockNumber = "0xe8";
  provider.eth
    .getBlockTransactionCountByNumber(
      blockNumber,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
