from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockTag = "0x27"
transactionIndex = "0x0"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_raw_transaction_by_block_number_and_index(blockTag, transactionIndex)

print(klay_response)
