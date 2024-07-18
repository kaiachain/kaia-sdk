const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  provider.admin
    .datadir({}, (err, data, response) => {
      console.log(data);
    })
    .then(() => {
      console.log(data);
    });
})();
