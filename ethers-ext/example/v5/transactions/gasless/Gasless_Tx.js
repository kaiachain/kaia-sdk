const ethers = require("ethers5");

const { Wallet, gasless } = require("@kaiachain/ethers-ext/v5");

// Replace with actual token address
const tokenAddress = "0x8ebc32c078f5ecc8406ddDC785c8F0e2490C1081";
// Replace with your wallet address and private key
const senderAddr = "0x3A60cD51359485000f9058241D928631E88B0d09";
const senderPriv = "0x4fbe872c6e55831a7a2ad9c52d555911b198cffa27a0a287d015e31e4e327db7";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8559");
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

const swapAmount = ethers.utils.parseEther("1.0").toString();
const allowanceAmount = ethers.utils.parseEther("3.0").toString();

async function sendGaslessTx(appTxFee, slippage) {
  console.log(`Sending gasless transaction with appTxFee=${appTxFee} and slippage=${slippage}%`);

  const token = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);
  console.log(`Using token at address: ${tokenAddress}`);

  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);
  console.log(`Connected to chain ID: ${chainId}`);

  const gsr = gasless.getGaslessSwapRouter(wallet, chainId);
  console.log(`Using gasless swap router at: ${gsr.address}`);

  console.log("Checking if token is supported...");
  const isSupported = await gsr.isTokenSupported(tokenAddress);
  console.log(`Token ${tokenAddress} supported: ${isSupported}`);

  const tokenBalance = await token.balanceOf(senderAddr);
  console.log(`Token balance: ${ethers.utils.formatUnits(tokenBalance, 18)} tokens`);

  const feeData = await provider.getFeeData();
  const gasPriceGkei = Number(feeData.gasPrice) / 1e9;

  const allowance = await token.allowance(senderAddr, gsr.address);
  console.log(`Current allowance: ${ethers.utils.formatUnits(allowance, 18)}`);
  console.log(`Required allowance: ${ethers.utils.formatUnits(swapAmount, 18)} tokens`);
  console.log(`Has sufficient allowance: ${BigInt(allowance) >= BigInt(swapAmount)}`);

  let approveTx = null;
  let amountRepay;

  if (!(allowance >= swapAmount)) {
    console.log("Approval needed. Generating approve transaction...");
    approveTx = await gasless.getApproveRawTx(wallet, tokenAddress, allowanceAmount);
    console.log(`approveTx: ${approveTx}`);
    amountRepay = gasless.getAmountRepay(true, gasPriceGkei);
    console.log(`Amount to repay (with approval): ${ethers.utils.formatUnits(amountRepay, 18)}`);
  } else {
    console.log("No approval needed");
    amountRepay = gasless.getAmountRepay(false, gasPriceGkei);
    console.log(`Amount to repay (without approval): ${amountRepay}`);
  }

  const commissionRate = await gasless.getCommissionRate(gsr);
  console.log(`Commission rate: ${commissionRate * 100}%`);

  const uniRouter = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, ROUTER_ABI, wallet);

  let swapExpectedOutput;
  let minAmountOut;

  try {
    const amountsOut = await uniRouter.getAmountsOut(swapAmount, [tokenAddress, WKAIA_ADDRESS]);
    swapExpectedOutput = amountsOut[1];
    console.log(`swapExpectedOutput: ${swapExpectedOutput}`);

    minAmountOut = gasless.getMinAmountOut(amountRepay, appTxFee, commissionRate);

    console.log(`Expected output: ${ethers.utils.formatUnits(swapExpectedOutput, 18)} KAIA`);
    console.log(`Minimum amount out: ${ethers.utils.formatUnits(minAmountOut, 18)} KAIA`);
  } catch (error) {
    console.log("Could not calculate using UniswapV2Router02, falling back to basic calculation");
    console.log(`err: ${error}`);
    return
  }

  console.log("Calculating optimal amount in with slippage...");
  const amountIn = await gasless.getAmountIn(gsr, tokenAddress, minAmountOut, slippage);
  console.log(`Amount in: ${ethers.utils.formatUnits(amountIn, 18)}`);

  console.log("Generating swap transaction...");

  const isSingle = !approveTx;

  const swapTx = await gasless.getSwapRawTx(
    wallet,
    tokenAddress,
    amountIn,
    minAmountOut,
    amountRepay,
    isSingle,
  );
  console.log(`swapTx: ${swapTx}`);

  try {
    console.log("\nDecoding swap transaction parameters...");
    const parsedTx = ethers.Transaction.from(swapTx);
    console.log("Parsed transaction:", {
      to: parsedTx.to,
      value: parsedTx.value.toString(),
      gasLimit: parsedTx.gasLimit.toString(),
      gasPrice: parsedTx.gasPrice?.toString() || "N/A",
      nonce: parsedTx.nonce,
      data: parsedTx.data.substring(0, 66) + "..."
    });
  } catch (error) {
    console.log("Could not decode transaction:", error.message);
  }

  const isValidSwap = await gasless.isGaslessSwap(wallet, approveTx, swapTx, chainId);
  if (!isValidSwap) {
    console.log(`Is invalid gasless swap: ${isValidSwap}`);
    return ""
  }

  console.log("\nSending gasless transaction(s)...");
  let txHashes;
  try {
    txHashes = await gasless.sendGaslessTx(approveTx, swapTx, provider);
    console.log("sendGaslessTx returned:", txHashes);
  } catch (error) {
    console.error("Error in sendGaslessTx:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return "";
  }

  if (approveTx) {
    console.log(`Approve transaction hash: ${txHashes[0]}`);
    console.log(`Swap transaction hash: ${txHashes[1]}`);
  } else {
    console.log(`Swap transaction hash: ${txHashes[0]}`);
  }

  console.log("Gasless transaction(s) sent successfully!");

  console.log("Waiting for transaction receipt...");
  const receipt = await waitForReceipt(txHashes[txHashes.length - 1]);
  if (!receipt) {
    console.log("❌ No receipt found for transaction.");

    try {
      console.log("Checking transaction status...");
      const tx = await provider.getTransaction(txHashes[txHashes.length - 1]);
      console.log("Transaction status:", tx ? "Pending" : "Not found");

      if (tx) {
        console.log("Transaction details:", {
          from: tx.from,
          to: tx.to,
          value: tx.value.toString(),
          gasLimit: tx.gasLimit.toString(),
          gasPrice: tx.gasPrice?.toString() || "N/A",
          nonce: tx.nonce,
          blockNumber: tx.blockNumber || "Not mined yet"
        });
      }

      try {
        console.log("Trying kaia.getTransactionBySenderTxHash...");
        const senderTxResult = await provider.send("kaia_getTransactionBySenderTxHash", [txHashes[txHashes.length - 1]]);
        console.log("Sender transaction result:", senderTxResult || "Not found");
      } catch (error) {
        console.log("Error getting transaction by sender tx hash:", error.message);
      }
    } catch (error) {
      console.log("Error checking transaction status:", error.message);
    }

    return txHashes;
  }

  console.log("Transaction confirmed:", receipt.blockNumber);
  return txHashes;
}

async function waitForReceipt(transactionHash) {
  let receipt;
  let attempts = 0;
  const maxAttempts = 30;

  while (!receipt && attempts < maxAttempts) {
    try {
      receipt = await provider.getTransactionReceipt(transactionHash);
      if (!receipt) {
        console.log(`Receipt not found yet. Waiting... (attempt ${attempts + 1}/${maxAttempts})`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Error fetching receipt (attempt ${attempts + 1}/${maxAttempts}):`, error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    attempts++;
  }

  if (!receipt) {
    console.log(`Gave up waiting for receipt after ${maxAttempts} attempts`);
  }

  return receipt;
}

async function main() {
  try {
    console.log("=== Starting Gasless Transaction Flow ===");

    const appTxFee = ethers.utils.parseUnits("0.01", "ether").toString();
    const slippage = 5;
    console.log(`App transaction fee: ${ethers.utils.formatUnits(appTxFee, 18)} KAIA`);
    console.log(`Slippage tolerance: ${slippage}%`);

    await sendGaslessTx(appTxFee, slippage);
  } catch (error) {
    console.error("Error in gasless transaction flow:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
  }
}

main();
