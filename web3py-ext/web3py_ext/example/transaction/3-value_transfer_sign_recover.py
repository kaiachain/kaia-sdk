#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.transaction.transaction import (
    empty_tx,
    fill_transaction,
    TxType
)
from web3py_ext.utils.klaytn_utils import to_pretty
from cytoolz import merge

# w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8551'))
w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def web3_value_transfer_sign_recover():
    user = Account.from_key('0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8')

    value_transfer_tx = empty_tx(TxType.VALUE_TRANSFER)
    value_transfer_tx = merge(value_transfer_tx, {
        'from' : user.address,
        'to' : user.address,
        'value' : Web3.to_peb(10, "klay"),
    })
    value_transfer_tx = fill_transaction(value_transfer_tx, w3)

    # sign the klaytn specific transaction type with web3py
    signed_tx = Account.sign_transaction(value_transfer_tx, user.key)
    print("\nraw transaction of signed tx:", signed_tx.rawTransaction.hex())

    recovered_tx = Account.recover_transaction(signed_tx.rawTransaction)
    print("\nrecovered sender address", recovered_tx)
    
    decoded_tx = Account.decode_transaction(signed_tx.rawTransaction)
    print("\ndecoded transaction:", to_pretty(decoded_tx))

    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt)

web3_value_transfer_sign_recover()