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

def web3_account_update_role_based():
    # Just for testing, user1 and user2 have the same key
    tx_role = Account.from_key("0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac");
    update_role = Account.from_key("0x9ba8cb8f60044058a9e6f815c5c42d3a216f47044c61a1750b6d29ddc7f34bda");
    fee_payer_role = Account.from_key("0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8");

    account_update_tx = empty_tx(TxType.ACCOUNT_UPDATE)
    account_update_tx = merge(account_update_tx, {
        'from' : update_role.address, # 0x5bd2fb3c21564c023a4a735935a2b7a238c4ccea
        'key' : {
            'type': KeyType.ROLE_BASED,
            'keys' : {
                'roleTransactionKey': {
                    'type': KeyType.PUBLIC,
                    'key': compressed_key(tx_role) 
                },
                'roleAccountUpdateKey': {
                    'type': KeyType.PUBLIC,
                    'key': compressed_key(update_role) 
                },
                'roleFeePayerKey': {
                    'type': KeyType.PUBLIC,
                    'key': compressed_key(fee_payer_role) 
                }
            }
        }
    })
    account_update_tx = fill_transaction(account_update_tx, w3)
    print(to_pretty(account_update_tx))

    # sign the klaytn specific transaction type with web3py
    signed_tx = Account.sign_transaction(account_update_tx, update_role.key)
    print('\nrawTransaction:', bytes_to_hex_str(signed_tx.rawTransaction))

    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt) 

web3_account_update_role_based()