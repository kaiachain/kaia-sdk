#-*- coding:utf-8 -*-
from eth_account import Account
from web3 import Web3
from eth_account.messages import encode_defunct
from eth_utils.curried import to_hex
from web3py_ext import extend

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def web3_role_based_value_transfer_sign_recover():
    user = Account.from_key_pair(
        # role-based account address
        '0x5bd2fb3c21564c023a4a735935a2b7a238c4ccea',
        # transaction role key of role-based account
        '0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac'
    )
    message = to_hex(text="I♥KLAYTN")
    msghash = encode_defunct(hexstr=message)
    signature = Account.sign_message(msghash, user.key)

    recovered = w3.klay.recover_from_message(
        user.address, 
        message, signature.signature.hex(), 
        "latest"
    )
    # recovered is an original address of the member key
    print("\nsender", user.address, "\nrecovered", recovered)

web3_role_based_value_transfer_sign_recover()