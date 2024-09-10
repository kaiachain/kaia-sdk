const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const transactionArgs = {
    from: "0x51239f87c33e95e3bdb72e31d06b5306bcec81cc",
    to: "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
    value: "0x1",
    gas: "0x9999",
    maxFeePerGas: "0xbb43b7400",
  };

  provider.eth
    .fillTransaction(transactionArgs, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
