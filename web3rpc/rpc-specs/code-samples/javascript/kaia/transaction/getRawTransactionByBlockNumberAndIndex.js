const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const blockNumber = 118593751;
  const transactionIndexPosition = "0x0";

  provider.kaia
    .getRawTransactionByBlockNumberAndIndex(
      blockNumber,
      transactionIndexPosition,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
