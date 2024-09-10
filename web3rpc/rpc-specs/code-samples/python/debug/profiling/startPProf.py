import json
from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "localhost"
port = 6060

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.start_p_prof(address, port)

print(json.loads(debug_response.response.data))
