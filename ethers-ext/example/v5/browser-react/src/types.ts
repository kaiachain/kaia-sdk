import { Web3Provider } from "@klaytn/ethers-ext";

export interface Account {
  provider?: Web3Provider;
  isKaikas?: boolean;
  isMetaMask?: boolean;
  chainId?: number;
  address?: string;
  success?: boolean;
  error?: any;
}
