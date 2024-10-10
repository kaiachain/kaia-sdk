from typing import (
    Any,
    Dict,
    Tuple,
    cast,
)
from cytoolz import (
    dissoc,
    identity,
    merge,
    partial,
    pipe,
)
from eth_rlp import (
    HashableRLP,
)
from eth_utils import (
    keccak,
)
from eth_utils.curried import (
    apply_formatter_to_array,
    apply_formatters_to_dict,
    apply_one_of_formatters,
    hexstr_if_str,
    is_bytes,
    is_string,
    to_bytes,
    to_int,
)
from hexbytes import (
    HexBytes,
)
import rlp
from rlp.sedes import (
    CountableList,
    big_endian_int,
    Binary,
    List,
)

from web3py_ext.transaction.extended_transaction_utils import (
    transaction_rlp_to_rpc_structure,
    transaction_rpc_to_rlp_structure,

)

from eth_account._utils.validation import (
    LEGACY_TRANSACTION_FORMATTERS,
    LEGACY_TRANSACTION_VALID_VALUES,
    is_int_or_prefixed_hexstr,
    is_empty_or_checksum_address,
)
from eth_account._utils.typed_transactions.typed_transaction import (
    _TypedTransactionImplementation
)
from eth_account._utils.signing import (
    extract_chain_id,
)
from eth_account._utils.signing import (
    extract_chain_id,
)
KLAYTN_TYPED_TRANSACTION_FORMATTERS = merge(
    LEGACY_TRANSACTION_FORMATTERS,
    {
        "chainId": hexstr_if_str(to_int),
        "type": hexstr_if_str(to_int),
        "from": apply_one_of_formatters(
            (
                (is_string, hexstr_if_str(to_bytes)),
                (is_bytes, identity),
            )
        ),
        "feePayer": apply_one_of_formatters(
            (
                (is_string, hexstr_if_str(to_bytes)),
                (is_bytes, identity),
            )
        ),
        # klaytn extension fields
        "signatures": apply_formatter_to_array(
            apply_formatters_to_dict({
                "v": hexstr_if_str(to_int),
                "r": hexstr_if_str(to_int),
                "s": hexstr_if_str(to_int),
            }),
        ),
        "feePayerSignatures": apply_formatter_to_array(
            apply_formatters_to_dict({
                "v": hexstr_if_str(to_int),
                "r": hexstr_if_str(to_int),
                "s": hexstr_if_str(to_int),
            }),
        ),
    },
)

signatures = CountableList(
    (
        List(
            [
                big_endian_int,
                big_endian_int,
                big_endian_int,
            ]
        )
    )
)

class FeeDelegatedValueTransferTransaction(_TypedTransactionImplementation):
    """
    Represents a klaytn value transafer transaction type.
    https://docs.kaia.io/learn/transactions/fee-delegation#txtypefeedelegatedvaluetransfer-
    """

    transaction_type = 9  # '0x09'
    
    unsigned_transaction_fields = (
        ("type", big_endian_int),
        ("nonce", big_endian_int),
        ("gasPrice", big_endian_int),
        ("gas", big_endian_int),
        ("to", Binary.fixed_length(20)),
        ("value", big_endian_int),
        ("from", Binary.fixed_length(20)),
    )

    signed_transaction_fields_with_signature = (
        ("nonce", big_endian_int),
        ("gasPrice", big_endian_int),
        ("gas", big_endian_int),
        ("to", Binary.fixed_length(20)),
        ("value", big_endian_int),
        ("from", Binary.fixed_length(20)),
        ("signatures", signatures),
    )

    feepayer_signed_transaction_fields_with_signature = (
        ("nonce", big_endian_int),
        ("gasPrice", big_endian_int),
        ("gas", big_endian_int),
        ("to", Binary.fixed_length(20)),
        ("value", big_endian_int),
        ("from", Binary.fixed_length(20)),
        ("signatures", signatures),
        ("feePayer", Binary.fixed_length(20)),
        ("feePayerSignatures", signatures)
    )

    transaction_field_defaults = {
        "type": 9,
        "to": b"",
        "value": 0,
    }

    _unsigned_transaction_serializer = type(
        "_unsigned_transaction_serializer_with_type",
        (HashableRLP,),
        {
            "fields": unsigned_transaction_fields,
        },
    )
    
    _signed_transaction_serializer = type(
        "_signed_transaction_serializer",
        (HashableRLP,),
        {
            "fields": signed_transaction_fields_with_signature,
        },
    )
    
    _feepayer_signed_transaction_serializer = type(
        "_signed_transaction_serializer",
        (HashableRLP,),
        {
            "fields": feepayer_signed_transaction_fields_with_signature,
        },
    )

    def __init__(self, dictionary: Dict[str, Any]):
        self.dictionary = dictionary

    @classmethod
    def assert_valid_fields(cls, dictionary: Dict[str, Any]) -> None:
        transaction_valid_values = merge(
            LEGACY_TRANSACTION_VALID_VALUES,
            {
                "type": is_int_or_prefixed_hexstr,
                "feePayer": is_empty_or_checksum_address,
            },
        )

        if "v" in dictionary and dictionary["v"] == 0:
            # This is insane logic that is required because the way we evaluate
            # correct types is in the `if not all()` branch below, and 0 obviously
            # maps to the int(0), which maps to False... This was not an issue in
            # non-typed transaction because v=0, couldn't exist with the chain offset.
            dictionary["v"] = "0x0"
        valid_fields = apply_formatters_to_dict(
            transaction_valid_values,
            dictionary,
        )  # type: Dict[str, Any]
        if not all(valid_fields.values()):
            invalid = {
                key: dictionary[key] for key, valid in valid_fields.items() if not valid
            }
            raise TypeError("Transaction had invalid fields: %r" % invalid)

    @classmethod
    def from_dict(cls, dictionary: Dict[str, Any]) -> "FeeDelegatedValueTransferTransaction":
        """
        Builds a FeeDelegatedValueTransferTransaction from a dictionary.
        Verifies that the dictionary is well formed.
        """
        # Validate fields.
        cls.assert_valid_fields(dictionary)
        sanitized_dictionary = pipe(
            dictionary,
            dict,
            partial(merge, cls.transaction_field_defaults),
            apply_formatters_to_dict(KLAYTN_TYPED_TRANSACTION_FORMATTERS),
        )
        # We have verified the type, we can safely remove it from the dictionary,
        # given that it is not to be included within the RLP payload.
        # transaction_type = sanitized_dictionary.pop("type")
        transaction_type = sanitized_dictionary["type"]
        if transaction_type != cls.transaction_type:
            raise ValueError(
                "expected transaction type %s, got %s"
                % (cls.transaction_type, transaction_type),
            )
        return cls(
            dictionary=sanitized_dictionary,
        )

    @classmethod
    def from_bytes(cls, encoded_transaction: HexBytes) -> "FeeDelegatedValueTransferTransaction":
        """Builds a FeeDelegatedValueTransferTransaction from a signed encoded transaction."""
        if not isinstance(encoded_transaction, HexBytes):
            raise TypeError(
                "expected Hexbytes, got type: %s" % type(encoded_transaction)
            )
        if not (
            len(encoded_transaction) > 0
            and encoded_transaction[0] == cls.transaction_type
        ):
            raise ValueError("unexpected input")
        
        transaction_payload = encoded_transaction[1:]
        try:
            rlp_serializer = cls._signed_transaction_serializer
            dictionary = rlp_serializer.from_bytes(  # type: ignore
                transaction_payload
            ).as_dict()
        except:
            rlp_serializer = cls._feepayer_signed_transaction_serializer
            dictionary = rlp_serializer.from_bytes(  # type: ignore
                transaction_payload
            ).as_dict()
        rpc_structured_dict = transaction_rlp_to_rpc_structure(dictionary)
        rpc_structured_dict["type"] = cls.transaction_type
        decoded_transaction = cls.from_dict(rpc_structured_dict)
        if 'signatures' in decoded_transaction.dictionary:
            chain_id, _ = extract_chain_id(decoded_transaction.dictionary['signatures'][0]['v'])
        else:
            raise ValueError("transaction is not signed yet")
        if chain_id == None:
            raise ValueError("invalid chainId")
        else:
            decoded_transaction.dictionary['chainId'] = chain_id

        return decoded_transaction

    def as_dict(self) -> Dict[str, Any]:
        """Returns this transaction as a dictionary."""
        dictionary = self.dictionary.copy()
        dictionary["type"] = self.__class__.transaction_type
        return dictionary

    def hash(self) -> bytes:
        """
        https://docs.kaia.io/learn/transactions/fee-delegation#rlp-encoding-for-signature-of-the-sender-
        """
        # Remove signature fields.
        transaction_without_signature_fields = dissoc(self.dictionary, "signatures", "feePayerSignatures", "chainId", "feePayer")
        rlp_serializer = self.__class__._unsigned_transaction_serializer
        hash = pipe(
            rlp_serializer.from_dict(transaction_without_signature_fields),  # type: ignore  # noqa: E501
            lambda val: rlp.encode(val),  # rlp([...])
            lambda val: [val, self.dictionary["chainId"].to_bytes(2,byteorder='big'), 0, 0],
            lambda val: rlp.encode(val),
            keccak,  # keccak256(0x02 || rlp([...]))
        )
        return cast(bytes, hash)

    def feepayer_hash(self) -> bytes:
        """
        https://docs.kaia.io/learn/transactions/fee-delegation#rlp-encoding-for-signature-of-the-fee-payer-
        """
        # Remove signature fields.
        transaction_without_signature_fields = dissoc(self.dictionary, "signatures", "feePayerSignatures", "chainId", "feePayer")
        rlp_serializer = self.__class__._unsigned_transaction_serializer
        hash = pipe(
            rlp_serializer.from_dict(transaction_without_signature_fields),  # type: ignore  # noqa: E501
            lambda val: rlp.encode(val),  # rlp([...])
            lambda val: [val, self.dictionary["feePayer"], self.dictionary["chainId"].to_bytes(2,byteorder='big'), 0, 0],
            lambda val: rlp.encode(val),
            keccak,  # keccak256(0x02 || rlp([...]))
        )
        return cast(bytes, hash)

    def payload(self) -> bytes:
        """
        Returns this transaction's payload as bytes.
        Here, the TransactionPayload = rlp([nonce, gasPrice, gas, to, value, from, txSignatures])
        txSignatures = [[v, r, s], ...]
        """
        rlp_serializer = self.__class__._signed_transaction_serializer
        if all(k in self.dictionary for k in "vrs"):
            vrs = {"v":self.dictionary["v"],"r":self.dictionary["r"],"s":self.dictionary["s"]}
        else:
            vrs = {}
        transaction_without_signature_fields = dissoc(self.dictionary, "v", "r", "s", "type", "chainId", "feePayer")

        # when signing at first time
        transaction_with_signatures = transaction_without_signature_fields
        if 'signatures' not in transaction_without_signature_fields:
            transaction_with_signatures = merge(transaction_without_signature_fields, {'signatures':[]})
        
        if vrs != {} and vrs not in transaction_with_signatures['signatures']:
            if type(transaction_with_signatures['signatures']) is not list:
                transaction_with_signatures['signatures'] = list(transaction_with_signatures['signatures'])
            transaction_with_signatures['signatures'].append(vrs)
        
        transaction_with_signatures = pipe(
            transaction_with_signatures,
            apply_formatters_to_dict(KLAYTN_TYPED_TRANSACTION_FORMATTERS),
        )
        rlp_structured_dict = transaction_rpc_to_rlp_structure(transaction_with_signatures)
        payload = rlp.encode(
            rlp_serializer.from_dict(rlp_structured_dict)  # type: ignore
        )
        return cast(bytes, payload)
    
    def feepayer_payload(self) -> bytes:
        """
        Returns this transaction's payload as bytes.
        Here, the TransactionPayload = rlp([nonce, gasPrice, gas, to, value, from, txSignatures, feePayer, feePayerSignatures])
        txSignatures = feePayerSignatures = [[v, r, s], ...]
        """
        rlp_serializer = self.__class__._feepayer_signed_transaction_serializer
        vrs = {"v":self.dictionary["v"],"r":self.dictionary["r"],"s":self.dictionary["s"]}
        transaction_without_signature_fields = dissoc(self.dictionary, "v", "r", "s", "type", "chainId")

        # when signing at first time
        transaction_with_signatures = transaction_without_signature_fields
        if 'feePayerSignatures' not in transaction_without_signature_fields or transaction_with_signatures['feePayerSignatures'][0]['v'] == 1:
            transaction_with_signatures = merge(transaction_without_signature_fields, {'feePayerSignatures':[]})
        
        transaction_with_signatures['feePayerSignatures'].append(vrs)
        transaction_with_signatures = pipe(
            transaction_with_signatures,
            apply_formatters_to_dict(KLAYTN_TYPED_TRANSACTION_FORMATTERS),
        )
        rlp_structured_dict = transaction_rpc_to_rlp_structure(transaction_with_signatures)
        payload = rlp.encode(
            rlp_serializer.from_dict(rlp_structured_dict)  # type: ignore
        )
        return cast(bytes, payload) 

    def encode(self) -> bytes:
        """
        Encodes this TypedTransaction and returns it as bytes.

        The transaction format follows EIP-2718's typed transaction
        format (TransactionType || TransactionPayload).
        Note that we delegate to a transaction type's payload() method as
        the EIP-2718 does not prescribe a TransactionPayload format,
        leaving types free to implement their own encoding.
        """
        return bytes([self.transaction_type]) + self.transaction.payload()

    def vrs(self) -> Tuple[int, int, int]:
        """Returns (v, r, s) if they exist."""
        if 'signatures' not in self.dictionary:
            raise ValueError("attempting to encode an unsigned transaction")
        if len(self.dictionary['signatures']) > 1:
            raise TypeError("attemping to only 1 vrs about multi-signed transaction. use klaytn_recover_transaction")
        signature = self.dictionary['signatures'][0]
        if not all(k in signature for k in "vrs"):
            raise ValueError("attempting to encode an unsigned transaction")
        return (signature["v"], signature["r"], signature["s"])

    def feepayer_vrs(self) -> Tuple[int, int, int]:
        """Returns (v, r, s) if they exist."""
        if 'signatures' not in self.dictionary:
            raise ValueError("attempting to encode an unsigned transaction")
        if len(self.dictionary['feePayerSignatures']) > 1:
            raise TypeError("attemping to only 1 vrs about multi-signed transaction. use klaytn_recover_transaction")
        signature = self.dictionary['feePayerSignatures'][0]
        if not all(k in signature for k in "vrs"):
            raise ValueError("attempting to encode an unsigned transaction")
        return (signature["v"], signature["r"], signature["s"])
