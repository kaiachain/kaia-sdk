const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const privateKey =
    "cd87934ee007b7a458fa00dc0314fff8b2bd43b3071f46c820c379e483b4fd8e";
  const passphrase = "gr8=B!0@uc$b";

  provider.personal
    .importRawKey(privateKey, passphrase, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
