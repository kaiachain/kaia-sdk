const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const blockHash =
    "0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880";

  provider.mainbridge
    .convertChildChainBlockHashToParentChainTxHash(
      blockHash,
      {},
      (err, data, response) => {}
    )
    .then((data) => {
      console.log(data);
    });
})();
