from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

quantity = "0xd32fd16b6906e67f6e2b65dcf48fc272"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.uninstall_filter(quantity)

print(klay_response)
