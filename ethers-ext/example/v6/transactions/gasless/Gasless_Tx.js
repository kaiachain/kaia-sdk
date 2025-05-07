const ethers = require("ethers6");

const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");

// Replace with actual token address
const tokenAddress = "0x8ebc32c078f5ecc8406ddDC785c8F0e2490C1081";
// Replace with your wallet address and private key
const senderAddr = "0x3A60cD51359485000f9058241D928631E88B0d09";
const senderPriv = "0x4fbe872c6e55831a7a2ad9c52d555911b198cffa27a0a287d015e31e4e327db7";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8559");
const wallet = new Wallet(senderPriv, provider);

const ERC20_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)"
];

const ROUTER_ABI = [
  "function getAmountsOut(uint amountIn, address[] memory path) view returns (uint[] memory amounts)"
];

// WKAIA address - this should match your local deployment
const WKAIA_ADDRESS = "0x75Ec3c04DA63bE95Ec9876Aca967D79A1c74e2cf"; // Using GSR address as placeholder
const UNISWAP_ROUTER_ADDRESS = "0xcB148BDB400Fd9eDC955B2c8c6a3fb7677e9DeE8"; // UniswapV2Router02 address

const swapAmount = ethers.parseEther("1.0").toString();
const allowanceAmount = ethers.parseEther("3.0").toString();

async function sendGaslessTx(appTxFee, slippage) {
  console.log(`Sending gasless transaction with appTxFee=${appTxFee} and slippage=${slippage}%`);

  const token = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);
  console.log(`Using token at address: ${tokenAddress}`);

  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);
  console.log(`Connected to chain ID: ${chainId}`);

  const gsr = gasless.getGaslessSwapRouter(provider, chainId);
  console.log(`Using gasless swap router at: ${gsr.address}`);

  console.log("Checking if token is supported...");
  const isSupported = await gsr.isTokenSupported(tokenAddress);
  console.log(`Token ${tokenAddress} supported: ${isSupported}`);

  const tokenBalance = await token.balanceOf(senderAddr);
  console.log(`Token balance: ${ethers.formatUnits(tokenBalance, 18)} tokens`);

  const feeData = await provider.getFeeData();
  const gasPriceGkei = Number(feeData.gasPrice) / 1e9;

  const allowance = await token.allowance(senderAddr, gsr.address);
  console.log(`Current allowance: ${ethers.formatUnits(allowance, 18)}`);
  console.log(`Required allowance: ${ethers.formatUnits(swapAmount, 18)} tokens`);
  console.log(`Has sufficient allowance: ${BigInt(allowance) >= BigInt(swapAmount)}`);

  let approveTx = null;
  let amountRepay;

  if (!(BigInt(allowance) >= BigInt(swapAmount))) {
    console.log("Approval needed. Generating approve transaction...");
    approveTx = await gasless.getApproveTx(
      provider,
      senderAddr,
      tokenAddress,
      gsr.address,
      allowanceAmount
    );
    
    const approveResult = await wallet.sendTransaction(approveTx);
    console.log(`Approve transaction hash: ${approveResult.hash}`);
    
    console.log("Waiting for approval confirmation...");
    await approveResult.wait();
    console.log("Approval transaction confirmed");
    
    amountRepay = gasless.getAmountRepay(true, gasPriceGkei);
    console.log(`Amount to repay (with approval): ${ethers.formatUnits(amountRepay, 18)}`);
  } else {
    console.log("No approval needed");
    amountRepay = gasless.getAmountRepay(false, gasPriceGkei);
    console.log(`Amount to repay (without approval): ${amountRepay}`);
  }

  const commissionRateBasisPoints = await gasless.getCommissionRate(gsr);
  console.log(`Commission rate: ${commissionRateBasisPoints / 100}%`);

  const uniRouter = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, ROUTER_ABI, provider);

  let swapExpectedOutput;
  let minAmountOut;

  try {
    const amountsOut = await uniRouter.getAmountsOut(swapAmount, [tokenAddress, WKAIA_ADDRESS]);
    swapExpectedOutput = amountsOut[1];
    console.log(`swapExpectedOutput: ${swapExpectedOutput}`);

    minAmountOut = gasless.getMinAmountOut(amountRepay, appTxFee, commissionRateBasisPoints);

    console.log(`Expected output: ${ethers.formatUnits(swapExpectedOutput, 18)} KAIA`);
    console.log(`Minimum amount out: ${ethers.formatUnits(minAmountOut, 18)} KAIA`);
  } catch (error) {
    console.log("Could not calculate using UniswapV2Router02, falling back to basic calculation");
    console.log(`err: ${error}`);
    return;
  }

  console.log("Calculating optimal amount in with slippage...");
  const amountIn = await gasless.getAmountIn(gsr, tokenAddress, minAmountOut, slippage);
  console.log(`Amount in: ${ethers.formatUnits(amountIn, 18)}`);

  console.log("Generating swap transaction...");

  const swapTx = await gasless.getSwapTx(
    provider,
    senderAddr,
    tokenAddress,
    amountIn,
    minAmountOut,
    amountRepay,
    true
  );
  
  console.log("\nSending swap transaction...");
  try {
    const swapResult = await wallet.sendTransaction(swapTx);
    console.log(`Swap transaction hash: ${swapResult.hash}`);
    
    console.log("Waiting for transaction receipt...");
    const receipt = await swapResult.wait();
    console.log("Transaction confirmed:", receipt.blockNumber);
    
    return swapResult.hash;
  } catch (error) {
    console.error("Error in sending swap transaction:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return "";
  }
}

async function main() {
  try {
    console.log("=== Starting Gasless Transaction Flow ===");

    const appTxFee = ethers.parseUnits("0.01", "ether").toString();
    const slippageBasisPoints = 500; // 5% = 500 basis points
    console.log(`App transaction fee: ${ethers.formatUnits(appTxFee, 18)} KAIA`);
    console.log(`Slippage tolerance: ${slippageBasisPoints}%`);

    await sendGaslessTx(appTxFee, slippageBasisPoints);
  } catch (error) {
    console.error("Error in gasless transaction flow:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
  }
}

main();
