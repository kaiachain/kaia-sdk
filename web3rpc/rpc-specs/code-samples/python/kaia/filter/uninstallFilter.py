from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

quantity = "0xd32fd16b6906e67f6e2b65dcf48fc272"

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.uninstall_filter(quantity)

print(kaia_response)
