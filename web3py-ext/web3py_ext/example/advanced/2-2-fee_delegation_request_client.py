#-*- coding:utf-8 -*-
import socket
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

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
    client_socket.connect(('', 5555))

    user = Account.from_key('0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8')
    fee_delegated_value_transfer_tx = empty_tx(TxType.FEE_DELEGATED_VALUE_TRANSFER)
    fee_delegated_value_transfer_tx = merge(fee_delegated_value_transfer_tx, {
        'from' : user.address,
        'to' : user.address, # to self
        'value' : Web3.to_peb(0.1, 'klay'),
    })
    fee_delegated_value_transfer_tx = fill_transaction(fee_delegated_value_transfer_tx, w3)
    
    # sign the klaytn specific transaction type with web3py
    signed_tx = Account.sign_transaction(fee_delegated_value_transfer_tx, user.key)
    raw_tx = signed_tx.rawTransaction.hex()[2:] # trim 0x prefix

    print("\nsent raw tx to fee payer:", raw_tx)
    client_socket.send(raw_tx.encode())
    print("\ntx hash:", client_socket.recv(1024).decode())