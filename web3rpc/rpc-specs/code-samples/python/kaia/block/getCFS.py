from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

w3 = Web3(Web3.HTTPProvider(host))

# kaia_getCFS has no dedicated SDK wrapper; call it through the provider.
kaia_response = w3.provider.make_request("kaia_getCFS", ["latest"])

print(kaia_response)
