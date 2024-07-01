from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

accountKey = {
    "keyType": 0,
    "key": {}
}

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.encode_account_key(accountKey)

print(kaia_response)
