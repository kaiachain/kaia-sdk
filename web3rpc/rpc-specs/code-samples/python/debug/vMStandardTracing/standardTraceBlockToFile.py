from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockHash = "0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.standard_trace_block_to_file(blockHash)

print(debug_response)
