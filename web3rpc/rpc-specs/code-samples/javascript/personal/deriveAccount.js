const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const url = "url";
  const path = "path";
  const pin = true;

  provider.personal
    .deriveAccount(url, path, { pin }, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
