const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(async () => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  // klay_getPFS has no dedicated SDK wrapper; call it through the provider.
  const blockNumberOrTag = "latest";
  const result = await provider.send("klay_getPFS", [blockNumberOrTag]);
  console.log(result);
})();
