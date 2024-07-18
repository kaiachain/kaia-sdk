const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const id = "0xca6c12a3ecd1b44bb77f7b6536b7ce65";

  provider.eth
    .getFilterLogs(id, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
