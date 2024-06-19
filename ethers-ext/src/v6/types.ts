import { TransactionRequest as EthersTransactionRequest } from "ethers6";
import { ExternallyOwnedAccount } from "@ethersproject/abstract-signer";
import { BytesLike } from "ethers6";
import { SigningKey } from "ethers6";
export type EthersExternalProvider = {
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
};
export interface TransactionRequest extends EthersTransactionRequest {
  txSignatures?: any[];
  feePayer?: string;
  feePayerSignatures?: any[];
}

// Used in Wallet constructor.
export type PrivateKeyLike = BytesLike | ExternallyOwnedAccount | SigningKey;

// Represents window.ethereum (MetaMask) and window.klaytn (Kaikas)
export interface ExternalProvider {
  isKaikas?: boolean; // Exists in window.klaytn that is injected by Kaikas
}
