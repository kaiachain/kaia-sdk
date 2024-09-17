from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockTag = "0x1b4"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_header_by_number(blockTag)

print(eth_response)
