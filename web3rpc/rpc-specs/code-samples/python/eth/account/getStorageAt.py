from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0x295a70b2de5e3953354a6a8344e616ed314d7251"
quantity = "0x0"
blockTag = "latest"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_storage_at(address, quantity, blockTag)

print(eth_response)
