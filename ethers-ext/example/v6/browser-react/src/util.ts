import { BrowserProvider, keccak256 } from "ethers";
import { JsonRpcProvider, Wallet } from "@kaiachain/ethers-ext/v6";
import { KlaytnTxFactory, isFeePayerSigTxType } from "@kaiachain/js-ext-core";
import { Account } from "./types";

export async function doSendTx(account: Account, txRequest: any): Promise<any> {
  try {
    if (!account.provider) {
      throw new Error("wallet not connected");
    }

    const signer = await account.provider.getSigner(account.address);
    if (txRequest.from) {
      const address = await signer.getAddress();
      txRequest.from = address;
    }
    const sentTx = await signer.sendTransaction(txRequest);

    return getTxhashUrl(1001, sentTx.hash);
  } catch (err) {
    console.error(err);
  }
}

export async function doSignTx(account: Account, txRequest: any, isFeeDelegationService: boolean): Promise<any> {
  if (!account.provider) {
    throw new Error("wallet not connected");
  }

  const signer = await account.provider.getSigner(account.address);
  if (txRequest.from) {
    const address = await signer.getAddress();
    txRequest.from = address;
  }

  const signedTx = await signer.signTransaction(txRequest);
  console.log("signedTx", signedTx);

  if (isFeeDelegationService) {
    return await doSendTxToFeeDelegationService(signedTx);
  } else {
    return await doSendTxAsFeePayer(signedTx);
  }
}

// For non-Kaikas wallets (e.g. OKX): since they don't support
// klay_signTransaction, we build the Kaia tx locally, ask the wallet to
// sign the hash via eth_sign, then assemble the signed tx client-side.
export async function doSignTxNonKaikas(account: Account, txRequest: any, isFeeDelegationService: boolean): Promise<any> {
  if (!account.provider) {
    throw new Error("wallet not connected");
  }

  const address = account.address!;
  if (!txRequest.from) txRequest.from = address;

  // Use a public RPC for populating tx fields (nonce, gas, chainId) to avoid
  // wallet-specific quirks with read-only RPC calls.
  const rpcProvider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");

  if (!txRequest.nonce) txRequest.nonce = await rpcProvider.getTransactionCount(address);
  if (!txRequest.gasLimit) {
    // Estimate gas with a plain tx object (without the Kaia-specific type)
    // because eth_estimateGas doesn't understand Kaia tx types.
    // Apply 2.5x buffer because Kaia fee-delegated tx types have higher
    // intrinsic gas than a standard transfer (same approach as the SDK).
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
  const klaytnTx = KlaytnTxFactory.fromObject(txRequest);
  const sigHash = keccak256(klaytnTx.sigRLP());

  // eth_sign signs a raw 32-byte hash without any message prefix.
  // personal_sign cannot be used here because it adds the
  // "\x19Ethereum Signed Message:\n" prefix before signing, producing a
  // signature over a different hash — the Kaia node would recover a
  // different address and reject the tx with "invalid sender".
  //
  // Call the raw injected provider directly to bypass the Kaia Web3Provider
  // wrapper, which can interfere with some wallets' eth_sign handling.
  const rawSig = await account.rawProvider.request({
    method: "eth_sign",
    params: [address.toLowerCase(), sigHash],
  });

  // Decompose the 65-byte signature into r, s, v
  const r = "0x" + rawSig.slice(2, 66);
  const s = "0x" + rawSig.slice(66, 130);
  const vByte = parseInt(rawSig.slice(130, 132), 16);
  // eth_sign returns v as 27/28; apply EIP-155 replay protection
  const recoveryParam = vByte >= 27 ? vByte - 27 : vByte;
  const v = recoveryParam + chainId * 2 + 35;

  klaytnTx.addSenderSig({ r, s, v });

  let signedTx: string;
  if (isFeePayerSigTxType(klaytnTx.type)) {
    signedTx = klaytnTx.senderTxHashRLP();
  } else {
    signedTx = klaytnTx.txHashRLP();
  }
  console.log("signedTx (non-Kaikas)", signedTx);

  if (isFeeDelegationService) {
    return await doSendTxToFeeDelegationService(signedTx);
  } else {
    return await doSendTxAsFeePayer(signedTx);
  }
}

// This operation is usually done in the backend by the dApp operator.
// We do it here with hardcoded private key for demonstration purpose.
async function doSendTxAsFeePayer(signedTx: string) {
  const httpProvider = new JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const feePayerPriv =
    "0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4";
  const feePayerWallet = new Wallet(feePayerPriv, httpProvider);
  console.log("feePayer", feePayerWallet.address);

  const sentTx = await feePayerWallet.sendTransactionAsFeePayer(signedTx);
  console.log("sentTx", sentTx);

  return getTxhashUrl(1001, sentTx.hash);
}

async function doSendTxToFeeDelegationService(signedTx: string) {
  try {
    const feeDelegationURL = "https://fee-delegation-kairos.kaia.io"; // TESTNET Fee Delegation Service
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

    return getTxhashUrl(1001, txhash);
  } catch (err) {
    console.error(err);
  }
}

export function getTxhashUrl(chainId: number, txhash: string): string {
  if (chainId === 1001) {
    return "https://kairos.kaiascan.io/tx/" + txhash;
  } else if (chainId === 8271) {
    return "https://kaiascan.io/tx/" + txhash;
  }
  return "Can not support your chainId";
}

// https://docs.metamask.io/wallet/how-to/add-network/
// EIP-3085 wallet_addEthereumChain
// EIP-3326 wallet_switchEthereumChain
export async function switchNetwork(
  provider: BrowserProvider,
  networkSpec: any
) {
  console.log("switching to", networkSpec);
  try {
    await provider.send("wallet_switchEthereumChain", [
      { chainId: networkSpec.chainId },
    ]);
  } catch (e) {
    await provider.send("wallet_addEthereumChain", [networkSpec]);
  }
}

export const kairosNetworkSpec = {
  chainId: "0x3e9",
  chainName: "Kaia Kairos",
  nativeCurrency: {
    name: "KAIA",
    symbol: "KAIA",
    decimals: 18,
  },
  rpcUrls: ["https://public-en-kairos.node.kaia.io"],
  blockExplorerUrls: ["https://kairos.kaiascan.io/"],
};
