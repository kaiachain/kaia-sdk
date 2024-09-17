#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.transaction.transaction import (
    fill_transaction,
)
from web3py_ext.utils.klaytn_utils import to_pretty

w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8551'))
# w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def eth_access_list_sign_recover():
    user1 = Account.from_key('0x8b0164c3a59d2b1a00a9934f85ae77c14e21094132c34cc3daacd9e632c90807')
    tx = {
        'from': user1.address,
        'to': '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
        'value': 1000000000,
        'type': '0x2',
        'accessList': (  # accessList is optional for dynamic fee transactions
            {
                'address': '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
                'storageKeys': (
                    '0x0000000000000000000000000000000000000000000000000000000000000003',
                    '0x0000000000000000000000000000000000000000000000000000000000000007',
                )
            },
            {
                'address': '0xbb9bc244d798123fde783fcc1c72d3bb8c189413',
                'storageKeys': ()
            },
        )
    }
    tx = fill_transaction(tx, w3)
    print(to_pretty(tx))
    signed_tx = Account.sign_transaction(tx, user1.key)
    print(signed_tx.rawTransaction.hex())
    recovered_tx = Account.recover_transaction(signed_tx.rawTransaction)
    print("\nrecovered sender address", recovered_tx)
    decoded_tx = Account.decode_transaction(signed_tx.rawTransaction)
    print("\ndecoded transaction:", to_pretty(decoded_tx))

eth_access_list_sign_recover()