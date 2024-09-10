from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockHash = "0xed110b330152df2022d40fa3c38987643034aa56fc96079fb6c67b66a6ed4f19"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.trace_block_by_hash(blockHash)

print(debug_response)
