const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const property = "0xe17d821e9a8a8736b9aea8c2de1f3a4934ac0a2f";

  provider.debug
    .chaindbProperty(property, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
