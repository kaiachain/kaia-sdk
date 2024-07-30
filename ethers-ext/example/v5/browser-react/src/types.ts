import { Web3Provider } from "@kaiachain/ethers-ext/v5";

export interface Account {
  provider?: Web3Provider;
  isKaikas?: boolean;
  isMetaMask?: boolean;
  chainId?: number;
  address?: string;
  success?: boolean;
  error?: any;
}
