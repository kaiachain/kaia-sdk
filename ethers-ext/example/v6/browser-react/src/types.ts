import { Web3Provider } from "@kaiachain/ethers-ext/v6";

export interface Account {
  provider?: Web3Provider;
  rawProvider?: any;
  isKaikas?: boolean;
  isMetaMask?: boolean;
  isOKX?: boolean;
  chainId?: number;
  address?: string;
  success?: boolean;
  error?: any;
}

export function isKaiaCapableWallet(account: Account): boolean {
  return !!(account.isKaikas);
}

export function isNonKaikasKaiaWallet(account: Account): boolean {
  return !!account.isOKX && !account.isKaikas;
}
