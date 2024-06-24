const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const blockNumberOrTag = "0x1b4";

  provider.kaia
    .getCommittee(blockNumberOrTag, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
