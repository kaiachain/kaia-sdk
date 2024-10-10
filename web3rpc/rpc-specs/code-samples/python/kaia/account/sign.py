from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"
message = "0xdeadbeaf"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.sign(address, message)

print(kaia_response)
