from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

address = "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
blockTag = "latest"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.is_contract_account(address, blockTag)

print(kaia_response)
