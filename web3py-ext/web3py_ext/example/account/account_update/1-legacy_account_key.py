#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.klaytn_account.utils import compressed_key
from web3py_ext.klaytn_account.account_key import KeyType
from web3py_ext.transaction.transaction import (
    empty_tx,
    fill_transaction,
    TxType
)
from web3py_ext.utils.klaytn_utils import (
    to_pretty,
    bytes_to_hex_str
)
from cytoolz import merge

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def web3_account_update_legacy():
    # user = Account.from_key('0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8')
    user = Account.from_key('0x4a72b3d09c3d5e28e8652e0111f9c4ce252e8299aad95bb219a38eb0a3f4da49')

    account_update_tx = empty_tx(TxType.ACCOUNT_UPDATE)
    account_update_tx = merge(account_update_tx, {
        'from' : user.address,
        'key' : {
            'type': KeyType.LEGACY,
            'key': {},
        }
    })
    account_update_tx = fill_transaction(account_update_tx, w3)
    print(to_pretty(account_update_tx))

    # sign the klaytn specific transaction type with web3py
    signed_tx = Account.sign_transaction(account_update_tx, user.key)
    print('\nrawTransaction:', bytes_to_hex_str(signed_tx.rawTransaction))

    # temddp test
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt) 

web3_account_update_legacy()