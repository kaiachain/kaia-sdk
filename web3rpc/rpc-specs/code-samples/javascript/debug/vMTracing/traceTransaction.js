const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const txHash =
    "0x344fc43b5b87984d5a50fe2c54e121f94945ba9ff9da20f9de0f1b4914f47055";

  provider.debug
    .traceTransaction(txHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
