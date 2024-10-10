// AccountKeyLegacy
// https://docs.klaytn.foundation/docs/learn/accounts/

const { ethers } = require("ethers6");

const { Wallet } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0x24e8efd18d65bcb6b3ba15a4698c0b0d69d13ff7";
const senderPriv =
  "0x4a72b3d09c3d5e28e8652e0111f9c4ce252e8299aad95bb219a38eb0a3f4da49";

const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);
const wallet = new Wallet(senderPriv, provider);

async function main() {
  const msg = "hello";
  const msghex = ethers.hexlify(ethers.toUtf8Bytes(msg));
  const sig = await wallet.signMessage(msg);
  console.log({ senderAddr, msg, msghex, sig });

  const addr1 = ethers.verifyMessage(msg, sig);
  console.log("recoveredAddr lib", addr1, addr1.toLowerCase() === senderAddr);

  const addr2 = await provider.send("klay_recoverFromMessage", [
    senderAddr,
    msghex,
    sig,
    "latest",
  ]);
  console.log("recoveredAddr rpc", addr2, addr2.toLowerCase() === senderAddr);
}

main().catch(console.error);
