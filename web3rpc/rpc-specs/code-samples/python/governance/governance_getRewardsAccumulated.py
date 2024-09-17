from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

firstBlock = 123400489
lastBlock = 123416489

w3 = Web3(Web3.HTTPProvider(host))
governance_response = w3.governance.governance_get_rewards_accumulated(firstBlock, lastBlock)

print(governance_response)
