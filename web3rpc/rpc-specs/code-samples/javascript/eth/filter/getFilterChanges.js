const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const id = "0x52421f131ef49ef6b7a8926b8e0a65e";

  provider.eth
    .getFilterChanges(id, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
