import {
  SigningKey,
  TransactionLike,
  TypedDataDomain,
  TypedDataField,
  TypedDataEncoder,
  BrowserProvider as EthersWeb3Provider,
  JsonRpcApiProvider as EthersJsonRpcApiProvider,
  JsonRpcSigner as EthersJsonRpcSigner,
  Provider,
  TransactionRequest,
  TransactionResponse,
  Wallet as EthersWallet,
  hexlify,
  toUtf8Bytes,
  ProgressCallback,
  keccak256,
  assert,
} from "ethers6";
import _ from "lodash";

import {
  HexStr,
  KlaytnTxFactory,
  parseTransaction,
  getRpcTxObject,
  isKlaytnTxType,
  isFeePayerSigTxType,
  parseTxType,
  getKaikasTxType,
} from "@klaytn/js-ext-core";

import { decryptKeystoreList, decryptKeystoreListSync } from "./keystore";
import {
  eip155sign,
  getTransactionRequest,
  populateFrom,
  populateTo,
  populateNonce,
  populateGasLimit,
  populateGasPrice,
  populateChainId,
  populateFeePayerAndSignatures,
  pollTransactionInPool,
} from "./txutil";
import { ExternalProvider } from "./types";

export class Wallet extends EthersWallet {
  // Override Wallet factories accepting keystores to support both v3 and v4 (KIP-3) formats
  static override async fromEncryptedJson(
    json: string,
    password: string | Uint8Array,
    progress?: ProgressCallback
  ): Promise<Wallet> {
    const { address, privateKey } = await decryptKeystoreList(
      json,
      password,
      progress
    );
    return new Wallet(address, privateKey);
  }

  static override fromEncryptedJsonSync(
    json: string,
    password: string | Uint8Array
  ): Wallet {
    const { address, privateKey } = decryptKeystoreListSync(json, password);
    return new Wallet(address, privateKey);
  }

  // New Wallet[] factories accepting keystores supporting v4 (KIP-3) format
  static async fromEncryptedJsonList(
    json: string,
    password: string | Uint8Array,
    progress?: ProgressCallback
  ): Promise<Wallet[]> {
    const { address, privateKeyList } = await decryptKeystoreList(
      json,
      password,
      progress
    );
    return _.map(
      privateKeyList,
      (privateKey) => new Wallet(address, privateKey)
    );
  }

  static fromEncryptedJsonListSync(
    json: string,
    password: string | Uint8Array
  ): Wallet[] {
    const { address, privateKeyList } = decryptKeystoreListSync(json, password);
    return _.map(
      privateKeyList,
      (privateKey) => new Wallet(address, privateKey)
    );
  }

  // Decoupled account address. Defined only if specified in constructor.
  private klaytnAddr: string | undefined;

  // new KlaytnWallet(privateKey, provider?) or
  // new KlaytnWallet(address, privateKey, provider?)
  constructor(
    addressOrPrivateKey: string | SigningKey,
    privateKeyOrProvider?: SigningKey | Provider | string,
    provider?: Provider
  ) {
    if (HexStr.isHex(addressOrPrivateKey, 20)) {
      // First argument is an address. new KlaytnWallet(address, privateKey, provider?)
      const _address = HexStr.from(addressOrPrivateKey);
      const _privateKey = privateKeyOrProvider as SigningKey;
      const _provider = provider;

      super(_privateKey, _provider);
      this.klaytnAddr = _address;
    } else {
      // First argument is a private key. new KlaytnWallet(privateKey, provider?)
      const _privateKey = addressOrPrivateKey as SigningKey;
      const _provider = privateKeyOrProvider as Provider;

      super(_privateKey, _provider);
    }
  }

  // If the Wallet is created as a decoupled account, and `legacy` is false, returns the decoupled address.
  // Otherwise, returns the address derived from the private key.
  override getAddress(legacy?: boolean): Promise<string> {
    if (legacy || !this.klaytnAddr) {
      return super.getAddress();
    } else {
      return Promise.resolve(this.klaytnAddr);
    }
  }

  // @deprecated in favor of getAddress(true)
  getEtherAddress(): Promise<string> {
    return super.getAddress();
  }

  // @deprecated in favor of parseTransaction
  decodeTxFromRLP(rlp: string): any {
    return parseTransaction(rlp);
  }

  async isDecoupled(): Promise<boolean> {
    if (!this.klaytnAddr) {
      return false;
    } else {
      return (await this.getAddress(false)) == (await this.getAddress(true));
    }
  }

  async populateTransaction(
    transaction: TransactionRequest
  ): Promise<TransactionLike<string>> {
    return this._populateTransaction(transaction, false);
  }

  // If asFeePayer is true, skip the 'from' address check.
  private async _populateTransaction(
    transaction: TransactionRequest,
    asFeePayer: boolean
  ): Promise<TransactionLike<string>> {
    const tx = await getTransactionRequest(transaction);

    // Not a Klaytn TxType; fallback to ethers.Signer.populateTransaction()
    if (!isKlaytnTxType(parseTxType(tx.type))) {
      return super.populateTransaction(tx);
    }
    // If the current Wallet acts as feePayer, then tx.from is unrelated to this.getAddress().
    // Skip the check, and does not fill up here. If tx.from was empty, then an error is generated
    // at signTransaction(), not here.
    if (!asFeePayer) {
      await populateFrom(tx, await this.getAddress());
    }
    await populateTo(tx, this.provider);
    await populateNonce(tx, this.provider, await this.getAddress());
    await populateGasLimit(tx, this.provider);
    await populateGasPrice(tx, this.provider);
    await populateChainId(tx, this.provider);
    return tx;
  }

  // Sign as a sender
  // tx.sigs += Sign(tx.sigRLP(), wallet.privateKey)
  // return tx.txHashRLP() or tx.senderTxHashRLP();
  override async signTransaction(
    transaction: TransactionRequest
  ): Promise<string> {
    const tx = await getTransactionRequest(transaction);

    // Not a Klaytn TxType; fallback to ethers.Wallet.signTransaction()
    if (!isKlaytnTxType(parseTxType(tx.type))) {
      return super.signTransaction(tx);
    }

    // Because RLP-encoded tx may not contain chainId, fill up here.
    await populateChainId(tx, this.provider);
    const chainId = tx.chainId!; // chainId should have been determined in populateChainId.

    const klaytnTx = KlaytnTxFactory.fromObject(tx);
    const sigHash = keccak256(klaytnTx.sigRLP());
    const sig = eip155sign(
      this.signingKey,
      sigHash,
      Number(chainId.toString())
    );
    klaytnTx.addSenderSig(sig);

    if (isFeePayerSigTxType(klaytnTx.type)) {
      return klaytnTx.senderTxHashRLP();
    } else {
      return klaytnTx.txHashRLP();
    }
  }

  // Sign as a fee payer
  // tx.feepayerSigs += Sign(tx.sigFeePayerRLP(), wallet.privateKey)
  // return tx.txHashRLP();
  async signTransactionAsFeePayer(
    transactionOrRLP: TransactionRequest | string
  ): Promise<string> {
    const tx = await getTransactionRequest(transactionOrRLP);
    // Not a Klaytn FeePayerSig TxType; not supported
    assert(
      isFeePayerSigTxType(parseTxType(tx.type)),
      `signTransactionAsFeePayer not supported for tx type ${tx.type}`,
      "UNSUPPORTED_OPERATION",
      {
        operation: "signTransactionAsFeePayer",
      }
    );
    // Because RLP-encoded tx may contain dummy fee payer fields, fix here.
    await populateFeePayerAndSignatures(tx, await this.getAddress());
    // Because RLP-encoded tx may not contain chainId, fill up here.
    await populateChainId(tx, this.provider);
    const chainId = tx.chainId!; // chainId should have been determined in populateChainId.

    const klaytnTx = KlaytnTxFactory.fromObject(tx);

    const sigFeePayerHash = keccak256(klaytnTx.sigFeePayerRLP());
    const sig = eip155sign(this.signingKey, sigFeePayerHash, Number(chainId));
    klaytnTx.addFeePayerSig(sig);

    return klaytnTx.txHashRLP();
  }

  async sendTransaction(
    transaction: TransactionRequest
  ): Promise<TransactionResponse> {
    const tx = await getTransactionRequest(transaction);

    if (!isKlaytnTxType(parseTxType(tx.type))) {
      return super.sendTransaction(tx);
    }

    const populatedTx = await this._populateTransaction(tx, false);
    const signedTx = await this.signTransaction(populatedTx);
    return this._sendKlaytnRawTransaction(signedTx);
  }

  async sendTransactionAsFeePayer(
    transactionOrRLP: TransactionRequest | string
  ): Promise<TransactionResponse> {
    const tx = await getTransactionRequest(transactionOrRLP);
    // Not a Klaytn FeePayerSig TxType; not supported
    assert(
      isFeePayerSigTxType(parseTxType(tx.type)),
      `sendTransactionAsFeePayer not supported for tx type ${tx.type}`,
      "UNSUPPORTED_OPERATION",
      {
        operation: "sendTransactionAsFeePayer",
      }
    );

    const populatedTx = await this._populateTransaction(tx, true);
    const signedTx = await this.signTransactionAsFeePayer(populatedTx);
    return this._sendKlaytnRawTransaction(signedTx);
  }

  async _sendKlaytnRawTransaction(
    signedTx: string
  ): Promise<TransactionResponse> {
    assert(
      this.provider instanceof EthersJsonRpcApiProvider,
      "Provider is not JsonRpcProvider: cannot send klay_sendRawTransaction",
      "UNSUPPORTED_OPERATION",
      {
        operation: "_sendKlaytnRawTransaction",
      }
    );

    const txhash = await this.provider.send("klay_sendRawTransaction", [
      signedTx,
    ]);
    return pollTransactionInPool(txhash, this.provider);
  }
}

// EthersJsonRpcSigner cannot be subclassed because of the constructorGuard.
// Instead, we re-create the class by copying the implementation.
export class JsonRpcSigner extends EthersJsonRpcSigner {
  // implements EthersJsonRpcSigner
  constructor(provider: EthersJsonRpcApiProvider, address: string) {
    super(provider, address);
  }

  isKaikas(): boolean {
    if (this.provider instanceof EthersWeb3Provider) {
      // The EIP-1193 provider, usually injected as window.ethereum or window.klaytn.
      const injectedProvider = this.provider.provider as ExternalProvider;
      return injectedProvider.isKaikas === true;
    }
    return false;
  }

  // @ethers/providers/src.ts/provider-jsonrpc.ts:JsonRpcSigner.connect
  override connect(_provider: Provider): EthersJsonRpcSigner {
    assert(
      false,
      "cannot alter JSON-RPC Signer connection",
      "UNSUPPORTED_OPERATION"
    );
  }

  connectUnchecked(): EthersJsonRpcSigner {
    return new UncheckedJsonRpcSigner(this.provider, this.address);
  }

  // If underlying EIP-1193 provider is Kaikas, return the KIP-97 signed message in which
  // the message is prefixed with "\x19Klaytn Signed Message:\n" + len(message) before signing.
  // https://kips.klaytn.foundation/KIPs/kip-97
  //
  // Otherwise, return the ERC-191 signed message in which the message is prefixed with
  // "\x19Ethereum Signed Message:\n" + len(message) before signing.
  // https://eips.ethereum.org/EIPS/eip-191
  //
  // @ethers/providers/src.ts/provider-jsonrpc.ts:JsonRpcSigner.signMessage
  override async signMessage(message: string | Uint8Array): Promise<string> {
    const data = typeof message === "string" ? toUtf8Bytes(message) : message;
    const address = await this.getAddress();

    try {
      if (this.isKaikas()) {
        // KIP-97 states that the prefixed message signature should be accessible
        // through the personal_sign method, but Kaikas provides it as eth_sign.
        return this.provider.send("eth_sign", [
          address.toLowerCase(),
          hexlify(data),
        ]);
      } else {
        // Otherwise, use the standard personal_sign for ERC-191.
        return this.provider.send("personal_sign", [
          hexlify(data),
          address.toLowerCase(),
        ]);
      }
    } catch (error: any) {
      catchUserRejectedSigning(error, "signMessage", address, message);
      throw error;
    }
  }

  // Return the signature of the message without prefix via the eth_sign method.
  // This operation is deprecated in favor of signMessage (ERC-191 or KIP-97).
  //
  // Some providers may support this operation for backward compatibility, or reject it.
  // In Kaikas, eth_sign is reserved for KIP-97 purpose, so the legacy sign message is decisively not supported.
  // - If the provider is Kaikas, always throw an error.
  // - If the provider is not Kaikas, try the eth_sign method.
  //   - If the provider rejects the operation, throw an error.
  //   - If the provider accepts the operation, return the signature.
  // https://docs.metamask.io/wallet/concepts/signing-methods/#eth_sign
  // https://support.metamask.io/hc/en-us/articles/14764161421467-What-is-eth-sign-and-why-is-it-a-risk-
  // @ethers/providers/src.ts/provider-jsonrpc.ts:JsonRpcSigner._legacySignMessage
  async _legacySignMessage(message: Uint8Array | string): Promise<string> {
    assert(
      !this.isKaikas(),
      "Kaikas does not support the prefix-less legacy sign message",
      "UNSUPPORTED_OPERATION",
      { operation: "_legacySignMessage" }
    );

    const data = typeof message === "string" ? toUtf8Bytes(message) : message;
    const address = await this.getAddress();

    try {
      return this.provider.send("eth_sign", [
        address.toLowerCase(),
        hexlify(data),
      ]);
    } catch (error: any) {
      catchUserRejectedSigning(error, "_legacySignMessage", address, message);
      throw error;
    }
  }

  // Return the signature of the structured data according to EIP-712 via the eth_signTypedData_v4 method.
  // https://eips.ethereum.org/EIPS/eip-712
  // https://docs.metamask.io/wallet/how-to/sign-data/#use-eth_signtypeddata_v4
  async _signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>
  ): Promise<string> {
    assert(
      !this.isKaikas(),
      "Kaikas does not support the EIP-712 typed structured data signing",
      "UNSUPPORTED_OPERATION",
      { operation: "_signTypedData" }
    );

    // @ethers/providers/src.ts/provider-jsonrpc.ts:JsonRpcSigner._signTypedData
    // Populate any ENS names (in-place)
    const populated = await TypedDataEncoder.resolveNames(
      domain,
      types,
      value,
      (name: string) => {
        return this.provider.resolveName(name) as Promise<string>;
      }
    );

    const address = await this.getAddress();

    try {
      return this.provider.send("eth_signTypedData_v4", [
        address.toLowerCase(),
        JSON.stringify(
          TypedDataEncoder.getPayload(populated.domain, types, populated.value)
        ),
      ]);
    } catch (error: any) {
      catchUserRejectedSigning(error, "_signTypedData", address, {
        domain: populated.domain,
        types,
        value: populated.value,
      });
      throw error;
    }
  }

  override async populateTransaction(
    transaction: TransactionRequest
  ): Promise<TransactionLike<string>> {
    const tx = await getTransactionRequest(transaction);

    // Not a Klaytn TxType; fallback to ethers.Signer.populateTransaction()
    if (!isKlaytnTxType(parseTxType(tx.type))) {
      return super.populateTransaction(tx);
    }

    await populateFrom(tx, await this.getAddress());
    await populateTo(tx, this.provider);
    await populateNonce(tx, this.provider, await this.getAddress());
    await populateGasLimit(tx, this.provider);
    await populateGasPrice(tx, this.provider);
    await populateChainId(tx, this.provider);
    return tx;
  }

  // Return the signed transaction as a string but do not send it.
  override async signTransaction(
    transaction: TransactionRequest
  ): Promise<string> {
    assert(
      this.isKaikas(),
      "signing transactions is only supported in Kaikas",
      "UNSUPPORTED_OPERATION",
      { operation: "signTransaction" }
    );

    const tx = await getTransactionRequest(transaction);
    await populateFrom(tx, await this.getAddress());
    await populateGasLimit(tx, this.provider);
    await populateTo(tx, this.provider);

    const rpcTx = getRpcTxObject(tx);
    if (this.isKaikas()) {
      rpcTx.type = getKaikasTxType(rpcTx.type);
    }

    try {
      // Kaikas returns the web3-style signed transaction object.
      const signedTx = await this.provider.send("klay_signTransaction", [
        rpcTx,
      ]);
      return Promise.resolve(signedTx.rawTransaction);
    } catch (error: any) {
      catchUserRejectedTransaction(error, "signTransaction", transaction);
      throw error;
    }
  }

  override async sendTransaction(
    transaction: TransactionRequest
  ): Promise<TransactionResponse> {
    const txhash = await this.sendUncheckedTransaction(transaction);
    return pollTransactionInPool(txhash, this.provider);
  }

  async sendUncheckedTransaction(
    transaction: TransactionRequest
  ): Promise<string> {
    const tx = await getTransactionRequest(transaction);
    await populateFrom(tx, await this.getAddress());
    await populateGasLimit(tx, this.provider);
    await populateTo(tx, this.provider);

    const rpcTx = getRpcTxObject(tx);
    if (this.isKaikas()) {
      rpcTx.type = getKaikasTxType(rpcTx.type);
    }

    try {
      if (this.isKaikas()) {
        return this.provider.send("klay_sendTransaction", [rpcTx]);
      } else {
        return this.provider.send("eth_sendTransaction", [rpcTx]);
      }
    } catch (error: any) {
      catchUserRejectedTransaction(error, "sendTransaction", tx);
      throw error;
    }
  }

  async unlock(password: string): Promise<boolean> {
    const address = await this.getAddress();
    return this.provider.send("personal_unlockAccount", [
      address.toLowerCase(),
      password,
      null,
    ]);
  }
}

// Variant of JsonRpcSigner where it does not wait for the transaction to be in the txpool.
// @ethers/providers/src.ts/provider-jsonrpc.ts:UncheckedJsonRpcSigner
class UncheckedJsonRpcSigner extends JsonRpcSigner {
  override async sendTransaction(
    transaction: TransactionRequest
  ): Promise<TransactionResponse> {
    const txhash = await this.sendUncheckedTransaction(transaction);
    return Promise.resolve({
      hash: txhash,
      nonce: null,
      gasLimit: null,
      gasPrice: null,
      data: null,
      value: null,
      chainId: null,
      confirmations: 0,
      from: null,
      wait: (confirmations?: number) => {
        return this.provider.waitForTransaction(txhash, confirmations);
      },
    } as unknown as TransactionResponse); // forcefully cast to TransactionResponse
  }
}

function catchUserRejectedSigning(
  error: any,
  action: any,
  from: any,
  messageData: any
) {
  assert(
    !(typeof error.message === "string" && error.message.match(/user denied/i)),
    "user rejected signing",
    "ACTION_REJECTED",
    {
      action: "signTransaction",
      reason: "rejected",
      info: {
        from,
        messageData,
        action,
      },
    }
  );
}

function catchUserRejectedTransaction(
  error: any,
  action: any,
  transaction: any
) {
  assert(
    !(typeof error.message === "string" && error.message.match(/user denied/i)),
    "user rejected signing",
    "ACTION_REJECTED",
    {
      action: "sendTransaction",
      reason: "rejected",
      info: {
        transaction,
      },
    }
  );
}
