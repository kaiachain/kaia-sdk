const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const target = 3;

  provider.debug
    .setVMLogTarget(target, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
