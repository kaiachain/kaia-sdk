import decimal
from functools import wraps
from typing import (
    Any,
    Dict,
    NewType,
    Sequence,
    Union,
    cast,
)
from toolz import (
    assoc,
    dissoc,
)
from eth_utils import (
    is_binary_address,
    is_checksum_address,
    is_dict,
    is_tuple,
)
from eth_utils.currency import (
    to_wei,
    from_wei,
)
from eth_utils.curried import (
    apply_one_of_formatters,
    hexstr_if_str,
    is_0x_prefixed,
    is_hexstr,
    is_address,
    is_bytes,
    is_integer,
    is_list_like,
    is_string,
    to_bytes,
    to_int,
)
import binascii
from eth_account._utils.signing import CHAIN_ID_OFFSET

def bytes_to_hex_str(bytes: bytes) -> str:
    return binascii.hexlify(bytes).decode('utf-8')

def hex_str_to_bytes(hex: str) -> bytes:
    if is_0x_prefixed(hex):
        return bytes.fromhex(hex[2:])
    else:
        return bytes.fromhex(hex)

def is_int_or_prefixed_hexstr(val):
    if is_integer(val):
        return True
    elif isinstance(val, str) and is_0x_prefixed(val):
        return True
    else:
        return False

def is_rpc_structured_signatures(val):
    """Returns true if 'val' is a valid JSON-RPC structured signatures."""
    if not is_list_like(val):
        return False
    for d in val:
        if not is_dict(d):
            return False
        if len(d) != 3:
            return False
        v = d.get('v')        
        r = d.get('r')
        s = d.get('s')
        if any(_ is None for _ in (v,r,s)):
            return False
        if not is_int_or_prefixed_hexstr(v):
            return False
        if not is_int_or_prefixed_hexstr(r):
            return False
        if not is_int_or_prefixed_hexstr(s):
            return False
    return True


def is_rlp_structured_signatures(val):
    """Returns true if 'val' is a valid rlp-structured signatures."""
    if not is_list_like(val):
        return False
    for item in val:
        if not is_list_like(item):
            return False
        if len(item) != 3:
            return False
        v, r, s = item
        if not is_int_or_prefixed_hexstr(v):
            return False
        if not is_int_or_prefixed_hexstr(r):
            return False
        if not is_int_or_prefixed_hexstr(s):
            return False
    return True

# JSON-RPC to rlp transaction structure
def transaction_rpc_to_rlp_structure(dictionary: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert a JSON-RPC-structured transaction to an rlp-structured transaction.
    """
    signatures = dictionary.get("signatures")
    if signatures:
        dictionary = dissoc(dictionary, "signatures")
        rlp_structured_signatures = _signatures_rpc_to_rlp_structure(signatures)
        dictionary = assoc(dictionary, "signatures", rlp_structured_signatures)
    feepayer_signatures = dictionary.get("feePayerSignatures")
    if feepayer_signatures:
        dictionary = dissoc(dictionary, "feePayerSignatures")
        rlp_structured_signatures = _signatures_rpc_to_rlp_structure(feepayer_signatures)
        dictionary = assoc(dictionary, "feePayerSignatures", rlp_structured_signatures)
    return dictionary


def _signatures_rpc_to_rlp_structure(signatures: Sequence) -> Sequence:
    if not is_rpc_structured_signatures(signatures):
        raise ValueError(
            "provided object not formatted as JSON-RPC-structured signatures"
        )
    rlp_structured_signatures = []
    for d in signatures:
        # flatten each dict into a tuple of its values
        rlp_structured_signatures.append(
            (
                d["v"], 
                d["r"], 
                d["s"], 
            )
        )
    return tuple(rlp_structured_signatures)


# rlp to JSON-RPC transaction structure
def transaction_rlp_to_rpc_structure(dictionary: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert an rlp-structured transaction to a JSON-RPC-structured transaction.
    """
    sitnatures = dictionary.get("signatures")
    if sitnatures:
        dictionary = dissoc(dictionary, "signatures")
        rpc_structured_signatures = _signatures_rlp_to_rpc_structure(sitnatures)
        dictionary = assoc(dictionary, "signatures", rpc_structured_signatures)
    feepayer_sitnatures = dictionary.get("feePayerSignatures")
    if feepayer_sitnatures:
        dictionary = dissoc(dictionary, "feePayerSignatures")
        rpc_structured_signatures = _signatures_rlp_to_rpc_structure(feepayer_sitnatures)
        dictionary = assoc(dictionary, "feePayerSignatures", rpc_structured_signatures)
    return dictionary


def _signatures_rlp_to_rpc_structure(signatures: Sequence) -> Sequence:
    if not is_rlp_structured_signatures(signatures):
        raise ValueError("provided object not formatted as rlp-structured signatures")
    rpc_structured_signatures = []
    for t in signatures:
        # build a dictionary with appropriate keys for each tuple
        rpc_structured_signatures.append({"v": t[0], "r": t[1], "s": t[2]})
    return rpc_structured_signatures

def is_rpc_structured_multisig_account_key(keys):
    if not (is_list_like(keys) or is_tuple(keys)):
        return False
    for d in keys:
        if not is_dict(d):
            return False
        if len(d) != 2:
            return False
        weight = d.get('weight')        
        key = d.get('key')
        if any(_ is None for _ in (weight, key)):
            return False
        if not is_integer(weight):
            return False
        if not is_hexstr(key):
            return False
    return True

def multisig_account_key_rpc_to_rlp_structure(dictionary: Dict[str, Any]) -> Dict[str, Any]:
    keys = dictionary.get("keys")
    if keys:
        dictionary = dissoc(dictionary, "keys")
        rpc_structured_keys = _multisig_account_key_rpc_to_rlp_structure(keys)
        dictionary = assoc(dictionary, "keys", rpc_structured_keys)
    return dictionary

def _multisig_account_key_rpc_to_rlp_structure(keys: Sequence) -> Sequence:
    if not is_rpc_structured_multisig_account_key(keys):
       raise ValueError("provided object not formatted as rlp-structured multisig account key")
    rlp_structured_keys = []
    for t in keys:
        if is_0x_prefixed(t['key']):
            key = bytes.fromhex(t['key'][2:])
        else:
            key = bytes.fromhex(t['key'])
        rlp_structured_keys.append((t["weight"], key))
    return tuple(rlp_structured_keys) 

def is_rlp_structured_multisig_account_key(val):
    """Returns true if 'val' is a valid rlp-structured signatures."""
    if not is_list_like(val):
        return False
    for item in val:
        if not is_list_like(item):
            return False
        if len(item) != 2:
            return False
        weight, key = item
        if not is_integer(weight):
            return False
        if not is_bytes(key):
            return False
    return True

def multisig_account_key_rlp_to_rpc_structure(dictionary: Dict[str, Any]) -> Dict[str, Any]:
    keys = dictionary.get("keys")
    if keys:
        dictionary = dissoc(dictionary, "keys")
        rpc_structured_keys = _multisig_account_key_rlp_to_rpc_structure(keys)
        dictionary = assoc(dictionary, "keys", rpc_structured_keys)
    return dictionary

def _multisig_account_key_rlp_to_rpc_structure(keys: Sequence) -> Sequence:
    if not is_rlp_structured_multisig_account_key(keys):
       raise ValueError("provided object not formatted as rlp-structured multisig account key")
    rpc_structured_keys = []
    for key in keys:
        rpc_structured_keys.append({"weight":key[0], "key":'0x' + bytes_to_hex_str(key[1])})
    return tuple(rpc_structured_keys)

def role_based_account_key_rpc_to_rlp_structure(dictionary: Dict[str, Any]) -> Dict[str, Any]:
    keys = dictionary.get("keys")
    if keys:
        dictionary = dissoc(dictionary, "keys")
        rpc_structured_keys = _role_based_account_key_rpc_to_rlp_structure(keys)
        dictionary = assoc(dictionary, "keys", rpc_structured_keys)
    return dictionary 

def _role_based_account_key_rpc_to_rlp_structure(keys: Dict[str, Any]) -> Sequence:
    if not is_rpc_structured_role_based_account_key(keys):
       raise ValueError("provided object not formatted as rlp-structured role based account key")
    return tuple(keys['roleTransactionKey'], keys['roleAccountUpdateKey'], keys['roleFeePayerKey'])  

def is_rpc_structured_role_based_account_key(keys: Dict[str, Any]) -> bool:
    if not is_dict(keys):
        return False
    if len(keys.keys()) != 3:
        return False
    roleTransactionKey = keys.get('roleTransactionKey')        
    roleAccountUpdateKey = keys.get('roleAccountUpdateKey')
    roleFeePayerKey = keys.get('roleFeePayerKey')
    if any(_ is None for _ in (roleTransactionKey, roleAccountUpdateKey, roleFeePayerKey)):
        return False 
    return True

# Currency Utility
Ston = NewType("ston", int)
def to_peb(self, number: Union[int, float, str, decimal.Decimal], unit: str) -> Ston:
    return cast(Ston, to_wei(number, unit))

def from_peb(self, number: int, unit: str) -> Union[int, decimal.Decimal]:
    return from_wei(number, unit)

Gkei = NewType("gkei", int)
def to_kei(self, number: Union[int, float, str, decimal.Decimal], unit: str) -> Gkei:
    return cast(Gkei, to_wei(number, unit))

def from_kei(self, number: int, unit: str) -> Union[int, decimal.Decimal]:
    return from_wei(number, unit)