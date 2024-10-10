// Finding the sender address from a raw transaction RLP

const { Web3 } = require("@kaiachain/web3js-ext");

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);

async function main() {
  // Ethereum TxType
  const rawTx1 = "0xf869808504e3b29200831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a0c9cf86333bcb065d140032ecaab5d9281bde80f21b9687b3e94161de42d51895a0727a108a0b8d101465414033c3f705a9c7b826e596766046ee1183dbc8aeaa68";
  const senderAddr1 = await web3.eth.accounts.recoverTransaction(rawTx1);
  console.log("recovered", senderAddr1, senderAddr1 == "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23");

  // Klaytn TxType
  const rawTx2 = "0x08f88482020b8505d21dba0082520894a2a8854b1802d8cd5de631e690817c253d6a9153843b9aca0094a2a8854b1802d8cd5de631e690817c253d6a9153f847f8458207f6a00739be424c6074a17b38badc0a10ca30e50a3b56dce73ecf60cec1dbb48ebde5a0039d8ce12722feb26fe784932e2b4100982232d81efd1960dc846d6c6c49efdb";
  const senderAddr2 = await web3.eth.accounts.recoverTransaction(rawTx2);
  console.log("recovered", senderAddr2, senderAddr2 == "0xA2a8854b1802D8Cd5De631E690817c253d6a9153");
}

main().catch(console.err);
