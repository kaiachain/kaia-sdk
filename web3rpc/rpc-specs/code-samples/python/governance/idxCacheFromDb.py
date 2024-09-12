from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

w3 = Web3(Web3.HTTPProvider(host))
governance_response = w3.governance.idx_cache_from_db()

print(governance_response)
