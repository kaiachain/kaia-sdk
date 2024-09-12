from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

w3 = Web3(Web3.HTTPProvider(host))
net_response = w3.net.peer_count_by_type()

print(net_response)
