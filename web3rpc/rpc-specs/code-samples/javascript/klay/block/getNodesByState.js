const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(async () => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  // klay_getNodesByState has no dedicated SDK wrapper; call it through the provider.
  const blockNumberOrTag = "latest";
  const states = ["ValActive"]; // omit or pass [] to return nodes in all states
  const result = await provider.send("klay_getNodesByState", [blockNumberOrTag, states]);
  console.log(result);
})();
