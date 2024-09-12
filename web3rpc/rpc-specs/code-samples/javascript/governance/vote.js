const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const key = "governance.governancemode";
  const value = "ballot";

  provider.governance
    .vote(key, value, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
