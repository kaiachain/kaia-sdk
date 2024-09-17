const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  const hashOfTransaction =
    "0x026b64e16b86633c0199f78f37a64840d3601d83e5c799f115b63024764524ca";

  provider.klay
    .getDecodedAnchoringTransactionByHash(
      hashOfTransaction,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
