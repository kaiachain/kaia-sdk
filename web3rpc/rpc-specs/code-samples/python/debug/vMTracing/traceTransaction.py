from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

txHash = "0x07f6057bc93aca52e53cdbfac9b9830f6a9cae2b3f48f0b47e4cb54959143d09"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.trace_transaction(txHash)

print(debug_response)
