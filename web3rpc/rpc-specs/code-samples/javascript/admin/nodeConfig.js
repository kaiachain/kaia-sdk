const { JsonRpcProvider } = require("@kaiachain/ethers-ext");

(async () => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  // The full list of JSON-RPC is available at:
  // https://docs.klaytn.foundation/content/dapp/json-rpc/api-references
  const data = await provider.admin.nodeConfig();
  console.log("Node config", data);
})();
