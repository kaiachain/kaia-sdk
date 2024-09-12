from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

blockHash = "0x90c81195698bc9f282bbdec386b0afb4dcc28e43aae834894281c3ecb3c88d21"
txIndex = 1
address = "0x73a7d19d14f7dfac5b799e405e22133b2adc57a6"
keyStart = "0x12"
maxResult = 1

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.storage_range_at(blockHash, txIndex, address, keyStart, maxResult)

print(debug_response)
