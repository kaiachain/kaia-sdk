const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const tx = {
    from: "0x1d4e05bb72677cb8fa576149c945b57d13f855e4",
    to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66",
    value: "0x1230000000",
  };
  const passphrase = "helloWorld";

  provider.personal
    .sendValueTransfer(tx, passphrase, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
