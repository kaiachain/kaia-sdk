const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const level = 3;

  provider.debug
    .verbosity(level, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
