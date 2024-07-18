const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const address = "0x0000000000000000000000000000000000000000";

  provider.debug
    .startCollectingTrieStats(address, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
