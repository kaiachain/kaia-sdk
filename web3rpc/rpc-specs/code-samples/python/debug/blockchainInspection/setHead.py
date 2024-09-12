from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

number = "0x100"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.set_head(number)

print(debug_response)
