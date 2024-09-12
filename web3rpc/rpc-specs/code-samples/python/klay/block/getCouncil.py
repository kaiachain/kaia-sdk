from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockTag = "0x1b4"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_council(blockTag)

print(klay_response)
