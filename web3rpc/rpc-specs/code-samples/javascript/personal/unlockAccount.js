const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const address = "0x6b1ac7bda0073095df1d434c39d66fb31a592bdd";
  const passphrase = "helloWorld";
  const duration = 10;

  provider.personal
    .unlockAccount(
      address,
      passphrase,
      { duration },
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
