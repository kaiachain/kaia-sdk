from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.max_priority_fee_per_gas()

print(kaia_response)
