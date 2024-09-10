from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

nonce = "0x0000000000000001"
powHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
mixDigest = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.submit_work(nonce, powHash, mixDigest)

print(eth_response)
