from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

callObject = {
    "from": "0x51239f87c33e95e3bdb72e31d06b5306bcec81cc",
    "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
    "gas": "0x100000",
    "gasPrice": "0x5d21dba00",
    "value": "0x0",
    "input": "0x8ada066e"
}

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.estimate_gas(callObject)

print(eth_response)
