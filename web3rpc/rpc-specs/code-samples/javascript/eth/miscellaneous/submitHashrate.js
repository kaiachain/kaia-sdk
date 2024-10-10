const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const hashrate = "0x5";
  const id =
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

  provider.eth
    .submitHashrate(hashrate, id, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
