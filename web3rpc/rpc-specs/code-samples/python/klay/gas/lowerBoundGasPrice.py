from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.lower_bound_gas_price()

print(klay_response)
