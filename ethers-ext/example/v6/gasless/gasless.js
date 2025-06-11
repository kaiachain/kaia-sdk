const ethers = require("ethers6");

const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");

// Replace with ERC20 token address to be spent
//const tokenAddr = "0xcB00BA2cAb67A3771f9ca1Fa48FDa8881B457750"; // Kairos:TEST token
const tokenAddr = "0x8ebc32c078f5ecc8406ddDC785c8F0e2490C1081";
// Replace with your wallet address and private key
const senderAddr = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";
const senderPriv = "0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6";

//const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");
const provider = new ethers.JsonRpcProvider("http://localhost:8559");
const wallet = new Wallet(senderPriv, provider);

const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)"
];

// senderAddr wants to swap the ERC20 token for at least 1.0 KAIA so she can execute the AppTx.
async function main() {
  const appTxFee = ethers.parseEther("1.0").toString(); // 1.0 KAIA

  // Query the environment
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
  const tokenSymbol = await token.symbol();
  const tokenDecimals = await token.decimals();
  console.log(`Using token at address: ${tokenAddr}`);

  console.log(`\nInitial balance of the sender ${senderAddr}`);
  console.log(`- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);
  console.log(`- ${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);

  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);
  const router = await gasless.getGaslessSwapRouter(provider, chainId, "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
  const routerAddr = await router.getAddress();
  const commissionRate = Number(await router.commissionRate());
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);
  console.log(`- The token is supported: ${await router.isTokenSupported(tokenAddr)}`);
  console.log(`- Commission rate: ${commissionRate} bps`);

  // If sender hasn't approved, include ApproveTx first.
  const allowance = await token.allowance(senderAddr, routerAddr);
  const approveRequired = (allowance == 0n);
  const txs = [];
  if (approveRequired) {
    console.log("\nAdding ApproveTx because allowance is 0");
    approveTx = await gasless.getApproveTx(
      provider,
      senderAddr,
      tokenAddr,
      routerAddr
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
  console.log("\nCalculating the amount of the token to be swapped...");
  const gasPrice = Number((await provider.getFeeData()).gasPrice) / 1e9;
  console.log(`- gasPrice: ${gasPrice} gkei`);
  const amountRepay = gasless.getAmountRepay(approveRequired, gasPrice);
  console.log(`- amountRepay: ${ethers.formatEther(amountRepay)} KAIA`);
  const minAmountOut = gasless.getMinAmountOut(amountRepay, appTxFee, commissionRate);
  console.log(`- minAmountOut: ${ethers.formatEther(minAmountOut)} KAIA`);
  const slippageBps = 50 // 0.5%
  const amountIn = await gasless.getAmountIn(router, tokenAddr, minAmountOut, slippageBps);
  console.log(`- amountIn: ${ethers.formatUnits(amountIn, tokenDecimals)} ${tokenSymbol}`);

  const swapTx = await gasless.getSwapTx(
    provider,
    senderAddr,
    tokenAddr,
    amountIn,
    minAmountOut,
    amountRepay,
    !approveRequired
  );
  txs.push(swapTx);

  console.log("\nSending transactions...");
  const sentTxs = [];
  for (const tx of txs) {
    const sendTx = await wallet.sendTransaction(tx);
    sentTxs.push(sendTx);
    console.log(`- Tx sent: ${sendTx.hash}`);
  }

  console.log("\nWaiting for transactions to be mined...");
  let blockNum = 0;
  for (const sentTx of sentTxs) {
    const receipt = await sentTx.wait();
    console.log(`- Tx mined at block ${receipt.blockNumber}`);
    blockNum = receipt.blockNumber;
  }

  console.log("\nListing the block's transactions related to the sender...");
  const block = await provider.getBlock(blockNum, true);
  const names = {
    [senderAddr.toLowerCase()]: "sender",
    [tokenAddr.toLowerCase()]: "token",
    [routerAddr.toLowerCase()]: "router",
  }
  for (const txhash of block.transactions) {
    const tx = await provider.getTransaction(txhash);
    const fromName = names[tx.from.toLowerCase()] || tx.from;
    const toName = names[tx.to.toLowerCase()] || tx.to;
    if (fromName != tx.from || toName != tx.to) {
      console.log(`- Tx ${tx.hash}: ${fromName} => ${toName}`);
    }
  }

  console.log(`\nFinal balance of the sender ${senderAddr}`);
  console.log(`- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);
  console.log(`- ${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);
}

main().catch(console.error);
