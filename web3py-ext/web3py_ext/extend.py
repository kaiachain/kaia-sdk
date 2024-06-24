import decimal
import types
from eth_account import Account
from eth_account._utils.typed_transactions import (
    TypedTransaction,
)
from web3py_ext.transaction.wrapper_typed_transaction import (
    from_dict,
    from_bytes,
    _klay_send_raw_transaction,
)
from web3py_ext.klaytn_account.instrumented_local_account import (
    AbstractLocalAccount,
    klaytn_extended_sign_transaction,
    klaytn_extended_sign_transaction_as_feepayer,
    klaytn_extended_recover_transaction_as_feepayer,
    klaytn_extended_recover_transaction,
    klaytn_extended_decode_transaction,
    klaytn_v4_support_decrypt,
)
from web3.eth.eth import Eth
from web3._utils.method_formatters import ABI_REQUEST_FORMATTERS
from web3py_ext.transaction.extended_transaction_utils import (
    from_peb,
    to_peb,
)
from web3.main import BaseWeb3
from eth_utils import units

def from_key_pair(self, address, key):
    key = self._parsePrivateKey(key)
    return AbstractLocalAccount(address, key, self)

# account
Account.from_key_pair = types.MethodType(from_key_pair, Account)
Account.sign_transaction = types.MethodType(klaytn_extended_sign_transaction, Account)
Account.sign_transaction_as_feepayer = types.MethodType(klaytn_extended_sign_transaction_as_feepayer, Account)
Account.recover_transaction_as_feepayer = types.MethodType(klaytn_extended_recover_transaction_as_feepayer, Account)
Account.klaytn_recover_transaction = types.MethodType(klaytn_extended_recover_transaction, Account)
Account.decode_transaction = types.MethodType(klaytn_extended_decode_transaction, Account)
Account.v4_decrypt = types.MethodType(klaytn_v4_support_decrypt, Account)

# transaction
TypedTransaction.from_dict = types.MethodType(from_dict, TypedTransaction)
TypedTransaction.from_bytes = types.MethodType(from_bytes, TypedTransaction)
Eth._send_raw_transaction = _klay_send_raw_transaction
ABI_REQUEST_FORMATTERS['klay_sendRawTransaction'] = ABI_REQUEST_FORMATTERS['eth_sendRawTransaction']

# klay units
units.units['peb'] = decimal.Decimal('1')
units.units['kpeb'] = decimal.Decimal('1000')
units.units['mpeb'] = decimal.Decimal('1000000')
units.units['gpeb'] = decimal.Decimal('1000000000')
units.units['ston'] = decimal.Decimal('1000000000')
units.units['uklay'] = decimal.Decimal('1000000000000')
units.units['mklay'] = decimal.Decimal('1000000000000000')
units.units['klay'] = decimal.Decimal('1000000000000000000')
units.units['kklay'] = decimal.Decimal('1000000000000000000000')
units.units['mklay'] = decimal.Decimal('1000000000000000000000000')
units.units['gklay'] = decimal.Decimal('1000000000000000000000000000')
units.units['tklay'] = decimal.Decimal('1000000000000000000000000000000')
BaseWeb3.to_peb = types.MethodType(to_peb, BaseWeb3)
BaseWeb3.from_peb = types.MethodType(from_peb, BaseWeb3)

# APIs
from web3.eth.eth import Eth
from web3.eth.async_eth import AsyncEth
from web3.geth import Geth, GethAdmin, GethMiner, GethPersonal, GethTxPool
from web3.geth import AsyncGeth, AsyncGethTxPool
from web3.net import Net
from web3.testing import Testing
from web3.tracing import Tracing
from web3.module import Module
from web3py_ext.web3rpc.klay_api import KlayApi, AsyncKlayApi
from web3py_ext.web3rpc.net_api import NetApi, AsyncNetApi
from web3py_ext.web3rpc.admin_api import AdminApi, AsyncAdminApi
from web3py_ext.web3rpc.debug_api import DebugApi, AsyncDebugApi
from web3py_ext.web3rpc.governance_api import GovernanceApi, AsyncGovernanceApi
from web3py_ext.web3rpc.personal_api import PersonalApi, AsyncPersonalApi
from web3py_ext.web3rpc.txpool_api import TxpoolApi
import web3
def extended_get_default_modules():
    return {
        "eth": Eth,
        "net": NetApi,
        "geth": (
            Geth,
            {
                "admin": AdminApi,
                "miner": GethMiner,
                "personal": PersonalApi,
                "txpool": GethTxPool,
            },
        ),
        "tracing": Tracing,
        "testing": Testing,
        "klay": KlayApi,
        "kaia": KlayApi,
        "governance": GovernanceApi,
        "debug": DebugApi,
    }
def extended_get_async_default_modules():
    return {
        "eth": AsyncEth,
        "net": AsyncNetApi,
        "geth": (
            AsyncGeth,
            {
                "admin": AsyncAdminApi,
                "personal": AsyncPersonalApi,
                "txpool": AsyncGethTxPool,
            },
        ),
        "klay": AsyncKlayApi,
        "kaia": AsyncKlayApi,
        "governance": AsyncGovernanceApi,
        "debug": AsyncDebugApi,
    }

web3.main.get_default_modules = extended_get_default_modules
web3.main.get_async_default_modules = extended_get_async_default_modules