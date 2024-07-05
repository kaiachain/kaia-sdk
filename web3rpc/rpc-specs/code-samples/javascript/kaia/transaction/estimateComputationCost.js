const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const callObject = {
    from: "0x73718c4980728857f3aa5148e9d1b471efa3a7dd",
    to: "0x069942a3ca0dabf495dba872533134205764bc9c",
    value: "0x0",
    input:
      "0x2a31efc7000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000003039",
  };
  const blockNumberOrHash = "latest";

  provider.kaia
    .estimateComputationCost(
      callObject,
      blockNumberOrHash,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
