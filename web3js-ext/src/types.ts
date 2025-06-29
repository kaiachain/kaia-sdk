import Eth, { SendSignedTransactionEvents, SendTransactionOptions } from "web3-eth";
import {
	decodeLog,
	decodeParameter,
	decodeParameters,
	encodeFunctionCall,
	encodeFunctionSignature,
	encodeParameter,
	encodeParameters,
} from "web3-eth-abi";
import {
	encrypt,
	hashMessage,
	recover,
	recoverTransaction,
	sign,
	signTransaction,
	TxData,
	Transaction as LegacyTransaction,
	AccessListEIP2930Transaction,
	FeeMarketEIP1559Transaction,
	Wallet,
	Web3Account,
} from "web3-eth-accounts";
import { Contract } from "web3-eth-contract";
import { ENS } from "web3-eth-ens";
import { Iban } from "web3-eth-iban";
import { Personal } from "web3-eth-personal";
import { Net } from "web3-net";
import { KeyStore, Bytes, Transaction, TransactionReceipt, DataFormat } from "web3-types";

import { KlaytnTypedTransaction } from "./accounts/klaytn_tx.js";
import { GaslessSwapRouter } from "./gasless/gasless.js";
import { Web3PromiEvent } from "web3";

// Type analogous to web3-eth-accounts/src/types.ts:Web3Account
// Designed for the "account object" returned by
// - web3.eth.accounts.privateKeyToAccount()
// - web3.eth.accounts.create()
// - web3.eth.accounts.decrypt()
export interface KlaytnWeb3Account extends Web3Account {
	readonly address: string;
	readonly privateKey: string;

	readonly sign: (data: Record<string, unknown> | string) => {
		readonly messageHash: string;
		readonly r: string;
		readonly s: string;
		readonly v: string;
		readonly message?: string;
		readonly signature: string;
	};
	readonly encrypt: (password: string, options?: Record<string, unknown>) => Promise<KeyStore>;

	// Klaytn: modified methods
	readonly signTransaction: (tx: KlaytnTransaction | string) => Promise<{
		readonly messageHash: string;
		readonly r: string;
		readonly s: string;
		readonly v: string;
		readonly rawTransaction: string;
		readonly transactionHash: string;
	}>;

	// Klaytn: additional methods
	readonly signTransactionAsFeePayer: (tx: KlaytnTransaction | string) => Promise<{
		readonly messageHash: string;
		readonly r: string;
		readonly s: string;
		readonly v: string;
		readonly rawTransaction: string;
		readonly transactionHash: string;
	}>;
}

// Type analogous to web3/src/types.ts:Web3EthInterface
// Designed for KlaytnWeb3.eth.accounts
export interface KlaytnWeb3EthInterface extends Eth {
	Contract: typeof Contract;
	Iban: typeof Iban;
	net: Net;
	ens: ENS;
	abi: {
		encodeEventSignature: typeof encodeFunctionSignature;
		encodeFunctionCall: typeof encodeFunctionCall;
		encodeFunctionSignature: typeof encodeFunctionSignature;
		encodeParameter: typeof encodeParameter;
		encodeParameters: typeof encodeParameters;
		decodeParameter: typeof decodeParameter;
		decodeParameters: typeof decodeParameters;
		decodeLog: typeof decodeLog;
	};
	accounts: KlaytnAccountsInterface;
	personal: Personal;
	sendSignedTransactions: (
		transactions: Bytes[],
		returnFormat: DataFormat,
		options?: SendTransactionOptions,
	) => Web3PromiEvent<TransactionReceipt[], SendSignedTransactionEvents<DataFormat>>;
}

// This is the type of KlaytnWeb3EthInterface.accounts
// i.e. (typeof web3.eth.accounts)
export interface KlaytnAccountsInterface {
	// Klaytn: contents may have changed, but types unchanged
	recoverTransaction: typeof recoverTransaction;
	hashMessage: typeof hashMessage;
	sign: typeof sign;
	recover: typeof recover;
	encrypt: typeof encrypt;

	// Klaytn: modified methods
	wallet: Wallet<KlaytnWeb3Account>;
	create: () => KlaytnWeb3Account;
	privateKeyToAccount: (privateKey: Uint8Array | string, address?: string) => KlaytnWeb3Account;
	decrypt: (
		keystore: string,
		password: string,
		options?: Record<string, unknown>,
	) => Promise<KlaytnWeb3Account>;
	signTransaction: (
		transaction: KlaytnTransaction | string,
		privateKey: Bytes,
	) => ReturnType<typeof signTransaction>;

	// Klaytn: additional methods
	signTransactionAsFeePayer: (
		transaction: KlaytnTransaction | string,
		privateKey: Bytes,
	) => ReturnType<typeof signTransaction>;
	decryptList: (
		keystore: string,
		password: string,
		options?: Record<string, unknown>,
	) => Promise<KlaytnWeb3Account[]>;
}

// The plain Transaction object supplied by the users.
// Used as argument to prepareTransaction()
export interface KlaytnTransaction extends Transaction {
	key?: any;
	feePayer?: string;
	txSignatures?: any;
	feePayerSignatures?: any;
	feeRatio?: number;
}

// The plain Transaction object used internally.
// Used as argument to KlaytnTx.fromTxData()
export interface KlaytnTxData extends TxData {
	from?: string;
	chainId?: bigint;
	key?: any;
	feePayer?: string;
	feePayer_v?: bigint;
	feePayer_r?: bigint;
	feePayer_s?: bigint;
	txSignatures?: any;
	feePayerSignatures?: any;
	feeRatio?: number;
}

// The child classes of BaseTransaction.
// Used inside signTransaction() and signTransactionAsFeePayer()
export type TypedTransaction =
	| LegacyTransaction // type 0
	| AccessListEIP2930Transaction // type 1
	| FeeMarketEIP1559Transaction // type 2
	| KlaytnTypedTransaction; // Klaytn TxTypes

export interface KaiaWeb3GaslessInterface {
	getGaslessSwapRouter: (address?: string) => Promise<GaslessSwapRouter>;
}