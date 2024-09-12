const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const startBlockNum = 171904;
  const endBlockNum = 172160;

  provider.debug
    .getModifiedAccountsByNumber(
      startBlockNum,
      { endBlockNum },
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
