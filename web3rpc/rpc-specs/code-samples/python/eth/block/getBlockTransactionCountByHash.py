from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockHash = "0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_block_transaction_count_by_hash(blockHash)

print(eth_response)
