#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.transaction.transaction import (
    empty_tx,
    fill_transaction,
    TxType
)
from cytoolz import merge

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def web3_tx_sign_recover_role_based():
    txRoleUser = Account.from_key_pair(
        '0x5bd2fb3c21564c023a4a735935a2b7a238c4ccea',
        '0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac'
    )
    value_transfer_tx = empty_tx(TxType.VALUE_TRANSFER)
    value_transfer_tx = merge(value_transfer_tx, {
        'from' : txRoleUser.address,
        'to' : txRoleUser.address,
        'value' : Web3.to_peb(10, "klay"),
    })
    value_transfer_tx = fill_transaction(value_transfer_tx, w3)
    signed_tx = Account.sign_transaction(value_transfer_tx, txRoleUser.key)

    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt)
    
    recovered = w3.klay.recover_from_transaction(signed_tx.rawTransaction.hex(), "latest")
    print("\nsender", txRoleUser.address, "\nrecovered", recovered)

web3_tx_sign_recover_role_based()