const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  provider.klay.protocolVersion({}, (err, data, response) => {
    console.log(data);
  });
})();
