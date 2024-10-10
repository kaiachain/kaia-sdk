const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const transactionHash =
    "0xc6acc62baaa57483da8d5e08aaed1907d82f0e25bd553ce3745ef1bc7b7f4476";
  provider.eth
    .getTransactionByHash(transactionHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
