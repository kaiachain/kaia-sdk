import json
from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

fileName = "mem.profile"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.write_mem_profile(fileName)

print(json.loads(debug_response.response.data))
