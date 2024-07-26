const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const blockHash =
    "0xed110b330152df2022d40fa3c38987643034aa56fc96079fb6c67b66a6ed4f19";

  provider.debug
    .traceBlockByHash(blockHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
