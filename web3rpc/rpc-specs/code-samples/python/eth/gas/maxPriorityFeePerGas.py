from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.max_priority_fee_per_gas()

print(eth_response)
