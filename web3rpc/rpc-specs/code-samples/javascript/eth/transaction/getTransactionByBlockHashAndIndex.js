const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const blockHash =
    "0xc9dbfbab67e9a0508bcb3f95ae408023668cef431b805592781a821926715b8a";
  const index = "0x0";
  provider.eth
    .getTransactionByBlockHashAndIndex(
      blockHash,
      index,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
