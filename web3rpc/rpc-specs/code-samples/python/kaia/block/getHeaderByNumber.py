from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockTag = "0x1b4"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_header_by_number(blockTag)

print(kaia_response)
