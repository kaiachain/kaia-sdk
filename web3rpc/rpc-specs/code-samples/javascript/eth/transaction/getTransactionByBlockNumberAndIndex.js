const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const blockNumber = 118593751;
  const index = "0x0";
  provider.eth
    .getTransactionByBlockNumberAndIndex(
      blockNumber,
      index,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
