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

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def web3_chaindata_anchoring_sign_recover():
    user1 = Account.from_key('0x8b0164c3a59d2b1a00a9934f85ae77c14e21094132c34cc3daacd9e632c90807')

    chaindata_anchoring_tx = empty_tx(TxType.CHAIN_DATA_ANCHORING)
    chaindata_anchoring_tx = merge(chaindata_anchoring_tx, {
        'from' : user1.address,
        'data' : b'\x00',
    })
    chaindata_anchoring_tx = fill_transaction(chaindata_anchoring_tx, w3)

    # sign the klaytn specific transaction type with web3py
    signed_tx = Account.sign_transaction(chaindata_anchoring_tx, user1.key)
    print("\nraw transaction of signed tx:", signed_tx.rawTransaction.hex())
    
    recovered_tx = Account.recover_transaction(signed_tx.rawTransaction)
    print("\nrecovered sender address", recovered_tx)
    
    decoded_tx = Account.decode_transaction(signed_tx.rawTransaction)
    print("\ndecoded transaction:", to_pretty(decoded_tx))

web3_chaindata_anchoring_sign_recover()