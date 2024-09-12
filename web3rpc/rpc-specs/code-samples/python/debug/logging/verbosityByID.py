from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

verId = 1
level = 3

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.verbosity_by_id(verId, level)

print(debug_response)
