const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const accountKey = { keyType: 0, key: {} };

  provider.kaia
    .encodeAccountKey(accountKey, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
