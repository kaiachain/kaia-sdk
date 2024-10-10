from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

quantity = "0x11b5f0ef802c98569efa8459cf063ed5"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_filter_logs(quantity)

print(eth_response)
