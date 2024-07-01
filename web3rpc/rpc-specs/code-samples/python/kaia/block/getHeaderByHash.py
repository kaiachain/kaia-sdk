from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

blockHash = "0xba647d41423faeebe8a7c64737d284fc2eba6f0388a3e1ebf6243db509ec1577"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_header_by_hash(blockHash)

print(kaia_response)
