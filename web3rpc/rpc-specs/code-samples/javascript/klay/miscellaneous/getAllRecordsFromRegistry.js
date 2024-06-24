const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const kipType = "kip113";
  const blockNumber = "latest";

  provider.klay
    .getAllRecordsFromRegistry(
      kipType,
      blockNumber,
      {},
      (err, data, response) => {}
    )
    .then((data) => {
      console.log(data);
    });
})();
