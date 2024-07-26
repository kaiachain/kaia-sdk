const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const blockHash =
    "0xdabbc6a0d2619c56db4645c4e85799af9927bdf3bd13d0c77e49db413e3db9f3";

  provider.debug
    .standardTraceBlockToFile(blockHash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
