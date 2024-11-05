// AccountKeyLegacy
// https://docs.kaia.io/docs/learn/accounts/

const { Web3 } = require("@kaiachain/web3js-ext");

const senderAddr = "0x24e8efd18d65bcb6b3ba15a4698c0b0d69d13ff7";
const senderPriv = "0x4a72b3d09c3d5e28e8652e0111f9c4ce252e8299aad95bb219a38eb0a3f4da49";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);
const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPriv);

async function main() {
  const msg = "hello";
  const msghex = Web3.utils.utf8ToHex(msg);
  const signResult = senderAccount.sign(msg);
  console.log({ senderAddr, msg, msghex, sig: signResult.signature });

  const { v, r, s } = signResult;
  const addr1 = web3.eth.accounts.recover(msg, v, r, s);
  console.log("recoveredAddr lib", addr1, addr1.toLowerCase() === senderAddr);

  const sig = signResult.signature;
  const addr2 = await web3.klay.recoverFromMessage(senderAddr, msghex, sig, "latest");
  console.log("recoveredAddr rpc", addr2, addr2.toLowerCase() === senderAddr);
}

main().catch(console.error);