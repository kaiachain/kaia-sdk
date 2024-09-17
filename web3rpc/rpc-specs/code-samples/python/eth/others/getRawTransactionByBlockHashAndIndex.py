from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockHash = "0x4c4cbf242a80183d2ea2daf047c578d5fc89c0b14c4262606c8b6bb0b36715be"
index = "0x0"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_raw_transaction_by_block_hash_and_index(blockHash, index)

print(eth_response)
