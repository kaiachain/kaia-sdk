const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const sha3Hash =
    "0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586";

  provider.debug
    .preimage(sha3Hash, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
