from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

signedTransactionData = "0xf86d03850ba43b7400829999948c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee87038d7ea4c68000808207f5a02c39a457ec76803901627392cbfb2107793bf4326e1f1100dc58d8a1216559bca07ce3a3517fce359c1fb6f5b1c1564dd9bb42d0d70a20ae9f4af95d46050ce55e"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.send_raw_transaction(signedTransactionData)

print(eth_response)
