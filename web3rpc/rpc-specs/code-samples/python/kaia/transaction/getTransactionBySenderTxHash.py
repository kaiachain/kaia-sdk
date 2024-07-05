from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

transactionHash = "0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.get_transaction_by_sender_tx_hash(transactionHash)

print(kaia_response)
