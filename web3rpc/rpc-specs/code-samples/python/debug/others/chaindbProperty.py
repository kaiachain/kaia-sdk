from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

string = "0xe17d821e9a8a8736b9aea8c2de1f3a4934ac0a2f"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.chaindb_property(string)

print(debug_response)
