// AccountKeyWeightedMultiSig
// https://docs.kaia.io/docs/learn/accounts/

const { Web3, TxType, AccountKeyType, toPeb, getPublicKeyFromPrivate } = require("@kaiachain/web3js-ext");

const senderAddr = "0x2bf611d14d330fd3688d10f2201321eacc8aa2ce";
const senderPriv1 = "0x31fadf868e68fd2e3f7a1c528023c9a86a45db850e9d6b82c1a82d4c75b469d1";
const senderPriv2 = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
const senderPriv3 = "0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);

async function main() {
  const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPriv1);
  const msg = "hello";
  const msghex = Web3.utils.utf8ToHex(msg);
  const signResult = senderAccount.sign(msg);
  console.log({ senderAddr, msg, msghex, sig: signResult.signature });

  const { v, r, s } = signResult;
  const addr1 = web3.eth.accounts.recover(msg, v, r, s);
  console.log("recoveredAddr lib", addr1, addr1.toLowerCase() === senderAccount.address.toLowerCase());

  const sig = signResult.signature;
  const addr2 = await web3.klay.recoverFromMessage(senderAddr, msghex, sig, "latest");
  console.log("recoveredAddr rpc", addr2, addr2.toLowerCase() === senderAccount.address.toLowerCase());
}

main().catch(console.error);