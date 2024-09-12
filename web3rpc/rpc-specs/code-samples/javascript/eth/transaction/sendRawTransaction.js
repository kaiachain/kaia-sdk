const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const singedTransactionData =
    "0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67";

  provider.eth
    .sendRawTransaction(singedTransactionData, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
