#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.transaction.transaction import (
    fill_transaction,
    TxType
)

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))
user = Account.from_key('0x4a72b3d09c3d5e28e8652e0111f9c4ce252e8299aad95bb219a38eb0a3f4da49')

def contract_interaction_with_klaytn_type():
    c = w3.eth.contract(
      address="0x95Be48607498109030592C08aDC9577c7C2dD505",
      abi = [{"inputs":[{"internalType":"uint256","name":"initNumber","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":False,"inputs":[{"indexed":False,"internalType":"uint256","name":"number","type":"uint256"}],"name":"SetNumber","type":"event"},{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNumber","type":"uint256"}],"name":"setNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    )

    # view before write transaction
    print('\nnumber before: ', c.functions.number().call())
    
    # with smart contract execution type
    tx = c.functions.increment().build_transaction({
        "type":TxType.SMART_CONTRACT_EXECUTION,
        "from":user.address,
    })
    tx = fill_transaction(tx, w3)
    user_signed_tx = Account.sign_transaction(tx, user.key)
    tx_hash = w3.eth.send_raw_transaction(user_signed_tx.rawTransaction)
    print("receipt: ", w3.eth.wait_for_transaction_receipt(tx_hash))

    # view after write transaction
    print('\nnumber after: ', c.functions.number().call())

contract_interaction_with_klaytn_type()