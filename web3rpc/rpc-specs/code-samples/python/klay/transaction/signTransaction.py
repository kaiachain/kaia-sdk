from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

transactionObject = {
    "from": "0x487f2dfef230c2120b8cc55c5087b103146536ec",
    "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
    "value": "0x1",
    "gas": "0x9999",
    "nonce": "0x1"
}

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.sign_transaction(transactionObject)

print(klay_response)
