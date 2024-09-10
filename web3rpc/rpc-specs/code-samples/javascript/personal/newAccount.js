const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const passphrase = "helloWorld";

  provider.personal
    .newAccount({ passphrase }, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
