const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const storageAddress = "0x295a70b2de5e3953354a6a8344e616ed314d7251";
  const position = "0x0";
  const blockNumberOrHash = "latest";

  provider.kaia
    .getStorageAt(
      storageAddress,
      position,
      blockNumberOrHash,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
