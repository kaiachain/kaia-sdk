const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  provider.net
    .peerCountByType({}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
