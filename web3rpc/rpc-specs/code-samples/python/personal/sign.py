from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
message = "0xdeadbeaf"
password = "helloWorld"

w3 = Web3(Web3.HTTPProvider(host))
personal_response = w3.personal.sign(message, address, password)

print(personal_response)
