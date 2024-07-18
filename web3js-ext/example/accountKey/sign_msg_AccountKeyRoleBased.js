// AccountKeyRoleBased
// https://docs.klaytn.foundation/docs/learn/accounts/

const { Web3 } = require("@kaiachain/web3js-ext");

const senderAddr = "0x334b4d3c775c45c59de54e9f0408cba25a1aece7";
const senderRoleTransactionPriv = "0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac";
const senderRoleAccountUpdatePriv = "0x9ba8cb8f60044058a9e6f815c5c42d3a216f47044c61a1750b6d29ddc7f34bda";
const senderRoleFeePayerPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new Web3.providers.HttpProvider("https://public-en-baobab.klaytn.net");
const web3 = new Web3(provider);
const txAccount = web3.eth.accounts.privateKeyToAccount(senderRoleTransactionPriv);

async function main() {
  const msg = "hello";
  const msghex = Web3.utils.utf8ToHex(msg);
  const signResult = txAccount.sign(msg);
  console.log({ senderAddr, msg, msghex, sig: signResult.signature });

  const { v, r, s } = signResult;
  const addr1 = web3.eth.accounts.recover(msg, v, r, s);
  console.log("recoveredAddr lib", addr1, addr1.toLowerCase() === txAccount.address.toLowerCase());

  const sig = signResult.signature;
  const addr2 = await web3.klay.recoverFromMessage(senderAddr, msghex, sig, "latest");
  console.log("recoveredAddr rpc", addr2, addr2.toLowerCase() === txAccount.address.toLowerCase());
}

main().catch(console.error);