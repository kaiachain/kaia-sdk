const { Web3 } = require("@kaiachain/web3js-ext");

const provider = new Web3.providers.HttpProvider("https://public-en-baobab.klaytn.net");
const web3 = new Web3(provider);

async function main() {
  // The full list of JSON-RPC is available at:
  // https://docs.klaytn.foundation/content/dapp/json-rpc/api-references
  const num = await web3.klay.blockNumber();
  console.log("klay.blockNumber", num);

  const peers = await web3.net.peerCountByType();
  console.log("net.peerCountByType", peers);

  const account = await web3.klay.getAccount("0x1173d5dc7b5e1e07d857d74e962b6ed7d4234a92", "latest");
  console.log("klay.getAccount", JSON.stringify(account, null, 2));

  let gasPrice = await web3.eth.getGasPrice();
  console.log("gasPrice", gasPrice.toString());
}

main();