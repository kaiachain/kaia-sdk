const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  provider.admin
    .stopSpamThrottler({}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
