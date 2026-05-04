var provider = null;
var rawProvider = null;
var accounts = null;
var signedApproveTx = null;
var signedSwapTx = null;
var walletFlags = { isMetaMask: false, isKaikas: false, isOKX: false, isPrivy: false };

// ---------------------------------------------------------------------------
// Privy configuration — replace with your own app ID and client ID from
// the Privy Dashboard (https://dashboard.privy.io).
// ---------------------------------------------------------------------------
var PRIVY_APP_ID = "cmoqvarqz00g20cjovmi09ugi";
var PRIVY_CLIENT_ID = "client-WY6Yh964P1rdns77tJChte7nAqea6oCjqvFLrjwN9vD6k";

var privyClient = null;
var privyIframe = null;
var privyMessageListener = null;
var privyEmailAddress = null;

// https://kairos.kaiascan.io/address/0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df?tabId=contractCode
var contractAddress = "0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df";
var contractCalldata = "0xd09de08a"; // function increment()

// Kairos contracts
var holderVerifierAddress = "0x6dc8f41BFfD51C20437df7B0eD5E17716802E4EF";
var bridgeAddress = "0xF02C6c29611e7eC05e4429ce440E1fF40c9b730a";

var testTokenAddr = "0xcB00BA2cAb67A3771f9ca1Fa48FDa8881B457750"
var routerAddress = "0x4b41783732810b731569e4d944f59372f411bea2"

var feeDelegationURL = "https://fee-delegation-kairos.kaia.io"; // TESTNET Fee Delegation Service

function isKaikas() {
  return provider && provider.provider.isKaikas;
}

function isNonKaikasKaiaWallet() {
  return walletFlags.isOKX && !walletFlags.isKaikas;
}

// https://docs.ethers.org/v5/getting-started/#getting-started--connecting
async function connect(injectedProvider, flags) {
  if (!injectedProvider) {
    alert("Please install wallet");
    return;
  }

  rawProvider = injectedProvider;
  walletFlags = { isMetaMask: false, isKaikas: false, isOKX: false, isPrivy: false, ...flags };

  // Wrap the window.{ethereum,klaytn,okxwallet} object with Web3Provider.
  provider = new ethers_ext.Web3Provider(injectedProvider);

  // Detect user network
  // https://docs.metamask.io/wallet/how-to/connect/detect-network/
  const chainId = await provider.send("eth_chainId");
  console.log("chainId", chainId);
  $("#textChainId").html(chainId);

  // Privy's embedded wallet provider may not support .on() events
  if (typeof injectedProvider.on === "function") {
    injectedProvider.on("networkChanged", (chainId) => {
      console.log("chainId changed", chainId);
      $("#textChainId").html(chainId);
      provider = new ethers_ext.Web3Provider(injectedProvider);
    });
  }

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

  // Display connected wallet name
  var walletName = "";
  if (walletFlags.isMetaMask) walletName = "MetaMask";
  if (walletFlags.isKaikas) walletName = "Kaia Wallet";
  if (walletFlags.isOKX) walletName = "OKX";
  if (walletFlags.isPrivy) walletName = "Privy";
  $("#textWallet").html(walletName);

  if (typeof injectedProvider.on === "function") {
    injectedProvider.on("accountsChanged", async (changedAccounts) => {
      accounts = changedAccounts;
      console.log("accounts changed", accounts);
      $("#textAccount").html(accounts.map((a) => a.address));
    });
  }
}
async function connectMM() {
  $("text").html(""); // Clear all text
  if (!window.ethereum) {
    alert("Please install MetaMask");
  } else {
    await connect(window.ethereum, { isMetaMask: true });
  }
}
async function connectKK() {
  $("text").html(""); // Clear all text
  if (!window.klaytn) {
    alert("Please install Kaia Wallet");
  } else {
    await connect(window.klaytn, { isKaikas: true });
  }
}
async function connectOKX() {
  $("text").html(""); // Clear all text
  if (!window.okxwallet) {
    alert("Please install OKX Wallet");
  } else {
    await connect(window.okxwallet, { isOKX: true });
  }
}
// ---------------------------------------------------------------------------
// Privy embedded wallet integration
// ---------------------------------------------------------------------------

async function initPrivy() {
  if (privyClient) return privyClient;

  var SDK = window.PrivySDK;
  if (!SDK || !SDK.Privy) {
    console.error("Privy SDK not loaded. Make sure privy-bundle.js is included.");
    return null;
  }

  privyClient = new SDK.Privy({
    appId: PRIVY_APP_ID,
    clientId: PRIVY_CLIENT_ID,
    storage: new SDK.LocalStorage(),
  });

  await privyClient.initialize();

  // Mount the secure-context iframe for embedded wallet key material
  privyIframe = document.createElement("iframe");
  privyIframe.src = privyClient.embeddedWallet.getURL();
  privyIframe.style.display = "none";
  document.body.appendChild(privyIframe);

  privyClient.setMessagePoster(privyIframe.contentWindow);

  privyMessageListener = function (e) {
    if (e.source !== privyIframe.contentWindow) return;
    var data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
    privyClient.embeddedWallet.onMessage(data);
  };
  window.addEventListener("message", privyMessageListener);

  // Check for a returning user session (throws when no tokens exist yet)
  try {
    var sessionResult = await privyClient.user.get();
    if (sessionResult && sessionResult.user) {
      await privyConnectWallet(sessionResult.user);
    }
  } catch (_) {
    // No existing session — user will authenticate via OTP
  }

  return privyClient;
}

async function privySendOTP() {
  try {
    var client = await initPrivy();
    if (!client) {
      alert("Privy SDK failed to initialize. Check your App ID and Client ID.");
      return;
    }

    privyEmailAddress = $("#privyEmail").val().trim();
    if (!privyEmailAddress) {
      alert("Please enter an email address");
      return;
    }

    $("#privyStatus").html("Sending OTP...");
    await client.auth.email.sendCode(privyEmailAddress);
    $("#privyOTPSection").show();
    $("#privyStatus").html("OTP sent to " + privyEmailAddress);
  } catch (err) {
    console.error("Privy sendOTP error:", err);
    $("#privyStatus").html("Error: " + err.message);
  }
}

async function privyVerifyOTP() {
  try {
    if (!privyClient || !privyEmailAddress) {
      alert("Please send an OTP first");
      return;
    }

    var otp = $("#privyOTP").val().trim();
    if (!otp) {
      alert("Please enter the OTP code");
      return;
    }

    $("#privyStatus").html("Verifying...");
    var session = await privyClient.auth.email.loginWithCode(privyEmailAddress, otp);
    var user = session.user;

    await privyConnectWallet(user);
  } catch (err) {
    console.error("Privy verifyOTP error:", err);
    $("#privyStatus").html("Error: " + err.message);
  }
}

async function privyConnectWallet(user) {
  var SDK = window.PrivySDK;

  // Get or create the embedded Ethereum wallet
  var wallet = SDK.getUserEmbeddedEthereumWallet(user);
  if (!wallet) {
    $("#privyStatus").html("Creating embedded wallet...");
    var createResult = await privyClient.embeddedWallet.create({});
    user = createResult.user;
    wallet = SDK.getUserEmbeddedEthereumWallet(user);
  }

  var entropyDetails = SDK.getEntropyDetailsFromUser(user);
  $("#privyStatus").html("Getting wallet provider...");

  var privyProvider = await privyClient.embeddedWallet.getEthereumProvider({
    wallet: wallet,
    entropyId: entropyDetails.entropyId,
    entropyIdVerifier: entropyDetails.entropyIdVerifier,
  });

  // Privy's EIP-1193 provider exposes request() but ethers_ext.Web3Provider
  // may also probe for send/sendAsync. Wrap to guarantee compatibility.
  var wrappedProvider = {
    request: function (args) { return privyProvider.request(args); },
    isPrivy: true,
  };

  // Clear display fields first, then update Privy UI state so textPrivyUser persists
  $("text").html("");
  $("#privyLoggedOut").hide();
  $("#privyLoggedIn").show();
  $("#textPrivyUser").html(privyEmailAddress || wallet.address);
  $("#privyStatus").html("Connecting wallet...");

  // Set up globals so transaction functions work
  rawProvider = wrappedProvider;
  walletFlags = { isMetaMask: false, isKaikas: false, isOKX: false, isPrivy: true };

  // Get account and chain directly from the Privy provider first
  var accts = await privyProvider.request({ method: "eth_requestAccounts" });
  var chain = await privyProvider.request({ method: "eth_chainId" });
  console.log("Privy accounts:", accts, "chainId:", chain);

  // Create ethers-ext Web3Provider for signing/sending transactions
  try {
    provider = new ethers_ext.Web3Provider(wrappedProvider);
    accounts = await provider.listAccounts();
  } catch (err) {
    console.warn("Web3Provider wrapping failed, using BrowserProvider:", err);
    provider = new ethers.BrowserProvider(wrappedProvider);
    accounts = await provider.listAccounts();
  }

  // Populate the display fields
  $("#textWallet").html("Privy");
  $("#textAccount").html(accts[0] || wallet.address);
  $("#textChainId").html(chain);
  $("#privyStatus").html("Connected");
}

async function privyLogout() {
  try {
    if (!privyClient) return;

    var sessionResult = await privyClient.user.get();
    if (sessionResult && sessionResult.user) {
      await privyClient.auth.logout({ userId: sessionResult.user.id });
    }

    // Clean up iframe and listener
    if (privyMessageListener) {
      window.removeEventListener("message", privyMessageListener);
      privyMessageListener = null;
    }
    if (privyIframe) {
      privyIframe.remove();
      privyIframe = null;
    }
    privyClient = null;
    privyEmailAddress = null;

    // Reset UI
    $("#privyLoggedOut").show();
    $("#privyLoggedIn").hide();
    $("#privyOTPSection").hide();
    $("#privyEmail").val("");
    $("#privyOTP").val("");
    $("#privyStatus").html("Logged out");
    $("text").html("");

    provider = null;
    rawProvider = null;
    accounts = null;
    walletFlags = { isMetaMask: false, isKaikas: false, isOKX: false, isPrivy: false };
  } catch (err) {
    console.error("Privy logout error:", err);
    $("#privyStatus").html("Error: " + err.message);
  }
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
async function switchKairos() {
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
    let signature = null;
    const message = "Hello dapp";
    if (isKaikas()) {
      const { hexlify, toUtf8Bytes } = ethers;
      const signer = await provider.getSigner(accounts[0].address);
      const hexMessage = hexlify(toUtf8Bytes(message));

      signature = await provider.send("eth_sign", [
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

      signature = await signer.signMessage(message);
      console.log("signature", signature);
      $("#textSignature").html(signature);

      const recoveredAddress = ethers.verifyMessage(message, signature);
      console.log("recoveredAddress", recoveredAddress);
      $("#textRecoveredAddress").html(recoveredAddress);
    }
    return {
      signature: signature,
      message: message,
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

// For non-Kaikas wallets (e.g. OKX): since they don't support
// klay_signTransaction, we build the Kaia tx locally, ask the wallet to
// sign the hash via eth_sign, then assemble the signed tx client-side.
async function doSignTxNonKaikas(makeTxRequest, isFeeDelegationService) {
  try {
    const address = accounts[0].address || accounts[0];
    const txRequest = await makeTxRequest(address);
    if (!txRequest.from) txRequest.from = address;

    const rpcProvider = new ethers_ext.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

    if (!txRequest.nonce) txRequest.nonce = await rpcProvider.getTransactionCount(address);
    if (!txRequest.gasLimit) {
      const estimated = await rpcProvider.estimateGas({
        from: txRequest.from,
        to: txRequest.to,
        value: txRequest.value || 0,
        data: txRequest.data || "0x",
      });
      txRequest.gasLimit = Math.ceil(Number(estimated) * 2.5);
    }
    if (!txRequest.gasPrice) {
      const feeData = await rpcProvider.getFeeData();
      txRequest.gasPrice = feeData.gasPrice;
    }
    if (!txRequest.chainId) {
      const network = await rpcProvider.getNetwork();
      txRequest.chainId = Number(network.chainId);
    }
    if (!txRequest.value) txRequest.value = 0;

    const chainId = Number(txRequest.chainId);
    const klaytnTx = ethers_ext.KlaytnTxFactory.fromObject(txRequest);
    // await rpcProvider.send("eth_signTransaction", [{
    //   typeInt: 9,
    //   from: address,
    //   to: address,
    //   value: '0x0',
    //   feePayer: address,
    //   gasLimit: txRequest.gasLimit,
    // }]);
    // await rawProvider.request({
    //   method: "kaia_signTransaction", //"eth_sign",
    //   params: [{
    //     typeInt: 9,
    //     from: address,
    //     to: address,
    //     value: '0x0',
    //     feePayer: address,
    //   }],
    // });
    const sigHash = ethers.keccak256(klaytnTx.sigRLP());

    // eth_sign signs a raw 32-byte hash without any message prefix.
    // Call the raw injected provider directly to bypass the Kaia Web3Provider wrapper.
    const rawSig = await rawProvider.request({
      method: "kaia_sign", //"eth_sign",
      params: [address.toLowerCase(), sigHash],
    });

    const r = "0x" + rawSig.slice(2, 66);
    const s = "0x" + rawSig.slice(66, 130);
    const vByte = parseInt(rawSig.slice(130, 132), 16);
    const recoveryParam = vByte >= 27 ? vByte - 27 : vByte;
    const v = recoveryParam + chainId * 2 + 35;

    klaytnTx.addSenderSig({ r, s, v });

    let signedTx;
    if (ethers_ext.isFeePayerSigTxType(klaytnTx.type)) {
      console.log("senderTxHashRLP", klaytnTx.senderTxHashRLP());
      signedTx = klaytnTx.senderTxHashRLP();
    } else {
      console.log("txHashRLP", klaytnTx.txHashRLP());
      signedTx = klaytnTx.txHashRLP();
    }
    console.log("signedTx (non-Kaikas)", signedTx);
    $("#textSignedTx").html(`${signedTx}`);

    if (isFeeDelegationService) {
      await doSendTxToFeeDelegationService(signedTx);
    } else {
      await doSendTxAsFeePayer(signedTx);
    }
  } catch (err) {
    console.error(err);
    $("#textTxhash").html(`Error: ${err.message}`);
  }
}

async function sendNonKaikasFeeDelegatedVT() {
  doSignTxNonKaikas(async (address) => {
    return {
      type: ethers_ext.TxType.FeeDelegatedValueTransfer,
      to: address,
      value: 0,
    };
  }, false);
}
async function sendNonKaikasFeeDelegatedSC() {
  doSignTxNonKaikas(async () => {
    return {
      type: ethers_ext.TxType.FeeDelegatedSmartContractExecution,
      to: contractAddress,
      data: contractCalldata,
    };
  }, false);
}
async function sendNonKaikasFeeDelegatedServiceVT() {
  doSignTxNonKaikas(async (address) => {
    return {
      type: ethers_ext.TxType.FeeDelegatedValueTransfer,
      to: address,
      value: 0,
    };
  }, true);
}
async function sendNonKaikasFeeDelegatedServiceSC() {
  doSignTxNonKaikas(async () => {
    return {
      type: ethers_ext.TxType.FeeDelegatedSmartContractExecution,
      to: contractAddress,
      data: contractCalldata,
    };
  }, true);
}

// Privy fee-delegated transactions via eth_sign (raw hash, no prefix).
// Follows the same pattern as the server-side secp256k1_sign approach:
//   1. Build Kaia tx locally with KlaytnTxFactory
//   2. Compute sigHash = keccak256(sigRLP)
//   3. Sign raw hash via eth_sign on the Privy embedded wallet provider
//   4. Decompose signature, apply EIP-155
//   5. Send signed tx to fee payer or fee delegation service
async function doSignTxPrivy(makeTxRequest, isFeeDelegationService) {
  try {
    if (!walletFlags.isPrivy || !rawProvider) {
      alert("Please connect Privy wallet first");
      return;
    }

    var address = accounts[0].address || accounts[0];
    var txRequest = await makeTxRequest(address);
    if (!txRequest.from) txRequest.from = address;

    var rpcProvider = new ethers_ext.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

    if (!txRequest.nonce) txRequest.nonce = await rpcProvider.getTransactionCount(address);
    if (!txRequest.gasLimit) {
      var estimated = await rpcProvider.estimateGas({
        from: txRequest.from,
        to: txRequest.to,
        value: txRequest.value || 0,
        data: txRequest.data || "0x",
      });
      txRequest.gasLimit = Math.ceil(Number(estimated) * 2.5);
    }
    if (!txRequest.gasPrice) {
      var feeData = await rpcProvider.getFeeData();
      txRequest.gasPrice = feeData.gasPrice;
    }
    if (!txRequest.chainId) {
      var network = await rpcProvider.getNetwork();
      txRequest.chainId = Number(network.chainId);
    }
    if (!txRequest.value) txRequest.value = 0;

    var chainId = Number(txRequest.chainId);
    var klaytnTx = ethers_ext.KlaytnTxFactory.fromObject(txRequest);
    var sigHash = ethers.keccak256(klaytnTx.sigRLP());
    console.log("Privy sigHash:", sigHash);

    // eth_sign signs a raw 32-byte hash without any message prefix,
    // equivalent to Privy server API's secp256k1_sign.
    var rawSig = await rawProvider.request({
      method: "eth_sign",
      params: [address.toLowerCase(), sigHash],
    });
    console.log("Privy rawSig:", rawSig);

    var r = "0x" + rawSig.slice(2, 66);
    var s = "0x" + rawSig.slice(66, 130);
    var vByte = parseInt(rawSig.slice(130, 132), 16);
    var recoveryParam = vByte >= 27 ? vByte - 27 : vByte;
    var v = recoveryParam + chainId * 2 + 35;

    klaytnTx.addSenderSig({ r: r, s: s, v: v });

    var signedTx;
    if (ethers_ext.isFeePayerSigTxType(klaytnTx.type)) {
      signedTx = klaytnTx.senderTxHashRLP();
    } else {
      signedTx = klaytnTx.txHashRLP();
    }
    console.log("Privy signedTx:", signedTx);
    $("#textSignedTx").html(signedTx);

    if (isFeeDelegationService) {
      await doSendTxToFeeDelegationService(signedTx);
    } else {
      await doSendTxAsFeePayer(signedTx);
    }
  } catch (err) {
    console.error("Privy fee delegation error:", err);
    $("#textTxhash").html("Error: " + err.message);
  }
}

async function sendPrivyFeeDelegatedVT() {
  doSignTxPrivy(async function (address) {
    return {
      type: ethers_ext.TxType.FeeDelegatedValueTransfer,
      to: address,
      value: 0,
    };
  }, false);
}
async function sendPrivyFeeDelegatedSC() {
  doSignTxPrivy(async function () {
    return {
      type: ethers_ext.TxType.FeeDelegatedSmartContractExecution,
      to: contractAddress,
      data: contractCalldata,
    };
  }, false);
}
async function sendPrivyFeeDelegatedServiceVT() {
  doSignTxPrivy(async function (address) {
    return {
      type: ethers_ext.TxType.FeeDelegatedValueTransfer,
      to: address,
      value: 0,
    };
  }, true);
}
async function sendPrivyFeeDelegatedServiceSC() {
  doSignTxPrivy(async function () {
    return {
      type: ethers_ext.TxType.FeeDelegatedSmartContractExecution,
      to: contractAddress,
      data: contractCalldata,
    };
  }, true);
}

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

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

// Derive Finschia address
async function deriveFinschiaAddress() {
  try {
    const { signature, message } = await signMsg();
    const digest = ethers.hashMessage(message);

    const recoveredPubKey = ethers.SigningKey.recoverPublicKey(digest, signature);
    console.log('Recovered public key:', recoveredPubKey);

    const finschiaAddress = pubkeyToFinschiaAddress(recoveredPubKey);
    console.log('Finschia address:', finschiaAddress);

    $("#textDerivedFinschiaAddress").html(finschiaAddress);

    // Call getRecord from the HolderVerifier contract
    const holderVerifierABI = [
      "function getRecord(string) view returns (uint256, uint64)",
    ];

    const contract = new ethers.Contract(holderVerifierAddress, holderVerifierABI, provider);

    const result = await contract.getRecord(finschiaAddress);
    const conyBalance = result[0];
    const provisionSeq = result[1];
    console.log('ConyBalance:', conyBalance.toString());
    console.log('ProvisionSeq:', provisionSeq.toString());

    $("#textConyBalance").html(conyBalance.toString());
    $("#textProvisioned").html(provisionSeq > 0 ? "true" : "false");

    await getBalance();

    // check if provision was claimed
    const bridgeABI = [
      "function claimed(uint64) view returns (bool)",
    ];
    const bridgeContract = new ethers.Contract(bridgeAddress, bridgeABI, provider);
    const claimed = await bridgeContract.claimed(provisionSeq);
    console.log("claimed", claimed);
    $("#textClaimed").html(claimed ? "true" : "false");

    if (provisionSeq == 0 && conyBalance > 0) {
      $("#btnRequestProvision").prop("disabled", false);
    } else if (provisionSeq > 0 && !claimed) {
      $("#btnRequestClaim").prop("disabled", false);
    }
  } catch (error) {
    console.error('Error deriving Finschia address:', error);
    throw error;
  }
}

async function getBalance() {
  const balance = await provider.getBalance(accounts[0].address);
  $("#textBalance").html(`${ethers_ext.formatKaia(balance)}`);
}

async function requestProvision() {
  try {
    const { signature, message } = await signMsg();
    const digest = ethers.hashMessage(message);
    const recoveredPubKey = ethers.SigningKey.recoverPublicKey(digest, signature);
    console.log("recoveredPubKey", recoveredPubKey);
    const finschiaAddress = pubkeyToFinschiaAddress(recoveredPubKey);
    console.log("finschiaAddress", finschiaAddress);

    const holderVerifierABI = [
      "function requestProvision(bytes, string, bytes32, bytes)",
    ];
    const iface = new ethers.Interface(holderVerifierABI);
    const calldata = iface.encodeFunctionData("requestProvision", [recoveredPubKey, finschiaAddress, digest, signature]);
    const signer = await provider.getSigner(accounts[0].address);
    const txRequest = {
      to: holderVerifierAddress,
      data: calldata,
    };

    const sentTx = await signer.sendTransaction(txRequest);
    console.log("sentTx", sentTx);
    const txhash = sentTx.hash;
    const explorerUrl = "https://kairos.kaiascan.io/tx/";
    $("#textProvisionTxhash").html(
      `<a href="${explorerUrl}${txhash}" target="_blank">${txhash}</a>`
    );
    await sentTx.wait();

    const seqNumber = await getSeqNumber(finschiaAddress);
    // If seqNumber is greater than 0, the requestProvision has been successful
    if (seqNumber > 0) {
      $("#btnRequestProvision").prop("disabled", true);
      $("#btnRequestClaim").prop("disabled", false);
      $("#textProvisioned").html("true");
    }

    await getBalance();
  } catch (error) {
    console.error('Error requesting provision:', error);
    throw error;
  }
}

async function getSeqNumber(fnsaAddress) {
  const holderVerifierABI = [
    "function provisionSeq(string) view returns (uint64)",
  ];
  const contract = new ethers.Contract(holderVerifierAddress, holderVerifierABI, provider);
  const seqNumber = await contract.provisionSeq(fnsaAddress);
  console.log("seqNumber", seqNumber);
  return seqNumber;
}

async function requestClaim() {
  try {
    const finschiaAddress = $("#textDerivedFinschiaAddress").text();

    const seqNumber = await getSeqNumber(finschiaAddress);
    console.log("requestClaim: seqNumber", seqNumber);

    if (seqNumber == 0n) {
      alert("No claimable provision found");
      $("#btnRequestClaim").prop("disabled", true);
      return;
    }

    const bridgeABI = [
      "function requestClaim(uint64)"
    ];
    const iface = new ethers.Interface(bridgeABI);
    const calldata = iface.encodeFunctionData("requestClaim", [seqNumber]);
    const signer = await provider.getSigner(accounts[0].address);
    const txRequest = {
      to: bridgeAddress,
      data: calldata,
    };

    const sentTx = await signer.sendTransaction(txRequest);
    console.log("sentTx", sentTx);
    const txhash = sentTx.hash;
    const explorerUrl = "https://kairos.kaiascan.io/tx/";
    $("#textClaimTxhash").html(
      `<a href="${explorerUrl}${txhash}" target="_blank">${txhash}</a>`
    );
    const receipt = await sentTx.wait();

    if (receipt.status == 1) {
      $("#btnRequestClaim").prop("disabled", true);
      $("#textClaimed").html("true");
    }
    // update the balance
    await getBalance();
  } catch (error) {
    console.error('Error requesting claim:', error);
    throw error;
  }
}

function pubkeyToFinschiaAddress(pubkey) {
  const pubKeyBytes = ethers.getBytes(pubkey);
  const compressedPubKey = ethers.SigningKey.computePublicKey(pubKeyBytes, true);
  const sha256Hash = ethers.sha256(compressedPubKey);
  const ripemd160HashHex = ethers.ripemd160(ethers.getBytes(sha256Hash));
  const ripemd160Bytes = ethers.getBytes(ripemd160HashHex);
  const words = bech32.bech32.toWords(ripemd160Bytes);
  const finschiaAddress = bech32.bech32.encode("link", words);
  return finschiaAddress;
}