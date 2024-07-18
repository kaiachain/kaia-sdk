const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const rate = 2;

  provider.debug
    .setMutexProfileFraction(rate, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
