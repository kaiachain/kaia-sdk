from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

transactionHash = "0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.get_transaction_by_sender_tx_hash(transactionHash)

print(klay_response)
