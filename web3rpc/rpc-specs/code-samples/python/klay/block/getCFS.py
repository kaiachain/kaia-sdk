from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

w3 = Web3(Web3.HTTPProvider(host))

# klay_getCFS has no dedicated SDK wrapper; call it through the provider.
klay_response = w3.provider.make_request("klay_getCFS", ["latest"])

print(klay_response)
