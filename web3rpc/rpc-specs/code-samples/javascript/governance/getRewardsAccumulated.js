const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const firstBlock = 123400489;
  const lastBlock = 123416489;

  provider.governance
    .getRewardsAccumulated(
      firstBlock,
      lastBlock,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
