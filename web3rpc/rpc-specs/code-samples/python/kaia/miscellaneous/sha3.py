from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

hashData = "0x11223344"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.sha3(hashData)

print(kaia_response)
