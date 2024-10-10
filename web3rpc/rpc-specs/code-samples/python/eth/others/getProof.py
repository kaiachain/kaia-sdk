from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

account = "0xe5cB067E90D5Cd1F8052B83562Ae670bA4A211a8"
keys = ["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"]
blockNumber = "latest"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_proof(account, keys, blockNumber)

print(eth_response)
