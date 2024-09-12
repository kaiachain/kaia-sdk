const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const address = "0x6b1ac7bda0073095df1d434c39d66fb31a592bdd";
  const message = "0xdeadbeaf";
  const password = "helloWorld";

  provider.personal
    .sign(message, address, password, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
