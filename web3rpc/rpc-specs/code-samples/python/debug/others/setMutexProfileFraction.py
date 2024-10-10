from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

rate = 2

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.set_mutex_profile_fraction(rate)

print(debug_response)
