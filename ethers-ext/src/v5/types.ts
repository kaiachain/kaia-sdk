import { TransactionRequest as EthersTransactionRequest } from "@ethersproject/abstract-provider";
import { ExternallyOwnedAccount } from "@ethersproject/abstract-signer";
import { BytesLike } from "@ethersproject/bytes";
import { ExternalProvider as EthersExternalProvider } from "@ethersproject/providers";
import { SigningKey } from "@ethersproject/signing-key";


export interface TransactionRequest extends EthersTransactionRequest {
  txSignatures?: any[];
  feePayer?: string;
  feePayerSignatures?: any[];
}

// Used in Wallet constructor.
export type PrivateKeyLike = BytesLike | ExternallyOwnedAccount | SigningKey;

// Represents window.ethereum (MetaMask) and window.klaytn (Kaikas)
export interface ExternalProvider extends EthersExternalProvider {
  isKaikas?: boolean; // Exists in window.klaytn that is injected by Kaikas
}