from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

location = "server.go:443"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.backtrace_at(location)

print(debug_response)
