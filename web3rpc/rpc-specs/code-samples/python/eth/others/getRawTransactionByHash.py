from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

transactionHash = "0x5bbcde52084defa9d1c7068a811363cc27a25c80d7e495180964673aa5f47687"

w3 = Web3(Web3.HTTPProvider(host))
eth_response = w3.eth.get_transaction_by_hash(transactionHash)

print(eth_response)
