from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

tx = {
    "from": "0x1d4e05bb72677cb8fa576149c945b57d13f855e4",
    "to": "0xafa3f8684e54059998bc3a7b0d2b0da075154d66",
    "value": "0x1230000000"
}
passphrase = "helloWorld"

w3 = Web3(Web3.HTTPProvider(host))
personal_response = w3.personal.send_value_transfer(tx, passphrase)

print(personal_response)
