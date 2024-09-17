const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const address = "0x3111a0577f322e8fb54f78d9982a26ae7ca0f722";
  const blockNumberOrHashOrTag = "latest";

  provider.eth
    .getBalance(
      address,
      blockNumberOrHashOrTag,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
