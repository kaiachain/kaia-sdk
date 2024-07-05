from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

blockHash = "0x29b6cd965c7d9a53a6f068da259dce1d3810ba79fff8eebac5d4da14754e67e6"
index = "0x20965255"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_raw_transaction_by_block_hash_and_index(blockHash, index)

print(kaia_response)
