const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const transactionHash =
    "0x2781f2f57b2587f6d9ad80a9e5f60158439d2548eebbc23bd806ecb856fe724e";
  provider.kaia
    .getTransactionReceipt(transactionHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
