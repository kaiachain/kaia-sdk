from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

transactionArgs = {
    "from": "0x51239f87c33e95e3bdb72e31d06b5306bcec81cc",
    "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
    "value": "0x1",
    "gas": "0x9999",
    "maxFeePerGas": "0xbb43b7400"
}

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.fill_transaction(transactionArgs)

print(eth_response)
