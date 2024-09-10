from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

url = "keystore://"
passphrase = "helloWorld"

w3 = Web3(Web3.HTTPProvider(host))
personal_response = w3.personal.open_wallet(url, passphrase)

print(personal_response)
