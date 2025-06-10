import { KaiaWalletClient, JsonRpcAccount } from "@kaiachain/viem-ext"

export interface Account {
  provider?: KaiaWalletClient<JsonRpcAccount>;
  isKaikas?: boolean;
  isMetaMask?: boolean;
  chainId?: number;
  address?: `0x${string}`;
  success?: boolean;
  error?: any;
}
