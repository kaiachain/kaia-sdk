import json
from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

fileName = "block.profile"
seconds = 10

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.block_profile(fileName, seconds)

print(json.loads(debug_response.response.data))
