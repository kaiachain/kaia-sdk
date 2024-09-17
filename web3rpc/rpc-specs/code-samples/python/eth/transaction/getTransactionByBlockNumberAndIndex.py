from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockTag = "0x27"
transactionIndex = "0x0"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_transaction_by_block_number_and_index(blockTag, transactionIndex)

print(eth_response)
