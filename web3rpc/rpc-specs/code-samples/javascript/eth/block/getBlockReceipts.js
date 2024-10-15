const { JsonRpcProvider } = require("@kaiachain/ethers-ext");

(async () => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const blockHash =
    "0xba647d41423faeebe8a7c64737d284fc2eba6f0388a3e1ebf6243db509ec1577";

  // The full list of JSON-RPC is available at:
  // https://docs.kaia.io/references/json-rpc/references
  const data = await provider.eth.getBlockReceipts(blockHash);
  console.log("Block receipts", data);
})();
