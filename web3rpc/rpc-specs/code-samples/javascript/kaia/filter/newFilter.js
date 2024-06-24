const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const fromBlock = "earliest";
  const toBlock = "latest";
  const address = "0x87ac99835e67168d4f9a40580f8f5c33550ba88b";
  const topics = [
    "0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8",
  ];
  provider.kaia.newFilter(
    { fromBlock, toBlock, address, topics },
    {},
    (err, data, response) => {
      console.log(data);
    },
  );
})();
