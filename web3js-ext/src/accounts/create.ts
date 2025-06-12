import _ from "lodash";
import { Web3Context } from "web3-core";
import { Web3Account, create, decrypt, privateKeyToAccount } from "web3-eth-accounts";
import { EthExecutionAPI, KeyStore } from "web3-types";
import { toChecksumAddress } from "web3-utils";

import { isKIP3Json, splitKeystoreKIP3, KaiaWeb3Account } from "../index.js";
import { KlaytnTransaction } from "../types.js";

import { context_signTransaction, context_signTransactionAsFeePayer } from "./sign.js";

// Analogous to web3/src/accounts.ts:createWithContext
export function context_create(context: Web3Context<EthExecutionAPI>) {
  return function (): KaiaWeb3Account {
    const account = create();
    return wrapAccount(context, account);
  };
}

// Analogous to web3/src/accounts.ts:privateKeyToAccountWithContext
export function context_privateKeyToAccount(context: Web3Context<EthExecutionAPI>) {
  return function (privateKey: Uint8Array | string, address?: string): KaiaWeb3Account {
    const account = privateKeyToAccount(privateKey);
    return wrapAccount(context, { ...account, address: address || account.address });
  };
}

// Analogous to web3/src/accounts.ts:decryptWithContext
export function context_decrypt(context: Web3Context<EthExecutionAPI>) {
  return async function (
    keystore: KeyStore | string,
    password: string,
    options?: Record<string, unknown>,
  ): Promise<KaiaWeb3Account> {
    if (!_.isString(keystore)) {
      keystore = JSON.stringify(keystore);
    }
    if (isKIP3Json(keystore)) {
      const accounts = await decryptKIP3(keystore, password, options);
      return wrapAccount(context, accounts[0]);
    } else {
      const account = await decrypt(keystore, password, (options?.nonStrict as boolean) ?? true);
      return wrapAccount(context, account);
    }
  };
}

export function context_decryptList(context: Web3Context<EthExecutionAPI>) {
  return async function (
    keystore: KeyStore | string,
    password: string,
    options?: Record<string, unknown>,
  ): Promise<KaiaWeb3Account[]> {
    if (!_.isString(keystore)) {
      keystore = JSON.stringify(keystore);
    }
    if (isKIP3Json(keystore)) {
      const accounts = await decryptKIP3(keystore, password, options);
      return _.map(accounts, (account) => wrapAccount(context, account));
    } else {
      const account = await decrypt(keystore, password, (options?.nonStrict as boolean) ?? true);
      return [wrapAccount(context, account)];
    }
  };
}

async function decryptKIP3(
  keystore: KeyStore | string,
  password: string,
  options?: Record<string, unknown>,
): Promise<Web3Account[]> {
  if (!_.isString(keystore)) {
    keystore = JSON.stringify(keystore);
  }
  const address = JSON.parse(keystore).address;
  const jsonList = splitKeystoreKIP3(keystore, false);

  const accounts: Web3Account[] = [];
  for (const json of jsonList) {
    const account = await decrypt(json, password, (options?.nonStrict as boolean) ?? true);
    account.address = toChecksumAddress(address); // the address may not coincide with private keys, get directly from the json.
    accounts.push(account);
  }

  return accounts;
}

// common components of create, privateKeyToAccount, decrypt.
function wrapAccount(context: Web3Context<EthExecutionAPI>, account: Web3Account): KaiaWeb3Account {
  const _signTransaction = context_signTransaction(context);
  const _signTransactionAsFeePayer = context_signTransactionAsFeePayer(context);

  return {
    ...account,
    signTransaction: (transaction: KlaytnTransaction | string) =>
      _signTransaction(transaction, account.privateKey),
    signTransactionAsFeePayer: (transaction: KlaytnTransaction | string) =>
      _signTransactionAsFeePayer(transaction, account.privateKey, account.address),
  };
}