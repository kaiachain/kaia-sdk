from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockNumber = 'latest'

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_bls_infos(blockNumber)

print(kaia_response)
