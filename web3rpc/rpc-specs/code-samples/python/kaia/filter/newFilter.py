from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

filterOptions = {
    "fromBlock": "earliest",
    "toBlock": "latest",
    "address": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
    "topics": ["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]
}

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.new_filter(filterOptions)

print(kaia_response)
