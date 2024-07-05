from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

baseFee = "0x64"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.gas_price_at(baseFee)

print(kaia_response)
