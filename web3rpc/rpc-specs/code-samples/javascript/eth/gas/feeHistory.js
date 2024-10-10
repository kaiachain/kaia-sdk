const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const blockCount = "0x10";
  const lastBlock = "latest";
  const rewardPercentiles = [0.1, 0.2, 0.3];

  provider.eth
    .feeHistory(
      blockCount,
      lastBlock,
      rewardPercentiles,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
