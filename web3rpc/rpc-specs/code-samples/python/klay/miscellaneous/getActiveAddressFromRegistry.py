from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

name= 'kip14'
blockNumber = 'latest'

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_active_address_from_registry(name, blockNumber)

print(klay_response)
