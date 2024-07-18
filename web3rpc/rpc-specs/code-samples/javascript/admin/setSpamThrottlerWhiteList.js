const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const address = ["0xfdeedbb2fe5b48d5b49e435ba00e0358740d0cf5"];
  provider.admin
    .setSpamThrottlerWhiteList(address, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
