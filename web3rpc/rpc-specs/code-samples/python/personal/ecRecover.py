from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

message = "0xdead"
signature = "0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"

w3 = Web3(Web3.HTTPProvider(host))
personal_response = w3.personal.ec_recover(message, signature)

print(personal_response)
