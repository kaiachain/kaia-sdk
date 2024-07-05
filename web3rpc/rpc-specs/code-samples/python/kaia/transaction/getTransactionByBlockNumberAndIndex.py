from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

blockTag = "0x27"
transactionIndex = "0x0"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_transaction_by_block_number_and_index(blockTag, transactionIndex)

print(kaia_response)
