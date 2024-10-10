from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

filterId = "0xb"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.uninstall_filter(filterId)

print(eth_response)
