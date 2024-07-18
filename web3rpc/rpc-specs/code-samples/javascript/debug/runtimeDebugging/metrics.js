const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const raw = true;

  provider.debug
    .metrics(raw, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
