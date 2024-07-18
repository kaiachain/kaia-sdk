const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const forkNumber = 20;

  provider.klay
    .forkStatus(forkNumber, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
