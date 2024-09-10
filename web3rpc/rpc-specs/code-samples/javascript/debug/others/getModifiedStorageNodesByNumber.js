const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const address = "0x73a7d19d14f7dfac5b799e405e22133b2adc57a6";
  const startBlockNum = 100;
  const endBlockNum = 200;

  provider.debug
    .getModifiedStorageNodesByNumber(
      address,
      startBlockNum,
      endBlockNum,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
