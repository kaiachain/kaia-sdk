from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"
url = "kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"
w3 = Web3(Web3.HTTPProvider(host))
admin_response = w3.geth.admin.add_peer(url)
print(admin_response)
