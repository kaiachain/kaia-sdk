from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

address = "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"
blockTag = "0x2"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_code(address, blockTag)

print(kaia_response)
