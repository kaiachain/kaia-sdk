const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const file = "block.profile";
  const seconds = 10;

  provider.debug
    .cpuProfile(file, seconds, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
