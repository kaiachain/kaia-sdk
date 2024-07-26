const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const module = "p2p=4";

  provider.debug
    .vmodule(module, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
