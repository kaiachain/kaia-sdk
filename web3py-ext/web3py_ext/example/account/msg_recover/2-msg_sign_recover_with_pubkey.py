#-*- coding:utf-8 -*-
from eth_account import Account
from web3 import Web3
from eth_account.messages import encode_defunct
from eth_utils.curried import to_hex
from web3py_ext import extend

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def web3_public_value_transfer_sign_recover():
    user = Account.from_key_pair(
        '0xe15cd70a41dfb05e7214004d7d054801b2a2f06b',
        '0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8'
    )
    message = to_hex(text="I♥KLAYTN")
    msghash = encode_defunct(hexstr=message)
    signature = Account.sign_message(msghash, user.key)

    recovered = w3.klay.recover_from_message(
        user.address, 
        message, signature.signature.hex(), 
        "latest"
    )
    # recovered is an original address of the public key
    print("\nsender", user.address, "\nrecovered", recovered)

web3_public_value_transfer_sign_recover()