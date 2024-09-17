from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockHash = "0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68"
transactionIndexPosition = "0x0"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_transaction_by_block_hash_and_index(blockHash, transactionIndexPosition)

print(eth_response)
