from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = "0x4Cd39B49064a31E966cA0ddF4111aCe2eD7E9502"

w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.start_contract_warm_up(address)

print(debug_response)
