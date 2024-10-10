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

def web3_tx_sign_recover_multisig():
    user1 = Account.from_key_pair(
        '0x82c6a8d94993d49cfd0c1d30f0f8caa65782cc7e',
        '0xa32c30608667d43be2d652bede413f12a649dd1be93440878e7f712d51a6768a'
    )
    user2 = Account.from_key_pair(
        '0x82c6a8d94993d49cfd0c1d30f0f8caa65782cc7e',
        '0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8'
    )
    user3 = Account.from_key_pair(
        '0x82c6a8d94993d49cfd0c1d30f0f8caa65782cc7e',
        '0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac'
    )

    value_transfer_tx = empty_tx(TxType.VALUE_TRANSFER)
    value_transfer_tx = merge(value_transfer_tx, {
        'from' : user1.address,
        'to' : user1.address,
        'value' : Web3.to_peb(10, "klay"),
    })
    value_transfer_tx = fill_transaction(value_transfer_tx, w3)
    signed_tx = Account.sign_transaction(value_transfer_tx, user1.key)
    signed_tx = Account.sign_transaction(signed_tx.rawTransaction, user2.key)
    signed_tx = Account.sign_transaction(signed_tx.rawTransaction, user3.key)

    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt)
    
    recovered = w3.klay.recover_from_transaction(signed_tx.rawTransaction.hex(), "latest")
    print("\nsender", user1.address, "\nrecovered", recovered)

web3_tx_sign_recover_multisig()