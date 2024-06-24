from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

filterOptions = {
    "fromBlock": "latest",
    "toBlock": "latest",
    "address": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b"
}

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_logs(filterOptions)

print(kaia_response)
