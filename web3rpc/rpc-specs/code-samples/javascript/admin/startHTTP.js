const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const host = "127.0.0.1";
  const port = 8555;
  const cors = "";
  const apis = "klay";

  provider.admin
    .startHTTP({ host, port, cors, apis }, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
