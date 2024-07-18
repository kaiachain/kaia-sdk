const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const address = "localhost";
  const port = 6060;

  provider.debug
    .startPProf({ address, port }, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
