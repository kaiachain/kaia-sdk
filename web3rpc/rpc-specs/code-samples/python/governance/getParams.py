from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockNumber = 89

w3 = Web3(Web3.HTTPProvider(host))
governance_response = w3.governance.get_params(blockNumber)

print(governance_response)
