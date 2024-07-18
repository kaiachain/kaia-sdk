const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const blockHash =
    "0xc9dbfbab67e9a0508bcb3f95ae408023668cef431b805592781a821926715b8a";
  const uncleIndex = "0x1";

  provider.eth
    .getUncleByBlockHashAndIndex(
      blockHash,
      uncleIndex,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
