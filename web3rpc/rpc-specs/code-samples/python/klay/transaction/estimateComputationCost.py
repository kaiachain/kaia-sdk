from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

callObject = {
    "from": "0x73718c4980728857f3aa5148e9d1b471efa3a7dd",
    "to": "0x069942a3ca0dabf495dba872533134205764bc9c",
    "value": "0x0",
    "input": "0x2a31efc7000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000003039"
}
blockNumberOrHash = "latest"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.estimate_computation_cost(callObject, blockNumberOrHash)

print(klay_response)
