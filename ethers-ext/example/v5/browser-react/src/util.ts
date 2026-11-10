import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { Wallet } from '@kaiachain/ethers-ext'
import { Account } from "./types";

export async function doSendTx(account: Account, txRequest: any): Promise<any> {
  try {
    if (!account.provider) {
      throw new Error("wallet not connected")
    }

    const signer = account.provider.getSigner();
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

export async function doSignTx(account: Account, txRequest: any): Promise<any> {
  try {
    if (!account.provider) {
      throw new Error("wallet not connected")
    }

    const signer = account.provider.getSigner();
    if (txRequest.from) {
      const address = await signer.getAddress();
      txRequest.from = address;
    }

    const signedTx = await signer.signTransaction(txRequest);
    console.log("signedTx", signedTx);

    return await doSendTxAsFeePayer(signedTx);
  } catch (err) {
    console.error(err);
  }
}

// This operation is usually done in the backend by the dApp operator.
// We do it here with hardcoded private key for demonstration purpose.
async function doSendTxAsFeePayer(signedTx: string) {
  try {
    const httpProvider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
    const feePayerPriv = "0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4";
    const feePayerWallet = new Wallet(feePayerPriv, httpProvider);
    console.log("feePayer", feePayerWallet.address)

    const sentTx = await feePayerWallet.sendTransactionAsFeePayer(signedTx);
    console.log("sentTx", sentTx);

    return getTxhashUrl(1001, sentTx.hash);
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
export async function switchNetwork(provider: Web3Provider, networkSpec: any) {
  console.log("switching to", networkSpec);
  try {
    await provider.send("wallet_switchEthereumChain", [{ chainId: networkSpec.chainId }]);
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
  },,
  rpcUrls: ["https://public-en-kairos.node.kaia.io"],
  blockExplorerUrls: ["https://kairos.kaiascan.io/"],
}