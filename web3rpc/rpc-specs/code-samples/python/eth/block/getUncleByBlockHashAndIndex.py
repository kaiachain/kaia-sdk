from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockHash = "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c"
uncleIndex = "0x1"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_uncle_by_block_hash_and_index(blockHash, uncleIndex)

print(eth_response)
