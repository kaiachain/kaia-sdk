from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

blockTag = 100

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_chain_config()

print(kaia_response)
