const { JsonRpcProvider } = require("@kaiachain/ethers-ext");

(async () => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const tracerCallObject = {
    to: "0x46eda75e7ca73cb1c2f83c3927211655420dbc44",
    data: "0x3fb5c1cb00000000000000000000000000000000000000000000000000000000000003e7",
  };
  const blockNumber = "latest";
  const options = { tracer: "revertTracer" };

  // The full list of JSON-RPC is available at:
  // https://archive-docs.klaytn.foundation/content/dapp/json-rpc/api-references
  const data = await provider.debug.traceCall(
    tracerCallObject,
    blockNumber,
    options,
  );
  console.log("Trace call", data);
})();
