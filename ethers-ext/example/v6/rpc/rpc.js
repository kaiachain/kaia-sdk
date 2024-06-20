const { JsonRpcProvider } = require("@klaytn/ethers-ext");

async function main() {
  let provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net/");

  // The full list of JSON-RPC is available at:
  // https://docs.klaytn.foundation/content/dapp/json-rpc/api-references
  const num = await provider.klay.blockNumber();
  console.log("klay.blockNumber", num);

  const peers = await provider.net.peerCountByType();
  console.log("net.peerCountByType", peers);

  const account = await provider.klay.getAccount("0x1173d5dc7b5e1e07d857d74e962b6ed7d4234a92", "latest");
  console.log("klay.getAccount", JSON.stringify(account, null, 2));

  // eth_ namespace JSON-RPCs are provided by the vanilla ethers.js provider methods:
  // https://docs.ethers.org/v5/api/providers/provider/
  let gasPrice = await provider.getGasPrice();
  console.log("gasPrice", gasPrice.toString());
}

main();
