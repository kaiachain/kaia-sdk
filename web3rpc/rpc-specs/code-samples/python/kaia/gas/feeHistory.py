from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

blockCount = "0x10"
lastBlock = "latest"
rewardPercentiles = [0.1, 0.2, 0.3]

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.fee_history(blockCount, lastBlock, rewardPercentiles)

print(kaia_response)
