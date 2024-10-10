from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
blockTag = "latest"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_transaction_count(address, blockTag)

print(klay_response)
