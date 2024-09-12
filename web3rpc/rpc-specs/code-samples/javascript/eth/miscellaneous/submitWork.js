const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const nonce = "0x0000000000000001";
  const powHash =
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
  const mixDigest =
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

  provider.eth
    .submitWork(nonce, powHash, mixDigest, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
