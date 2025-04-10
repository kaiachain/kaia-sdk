from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0x3111a0577f322e8fb54f78d9982a26ae7ca0f722"
blockTag = "latest"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_account_key(address, blockTag)

print(kaia_response)
