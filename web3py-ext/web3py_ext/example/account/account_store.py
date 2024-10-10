#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3py_ext.klaytn_account.account_store import AccountStore
from eth_account import Account
from web3py_ext.utils.klaytn_utils import to_pretty
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

acc_list = [
    Account.from_key('0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8'),
    Account.from_key('0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4'),
    Account.from_key('0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac'),
    Account.from_key_pair(
        '0xe15cd70a41dfb05e7214004d7d054801b2a2f06b',
        '0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8'
    ),
    Account.from_key_pair(
        '0x82c6a8d94993d49cfd0c1d30f0f8caa65782cc7e',
        '0xa32c30608667d43be2d652bede413f12a649dd1be93440878e7f712d51a6768a'
    ),
    Account.from_key_pair(
        '0x5bd2fb3c21564c023a4a735935a2b7a238c4ccea',
        '0x9ba8cb8f60044058a9e6f815c5c42d3a216f47044c61a1750b6d29ddc7f34bda'
    ),
]

def account_store_test():
    for acc in acc_list:
        print(acc.address, acc.key.hex())
    a = AccountStore()
    a.refresh(w3, acc_list)
    print(to_pretty(a.get_account_infos()))

account_store_test()