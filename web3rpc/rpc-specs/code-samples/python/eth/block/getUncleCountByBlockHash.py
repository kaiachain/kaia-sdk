from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockHash = "0xc9dbfbab67e9a0508bcb3f95ae408023668cef431b805592781a821926715b8a"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_uncle_count_by_block_hash(blockHash)

print(eth_response)
