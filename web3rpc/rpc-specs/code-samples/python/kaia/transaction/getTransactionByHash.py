from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

transactionHash = "0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_transaction_by_hash(transactionHash)

print(kaia_response)
