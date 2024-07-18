const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const data = "0x11223344";

  provider.klay
    .sha3(data, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
