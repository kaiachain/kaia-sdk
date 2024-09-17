from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = ["0xfdeedbb2fe5b48d5b49e435ba00e0358740d0cf5"]

w3 = Web3(Web3.HTTPProvider(host))
admin_response = w3.geth.admin.set_spam_throttler_white_list(address)

print(admin_response)
