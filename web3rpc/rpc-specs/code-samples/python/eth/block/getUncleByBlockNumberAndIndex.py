from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockTag = "0xe8"
uncleIndex = "0x1"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_uncle_by_block_number_and_index(blockTag, uncleIndex)

print(eth_response)
