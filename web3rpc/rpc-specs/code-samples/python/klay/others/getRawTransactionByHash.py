from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

transactionHash = "0x29b6cd965c7d9a53a6f068da259dce1d3810ba79fff8eebac5d4da14754e67e6"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_raw_transaction_by_hash(transactionHash)

print(klay_response)
