var provider = null;
var accounts = null;
var signedApproveTx = null;
var signedSwapTx = null;

// https://baobab.klaytnscope.com/account/0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df?tabId=contractCode
var contractAddress = "0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df";
var contractCalldata = "0xd09de08a"; // function increment()

var testTokenAddr = "0x8ebc32c078f5ecc8406ddDC785c8F0e2490C1081"
var gsrAddr = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"

function isKaikas() {
  return provider && provider.provider.isKaikas;
}

// https://docs.ethers.org/v5/getting-started/#getting-started--connecting
async function connect(injectedProvider) {
  if (!injectedProvider) {
    alert("Please install wallet");
    return;
  }

  // Wrap the window.{ethereum,klaytn} object with Web3Provider.
  provider = new ethers_ext.Web3Provider(injectedProvider);
  // Uncomment to use the original ethers.js Web3Provider:
  // provider = new ethers.Web3Provider(injectedProvider);

  // Detect user network
  // https://docs.metamask.io/wallet/how-to/connect/detect-network/
  const chainId = await provider.send("eth_chainId");
  console.log("chainId", chainId);
  $("#textChainId").html(chainId);

  injectedProvider.on("networkChanged", (chainId) => {
    console.log("chainId changed", chainId);
    $("#textChainId").html(chainId);
    provider = new ethers_ext.providers.Web3Provider(injectedProvider);
  });

  // Detect user account
  // https://docs.metamask.io/wallet/how-to/connect/access-accounts/
  await provider.send("eth_requestAccounts");

  accounts = await provider.listAccounts(); // internally eth_accounts
  console.log("accounts", accounts);
  $("#textAccount").html(accounts.map(
    (a, i) => {
      if (i == 0) {
        return a.address
      }
  }));

  injectedProvider.on("accountsChanged", async (changedAccounts) => {
    accounts = changedAccounts;
    console.log("accounts changed", accounts);
    $("#textAccounts").html(accounts.map((a) => a.address));
  });

  startPollingGasFee();
}
async function connectMM() {
  $("text").html(""); // Clear all text
  await connect(window.ethereum);
}
async function connectKK() {
  $("text").html(""); // Clear all text
  await connect(window.klaytn);
}

// https://docs.metamask.io/wallet/how-to/add-network/
// EIP-3085 wallet_addEthereumChain
// EIP-3326 wallet_switchEthereumChain
async function switchNetwork(networkSpec) {
  console.log("switching to", networkSpec);
  try {
    await provider.send("wallet_switchEthereumChain", [
      { chainId: networkSpec.chainId },
    ]);
  } catch (e) {
    await provider.send("wallet_addEthereumChain", [networkSpec]);
  }
}
async function switchBaobab() {
  await switchNetwork({
    chainId: "0x3e9",
    chainName: "Klaytn Baobab",
    nativeCurrency: {
      name: "KLAY",
      symbol: "KLAY",
      decimals: 18,
    },
    rpcUrls: ["https://public-en-kairos.node.kaia.io"],
    blockExplorerUrls: ["https://baobab.klaytnscope.com/"],
  });
}
async function switchPrivateNetwork() {
  await switchNetwork({
    chainId: "0x3e8",
    chainName: "Klaytn Private Network",
    nativeCurrency: {
      name: "KLAY",
      symbol: "KLAY",
      decimals: 18,
    },
    rpcUrls: ["http://localhost:8559"],
    blockExplorerUrls: null,
  });
}

async function signMsg() {
  try {
    if (isKaikas()) {
      const { hexlify, toUtf8Bytes } = ethers;
      const signer = await provider.getSigner(accounts[0].address);
      const message = "Hello dapp";
      const hexMessage = hexlify(toUtf8Bytes(message));

      const signature = await provider.send("eth_sign", [
        await signer.getAddress(),
        hexMessage,
      ]);
      console.log("signature", signature);
      $("#textSignature").html(signature);

      const recoveredAddress = await provider.send("klay_recoverFromMessage", [
        await signer.getAddress(),
        hexMessage,
        signature,
        "latest",
      ]);
      console.log("recoveredAddress", recoveredAddress);
      $("#textRecoveredAddress").html(recoveredAddress);
    } else {
      const signer = await provider.getSigner(accounts[0].address);
      const message = "Hello dapp";

      const signature = await signer.signMessage(message);
      console.log("signature", signature);
      $("#textSignature").html(signature);

      const recoveredAddress = ethers.verifyMessage(message, signature);
      console.log("recoveredAddress", recoveredAddress);
      $("#textRecoveredAddress").html(recoveredAddress);
    }
  } catch (err) {
    console.error(err);
    $("#textSignature").html(`Error: ${err.message}`);
  }
}

async function doSendTx(makeTxRequest) {
  try {
    const signer = await provider.getSigner(accounts[0].address);
    const address = await signer.getAddress();
    const txRequest = await makeTxRequest(address);

    const sentTx = await signer.sendTransaction(txRequest);
    console.log("sentTx", sentTx);
    const txhash = sentTx.hash;
    const explorerUrl = "https://baobab.klaytnscope.com/tx/";
    $("#textTxhash").html(
      `<a href="${explorerUrl}${txhash}" target="_blank">${txhash}</a>`
    );
  } catch (err) {
    console.error(err);
    $("#textTxhash").html(`Error: ${err.message}`);
  }
}

async function sendLegacyVT() {
  doSendTx(async (address) => {
    return {
      to: address, // send to myself
      value: 0,
    };
  });
}
async function sendLegacySC() {
  doSendTx(async () => {
    return {
      to: contractAddress,
      data: contractCalldata,
    };
  });
}
async function sendKlaytnVT() {
  doSendTx(async (address) => {
    return {
      type: ethers_ext.TxType.ValueTransfer, // 0x08
      to: address, // send to myself
      value: 0,
    };
  });
}
async function sendKlaytnSC() {
  doSendTx(async () => {
    return {
      type: ethers_ext.TxType.SmartContractExecution, // 0x30
      to: contractAddress,
      data: contractCalldata,
    };
  });
}

// This operation is usually done in the backend by the dApp operator.
// We do it here with hardcoded private key for demonstration purpose.
async function doSendTxAsFeePayer(signedTx) {
  const httpProvider = new ethers_ext.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const feePayerPriv =
    "0xb3cf575dea0081563fe5482de2fe4425e025502b1f4ae7e02b2540ac0a5beda1";
  const feePayerWallet = new ethers_ext.Wallet(feePayerPriv, httpProvider);

  const sentTx = await feePayerWallet.sendTransactionAsFeePayer(signedTx);
  console.log("sentTx", sentTx);
  const txhash = sentTx.hash;
  const explorerUrl = "https://baobab.klaytnscope.com/tx/";
  $("#textTxhash").html(
    `<a href="${explorerUrl}${txhash}" target="_blank">${txhash}</a>`
  );
}

async function doSignTx(makeTxRequest) {
  try {
    const signer = await provider.getSigner(accounts[0].address);
    const address = await signer.getAddress();
    const txRequest = await makeTxRequest(address);

    const signedTx = await signer.signTransaction(txRequest);
    console.log("signedTx", signedTx);
    $("#textSignedTx").html(`${signedTx}`);

    await doSendTxAsFeePayer(signedTx);
  } catch (err) {
    console.error(err);
    $("#textTxhash").html(`Error: ${err.message}`);
  }
}
async function sendFeeDelegatedVT() {
  doSignTx(async (address) => {
    return {
      type: ethers_ext.TxType.FeeDelegatedValueTransfer, // 0x09
      to: address, // send to myself
      value: 0,
    };
  });
}
async function sendFeeDelegatedSC() {
  doSignTx(async () => {
    return {
      type: ethers_ext.TxType.FeeDelegatedSmartContractExecution, // 0x09
      to: contractAddress,
      data: contractCalldata,
    };
  });
}

async function signApproveTx() {
  try {
    const signer = await provider.getSigner(accounts[0].address);

    const network = await signer.provider.getNetwork();
    const chainId = Number(network.chainId);

    const feeData = await signer.provider.getFeeData();
    const gasPriceBN = BigInt(feeData.gasPrice) || 25000000000n;
    
    // send approve
    const approveABI = ["function approve(address spender, uint256 amount) external returns (bool)"];
    const tokenContract = new ethers.Contract(testTokenAddr, approveABI, provider);
    const maxUint256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")

    const approveData = tokenContract.interface.encodeFunctionData("approve", [
      gsrAddr,
      maxUint256
    ]);

    const approveTx = {
      to: testTokenAddr,
      gasLimit: 100000,
      gasPrice: gasPriceBN,
      data: approveData,
      chainId: chainId,
    };

    signedApproveTx = await signer.signTransaction(approveTx);
  } catch (err) {
    console.error(err);
    $("#textApproveTxhash").html(`Error: ${err.message}`);
  }
}

async function signSwapTx() {
  try {
    const testTokenToSwap = document.getElementById('testTokenSwapAmount')
    const testTokenToSwapBN = BigInt(testTokenToSwap.value)

    const signer = await provider.getSigner(accounts[0].address);

    const network = await signer.provider.getNetwork();
    const chainId = Number(network.chainId);

    const feeData = await signer.provider.getFeeData();
    const gasPriceBN = BigInt(feeData.gasPrice) || 25000000000n;

    const swapForGasABI = ["function swapForGas(address token, uint256 amountIn, uint256 minAmountOut, uint256 amountRepay, uint256 deadline)"];
    const gsr = new ethers.Contract(gsrAddr, swapForGasABI, provider);
    const currentBlock = await provider.getBlock("latest");
    const deadlineTimestamp = BigInt(currentBlock.timestamp) + 20n;

    const swapData = gsr.interface.encodeFunctionData("swapForGas", [
      testTokenAddr,
      testTokenToSwapBN,
      getMinAmountOut(gasPriceBN),
      amountRepay(gasPriceBN),
      deadlineTimestamp
    ]);

    const swapTx = {
      to: gsrAddr,
      gasLimit: 100000,
      gasPrice: gasPriceBN,
      data: swapData,
      chainId: chainId,
    };

    signedSwapTx = await signer.signTransaction(swapTx);
  } catch (err) {
    console.error(err);
    $("#textSwapTxhash").html(`Error: ${err.message}`);
  }
}

async function sendGaslessTx() {
  try {
    const balanceOfABI = ["function balanceOf(address owner) view returns (uint256)"];
    const testToken = new ethers.Contract(testTokenAddr, balanceOfABI, provider);

    const kaiaBeforeSwap = await provider.getBalance(accounts[0].address);
    const tokenBeforeSwap = await testToken.balanceOf(accounts[0].address);
    $("#kaiaBeforeSwap").html(`${kaiaBeforeSwap}`);
    $("#tokenBeforeSwap").html(`${tokenBeforeSwap}`);

    const explorerUrl = "https://baobab.klaytnscope.com/tx/";
    if (signedApproveTx) {
      console.log("Sending both approve and swap transactions via RPC...");
      await provider.send("kaia_sendRawTransactions", [[signedApproveTx, signedSwapTx]]);
      $("#textApproveTxhash").html(
        `<a href="${explorerUrl}${signedApproveTx.txhash}" target="_blank">${signedApproveTx.txhash}</a>`
      );
      $("#textSwapTxhash").html(
        `<a href="${explorerUrl}${signedSwapTx.txhash}" target="_blank">${signedSwapTx.txhash}</a>`
      );
    } else {
      await provider.send("kaia_sendRawTransactions", [[signedSwapTx]]);
      $("#textSwapTxhash").html(
        `<a href="${explorerUrl}${signedSwapTx.txhash}" target="_blank">${signedSwapTx.txhash}</a>`
      );
    }

    const kaiaAfterSwap = await provider.getBalance(accounts[0].address);
    const tokenAfterSwap = await testToken.balanceOf(accounts[0].address);
    $("#kaiaAfterSwap").html(`${kaiaAfterSwap}`);
    $("#tokenAfterSwap").html(`${tokenAfterSwap}`);
  } catch (error) {
    console.error("Error in sendGaslessTx:", error);
  }
}

async function signAndSendApproveTx() {
  try {
    // prepare transactions
    const signer = await provider.getSigner(accounts[0].address);
    
    const feeData = await signer.provider.getFeeData();
    const gasPriceBN = BigInt(feeData.gasPrice) || 25000000000n;
    const nonce = await provider.getTransactionCount(accounts[0].address);
    
    // send approve
    const testTokenToSwap = document.getElementById('testTokenSwapAmount')
    const testTokenToSwapBN = BigInt(ethers_ext.parseKaia(testTokenToSwap.value))

    const approveABI = ["function approve(address spender, uint256 amount) external returns (bool)"];
    const tokenContract = new ethers.Contract(testTokenAddr, approveABI, provider);
    const allowance = testTokenToSwapBN * 3n
    
    const approveData = tokenContract.interface.encodeFunctionData("approve", [
      gsrAddr,
      allowance
    ]);
  
    const approveTx = {
      type: 0,
      to: testTokenAddr,
      gasLimit: 100000,
      gasPrice: gasPriceBN,
      data: approveData,
      nonce: nonce,
    };
  
    console.log("approveTx", approveTx);
  
    const approveSentTx = await signer.sendTransaction(approveTx);
    console.log("approveSentTx", approveSentTx);
    const approveTxhash = approveSentTx.hash;
    $("#textApproveTxhash").html(
      approveTxhash
    );
  } catch (error) {
    console.error("Error in signAndSendApproveTx:", error);
  }
}

async function signAndSendSwapTx() {
  try {
    // before swap
    const balanceOfABI = ["function balanceOf(address owner) view returns (uint256)"];
    const testToken = new ethers.Contract(testTokenAddr, balanceOfABI, provider);

    const kaiaBeforeSwap = await provider.getBalance(accounts[0].address);
    const tokenBeforeSwap = await testToken.balanceOf(accounts[0].address);

    $("#kaiaBeforeSwap").html(`${ethers_ext.formatKaia(kaiaBeforeSwap)}`);
    $("#tokenBeforeSwap").html(`${ethers_ext.formatKaia(tokenBeforeSwap)}`);

    // prepare transactions
    const signer = await provider.getSigner(accounts[0].address);

    const feeData = await signer.provider.getFeeData();
    const gasPriceBN = BigInt(feeData.gasPrice) || 25000000000n;
    const nonce = await provider.getTransactionCount(accounts[0].address);

    // send swap
    const testTokenToSwap = document.getElementById('testTokenSwapAmount')
    const testTokenToSwapBN = BigInt(ethers_ext.parseKaia(testTokenToSwap.value))
    console.log(testTokenToSwapBN)

    const swapForGasABI = ["function swapForGas(address token, uint256 amountIn, uint256 minAmountOut, uint256 amountRepay, uint256 deadline)"];
    const gsr = new ethers.Contract(gsrAddr, swapForGasABI, provider);
    const currentBlock = await provider.getBlock("latest");
    const deadlineTimestamp = BigInt(currentBlock.timestamp) + 20n;

    console.log("testTokenToSwapBN", testTokenToSwapBN);

    const swapData = gsr.interface.encodeFunctionData("swapForGas", [
      testTokenAddr,
      testTokenToSwapBN,
      getMinAmountOut(gasPriceBN),
      amountRepay(gasPriceBN),
      deadlineTimestamp
    ]);

    const swapTx = {
      type: 0,
      to: gsrAddr,
      gasLimit: 500000,
      gasPrice: gasPriceBN,
      data: swapData,
      nonce: nonce + 1,
    };
    console.log("swapTx", swapTx);

    const swapSentTx = await signer.sendTransaction(swapTx);
    console.log("swapSentTx", swapSentTx);
    const swapTxhash = swapSentTx.hash;
    $("#textSwapTxhash").html(
      swapTxhash
    );

    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    await sleep(20000); // wait 20s
    
    // after swap
    const kaiaAfterSwap = await provider.getBalance(accounts[0].address);
    const tokenAfterSwap = await testToken.balanceOf(accounts[0].address);
    $("#kaiaAfterSwap").html(`${ethers_ext.formatKaia(kaiaAfterSwap)}`);
    $("#tokenAfterSwap").html(`${ethers_ext.formatKaia(tokenAfterSwap)}`);
  } catch (error) {
    console.error("Error in signAndSendSwapTx:", error);
  }
}

async function signAndGaslessTx() {
  try {
    // before swap
    const balanceOfABI = ["function balanceOf(address owner) view returns (uint256)"];
    const testToken = new ethers.Contract(testTokenAddr, balanceOfABI, provider);

    const kaiaBeforeSwap = await provider.getBalance(accounts[0].address);
    const tokenBeforeSwap = await testToken.balanceOf(accounts[0].address);

    $("#kaiaBeforeSwap").html(`${ethers_ext.formatKaia(kaiaBeforeSwap)}`);
    $("#tokenBeforeSwap").html(`${ethers_ext.formatKaia(tokenBeforeSwap)}`);

    const testTokenToSwap = document.getElementById('testTokenSwapAmount')
    const testTokenToSwapBN = BigInt(ethers_ext.parseKaia(testTokenToSwap.value))

    // prepare transactions
    const signer = await provider.getSigner(accounts[0].address);

    const feeData = await signer.provider.getFeeData();
    const gasPriceBN = BigInt(feeData.gasPrice) || 25000000000n;
    const nonce = await provider.getTransactionCount(accounts[0].address);

    // send approve
    const approveABI = ["function approve(address spender, uint256 amount) external returns (bool)"];
    const tokenContract = new ethers.Contract(testTokenAddr, approveABI, provider);
    const allowance = testTokenToSwapBN * 3n

    const approveData = tokenContract.interface.encodeFunctionData("approve", [
      gsrAddr,
      allowance
    ]);

    const approveTx = {
      type: 0,
      to: testTokenAddr,
      gasLimit: 100000,
      gasPrice: gasPriceBN,
      data: approveData,
      nonce: nonce,
    };

    console.log("approveTx", approveTx);

    const approveSentTx = await signer.sendTransaction(approveTx);
    console.log("approveSentTx", approveSentTx);
    const approveTxhash = approveSentTx.hash;
    $("#textApproveTxhash").html(
      approveTxhash
    );

    // send swap
    const swapForGasABI = ["function swapForGas(address token, uint256 amountIn, uint256 minAmountOut, uint256 amountRepay, uint256 deadline)"];
    const gsr = new ethers.Contract(gsrAddr, swapForGasABI, provider);
    const currentBlock = await provider.getBlock("latest");
    const deadlineTimestamp = BigInt(currentBlock.timestamp) + 20n;

    console.log("testTokenToSwapBN", testTokenToSwapBN);

    const swapData = gsr.interface.encodeFunctionData("swapForGas", [
      testTokenAddr,
      testTokenToSwapBN,
      getMinAmountOut(gasPriceBN),
      amountRepay(gasPriceBN),
      deadlineTimestamp
    ]);

    const swapTx = {
      type: 0,
      to: gsrAddr,
      gasLimit: 500000,
      gasPrice: gasPriceBN,
      data: swapData,
      nonce: nonce + 1,
    };
    console.log("swapTx", swapTx);

    const swapSentTx = await signer.sendTransaction(swapTx);
    console.log("swapSentTx", swapSentTx);
    const swapTxhash = swapSentTx.hash;
    $("#textSwapTxhash").html(
      swapTxhash
    );

    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    await sleep(30000); // wait 30s
    
    // after swap
    const kaiaAfterSwap = await provider.getBalance(accounts[0].address);
    const tokenAfterSwap = await testToken.balanceOf(accounts[0].address);
    $("#kaiaAfterSwap").html(`${ethers_ext.formatKaia(kaiaAfterSwap)}`);
    $("#tokenAfterSwap").html(`${ethers_ext.formatKaia(tokenAfterSwap)}`);
  } catch (error) {
    console.error("Error in signAndGaslessTx:", error);
  }
}

function startPollingGasFee() {
  setInterval(async () => {
    const feeData = await provider.getFeeData();
    const gasPriceBN = feeData.gasPrice || 25000000000n;
    
    const totalFee = amountRepay(gasPriceBN);
    const kaiaEstimateFee = totalFee;
    const testTokenEstimateFee = totalFee;
    
    $("#kaiaEstimateFee").html(`${ethers_ext.formatKaia(kaiaEstimateFee)} KAIA`);
    $("#testTokenEstimateFee").html(`${ethers_ext.formatKaia(testTokenEstimateFee)} TEST`);
  }, 1000);
}

async function calcTargetValue() {
  const testTokenToSwap = document.getElementById('testTokenSwapAmount')
  const feeData = await provider.getFeeData();
  const gasPriceBN = feeData.gasPrice || 25000000000n;

  const totalFee = amountRepay(gasPriceBN)
  const formattedTotalFee = ethers_ext.formatKaia(totalFee)
  const kaiaSwapAmount = testTokenToSwap.value - formattedTotalFee
  $("#kaiaSwapAmount").html(`${kaiaSwapAmount}`);
}

function amountRepay(gasPriceBN) {
  const lendTxGas = BigInt(21000);
  const approveTxGas = BigInt(100000);
  const swapTxGas = BigInt(500000);

  const R1 = gasPriceBN * lendTxGas;
  const R2 = gasPriceBN * approveTxGas;
  const R3 = gasPriceBN * swapTxGas;

  const totalFee = R1 + R2 + R3;
  return totalFee
}

function getMinAmountOut(gasPriceBN) {
  const appTxFee = BigInt(100000)
  const commissionRateBasisPoints = 500;

  // Calculate minimum amount out: appTxFee/(1 - commissionRate) + amountRepay
  const appTxFeeBN = BigInt(appTxFee);
  const amountRepayBN = amountRepay(gasPriceBN);

  const commissionRateBN = BigInt(commissionRateBasisPoints);
  const denominator = BigInt(10000);

  const adjustedFee = appTxFeeBN * denominator / (denominator - commissionRateBN);
  const minAmountOut = adjustedFee + amountRepayBN;

  return minAmountOut.toString();
}
