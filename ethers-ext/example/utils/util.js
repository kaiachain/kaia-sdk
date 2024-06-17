const {
  TxType, AccountKeyType,
  getCompressedPublicKey,
  getSignatureTuple,
  formatKlayUnits, parseKlayUnits,
  formatKlay, parseKlay,
} = require("@klaytn/ethers-ext");

async function main() {
  // Transaction and AccountKey types
  console.log("TxTypeValueTransfer =", TxType.ValueTransfer);
  console.log("AccountKeyWeightedMultiSig =", AccountKeyType.WeightedMultiSig);

  // ECDSA public key
  console.log("pubkey from { x, y } object =", getCompressedPublicKey({
    x: "0xdc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd",
    y: "0xaf06ca34ae8714cf3dae06bacdb78c7c2d4054bd38961d40853cd5f15955da79",
  }));
  console.log("pubkey from uncompressed format =", getCompressedPublicKey("0x04dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cdaf06ca34ae8714cf3dae06bacdb78c7c2d4054bd38961d40853cd5f15955da79"));

  // ECDSA signature
  console.log("signature from { v, r, s } object =", getSignatureTuple({
    v: 27,
    r: "0x66809fb130a6ea4ae4e823baa92573a5f1bfb4e88e64048aecfb18a2b4012b99",
    s: "0x75c2c3e5f7b0a182c767137c488649cd5104a5e747371fd922d618e328e5c508",
  }));
  console.log("signature from compact 65 bytes =", getSignatureTuple("0x66809fb130a6ea4ae4e823baa92573a5f1bfb4e88e64048aecfb18a2b4012b9975c2c3e5f7b0a182c767137c488649cd5104a5e747371fd922d618e328e5c5081b"));

  // Currency units
  console.log("example basefee in ston =", formatKlayUnits("0x5d21dba00", "ston"));
  console.log("transfer amount in klay =", formatKlay("1230000000000000000"));
  console.log("example gas price in peb =", parseKlayUnits("50", "ston").toString());
  console.log("transfer amount in peb =", parseKlay("9.87").toString());
}

main();
