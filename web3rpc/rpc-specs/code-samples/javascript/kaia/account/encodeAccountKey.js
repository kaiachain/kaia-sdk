const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const accountKey = { keyType: 0, key: {} };

  provider.kaia
    .encodeAccountKey(accountKey, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
