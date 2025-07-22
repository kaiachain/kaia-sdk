from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0x295a70b2de5e3953354a6a8344e616ed314d7251"
position = "0x0"
blockHash = "latest"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_storage_at(address, position, blockHash)

print(klay_response)
