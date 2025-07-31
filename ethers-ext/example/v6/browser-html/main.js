var provider = null;
var accounts = null;
var signedApproveTx = null;
var signedSwapTx = null;

// https://kairos.kaiascan.io/address/0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df?tabId=contractCode
var contractAddress = "0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df";
var contractCalldata = "0xd09de08a"; // function increment()

var testTokenAddr = "0xcB00BA2cAb67A3771f9ca1Fa48FDa8881B457750"
var routerAddress = "0x4b41783732810b731569e4d944f59372f411bea2"

var feeDelegationURL = "https://fee-delegation-kairos.kaia.io"; // TESTNET Fee Delegation Service

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
    $("#textAccount").html(accounts.map((a) => a.address));
  });
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
    chainName: "Kaia Kairos",
    nativeCurrency: {
      name: "KAIA",
      symbol: "KAIA",
      decimals: 18,
    },
    rpcUrls: ["https://public-en-kairos.node.kaia.io"],
    blockExplorerUrls: ["https://kairos.kaiascan.io/"],
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
    const explorerUrl = "https://kairos.kaiascan.io/tx/";
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
  const explorerUrl = "https://kairos.kaiascan.io/tx/";
  $("#textTxhash").html(
    `<a href="${explorerUrl}${txhash}" target="_blank">${txhash}</a>`
  );
}

async function doSendTxToFeeDelegationService(signedTx) {
  const response = await fetch(`${feeDelegationURL}/api/signAsFeePayer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer your_kaia_api_key' // FOR MAINNET; OTHERWISE, SENDER OR CONTRACT ADDRESS MUST BE WHITELISTED
    },
    body: JSON.stringify({
      userSignedTx: { raw: signedTx }
    })
  });

  const result = await response.json();
  const txhash = result.data.hash;
  const explorerUrl = "https://kairos.kaiascan.io/tx/";
  $("#textTxhash").html(
    `<a href="${explorerUrl}${txhash}" target="_blank">${txhash}</a>`
  );
}

async function doSignTx(makeTxRequest, isFeeDelegationService) {
  try {
    const signer = await provider.getSigner(accounts[0].address);
    const address = await signer.getAddress();
    const txRequest = await makeTxRequest(address);

    const signedTx = await signer.signTransaction(txRequest);
    console.log("signedTx", signedTx);
    $("#textSignedTx").html(`${signedTx}`);

    if (isFeeDelegationService) {
      // Send to Fee Delegation Service if isFeeDelegationService is true
      await doSendTxToFeeDelegationService(signedTx);
    } else {
      await doSendTxAsFeePayer(signedTx);
    }
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
  }, false);
}
async function sendFeeDelegatedSC() {
  doSignTx(async () => {
    return {
      type: ethers_ext.TxType.FeeDelegatedSmartContractExecution, // 0x09
      to: contractAddress,
      data: contractCalldata,
    };
  }, false);
}

async function sendFeeDelegatedServiceVT() {
  doSignTx(async (address) => {
    return {
      type: ethers_ext.TxType.FeeDelegatedValueTransfer, // 0x09
      to: address, // send to myself
      value: 0,
    };
  }, true);
}
async function sendFeeDelegatedServiceSC() {
  doSignTx(async () => {
    return {
      type: ethers_ext.TxType.FeeDelegatedSmartContractExecution, // 0x09
      to: contractAddress,
      data: contractCalldata,
    };
  }, true);
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

    // ------- prepare transactions -------
    const signer = await provider.getSigner(accounts[0].address);
    const router = await ethers_ext.gasless.getGaslessSwapRouter(provider, routerAddress);
    const routerAddr = await router.getAddress();
    const gasPrice = (await provider.getFeeData()).gasPrice;

    // ------- send approve -------
    let approveTx = await ethers_ext.gasless.getApproveTx(
      provider,
      accounts[0].address,
      testTokenAddr,
      routerAddr,
      gasPrice,
    );
    console.log("approveTx", approveTx);
    try {
      const approveSentTx = await signer.sendTransaction(approveTx);
      console.log("approveSentTx", JSON.stringify(approveSentTx));
      const approveTxhash = approveSentTx.hash;
      $("#textApproveTxhash").html(
        approveTxhash
      );
    } catch (err) {
      console.error(err);
    }

    // ------- send swap -------
    const appTxFee = ethers.parseUnits(document.getElementById('desiredKaiaAmount').value, "ether");
    console.log("appTxFee", appTxFee);
    const amountRepay = ethers_ext.gasless.getAmountRepay(true, gasPrice);
    console.log("amountRepay", amountRepay);
    const minAmountOut = ethers_ext.gasless.getMinAmountOut(amountRepay, appTxFee, 0);
    console.log("minAmountOut", minAmountOut);
    const amountIn = await ethers_ext.gasless.getAmountIn(router, testTokenAddr, minAmountOut, 50);
    console.log("amountIn", amountIn);

    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    await sleep(5000); // wait 5s

    let swapTx = await ethers_ext.gasless.getSwapTx(
      provider,
      accounts[0].address,
      testTokenAddr,
      routerAddr,
      amountIn,
      minAmountOut,
      amountRepay,
      gasPrice,
      true,
      1800,
    );
    console.log("swapTx", swapTx);

    const swapSentTx = await signer.sendTransaction(swapTx);
    console.log("swapSentTx", JSON.stringify(swapSentTx));
    const swapTxhash = swapSentTx.hash;
    $("#textSwapTxhash").html(
      swapTxhash
    );

    await sleep(10000); // wait 10s

    // ------- after swap -------
    const kaiaAfterSwap = await provider.getBalance(accounts[0].address);
    const tokenAfterSwap = await testToken.balanceOf(accounts[0].address);
    $("#kaiaAfterSwap").html(`${ethers_ext.formatKaia(kaiaAfterSwap)}`);
    $("#tokenAfterSwap").html(`${ethers_ext.formatKaia(tokenAfterSwap)}`);
  } catch (error) {
    console.error("Error in signAndGaslessTx:", error);
  }
}

async function calcTargetValue() {
  const appTxFee = ethers.parseUnits(document.getElementById('desiredKaiaAmount').value, "ether");
  console.log("desiredKaiaAmount", appTxFee);
  const router = await ethers_ext.gasless.getGaslessSwapRouter(provider, routerAddress);
  const gasPrice = (await provider.getFeeData()).gasPrice;
  const amountRepay = ethers_ext.gasless.getAmountRepay(true, gasPrice);
  console.log("amountRepay", amountRepay);
  const minAmountOut = ethers_ext.gasless.getMinAmountOut(amountRepay, appTxFee, 0);
  console.log("minAmountOut", minAmountOut);
  const amountIn = await ethers_ext.gasless.getAmountIn(router, testTokenAddr, minAmountOut, 50);
  console.log("amountIn", amountIn);

  $("#kaiaEstimateFee").html(`${ethers_ext.formatKaia(amountRepay)}`);
  $("#testTokenEstimateFee").html(`${ethers_ext.formatKaia(amountIn)}`);
}
