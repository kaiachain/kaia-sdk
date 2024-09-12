from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

limit = 5

w3 = Web3(Web3.HTTPProvider(host))
admin_response = w3.geth.admin.set_max_subscription_per_ws_conn(limit)

print(admin_response)
