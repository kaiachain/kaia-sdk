const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const passphrase = "helloWorld";

  provider.personal
    .newAccount({ passphrase }, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
