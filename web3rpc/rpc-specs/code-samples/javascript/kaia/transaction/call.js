const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const callObject = {
    from: "0x3f71029af4e252b25b9ab999f77182f0cd3bc085",
    to: "0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
    gas: "0x100000",
    gasPrice: "0x5d21dba00",
    value: "0x0",
    input: "0x8ada066e",
  };
  const blockTag = "latest";
  provider.kaia
    .call(callObject, blockTag, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
