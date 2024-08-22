const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const blockNumber = 89;

  provider.klay
    .getParams(blockNumber, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
