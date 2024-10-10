from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockTag = "0xd0054e"
transactionObject = False

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_block_by_number(blockTag, transactionObject)

print(eth_response)
