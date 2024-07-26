const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const fileName = "/home/sotatek/block.rlp";

  provider.debug
    .traceBlockFromFile(fileName, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
