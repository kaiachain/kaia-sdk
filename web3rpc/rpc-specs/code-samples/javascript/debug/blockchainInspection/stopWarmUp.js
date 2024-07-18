const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  provider.debug
    .stopWarmUp({}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
