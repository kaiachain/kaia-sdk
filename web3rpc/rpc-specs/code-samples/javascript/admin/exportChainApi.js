const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const fileName = "/tmp/chain.txt";
  const startBlock = 1;
  const endBlock = 1000;

  provider.admin.exportChain(
    fileName,
    startBlock,
    endBlock,
    {},
    (err, data, response) => {
      console.log(data);
    },
  );
})();
