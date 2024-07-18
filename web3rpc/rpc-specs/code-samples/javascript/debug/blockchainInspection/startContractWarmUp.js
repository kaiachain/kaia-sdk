const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const address = "0x4Cd39B49064a31E966cA0ddF4111aCe2eD7E9502";

  provider.debug
    .startContractWarmUp(address, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
