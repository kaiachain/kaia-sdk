from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

startBlockHash = "0xcc1ac1e244f9f83b812b5d77ada1c399f02ea7b61e72ff31789d9ef6dad45442"
endBlockHash = "0x437e92b2d30a0a828dfdd23b837a8ddf8c8b79c222e191d16c47afbf5a6aaed7"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.get_modified_accounts_by_hash(startBlockHash, endBlockHash)

print(debug_response)
