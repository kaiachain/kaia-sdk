from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

fileName = "/tmp/chain.txt"
startBlock = 1
endBlock = 1000

w3 = Web3(Web3.HTTPProvider(host))
admin_response = w3.geth.admin.export_chain(fileName, startBlock, endBlock)

print(admin_response)
