const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const blockHashOrBlockNumber = 1;
  const range = 10;

  provider.klay
    .getBlockWithConsensusInfoByNumberRange(
      blockHashOrBlockNumber,
      range,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
