from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockNumber = "latest"

w3 = Web3(Web3.HTTPProvider(host))
governance_response = w3.governance.get_staking_info(blockNumber)

print(governance_response)
