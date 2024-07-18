const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const address = "0xc94770007dda54cF92009BFF0dE90c06F603a09f";
  const blockNumberOrHashOrTag = "latest";

  provider.klay
    .getTransactionCount(
      address,
      blockNumberOrHashOrTag,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
