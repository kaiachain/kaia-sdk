from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

tx = {
    "from": "0x1d4e05bb72677cb8fa576149c945b57d13f855e4",
    "key": "0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"
}
passphrase = "gr8=B!0@uc$b"

w3 = Web3(Web3.HTTPProvider(host))
personal_response = w3.personal.send_account_update(tx, passphrase)

print(personal_response)
