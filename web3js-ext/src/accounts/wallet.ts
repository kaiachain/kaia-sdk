
import { isKIP3Json } from "@kaiachain/js-ext-core";
import { Wallet as EthWallet } from "web3-eth-accounts";
import { Web3BaseWalletAccount, KeyStore } from "web3-types";

import { KlaytnWeb3Account } from "../types.js";

export class Wallet<
  T extends Web3BaseWalletAccount = KlaytnWeb3Account,
> extends EthWallet<T> {
  public async decrypt(
    encryptedWallets: KeyStore[],
    password: string,
    options?: Record<string, unknown> | undefined,
  ) {
    const keystores = encryptedWallets.map((wallet) => JSON.stringify(wallet));
    for (const keystore of keystores) {
      if (isKIP3Json(keystore)) {
        // Do not support because KIP-3 keystores contain multiple keys for the same address,
        // but Wallet assumes an account is uniquely identified by its address.
        throw new Error("KIP-3 (v4) keystores unsupported in Wallet. Use web3.eth.accounts.decrypt and web3.eth.accounts.decryptList instead.");
      }
    }
    return super.decrypt(encryptedWallets, password, options);
  }
}
