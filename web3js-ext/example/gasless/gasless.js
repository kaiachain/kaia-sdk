const { Web3 } = require("@kaiachain/web3js-ext");

// Replace with ERC20 token address to be spent
const tokenAddr = "0xcB00BA2cAb67A3771f9ca1Fa48FDa8881B457750"; // Kairos:TEST token
// Replace with your wallet address and private key
const senderAddr = "0x24e8efd18d65bcb6b3ba15a4698c0b0d69d13ff7";
const senderPriv = "0x4a72b3d09c3d5e28e8652e0111f9c4ce252e8299aad95bb219a38eb0a3f4da49";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);
const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPriv);

const ERC20_ABI = JSON.parse('[{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"}]');

// senderAddr wants to swap the ERC20 token for at least 0.1 KAIA so she can execute the AppTx.
async function main() {
  const appTxFee = web3.utils.toWei("0.1", "ether"); // 0.1 KAIA

  const token = new web3.eth.Contract(ERC20_ABI, tokenAddr);
  const tokenSymbol = await token.methods.symbol().call();
  const tokenDecimals = parseInt(await token.methods.decimals().call());
  console.log(`Using token at address: ${tokenAddr}`);

  console.log(`\nInitial balance of the sender ${senderAddr}`);
  console.log(`- ${web3.utils.fromWei(await web3.eth.getBalance(senderAddr), "ether")} KAIA`);
  console.log(`- ${web3.utils.fromWei(await token.methods.balanceOf(senderAddr).call(), tokenDecimals)} ${tokenSymbol}`);

  const router = await web3.gasless.getGaslessSwapRouter();
  const routerAddr = await router.options.address;
  const isTokenSupported = await router.methods.isTokenSupported(tokenAddr).call();
  const commissionRate = await router.methods.commissionRate().call();
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);
  console.log(`- The token is supported: ${isTokenSupported}`);
  console.log(`- Commission rate: ${commissionRate} bps`);

  const gasPrice = await web3.eth.getGasPrice();
  const nonce = await web3.eth.getTransactionCount(senderAddr);

  // If sender hasn't approved, include ApproveTx first.
  const allowance = await token.methods.allowance(senderAddr, routerAddr).call();
  const approveRequired = (allowance == 0n) || true;
  const txs = [];
  if (approveRequired) {
    console.log("\nAdding ApproveTx because allowance is 0");
    const approveTx = await web3.gasless.getApproveTx(
      senderAddr,
      tokenAddr,
      routerAddr,
      gasPrice,
      nonce,
    );
    txs.push(approveTx);
  } else {
    console.log("\nNo ApproveTx needed");
  }

  // - amountRepay (KAIA) is the cost of LendTx, ApproveTx, and SwapTx. The block miner shall fund it first,
  //   then the sender has to repay from the swap output.
  // - minAmountOut (KAIA) is the required amount of the swap output. It must be enough to cover the amountRepay
  //   and pay the commission, still leaving appTxFee.
  // - amountIn (token) is the amount of the token to be swapped to produce minAmountOut plus slippage.
  console.log(`\nCalculating the amount of the token to be swapped...`);
  console.log(`- gasPrice: ${web3.utils.fromWei(gasPrice, "gwei")} gkei`);
  const amountRepay = web3.gasless.getAmountRepay(approveRequired, gasPrice);
  console.log(`- amountRepay: ${web3.utils.fromWei(amountRepay, "ether")} KAIA`);
  const minAmountOut = web3.gasless.getMinAmountOut(amountRepay, appTxFee, commissionRate);
  console.log(`- minAmountOut: ${web3.utils.fromWei(minAmountOut, "ether")} KAIA`);
  const slippageBps = 50 // 0.5%
  const amountIn = await web3.gasless.getAmountIn(router, tokenAddr, minAmountOut, slippageBps);
  console.log(`- amountIn: ${web3.utils.fromWei(amountIn, tokenDecimals)} ${tokenSymbol}`);

  const swapTx = await web3.gasless.getSwapTx(
    senderAddr,
    tokenAddr,
    routerAddr,
    amountIn,
    minAmountOut,
    amountRepay,
    gasPrice,
    approveRequired,
  );
  txs.push(swapTx);

  console.log("\nSending transactions...");
  const signedTxs = [];
  const txHashes = []
  for (const tx of txs) {
    const signResult = await senderAccount.signTransaction(tx);
    signedTxs.push(signResult.rawTransaction);
    txHashes.push(signResult.transactionHash);
    console.log(`- Tx signed: (nonce: ${tx.nonce}) ${signResult.transactionHash} ${signResult.rawTransaction}`);
  }
  return;
  const batch = true;
  if (batch) {
    const batchResult = await provider.request({
      method: "kaia_sendRawTransactions",
      params: signedTxs,
    });
    console.log(`- Tx sent: ${batchResult}`);
  } else {
    for (const signedTx of signedTxs) {
      web3.eth.sendSignedTransaction(signedTx);
    }
  }
}

main();