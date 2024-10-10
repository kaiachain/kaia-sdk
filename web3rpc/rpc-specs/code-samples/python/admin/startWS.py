from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

adminHost = "127.0.0.1"
port = 8552
cors = ""
apis = "klay"

w3 = Web3(Web3.HTTPProvider(host))
admin_response = w3.geth.admin.start_ws(adminHost, port, cors, apis)

print(admin_response)
