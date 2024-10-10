const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const address = "0x487f2dfef230c2120b8cc55c5087b103146536ec";
  const message = "0xdeadbeaf";

  provider.kaia
    .sign(address, message, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
