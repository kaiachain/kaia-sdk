from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockCount = "0x10"
lastBlock = "latest"
rewardPercentiles = [0.1, 0.2, 0.3]

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.fee_history(blockCount, lastBlock, rewardPercentiles)

print(eth_response)
