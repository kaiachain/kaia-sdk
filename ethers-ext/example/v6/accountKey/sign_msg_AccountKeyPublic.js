// AccountKeyPublic
// https://docs.klaytn.foundation/docs/learn/accounts/

const { ethers } = require("ethers6");

const { Wallet } = require("@klaytn/ethers-ext/v6");

const senderAddr = "0xe15cd70a41dfb05e7214004d7d054801b2a2f06b";
const senderPriv =
  "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new ethers.JsonRpcProvider(
  "https://public-en-baobab.klaytn.net"
);
const wallet = new Wallet(senderAddr, senderPriv, provider); // decoupled account

async function main() {
  const msg = "hello";
  const msghex = ethers.hexlify(ethers.toUtf8Bytes(msg));
  const sig = await wallet.signMessage(msg);
  console.log({ senderAddr, msg, msghex, sig });

  const addr1 = ethers.verifyMessage(msg, sig);
  console.log(
    "recoveredAddr lib",
    addr1,
    addr1.toLowerCase() === wallet.address.toLowerCase()
  );

  const addr2 = await provider.send("klay_recoverFromMessage", [
    senderAddr,
    msghex,
    sig,
    "latest",
  ]);
  console.log(
    "recoveredAddr rpc",
    addr2,
    addr2.toLowerCase() === wallet.address.toLowerCase()
  );
}

main().catch(console.error);
