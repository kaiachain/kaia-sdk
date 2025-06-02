var provider = null;
var accounts = null;

// https://baobab.klaytnscope.com/account/0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df?tabId=contractCode
var contractAddress = "0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df";
var contractCalldata = "0xd09de08a"; // function increment()

function isKaikas() {
  return provider && provider.provider.isKaikas;
}

function mapTxType(txType) {
  const txTypeMap = {
    [ethers_ext.TxType.SmartContractExecution]: "SMART_CONTRACT_EXECUTION",
    [ethers_ext.TxType.Legacy]: "LEGACY",
    [ethers_ext.TxType.ValueTransfer]: "VALUE_TRANSFER",
    [ethers_ext.TxType.FeeDelegatedValueTransfer]: "FEE_DELEGATED_VALUE_TRANSFER",
    [ethers_ext.TxType.FeeDelegatedSmartContractExecution]: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
    // try to map other types if needed
  };

  const mappedType = txTypeMap[txType];
  if (!mappedType) {
    throw new Error(`Unsupported TxType: ${txType}`);
  }
  return mappedType;
}

// https://docs.ethers.org/v5/getting-started/#getting-started--connecting
async function connect(injectedProvider) {
  if (!injectedProvider) {
    const errorMsg = "No wallet provider detected.";
    $("#textAccounts").html(errorMsg);
    throw new Error(errorMsg);
  }

  // Wrap the injected provider with Web3Provider
  provider = new ethers.providers.Web3Provider(injectedProvider);

  // Detect user network
  try {
    let chainId;
    if (injectedProvider === window.klaytn) {
      try {
        chainId = await provider.send("klay_chainId", []);
      } catch (e) {
        chainId = await provider.send("eth_chainId", []);
      }
    } else {
      chainId = await provider.send("eth_chainId", []);
    }
    console.log("chainId", chainId);
    $("#textChainId").html(chainId);
  } catch (err) {
    console.error("Failed to get chainId:", err);
    $("#textChainId").html("Error detecting network");
  }

  injectedProvider.on("networkChanged", (chainId) => {
    console.log("chainId changed", chainId);
    $("#textChainId").html(chainId);
    provider = new ethers.providers.Web3Provider(injectedProvider);
  });

  // Detect user account
  try {
    let accounts = [];
    console.log("Calling enable() or eth_requestAccounts...");

    // Try enable() first for Kaia Wallet
    if (injectedProvider === window.klaytn) {
      try {
        const enableResult = await injectedProvider.enable();
        console.log("Enable result:", enableResult);
        accounts = enableResult || [];
      } catch (e) {
        console.warn("enable() failed, trying eth_requestAccounts:", e);
      }
    }

    // Try eth_requestAccounts if enable() failed or not available
    if (accounts.length === 0) {
      const requestAccountsResult = await provider.send("eth_requestAccounts", []);
      console.log("eth_requestAccounts result:", requestAccountsResult);
      accounts = requestAccountsResult || [];
    }

    // Check if accounts are still empty
    if (accounts.length === 0 && injectedProvider.selectedAddress) {
      accounts = [injectedProvider.selectedAddress];
      console.log("Using selectedAddress:", accounts);
    }

    // Get accounts from listAccounts as a fallback
    if (accounts.length === 0) {
      accounts = await provider.listAccounts();
      console.log("Accounts from listAccounts:", accounts);
    }

    if (accounts.length > 0) {
      $("#textAccounts").html(accounts[0]);
    } else {
      console.warn("No accounts found after all attempts.");
      $("#textAccounts").html("No accounts found. Please ensure your Kaia Wallet is unlocked, connected, and you have approved the dApp connection.");
    }
  } catch (err) {
    console.error("Failed to get accounts:", err);
    $("#textAccounts").html(`Error connecting to wallet: ${err.message}`);
    throw err;
  }

  injectedProvider.on("accountsChanged", async (accounts) => {
    console.log("accounts changed", accounts);
    $("#textAccounts").html(accounts[0] || "No accounts found");
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
    await provider.send("wallet_switchEthereumChain", [{ chainId: networkSpec.chainId }]);
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

async function signMsg() {
  try {
    if (isKaikas()) {
      const { hexlify, toUtf8Bytes } = ethers.utils;
      const injectedProvider = window.klaytn;
      const message = "Hello dapp";
      const hexMessage = hexlify(toUtf8Bytes(message));

      // Get accounts directly from injectedProvider
      const accounts = await injectedProvider.enable();
      const address = accounts[0];
      if (!address) {
        throw new Error("No account found. Please ensure your Kaia Wallet is connected.");
      }

      // Detect if the user is on mobile or desktop
      const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
      let signature;

      if (isMobile) {
        // Thử sendAsync hoặc send cho mobile
        try {
          signature = await new Promise((resolve, reject) => {
            injectedProvider.sendAsync(
              {
                method: "klay_sign",
                params: [address, hexMessage],
              },
              (err, result) => {
                if (err) reject(err);
                else resolve(result.result);
              }
            );
          });
        } catch (e) {
          console.warn("sendAsync failed, trying send:", e);
          signature = await injectedProvider.send("klay_sign", [address, hexMessage]);
        }
      } else {
        // Use request method for desktop
        signature = await injectedProvider.request({
          method: "klay_sign",
          params: [address, hexMessage],
        });
      }

      console.log("signature", signature);
      $("#textSignature").html(signature);

      // Recover the address from the signature
      let recoveredAddress;
      if (isMobile) {
        try {
          recoveredAddress = await new Promise((resolve, reject) => {
            injectedProvider.sendAsync(
              {
                method: "klay_recoverFromMessage",
                params: [address, hexMessage, signature, "latest"],
              },
              (err, result) => {
                if (err) reject(err);
                else resolve(result.result);
              }
            );
          });
        } catch (e) {
          console.warn("klay_recoverFromMessage failed, using fallback:", e);
          recoveredAddress = ethers.utils.verifyMessage(message, signature);
        }
      } else {
        recoveredAddress = await injectedProvider.request({
          method: "klay_recoverFromMessage",
          params: [address, hexMessage, signature, "latest"],
        });
      }
      console.log("recoveredAddress", recoveredAddress);
      $("#textRecoveredAddress").html(recoveredAddress);
    } else {
      const signer = provider.getSigner();
      const message = "Hello dapp";

      const signature = await signer.signMessage(message);
      console.log("signature", signature);
      $("#textSignature").html(signature);

      const recoveredAddress = ethers.utils.verifyMessage(message, signature);
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
    const injectedProvider = isKaikas() ? window.klaytn : window.ethereum;
    if (!injectedProvider) {
      throw new Error("No wallet provider detected.");
    }

    // Get address directly from injectedProvider
    const accounts = await injectedProvider.enable();
    const address = accounts[0];
    if (!address) {
      throw new Error("No account found. Please ensure your wallet is connected.");
    }

    // Check account balance
    let balance;
    if (isKaikas()) {
      balance = await new Promise((resolve, reject) => {
        injectedProvider.sendAsync(
          {
            method: "klay_getBalance",
            params: [address, "latest"],
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.result);
          }
        );
      });
    } else {
      provider = new ethers.providers.Web3Provider(injectedProvider);
      balance = await provider.getBalance(address);
    }
    console.log("Account balance:", balance);
    if (parseInt(balance, 16) < 1e15) {
      throw new Error("Insufficient KAIA balance to cover transaction fees.");
    }

    // Create transaction request
    const txRequest = await makeTxRequest(address);
    let sentTx;

    if (isKaikas()) {
      // Adjust txRequest for Kaia Wallet
      const klayTxRequest = {
        type: mapTxType(txRequest.type),
        to: txRequest.to,
        value: `0x${parseInt(txRequest.value || 0).toString(16)}`,
        from: address,
        data: txRequest.data || (txRequest.type === ethers_ext.TxType.ValueTransfer || txRequest.type === ethers_ext.TxType.FeeDelegatedValueTransfer ? undefined : "0x"),
        gas: "50000",
      };

      console.log("klayTxRequest:", klayTxRequest);

      // Send transaction with Kaia Wallet
      sentTx = await new Promise((resolve, reject) => {
        injectedProvider.sendAsync(
          {
            method: "klay_sendTransaction",
            params: [klayTxRequest],
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.result);
          }
        );
      });
    } else {
      // Adjust txRequest for MetaMask (Ethereum-compatible)
      let metaTxRequest = {
        to: txRequest.to,
        value: txRequest.value ? ethers.utils.hexValue(txRequest.value) : "0x0",
        from: address,
        gasLimit: "0xc350", // Default gas limit (50000 in hex)
      };

      // Handle data only if present and valid
      if (txRequest.data && txRequest.data !== "0x") {
        metaTxRequest.data = txRequest.data;
      }

      // MetaMask does not support Kaia-specific types, use Legacy transaction
      if (txRequest.type && [ethers_ext.TxType.ValueTransfer, ethers_ext.TxType.SmartContractExecution, ethers_ext.TxType.FeeDelegatedValueTransfer, ethers_ext.TxType.FeeDelegatedSmartContractExecution].includes(txRequest.type)) {
        console.warn("Converting Kaia-specific TxType to Legacy for MetaMask. Data may be ignored if not supported.");
        metaTxRequest = {
          to: txRequest.to,
          value: metaTxRequest.value,
          from: address,
          data: txRequest.data || "0x", // Keep data if provided
          gasLimit: "0xc350",
        };
      }

      console.log("metaTxRequest:", metaTxRequest);

      // Send transaction with MetaMask (ethers.js)
      provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      sentTx = await signer.sendTransaction(metaTxRequest);
    }

    console.log("sentTx", sentTx);
    const txhash = isKaikas() ? sentTx : sentTx.hash;
    const explorerUrl = "https://baobab.klaytnscope.com/tx/";
    $("#textTxhash").html(`<a href="${explorerUrl}${txhash}" target="_blank">${txhash}</a>`);
  } catch (err) {
    console.error(err);
    $("#textTxhash").html(`Error: ${err.message}`);
  }
}

async function sendLegacyVT() {
  doSendTx(async (address) => {
    return {
      type: ethers_ext.TxType.ValueTransfer, // 0x08
      to: address, // send to myself
      value: 0,
    };
  });
}
async function sendLegacySC() {
  doSendTx(async () => {
    return {
      type: ethers_ext.TxType.SmartContractExecution, // 0x30
      to: contractAddress,
      data: contractCalldata,
      value: 0,
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
      value: 0,
    };
  });
}

// This operation is usually done in the backend by the dApp operator.
// We do it here with hardcoded private key for demonstration purpose.
async function doSendTxAsFeePayer(signedTx) {
  try {
    const httpProvider = new ethers_ext.JsonRpcProvider("https://public-en-kairos.node.kaia.io");
    const feePayerPriv = "0xb3cf575dea0081563fe5482de2fe4425e025502b1f4ae7e02b2540ac0a5beda1";
    const feePayerWallet = new ethers_ext.Wallet(feePayerPriv, httpProvider);

    // Extract rawTransaction from signedTx
    const rawTx = signedTx.rawTransaction;
    if (!rawTx || typeof rawTx !== "string") {
      throw new Error("Invalid raw transaction format. rawTransaction is missing or not a string.");
    }

    const sentTx = await feePayerWallet.sendTransactionAsFeePayer(rawTx);
    console.log("sentTx", sentTx);
    const txhash = sentTx.hash;
    const explorerUrl = "https://baobab.klaytnscope.com/tx/";
    $("#textTxhash").html(`<a href="${explorerUrl}${txhash}" target="_blank">${txhash}</a>`);
  } catch (err) {
    console.error("doSendTxAsFeePayer error:", err);
    $("#textTxhash").html(`Error: ${err.message}`);
  }
}

async function doSignTx(makeTxRequest) {
  try {
    const injectedProvider = isKaikas() ? window.klaytn : window.ethereum;
    if (!injectedProvider) {
      throw new Error("No wallet provider detected.");
    }

    // Send enable request to the injected provider
    const accounts = await injectedProvider.enable();
    const address = accounts[0];
    if (!address) {
      throw new Error("No account found. Please ensure your wallet is connected.");
    }

    // Check account balance
    let balance;
    if (isKaikas()) {
      balance = await new Promise((resolve, reject) => {
        injectedProvider.sendAsync(
          {
            method: "klay_getBalance",
            params: [address, "latest"],
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.result);
          }
        );
      });
    } else {
      provider = new ethers.providers.Web3Provider(injectedProvider);
      balance = await provider.getBalance(address);
    }
    console.log("Account balance:", balance);

    // Create transaction request
    const txRequest = await makeTxRequest(address);
    let signedTx;

    if (isKaikas()) {
      // Adjust txRequest for Kaia Wallet (Fee Delegated)
      const klayTxRequest = {
        type: mapTxType(txRequest.type),
        to: txRequest.to,
        value: `0x${parseInt(txRequest.value || 0).toString(16)}`,
        from: address,
        data: txRequest.data || (txRequest.type === ethers_ext.TxType.FeeDelegatedValueTransfer ? undefined : "0x"), // Add data only for smart contract execution
        gas: "50000",
      };

      console.log("klayTxRequest:", klayTxRequest);

      // Assign transaction with Kaia Wallet
      signedTx = await new Promise((resolve, reject) => {
        injectedProvider.sendAsync(
          {
            method: "klay_signTransaction",
            params: [klayTxRequest],
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.result);
          }
        );
      });
    } else {
      // Assign transaction with MetaMask (ethers.js)
      provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      signedTx = await signer.signTransaction(txRequest);
    }

    console.log("signedTx", signedTx);
    $("#textSignedTx").html(`${signedTx.rawTransaction || signedTx}`);

    // Send the signed transaction as fee payer
    await doSendTxAsFeePayer(signedTx);
  } catch (err) {
    console.error("doSignTx error:", err);
    $("#textTxhash").html(`Error: ${err.message}`);
  }
}

async function sendFeeDelegatedVT() {
  doSignTx(async (address) => {
    return {
      type: ethers_ext.TxType.FeeDelegatedValueTransfer,
      to: address,
      value: 0,
    };
  });
}

async function sendFeeDelegatedSC() {
  doSignTx(async () => {
    return {
      type: ethers_ext.TxType.FeeDelegatedSmartContractExecution,
      to: contractAddress,
      data: contractCalldata,
      value: 0,
    };
  });
}