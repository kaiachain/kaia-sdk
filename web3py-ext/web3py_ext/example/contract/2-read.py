#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def contract_interaction():
    c = w3.eth.contract(
      address="0x95Be48607498109030592C08aDC9577c7C2dD505",
      abi = [{"inputs":[{"internalType":"uint256","name":"initNumber","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":False,"inputs":[{"indexed":False,"internalType":"uint256","name":"number","type":"uint256"}],"name":"SetNumber","type":"event"},{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNumber","type":"uint256"}],"name":"setNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    )
    # call view function
    print('\nnumber : ', c.functions.number().call())

contract_interaction()