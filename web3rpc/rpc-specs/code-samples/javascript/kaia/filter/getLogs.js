const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const filterOptions = {
    fromBlock: "latest",
    toBlock: "latest",
    address: "0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
  };

  provider.kaia
    .getLogs(filterOptions, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
