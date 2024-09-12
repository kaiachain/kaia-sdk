const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const url = "keystore://";
  const passphrase = "gr8=B!0@uc$b";

  provider.personal
    .openWalconst(url, passphrase, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
