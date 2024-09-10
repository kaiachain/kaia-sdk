from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

hashOfTransaction = "0x72cde80650c7c6745e4cf4c162e9ce1e5542f4d86112925faa6aa75f6a6142ec"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_decoded_anchoring_transaction_by_hash(hashOfTransaction)

print(klay_response)
