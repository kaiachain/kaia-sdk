const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const transactionObject = {
    from: "0x487f2dfef230c2120b8cc55c5087b103146536ec",
    to: "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
    value: "0x1",
    gas: "0x9999",
    maxFeePerGas: "0x5d21dba00",
    maxPriorityFeePerGas: "0x5d21dba00",
  };

  provider.kaia
    .sendTransaction(transactionObject, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
