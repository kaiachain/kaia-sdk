import { TransactionRequest as EthersTransactionRequest } from "ethers6";
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

// Used in Wallet constructor. // replaced by SigningKey in ethers v6
// export type PrivateKeyLike = BytesLike | ExternallyOwnedAccount | SigningKey;

// Represents window.ethereum (MetaMask) and window.klaytn (Kaikas)
export interface ExternalProvider {
  isKaikas?: boolean; // Exists in window.klaytn that is injected by Kaikas
}
export enum EKlaytnErrorCode {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",

  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",

  UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION",

  NETWORK_ERROR = "NETWORK_ERROR",

  SERVER_ERROR = "SERVER_ERROR",

  TIMEOUT = "TIMEOUT",

  BUFFER_OVERRUN = "BUFFER_OVERRUN",

  NUMERIC_FAULT = "NUMERIC_FAULT",

  MISSING_NEW = "MISSING_NEW",

  INVALID_ARGUMENT = "INVALID_ARGUMENT",

  MISSING_ARGUMENT = "MISSING_ARGUMENT",

  UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT",

  CALL_EXCEPTION = "CALL_EXCEPTION",

  INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",

  NONCE_EXPIRED = "NONCE_EXPIRED",

  REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED",

  UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT",

  TRANSACTION_REPLACED = "TRANSACTION_REPLACED",

  ACTION_REJECTED = "ACTION_REJECTED",
}
