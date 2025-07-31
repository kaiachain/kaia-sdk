import { BrowserProvider, JsonRpcProvider } from "ethers6";
import { Wallet } from "@kaiachain/ethers-ext/v6";
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
  try {
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
      // Send to Fee Delegation Service if isFeeDelegationService is true
      return await doSendTxToFeeDelegationService(signedTx);
    } else {
      return await doSendTxAsFeePayer(signedTx);
    }
  } catch (err) {
    console.error(err);
  }
}

// This operation is usually done in the backend by the dApp operator.
// We do it here with hardcoded private key for demonstration purpose.
async function doSendTxAsFeePayer(signedTx: string) {
  try {
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
  } catch (err) {
    console.error(err);
  }
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

export const baobabNetworkSpec = {
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
