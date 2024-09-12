from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

quantity = "0x63000c8f11e790cb4c93b0659319a159"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_filter_changes(quantity)

print(klay_response)
