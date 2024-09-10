from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

fileName = "/tmp/chain.txt"

w3 = Web3(Web3.HTTPProvider(host))
admin_response = w3.geth.admin.import_chain(fileName)

print(admin_response)
