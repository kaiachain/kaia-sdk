from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockHash = "0xba647d41423faeebe8a7c64737d284fc2eba6f0388a3e1ebf6243db509ec1577"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_block_receipts(blockHash)

print(eth_response)
