const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const blockNumberOrTag = "0x1b4";

  provider.klay
    .getCouncilSize({ blockNumberOrTag }, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
