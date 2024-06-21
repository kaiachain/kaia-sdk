import {
  BigNumberish,
  getAddress,
  computeAddress,
  JsonRpcProvider,
  SigningKey,
} from "ethers6";

import { HexStr } from "@klaytn/js-ext-core";

import { Wallet } from "./signer";

function isSameAddress(a: string, b: string) {
  return getAddress(a) == getAddress(b);
}
function isSamePrivateKey(a: string, b: string) {
  return computeAddress(a) == computeAddress(b);
}

// Accounts is array of Wallet in ethers.js Ext
export class Accounts {
  public wallets: Wallet[];

  constructor(provider: JsonRpcProvider, list: [[string, string?]] | Wallet[]) {
    this.wallets = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i] instanceof Wallet) {
        // @ts-ignore
        this.wallets.push(list[i]);
      } else if (Array.isArray(list[i])) {
        // @ts-ignore
        if (list[i].length == 1) {
          // @ts-ignore
          this.add([list[i][0]], provider);
          // @ts-ignore
        } else if (list[i].length == 2) {
          // @ts-ignore
          this.add([list[i][0], list[i][1]], provider);
        } else {
          throw new Error(
            "Input has to be the array of [address, privateKey] or [privateKey]"
          );
        }
      } else {
        throw new Error(
          "Input has to be Wallet, [address, privateKey], or [privateKey]"
        );
      }
    }
  }

  async add(
    account: [string, string?],
    provider: JsonRpcProvider
  ): Promise<boolean> {
    let addr: string;
    let priv: string;

    if (account.length == 1) {
      const signingKey = new SigningKey(account[0]);
      addr = computeAddress(signingKey.compressedPublicKey);
      priv = account[0];
    } else if (account.length == 2 && account[1] != undefined) {
      addr = account[0];
      priv = account[1];
    } else {
      throw new Error("Input has to be [address, privateKey] or [privateKey]");
    }

    for (let i = 0; i < this.wallets.length; i++) {
      if (
        isSameAddress(await this.wallets[i].getAddress(), addr) &&
        isSamePrivateKey(this.wallets[i].privateKey, priv)
      ) {
        return false;
      }
    }

    this.wallets.push(new Wallet(addr, priv, provider));
    return true;
  }

  async remove(account: [string, string?]): Promise<boolean> {
    let addr: string;
    let priv: string;

    if (account.length == 1) {
      const signingKey = new SigningKey(account[0]);
      addr = computeAddress(signingKey.compressedPublicKey);
      priv = account[0];
    } else if (account.length == 2 && account[1] != undefined) {
      addr = account[0];
      priv = account[1];
    } else {
      throw new Error("Input has to be [address, privateKey] or [privateKey]");
    }

    for (let i = 0; i < this.wallets.length; i++) {
      if (
        isSameAddress(await this.wallets[i].getAddress(), addr) &&
        // @ts-ignore
        isSamePrivateKey(await this.wallets[i].privateKey, priv)
      ) {
        delete this.wallets[i];
        this.wallets.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  removeAll() {
    if (this.wallets.length == 0) {
      return;
    }

    for (
      let i = this.wallets.length - 1;
      i >= 0 && i < this.wallets.length;
      i--
    ) {
      delete this.wallets[i];
      this.wallets.splice(i, 1);
    }
  }

  accountByKey(privateKey: string): Wallet[] {
    const ret: Wallet[] = [];

    for (let i = 0; i < this.wallets.length; i++) {
      if (isSameAddress(this.wallets[i].privateKey, privateKey)) {
        ret.push(this.wallets[i]);
      }
    }
    return ret;
  }

  async accountByAddress(address: string): Promise<Wallet[]> {
    const ret: Wallet[] = [];

    for (let i = 0; i < this.wallets.length; i++) {
      if (isSameAddress(await this.wallets[i].getAddress(), address)) {
        ret.push(this.wallets[i]);
      }
    }
    return ret;
  }
}

// AccountInfo is filled with the result of getAccountKey() RPC call
type AccountInfo = {
  address: string;
  nonce: number;
  balance: string | BigNumberish;
  key: any;
};

export class AccountStore {
  private provider: JsonRpcProvider | undefined;
  public accounts: Accounts | undefined;
  public accountInfos: AccountInfo[] | undefined;
  private signableKeyList: string[] = [];

  async refresh(
    provider: JsonRpcProvider,
    list: [[string, string?]] | Wallet[]
  ) {
    this.provider = provider;

    if (this.accounts != undefined) {
      this.accounts.removeAll();
    }
    this.accounts = new Accounts(provider, list);

    const wallets = this.accounts.wallets;

    this.signableKeyList = [];
    await this.updateSignableKeyList();

    this.accountInfos = [];
    let accInfo;

    for (let i = 0; i < wallets.length; i++) {
      if (this.provider instanceof JsonRpcProvider) {
        const addr: string = await wallets[i].getAddress();
        if (this.hasAccountInfos(addr)) {
          continue;
        }

        const klaytn_account = await this.provider.send("klay_getAccount", [
          addr,
          "latest",
        ]);
        const klaytn_accountKey = klaytn_account.account.key;

        accInfo = {
          address: addr,
          nonce: klaytn_account.account.nonce,
          balance: klaytn_account.account.balance,
          key: {},
        };

        if (klaytn_accountKey.keyType == 1) {
          // AccountKeyLegacy
          accInfo.key = {
            type: 1,
            key: {},
          };
        } else if (klaytn_accountKey.keyType == 2) {
          // AccountKeyPublic
          accInfo.key = {
            type: 2,
            key: {
              pubkey: this.getPubkeyInfo(
                klaytn_accountKey.key.x,
                klaytn_accountKey.key.y
              ),
            },
          };
        } else if (klaytn_accountKey.keyType == 4) {
          // AccountKeyWeightedMultiSig
          accInfo.key = {
            type: 4,
            key: {
              threshold: klaytn_accountKey.key.threshold,
              keys: [],
            },
          };

          for (let i = 0; i < klaytn_accountKey.key.keys.length; i++) {
            // @ts-ignore
            accInfo.key.key.keys.push({
              weight: klaytn_accountKey.key.keys[i].weight,
              pubkey: this.getPubkeyInfo(
                klaytn_accountKey.key.keys[i].key.x,
                klaytn_accountKey.key.keys[i].key.y
              ),
            });
          }
        } else if (klaytn_accountKey.keyType == 5) {
          // AccountKeyRoleBased
          accInfo.key = {
            type: 5,
            key: {
              RoleTransaction: {},
              RoleAccountUpdate: {},
              RoleFeePayer: {},
            },
          };

          const roleKeys = [];
          for (let i = 0; i < klaytn_accountKey.key.length; i++) {
            if (klaytn_accountKey.key[i].keyType == 1) {
              // AccountKeyLegacy in the role-based key
              roleKeys.push({
                type: 1,
                key: {},
              });
            } else if (klaytn_accountKey.key[i].keyType == 2) {
              // AccountKeyPublic in the role-based key
              roleKeys.push({
                type: 2,
                key: {
                  pubkey: this.getPubkeyInfo(
                    klaytn_accountKey.key[i].key.x,
                    klaytn_accountKey.key[i].key.y
                  ),
                },
              });
            } else if (klaytn_accountKey.key[i].keyType == 4) {
              // AccountKeyWeightedMultiSig in the role-based key
              const multiKeys = {
                type: 4,
                key: {
                  threshold: klaytn_accountKey.key[i].key.threshold,
                  keys: [],
                },
              };

              // add mult-keys
              for (
                let j = 0;
                j < klaytn_accountKey.key[i].key.keys.length;
                j++
              ) {
                // @ts-ignore
                multiKeys.key.keys.push({
                  weight: klaytn_accountKey.key[i].key.keys[j].weight,
                  pubkey: this.getPubkeyInfo(
                    klaytn_accountKey.key[i].key.keys[j].key.x,
                    klaytn_accountKey.key[i].key.keys[j].key.y
                  ),
                });
              }
              roleKeys.push(multiKeys);
            }
          }

          // @ts-ignore
          accInfo.key.key = {
            RoleTransaction: roleKeys[0],
            RoleAccountUpdate: roleKeys[1],
            RoleFeePayer: roleKeys[2],
          };
        }

        this.accountInfos.push(accInfo);
      } else {
        throw new Error(
          "Klaytn typed transaction can only be broadcasted to a Klaytn JSON-RPC server"
        );
      }
    }
  }

  async updateSignableKeyList() {
    let i: number;
    for (
      i = 0;
      this.accounts != undefined && i < this.accounts.wallets.length;
      i++
    ) {
      let hashedKey = await this.accounts.wallets[i].getEtherAddress();
      hashedKey = String(hashedKey).toLocaleLowerCase();
      if (this.hasInSignableKeyList(hashedKey) == false) {
        this.signableKeyList.push(hashedKey);
      }
    }
  }

  hasInSignableKeyList(address: string): boolean {
    const hashedKey = String(address).toLocaleLowerCase();
    return this.signableKeyList.indexOf(hashedKey) != -1;
  }

  hasAccountInfos(address: string): boolean {
    let i: number;
    for (
      i = 0;
      this.accountInfos != undefined && i < this.accountInfos.length;
      i++
    ) {
      if (isSameAddress(this.accountInfos[i].address, address)) {
        return true;
      }
    }
    return false;
  }

  getType(address: string): number | null {
    let i: number;
    for (
      i = 0;
      this.accountInfos != undefined && i < this.accountInfos.length;
      i++
    ) {
      if (isSameAddress(this.accountInfos[i].address, address)) {
        return this.accountInfos[i].key.type;
      }
    }
    return null;
  }

  getAccountInfo(address: string): AccountInfo | null {
    let i: number;
    for (
      i = 0;
      this.accountInfos != undefined && i < this.accountInfos.length;
      i++
    ) {
      if (isSameAddress(this.accountInfos[i].address, address)) {
        return this.accountInfos[i];
      }
    }
    return null;
  }

  getAccountInfos(): AccountInfo[] | undefined {
    return this.accountInfos;
  }

  getPubkeyInfo(x: string, y: string): any {
    const zeroPadX = HexStr.zeroPad(x, 32);
    const zeroPadY = HexStr.zeroPad(y, 32);

    const stripedX = String(zeroPadX).substring(2);
    const stripedY = String(zeroPadY).substring(2);

    const compressedKey = SigningKey.computePublicKey(
      HexStr.concat("0x04" + stripedX + stripedY),
      true
    );
    const hashedKey = computeAddress(compressedKey);
    const hasPrivateKey = this.hasInSignableKeyList(hashedKey);

    return {
      compressed: compressedKey,
      hashed: hashedKey,
      hasPrivateKey: hasPrivateKey,
    };
  }
}
