from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

accountKey = {
    "keyType": 0,
    "key": {}
}

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.encode_account_key(accountKey)

print(klay_response)
