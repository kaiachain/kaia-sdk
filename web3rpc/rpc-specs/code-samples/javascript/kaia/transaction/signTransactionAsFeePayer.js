const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const txObject = {
    typeInt: 17,
    from: "0x487f2dfef230c2120b8cc55c5087b103146536ec",
    to: "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075",
    gas: "0x76c0",
    gasPrice: "0x5d21dba00",
    value: "0xf4",
    input:
      "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
    feePayer: "0x487f2dfef230c2120b8cc55c5087b103146536ec",
    nonce: "0x1",
  };

  provider.kaia
    .signTransactionAsFeePayer(txObject, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
