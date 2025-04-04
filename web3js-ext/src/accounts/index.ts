import { Web3Context } from "web3-core";
import { encrypt, hashMessage, recover, sign } from "web3-eth-accounts";
import { EthExecutionAPI } from "web3-types";

import { KlaytnAccountsInterface } from "../types.js";

import { context_create, context_privateKeyToAccount, context_decrypt, context_decryptList } from "./create.js";
import { recoverTransaction } from "./recover.js";
import { context_signTransaction, context_signTransactionAsFeePayer } from "./sign.js";
import { Wallet } from "./wallet.js";


// Analogous to: web3/src/accounts.ts:initAccountsForContext
// Replaces: web3.eth.accounts
export function context_accounts(context: Web3Context<EthExecutionAPI>): KlaytnAccountsInterface {
  const _signTransaction = context_signTransaction(context);
  const _signTransactionAsFeePayer = context_signTransactionAsFeePayer(context);
  const _create = context_create(context);
  const _privateKeyToAccount = context_privateKeyToAccount(context);
  const _decrypt = context_decrypt(context);
  const _decryptList = context_decryptList(context);

  return {
    recoverTransaction,
    hashMessage,
    sign,
    recover,
    encrypt,

    create: _create,
    privateKeyToAccount: _privateKeyToAccount,
    decrypt: _decrypt,
    decryptList: _decryptList,
    signTransaction: _signTransaction,
    signTransactionAsFeePayer: _signTransactionAsFeePayer,

    wallet: new Wallet({
      create: _create,
      privateKeyToAccount: _privateKeyToAccount,
      decrypt: _decrypt as any, // inevitable conflict in signTransaction types
    }),
  };
}