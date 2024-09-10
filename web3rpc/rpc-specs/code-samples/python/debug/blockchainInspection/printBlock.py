from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockNumber = "0x80"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.print_block(blockNumber)

print(debug_response)
