from typing import Dict, Mapping, NamedTuple, Tuple
import warnings
import json
from eth_account.account import (
    Account,
    LocalAccount,
)
from eth_keyfile import (
    decode_keyfile_json,
)
from eth_account._utils.signing import (
    serializable_unsigned_transaction_from_dict,
    sign_transaction_hash,
    encode_transaction,
    sign_transaction_dict,
    hash_of_signed_transaction,
    TypedTransaction,
)
from eth_utils.curried import (
    keccak,
)
from eth_utils.address import (
    to_checksum_address,
)
from eth_account.datastructures import (
    SignedTransaction,
)
from eth_account._utils.legacy_transactions import (
    Transaction,
    vrs_from,
)
from hexbytes import (
    HexBytes,
)
from cytoolz import (
    dissoc,
)
from cytoolz import (
    dissoc,
    identity,
    merge,
    pipe,
)
from eth_utils.curried import (
    hexstr_if_str,
    text_if_str,
    to_int,
    apply_formatter_to_array,
    apply_formatters_to_dict,
    apply_one_of_formatters,
    is_bytes,
    is_string,
    to_bytes,
    to_int,
    is_dict,
    encode_hex,
)
from web3py_ext.transaction.extended_transaction_utils import (
    hex_str_to_bytes,
    bytes_to_hex_str,
)
from eth_account._utils.validation import is_none
from web3py_ext.transaction.transaction import (
    TxType,
    TX_TYPE_HEX_TO_STRING,
)

# It can has the decoupled keypair to support klaytn abstract account
class AbstractLocalAccount(LocalAccount):
    r"""
    A collection of convenience methods to sign and encrypt, with an
    embedded private key.

    :var bytes key: the 32-byte private key data

    .. code-block:: python

        >>> my_local_account.address
        "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55"
        >>> my_local_account.key
        b"\x01\x23..."

    You can also get the private key by casting the account to :class:`bytes`:

    .. code-block:: python

        >>> bytes(my_local_account)
        b"\\x01\\x23..."
    """

    def __init__(self, *args):
        if len(args) == 2:
            key, account = args[0], args[1]
            self._publicapi = account
            self._address = key.public_key.to_checksum_address()
            key_raw = key.to_bytes()
            self._private_key = key_raw
            self._key_obj = key
        elif len(args) == 3:
            address, key, account = args[0], args[1], args[2]
            self._publicapi = account
            self._address = to_checksum_address(address)
            key_raw = key.to_bytes()
            self._private_key = key_raw
            self._key_obj = key
            # self.public_key = self._key_obj.public_key.to_checksum_address()

    @property
    def address(self):
        return self._address

    @property
    def key(self):
        """
        Get the private key.
        """
        return self._private_key

    def encrypt(self, password, kdf=None, iterations=None):
        """
        Generate a string with the encrypted key.

        This uses the same structure as in
        :meth:`~eth_account.account.Account.encrypt`, but without a
        private key argument.
        """
        return self._publicapi.encrypt(
            self.key, password, kdf=kdf, iterations=iterations
        )

    def signHash(self, message_hash):
        return self._publicapi.signHash(
            message_hash,
            private_key=self.key,
        )

    def sign_message(self, signable_message):
        """
        Generate a string with the encrypted key.

        This uses the same structure as in
        :meth:`~eth_account.account.Account.sign_message`, but without a
        private key argument.
        """
        return self._publicapi.sign_message(signable_message, private_key=self.key)

    def signTransaction(self, transaction_dict):
        warnings.warn(
            "signTransaction is deprecated in favor of sign_transaction",
            category=DeprecationWarning,
        )
        return self.sign_transaction(transaction_dict)

    def sign_transaction(self, transaction_dict):
        return self._publicapi.sign_transaction(transaction_dict, self.key)

    def __bytes__(self):
        return self.key


class KlaytnSignedTransaction(NamedTuple):
    rawTransaction: HexBytes
    hash: HexBytes
    senderTxHash: HexBytes
    r: int
    s: int
    v: int

    def __getitem__(self, index):
        try:
            return tuple.__getitem__(self, index)
        except TypeError:
            return getattr(self, index)

def klaytn_extended_sign_transaction(self, transaction, private_key, blobs=None):
    # case: appending sign by multisig
    if isinstance(transaction, bytes):
        transaction = Account.decode_transaction(transaction)

    if (not "type" in transaction) or ("type" in transaction and hexstr_if_str(to_int, transaction["type"]) < 8):
        if not isinstance(transaction, Mapping):
            raise TypeError(
                "transaction must be dict-like, got %r" % transaction
            )

        account = self.from_key(private_key)

        # allow from field, *only* if it matches the private key
        if "from" in transaction:
            if transaction["from"] == account.address:
                sanitized_transaction = dissoc(transaction, "from")
            else:
                raise TypeError(
                    "from field must match key's %s, but it was %s"
                    % (
                        account.address,
                        transaction["from"],
                    )
                )
        else:
            sanitized_transaction = transaction

        # sign transaction
        (
            v,
            r,
            s,
            encoded_transaction,
        ) = sign_transaction_dict(account._key_obj, sanitized_transaction, blobs)
        transaction_hash = keccak(encoded_transaction)

        return SignedTransaction(
            rawTransaction=HexBytes(encoded_transaction),
            hash=HexBytes(transaction_hash),
            r=r,
            s=s,
            v=v,
        )
    else:
        if not isinstance(transaction, Mapping):
            raise TypeError("transaction_dict must be dict-like, got %r" % transaction)
        account = self.from_key(private_key)
        v, r, s, encoded_transaction, transaction_hash, senderTxHash = klaytn_sign_transaction_dict(account._key_obj, transaction)
        return KlaytnSignedTransaction(
            rawTransaction=HexBytes(encoded_transaction),
            hash=HexBytes(transaction_hash),
            senderTxHash=HexBytes(senderTxHash),
            r=r,
            s=s,
            v=v,
        )

def klaytn_sign_transaction_dict(eth_key, transaction_dict):
    # generate RLP-serializable transaction, with defaults filled
    unsigned_transaction = serializable_unsigned_transaction_from_dict(transaction_dict)
    if not isinstance(unsigned_transaction, TypedTransaction):
        raise TypeError("given transaction type is expected: TypedTransaction, but %s", type(unsigned_transaction))
    
    transaction_hash = unsigned_transaction.hash()
    chain_id = hexstr_if_str(to_int, transaction_dict["chainId"])
    (v, r, s) = sign_transaction_hash(eth_key, transaction_hash, chain_id)
    encoded_transaction = encode_transaction(unsigned_transaction, vrs=(v,r,s))

    return v, r, s, encoded_transaction, transaction_hash, transaction_hash

fee_delegated_types = (
    TxType.FEE_DELEGATED_VALUE_TRANSFER,
    TxType.FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO,
    TxType.FEE_DELEGATED_VALUE_TRANSFER_MEMO,
    TxType.FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO,
    TxType.FEE_DELEGATED_ACCOUNT_UPDATE,
    TxType.FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO,
    TxType.FEE_DELEGATED_SMART_CONTRACT_DEPLOY,
    TxType.FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO,
    TxType.FEE_DELEGATED_SMART_CONTRACT_EXECUTION,
    TxType.FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO,
    TxType.FEE_DELEGATED_CANCEL,
    TxType.FEE_DELEGATED_CANCEL_WITH_RATIO,
    TxType.FEE_DELEGATED_CHAIN_DATA_ANCHORING,
    TxType.FEE_DELEGATED_CHAIN_DATA_ANCHORING_WITH_RATIO,
)

def klaytn_extended_sign_transaction_as_feepayer(self, transaction, feePayer, private_key):
    account = self.from_key(private_key)
    
    if isinstance(transaction, bytes):
        if len(transaction) == 0:
            raise TypeError("zero length raw transaction")
        transaction = Account.decode_transaction(transaction)
        
    if 'type' in transaction and transaction['type'] not in fee_delegated_types:
        raise TypeError("fee delegated transaction type is expected, but actual type: " \
                         + TX_TYPE_HEX_TO_STRING[transaction['type']])
    
    if 'signatures' in transaction and len(transaction['signatures']) != 0:
        transaction['feePayer'] = feePayer
        chain_id = text_if_str(to_int, transaction["chainId"])
        
        # sender tx hash
        typed_tx = TypedTransaction.from_dict(transaction)
        sender_tx_hash = keccak(typed_tx.encode())

        # feepayer tx hash(tx hash)
        feepayer_signature = typed_tx.transaction.feepayer_hash()
        (v, r, s) = sign_transaction_hash(account._key_obj, feepayer_signature, chain_id)
        encoded_transaction = feepayer_encode_transaction(typed_tx, vrs=(v,r,s))
        transaction_hash = keccak(encoded_transaction)
        return KlaytnSignedTransaction(
            rawTransaction=HexBytes(encoded_transaction),
            hash=HexBytes(transaction_hash),
            senderTxHash=HexBytes(sender_tx_hash),
            r=r,
            s=s,
            v=v,
        )
    else:
        raise TypeError("sender didn't signed this transaction yet")
    
def feepayer_encode_transaction(unsigned_transaction, vrs):
    (v, r, s) = vrs
    chain_naive_transaction = dissoc(unsigned_transaction.as_dict(), "v", "r", "s")
    if isinstance(unsigned_transaction, TypedTransaction):
        # Typed transaction have their own encoding format,
        # so we must delegate the encoding.
        chain_naive_transaction["v"] = v
        chain_naive_transaction["r"] = r
        chain_naive_transaction["s"] = s
        signed_typed_transaction = TypedTransaction.from_dict(chain_naive_transaction)
        return bytes([signed_typed_transaction.transaction_type]) + signed_typed_transaction.transaction.feepayer_payload()

def klaytn_extended_recover_transaction_as_feepayer(self, serialized_transaction):
    txn_bytes = HexBytes(serialized_transaction)
    if txn_bytes[0] not in fee_delegated_types:
        raise TypeError("fee delegated transaction type is expected, but actual type: " + TX_TYPE_HEX_TO_STRING[txn_bytes[0]])
    
    addresses = []
    typed_transaction = TypedTransaction.from_bytes(txn_bytes)
    msg_hash = typed_transaction.transaction.feepayer_hash()
    if typed_transaction.transaction_type in TX_TYPE_HEX_TO_STRING.keys():
        if 'feePayerSignatures' in typed_transaction.transaction.dictionary:
            for signature in typed_transaction.transaction.dictionary['feePayerSignatures']:
                addresses.append(self._recover_hash(msg_hash, to_vrs(signature)))
    return addresses
        

LEGACY_TRANSACTION_DECODE_FORMATTERS = {
    "nonce": hexstr_if_str(to_int),
    "gasPrice": hexstr_if_str(to_int),
    "gas": hexstr_if_str(to_int),
    "to": apply_one_of_formatters(
        (
            (lambda val: val==HexBytes('0x'), lambda val: ''),
            (is_string, hexstr_if_str(to_checksum_address)),
            (is_none, lambda val: ''),
        )
    ),
    "value": hexstr_if_str(to_int),
    "data": hexstr_if_str(encode_hex),
}

TYPED_TRANSACTION_DECODE_FORMATTERS = merge(
    LEGACY_TRANSACTION_DECODE_FORMATTERS,
    {
        "input": hexstr_if_str(encode_hex),
        "accessList": apply_formatter_to_array(
            apply_formatters_to_dict(
                {
                    "address": apply_one_of_formatters(
                        (
                            (is_string, hexstr_if_str(to_checksum_address)),
                            (is_bytes, identity),
                        )
                    ),
                    "storageKeys": apply_formatter_to_array(hexstr_if_str(to_int)),
                }
            ),
        ),
        "from": apply_one_of_formatters(
            (
                (is_string, hexstr_if_str(to_checksum_address)),
                (is_bytes, identity),
            )
        ),
        "feePayer": apply_one_of_formatters(
            (
                (is_string, hexstr_if_str(to_checksum_address)),
                (is_bytes, identity),
            )
        ),
    },
)

def klaytn_extended_decode_transaction(self, serialized_transaction):
    if not is_bytes(serialized_transaction):
        raise TypeError("expect rlp encoded bytes, but ", serialized_transaction)
    tx_type = serialized_transaction[0]
    if 0 < tx_type and tx_type <= 0x7f:
        # typed transaction
        dict = TypedTransaction.from_bytes(serialized_transaction).as_dict()
    else:
        # legacy transaction
        dict = Transaction.from_bytes(serialized_transaction).as_dict()
    
    formatted_dict = pipe(
        dict.copy(),
        apply_formatters_to_dict(TYPED_TRANSACTION_DECODE_FORMATTERS),
    )
    return formatted_dict

# klaytn_recover_transaction return the list of recovered
def klaytn_extended_recover_transaction(self, serialized_transaction):
    txn_bytes = HexBytes(serialized_transaction)
    if len(txn_bytes) > 0 and txn_bytes[0] <= 0x7F:
        typed_transaction = TypedTransaction.from_bytes(txn_bytes)
        msg_hash = typed_transaction.hash()
        # klaytn typed transaction
        if typed_transaction.transaction_type in TX_TYPE_HEX_TO_STRING.keys():
            addresses = []
            if 'signatures' in typed_transaction.transaction.dictionary:
                for signature in typed_transaction.transaction.dictionary['signatures']:
                    addresses.append(self._recover_hash(msg_hash, to_vrs(signature)))
            return addresses
        # ethereum typed transaction (dynamic_gas_price, access_list)
        else:
            vrs = typed_transaction.vrs()
            return [self._recover_hash(msg_hash, vrs=vrs)]
    # legacy transaction
    txn = Transaction.from_bytes(txn_bytes)
    msg_hash = hash_of_signed_transaction(txn)
    return [self._recover_hash(msg_hash, vrs=vrs_from(txn))]

def to_vrs(signature) -> Tuple[int, int, int]:
    if not all(k in signature for k in "vrs"):
        raise ValueError("attempting to encode an unsigned transaction")
    return (signature["v"], signature["r"], signature["s"])


def klaytn_v3_decrypt(keyfile, password_bytes):
    return [{
            'address':keyfile['address'], 
            'private_key':HexBytes(decode_keyfile_json(keyfile, password_bytes))
        }]
    
def klaytn_v4_decrypt(keyfile, password_bytes):
    if 'keyring' not in keyfile or not isinstance(keyfile['keyring'], list):
        raise TypeError("v4 keystore should have a keyring(list)")
    
    def flatten_to_v3(keyring):
        flat_v3 = []
        for key in keyring:
            if isinstance(key, list):
                flat_v3.extend(flatten_to_v3(key))
            else:
                flat_v3.append({
                    'version':3,
                    'crypto':key
                })
        return flat_v3

    return list(
        map(
            lambda x:{
                'address':keyfile['address'], 
                'private_key':HexBytes(decode_keyfile_json(x, password_bytes))
                },
            flatten_to_v3(keyfile['keyring'])
        )
    )

def klaytn_v4_support_decrypt(self, keyfile_json, password):
    password_bytes = text_if_str(to_bytes, password)

    if isinstance(keyfile_json, str):
        keyfile = json.loads(keyfile_json)
    elif is_dict(keyfile_json):
        keyfile = keyfile_json
    else:
        raise TypeError(
            "The keyfile should be supplied as a JSON string, or a dictionary."
        )
    
    if 'version' in keyfile and keyfile['version'] == 4:
        return klaytn_v4_decrypt(keyfile, password_bytes)
    else:
        return klaytn_v3_decrypt(keyfile, password_bytes)