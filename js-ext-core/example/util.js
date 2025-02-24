const core = require("../dist/cjs");

function main() {
  const TxTypeValueTransfer = core.TxType.ValueTransfer;
  const isFeeDelegationTxType = core.isFeeDelegationTxType(TxTypeValueTransfer);
  console.log({ TxTypeValueTransfer, isFeeDelegationTxType });

  const rlpEncoded = core.RLP.encode(["0xaa", "0xbb"]);
  console.log({ rlpEncoded });

  const klay = core.fromPeb("25000000000");
  const peb = core.toPeb("0.0001").toString();
  console.log({klay, peb});

  const sigTuple = core.getSignatureTuple({
    v: 28,
    r: "0x66809fb130a6ea4ae4e823baa92573a5f1bfb4e88e64048aecfb18a2b4012b99",
    s: "0x75c2c3e5f7b0a182c767137c488649cd5104a5e747371fd922d618e328e5c508",
  });
  console.log({ sigTuple });

  const txCall = core.getRpcTxObject({
    chainId: 42,
    gasLimit: 0x1111,
    gasPrice: 0x222,
    type: 2,
    maxFeePerGas: 0x33,
    maxPriorityFeePerGas: 0x4,
    nonce: 0,
    value: 0,
    from: "0x00000000000000000000000000000000000000aa",
    to: "0x00000000000000000000000000000000000000bb",
    data: "0x",
  });
  console.log({ txCall});
}

main();