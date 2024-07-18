const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const block = 2459;

  provider.debug
    .traceBlockByNumber(block, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
