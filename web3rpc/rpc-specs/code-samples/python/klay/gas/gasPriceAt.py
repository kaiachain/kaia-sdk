from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

baseFee = "0x64"

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.gas_price_at(baseFee)

print(klay_response)
