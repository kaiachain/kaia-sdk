import { createWalletClient, http, JsonRpcAccount, KaiaTransactionRequest, KaiaWalletClient, kairos, privateKeyToAccount, WalletClient } from "@kaiachain/viem-ext";
import { Account } from "./types";

export async function doSendTx(account: Account, txRequest: KaiaTransactionRequest): Promise<any> {
  try {
    if (!account.provider) {
      throw new Error("wallet not connected");
    }
    const populatedTx = await account.provider.prepareTransactionRequest({ account: account.address, ...txRequest });
    const hash = await account.provider.sendTransaction(populatedTx)

    return getTxhashUrl(1001, hash);
  } catch (err) {
    console.error(err);
  }
}

export async function doSignTx(account: Account, txRequest: KaiaTransactionRequest, isFeeDelegationService: boolean): Promise<any> {
  try {
    if (!account.provider) {
      throw new Error("wallet not connected");
    }

    const signedTx = await account.provider.signTransaction(txRequest)

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
    const feePayerWallet = createWalletClient({
      chain: kairos,
      transport: http(),
      account: privateKeyToAccount('0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4'),
    })

    const txhash = await feePayerWallet.sendTransactionAsFeePayer(signedTx);
    return getTxhashUrl(1001, txhash);
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
  provider: KaiaWalletClient<JsonRpcAccount>,
  networkSpec: any
) {
  console.log("switching to", networkSpec);
  try {
    await provider.switchChain({
      id: networkSpec.chainId
    });
  } catch (e) {
    console.log('cannot change network', networkSpec);

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
