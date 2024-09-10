from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

tx = {
    "from": "0x413ba0e5f6f00664598b5c80042b1308f4ff1408",
    "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
    "value": "0x1"
}
passphrase = "helloWorld"

w3 = Web3(Web3.HTTPProvider(host))
personal_response = w3.personal.send_transaction(tx, passphrase)

print(personal_response)
