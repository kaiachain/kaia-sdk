from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

callObject = {
    "from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085",
    "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
    "gas": "0x100000",
    "gasPrice": "0x5d21dba00",
    "value": "0x0",
    "input": "0x8ada066e"
}
blockTag = "latest"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.call(callObject, blockTag)

print(kaia_response)
