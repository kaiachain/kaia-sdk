from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.is_sender_tx_hash_indexing_enabled()

print(kaia_response)
