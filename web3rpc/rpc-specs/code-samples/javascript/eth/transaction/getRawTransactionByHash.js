const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const transactionHash =
    "0x5bbcde52084defa9d1c7068a811363cc27a25c80d7e495180964673aa5f47687";

  provider.eth
    .getRawTransactionByHash(transactionHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
