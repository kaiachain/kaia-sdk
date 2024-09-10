from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

w3 = Web3(Web3.HTTPProvider(host))
admin_response = w3.geth.admin.save_trie_node_cache_to_disk()

print(admin_response)
