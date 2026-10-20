const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(async () => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  // governance_getCFS has no dedicated SDK wrapper; call it through the provider.
  const blockNumberOrTag = "latest";
  const result = await provider.send("governance_getCFS", [blockNumberOrTag]);
  console.log(result);
})();
