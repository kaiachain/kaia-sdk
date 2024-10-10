const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const account = "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b";
  const blockNumberOrHash = "0x2";

  provider.kaia
    .getCode(account, blockNumberOrHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
