from typing import (
    Any,
    Callable,
    Dict,
    List,
    Union,
)
from cytoolz import (
    pipe,
)
from eth_typing import HexStr
from hexbytes import (
    HexBytes,
)
from .basic.value_transfer_transaction import ValueTransferTransaction
from .basic.value_transfer_with_memo_transaction import ValueTransferWithMemoTransaction
from .basic.smart_contract_deploy_transaction import SmartContractDeployTransaction
from .basic.smart_contract_execution_transaction import SmartContractExecutionTransaction
from .basic.account_update_transaction import AccountUpdateTransaction
from .basic.cancel_transaction import CancelTransaction
from .basic.chaindata_anchoring_transaction import ChaindataAnchoringTransaction
from .fee_delegation.fee_delegated_value_transfer_transaction import FeeDelegatedValueTransferTransaction
from .fee_delegation.fee_delegated_value_transfer_with_memo_transaction import FeeDelegatedValueTransferWithMemoTransaction
from .fee_delegation.fee_delegated_smart_contract_deploy_transaction import FeeDelegatedSmartContractDeployTransaction
from .fee_delegation.fee_delegated_smart_contract_execution_transaction import FeeDelegatedSmartContractExecutionTransaction
from .fee_delegation.fee_delegated_account_update_transaction import FeeDelegatedAccountUpdateTransaction
from .fee_delegation.fee_delegated_cancel_transaction import FeeDelegatedCancelTransaction
from .fee_delegation.fee_delegated_chaindata_anchoring_transaction import FeeDelegatedChaindataAnchoringTransaction
from eth_account._utils.typed_transactions import (
    TypedTransaction,
    AccessListTransaction,
    DynamicFeeTransaction,
    BlobTransaction,
)
from eth_utils.curried import (
    hexstr_if_str,
    to_int,
    is_hexstr
)
from eth_account._utils.transaction_utils import (
    set_transaction_type_if_needed,
)
from eth_account._utils.validation import (
    is_int_or_prefixed_hexstr,
)
from web3.method import (
    Method,
    default_root_munger,
)
from web3.types import (
    RPCEndpoint,
)
from web3py_ext.transaction.transaction import (
    KLAYTN_TYPED_TRANSACTION_GROUP,
)

# Klaytn wrapped typed transaction
"""
Represents a Typed Transaction as per EIP-2718.
The currently supported Transaction Types are:
    * Klaytn Extended LegacyTransactionTransaction
    * Klaytn Extended ValueTransferTransaction
    * Klaytn Extended FeeDelegatedValueTransferTransaction
    * Klaytn Extended FeeDelegatedValueTransferWithRatioTransaction
    * Klaytn Extended FeeDelegatedValueTransferMemoWithRatioTransaction
    * Klaytn Extended AccountUpdateTransaction
    * Klaytn Extended FeeDelegatedAccountUpdateTransaction
    * Klaytn Extended FeeDelegatedAccountUpdateWithRatioTransaction
    * Klaytn Extended SmartContractDeployTransaction
    * Klaytn Extended FeeDelegatedSmartContractDeployTransaction
    * Klaytn Extended FeeDelegatedSmartContractDeployWithRatioTransaction
    * Klaytn Extended SmartContractExecutionTransaction
    * Klaytn Extended FeeDelegatedSmartContractExecutionTransaction
    * Klaytn Extended FeeDelegatedSmartContractExecutionWithRatioTransaction
    * Klaytn Extended CancelTransaction
    * Klaytn Extended FeeDelegatedCancelTransaction
    * Klaytn Extended FeeDelegatedCancelWithRatioTransaction
    * Klaytn Extended ChainDataAnchoringTransaction
    * Klaytn Extended FeeDelegatedChainDataAnchoringTransaction
    * Klaytn Extended FeeDelegatedChainDataAnchoringWithRatioTransaction
    * Klaytn Extended EthereumAccessListTransaction
    * Klaytn Extended EthereumDynamicFeeTransaction
    
    * EIP-2930's AccessListTransaction : is translated as Klaytn Extended EIP-2930
    * EIP-1559's DynamicFeeTransaction : is translated as Klaytn Extended EIP-1559
"""
def from_dict(cls, dictionary: Dict[str, Any], blobs: List[bytes] = None) -> "TypedTransaction":
    """
    Builds a TypedTransaction from a dictionary.
    Verifies the dictionary is well formed.
    """
    dictionary = set_transaction_type_if_needed(dictionary)
    if not ("type" in dictionary and is_int_or_prefixed_hexstr(dictionary["type"])):
        raise ValueError("missing or incorrect transaction type")
    # Switch on the transaction type to choose the correct constructor.
    transaction_type = pipe(dictionary["type"], hexstr_if_str(to_int))
    transaction: Any
    if transaction_type == AccessListTransaction.transaction_type:
        transaction = AccessListTransaction
    elif transaction_type == DynamicFeeTransaction.transaction_type:
        transaction = DynamicFeeTransaction
    elif transaction_type == BlobTransaction.transaction_type:
        transaction = BlobTransaction
    elif transaction_type == ValueTransferTransaction.transaction_type:
        transaction = ValueTransferTransaction
    elif transaction_type == ValueTransferWithMemoTransaction.transaction_type:
        transaction = ValueTransferWithMemoTransaction
    elif transaction_type == SmartContractDeployTransaction.transaction_type:
        transaction = SmartContractDeployTransaction
    elif transaction_type == SmartContractExecutionTransaction.transaction_type:
        transaction = SmartContractExecutionTransaction
    elif transaction_type == AccountUpdateTransaction.transaction_type:
        transaction = AccountUpdateTransaction
    elif transaction_type == CancelTransaction.transaction_type:
        transaction = CancelTransaction
    elif transaction_type == ChaindataAnchoringTransaction.transaction_type:
        transaction = ChaindataAnchoringTransaction
    elif transaction_type == FeeDelegatedValueTransferTransaction.transaction_type:
        transaction = FeeDelegatedValueTransferTransaction
    elif transaction_type == FeeDelegatedValueTransferWithMemoTransaction.transaction_type:
        transaction = FeeDelegatedValueTransferWithMemoTransaction
    elif transaction_type == FeeDelegatedSmartContractDeployTransaction.transaction_type:
        transaction = FeeDelegatedSmartContractDeployTransaction
    elif transaction_type == FeeDelegatedSmartContractExecutionTransaction.transaction_type:
        transaction = FeeDelegatedSmartContractExecutionTransaction
    elif transaction_type == FeeDelegatedAccountUpdateTransaction.transaction_type:
        transaction = FeeDelegatedAccountUpdateTransaction
    elif transaction_type == FeeDelegatedCancelTransaction.transaction_type:
        transaction = FeeDelegatedCancelTransaction
    elif transaction_type == FeeDelegatedChaindataAnchoringTransaction.transaction_type:
        transaction = FeeDelegatedChaindataAnchoringTransaction
    
    else:
        raise TypeError("Unknown Transaction type: %s" % transaction_type)
    return cls(
        transaction_type=transaction_type,
        transaction=transaction.from_dict(dictionary),
    )

def from_bytes(cls, encoded_transaction: HexBytes) -> "TypedTransaction":
    """Builds a TypedTransaction from a signed encoded transaction."""
    if not isinstance(encoded_transaction, HexBytes):
        raise TypeError("expected Hexbytes, got %s" % type(encoded_transaction))
    if not (len(encoded_transaction) > 0 and encoded_transaction[0] <= 0x7F):
        raise ValueError("unexpected input")
    transaction: Union["DynamicFeeTransaction", "AccessListTransaction"]
    if encoded_transaction[0] == AccessListTransaction.transaction_type:
        transaction_type = AccessListTransaction.transaction_type
        transaction = AccessListTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == DynamicFeeTransaction.transaction_type:
        transaction_type = DynamicFeeTransaction.transaction_type
        transaction = DynamicFeeTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == BlobTransaction.transaction_type:
        transaction_type = BlobTransaction.transaction_type
        transaction = BlobTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == ValueTransferTransaction.transaction_type:
        transaction_type = ValueTransferTransaction.transaction_type
        transaction = ValueTransferTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == ValueTransferWithMemoTransaction.transaction_type:
        transaction_type = ValueTransferWithMemoTransaction.transaction_type
        transaction = ValueTransferWithMemoTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == SmartContractDeployTransaction.transaction_type:
        transaction_type = SmartContractDeployTransaction.transaction_type
        transaction = SmartContractDeployTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == SmartContractExecutionTransaction.transaction_type:
        transaction_type = SmartContractExecutionTransaction.transaction_type
        transaction = SmartContractExecutionTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == AccountUpdateTransaction.transaction_type:
        transaction_type = AccountUpdateTransaction.transaction_type
        transaction = AccountUpdateTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == CancelTransaction.transaction_type:
        transaction_type = CancelTransaction.transaction_type
        transaction = CancelTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == ChaindataAnchoringTransaction.transaction_type:
        transaction_type = ChaindataAnchoringTransaction.transaction_type
        transaction = ChaindataAnchoringTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == FeeDelegatedValueTransferTransaction.transaction_type:
        transaction_type = FeeDelegatedValueTransferTransaction.transaction_type
        transaction = FeeDelegatedValueTransferTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == FeeDelegatedValueTransferWithMemoTransaction.transaction_type:
        transaction_type = FeeDelegatedValueTransferWithMemoTransaction.transaction_type
        transaction = FeeDelegatedValueTransferWithMemoTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == FeeDelegatedSmartContractDeployTransaction.transaction_type:
        transaction_type = FeeDelegatedSmartContractDeployTransaction.transaction_type
        transaction = FeeDelegatedSmartContractDeployTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == FeeDelegatedSmartContractExecutionTransaction.transaction_type:
        transaction_type = FeeDelegatedSmartContractExecutionTransaction.transaction_type
        transaction = FeeDelegatedSmartContractExecutionTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == FeeDelegatedAccountUpdateTransaction.transaction_type:
        transaction_type = FeeDelegatedAccountUpdateTransaction.transaction_type
        transaction = FeeDelegatedAccountUpdateTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == FeeDelegatedCancelTransaction.transaction_type:
        transaction_type = FeeDelegatedCancelTransaction.transaction_type
        transaction = FeeDelegatedCancelTransaction.from_bytes(encoded_transaction)
    elif encoded_transaction[0] == FeeDelegatedChaindataAnchoringTransaction.transaction_type:
        transaction_type = FeeDelegatedChaindataAnchoringTransaction.transaction_type
        transaction = FeeDelegatedChaindataAnchoringTransaction.from_bytes(encoded_transaction)
    else:
        # The only known transaction types should be explicit if/elif branches.
        raise TypeError(
            "typed transaction has unknown type: %s" % encoded_transaction[0]
        )
    return cls(
        transaction_type=transaction_type,
        transaction=transaction,
    )

def method_choice_depends_on_transaction_type(value):
    tx_type = value[0]
    # if tx_type is hex string, then convert it to int.
    if is_hexstr(tx_type):
        tx_type = int(tx_type, 16)
    if 0 <= tx_type and tx_type <= 0x7f and tx_type in KLAYTN_TYPED_TRANSACTION_GROUP:
        return RPCEndpoint("klay_sendRawTransaction")
    return RPCEndpoint("eth_sendRawTransaction")

_klay_send_raw_transaction: Method[Callable[[Union[HexStr, bytes]], HexBytes]] = Method(
    RPCEndpoint("eth_sendRawTransaction"),
    mungers=[default_root_munger],
    method_choice_depends_on_args=method_choice_depends_on_transaction_type,
)

# def klay_send_raw_transaction(self, transaction: Union[HexStr, bytes]) -> HexBytes:
    # return self._klay_send_raw_transaction(transaction)