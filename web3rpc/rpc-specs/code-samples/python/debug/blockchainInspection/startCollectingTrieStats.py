from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0x0000000000000000000000000000000000000000"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.start_collecting_trie_stats(address)

print(debug_response)
