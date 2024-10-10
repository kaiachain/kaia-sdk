from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

sha3Hash = "0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.preimage(sha3Hash)

print(debug_response)
