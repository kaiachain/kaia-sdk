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

def web3_account_update_multisig():
    user1 = Account.from_key("0xa32c30608667d43be2d652bede413f12a649dd1be93440878e7f712d51a6768a")
    user2 = Account.from_key("0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8")
    user3 = Account.from_key("0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac")

    account_update_tx = empty_tx(TxType.ACCOUNT_UPDATE)
    account_update_tx = merge(account_update_tx, {
        'from' : user1.address, #0x82c6a8d94993d49cfd0c1d30f0f8caa65782cc7e
        'key' : {
            'type': KeyType.MULTISIG,
            'threshold': 2,
            'keys': [
                {
                    'weight':1,
                    'key': compressed_key(user1),
                },
                {
                    'weight':1,
                    'key': compressed_key(user2),
                },
                {
                    'weight':1,
                    'key': compressed_key(user3),
                },
            ]
        }
    })
    account_update_tx = fill_transaction(account_update_tx, w3)
    print(to_pretty(account_update_tx))

    # sign the klaytn specific transaction type with web3py
    signed_tx = Account.sign_transaction(account_update_tx, user1.key)
    signed_tx = Account.sign_transaction(signed_tx.rawTransaction, user2.key)
    signed_tx = Account.sign_transaction(signed_tx.rawTransaction, user3.key)
    print('\nrawTransaction:', bytes_to_hex_str(signed_tx.rawTransaction))

    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt) 

web3_account_update_multisig()
