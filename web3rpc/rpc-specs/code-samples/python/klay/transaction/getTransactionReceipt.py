from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

transactionHash = "0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_transaction_receipt(transactionHash)

print(klay_response)
