from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"
blockTag = "0x2"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_code(address, blockTag)

print(klay_response)
