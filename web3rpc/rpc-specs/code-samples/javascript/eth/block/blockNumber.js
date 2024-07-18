const { JsonRpcProvider } = require("@kaiachain/ethers-ext");

(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  provider
    .getBlockNumber({}, (err, data, response) => {
      console.log(data);
    })
    .then((data) => {
      console.log(data);
    });
})();
