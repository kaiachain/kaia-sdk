const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const blockNumber = 119189116;

  provider.eth
    .getUncleCountByBlockNumber(blockNumber, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
