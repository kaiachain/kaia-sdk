from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0x73a7d19d14f7dfac5b799e405e22133b2adc57a6"
startBlockNum = 100
endBlockNum = 200

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.get_modified_storage_nodes_by_number(address, startBlockNum, endBlockNum)

print(debug_response)
