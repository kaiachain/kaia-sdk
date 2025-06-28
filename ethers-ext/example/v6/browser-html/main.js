var provider = null;
var accounts = null;
var signedApproveTx = null;
var signedSwapTx = null;

// https://baobab.klaytnscope.com/account/0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df?tabId=contractCode
var contractAddress = "0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df";
var contractCalldata = "0xd09de08a"; // function increment()

var testTokenAddr = "0x8ebc32c078f5ecc8406ddDC785c8F0e2490C1081"

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
  $("#textAccounts").html(accounts.map(
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

async function signAndSendGaslessTxs() {
  try {
    // ------- before swap -------
    const balanceOfABI = ["function balanceOf(address owner) view returns (uint256)"];
    const testToken = new ethers.Contract(testTokenAddr, balanceOfABI, provider);

    const kaiaBeforeSwap = await provider.getBalance(accounts[0].address);
    const tokenBeforeSwap = await testToken.balanceOf(accounts[0].address);

    $("#kaiaBeforeSwap").html(`${ethers_ext.formatKaia(kaiaBeforeSwap)}`);
    $("#tokenBeforeSwap").html(`${ethers_ext.formatKaia(tokenBeforeSwap)}`);

    const testTokenToSwap = document.getElementById('testTokenSwapAmount')
    const testTokenToSwapBN = BigInt(ethers_ext.parseKaia(testTokenToSwap.value))

    // ------- prepare transactions -------
    const signer = await provider.getSigner(accounts[0].address);

    const network = await signer.provider.getNetwork();
    const chainId = Number(network.chainId);

    const gsr = ethers_ext.gasless.getGaslessSwapRouter(provider, chainId);

    // ------- send approve -------
    let approveTx = await ethers_ext.gasless.getApproveTx(
      provider,
      accounts[0].address,
      testTokenAddr,
      gsr.address
    );
    console.log("approveTx", approveTx);

    const approveSentTx = await signer.sendTransaction(approveTx);
    console.log("approveSentTx", approveSentTx.toJSON());
    const approveTxhash = approveSentTx.hash;
    $("#textApproveTxhash").html(
      approveTxhash
    );

    // ------- send swap -------
    const currentBlock = await provider.getBlock("latest");
    const deadlineTimestamp = BigInt(currentBlock.timestamp) + 1800n;

    const feeData = await provider.getFeeData();
    const gasPriceGkei = Number(feeData.gasPrice) / 1e9;
    const amountRepay = ethers_ext.gasless.getAmountRepay(true, gasPriceGkei);

    const appTxFee = ethers.parseUnits("0.01", "ether").toString()
    const commissionRateBasisPoints = await ethers_ext.gasless.getCommissionRate(gsr);
    const minAmountOut = ethers_ext.gasless.getMinAmountOut(amountRepay, appTxFee, commissionRateBasisPoints)

    let swapTx = await ethers_ext.gasless.getSwapTx(
      provider,
      accounts[0].address,
      testTokenAddr,
      testTokenToSwapBN.toString(),
      minAmountOut.toString(),
      amountRepay.toString(),
      false,
      Number(deadlineTimestamp)
    );
    console.log("swapTx", swapTx);

    const swapSentTx = await signer.sendTransaction(swapTx);
    console.log("swapSentTx", swapSentTx.toJSON());
    const swapTxhash = swapSentTx.hash;
    $("#textSwapTxhash").html(
      swapTxhash
    );

    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    await sleep(30000); // wait 30s

    // ------- after swap -------
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
    const gasPriceGkei = Number(feeData.gasPrice) / 1e9;
    
    const totalFee = ethers_ext.gasless.getAmountRepay(true, gasPriceGkei);
    const kaiaEstimateFee = totalFee;
    const testTokenEstimateFee = totalFee;
    
    $("#kaiaEstimateFee").html(`${ethers_ext.formatKaia(kaiaEstimateFee)} KAIA`);
    $("#testTokenEstimateFee").html(`${ethers_ext.formatKaia(testTokenEstimateFee)} TEST`);
  }, 1000);
}

async function calcTargetValue() {
  const testTokenToSwap = document.getElementById('testTokenSwapAmount')
  const feeData = await provider.getFeeData();
  const gasPriceGkei = Number(feeData.gasPrice) / 1e9;

  const totalFee = ethers_ext.gasless.getAmountRepay(true, gasPriceGkei)
  const formattedTotalFee = ethers_ext.formatKaia(totalFee)
  const kaiaSwapAmount = testTokenToSwap.value - formattedTotalFee
  $("#kaiaSwapAmount").html(`${kaiaSwapAmount}`);
}
