from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

address = "0x295a70b2de5e3953354a6a8344e616ed314d7251"
position = "0x0"
blockHash = "latest"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_storage_at(address, position, blockHash)

print(kaia_response)
