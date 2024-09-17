const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const blockNumberOrTag = "0x1b4";

  provider.klay
    .getCommitteeSize({ blockNumberOrTag }, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
