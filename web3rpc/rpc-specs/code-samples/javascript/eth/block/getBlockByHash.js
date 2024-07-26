const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const blockHash =
    "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c";
  const transactionObject = true;
  provider.eth
    .getBlockByHash(
      blockHash,
      transactionObject,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
