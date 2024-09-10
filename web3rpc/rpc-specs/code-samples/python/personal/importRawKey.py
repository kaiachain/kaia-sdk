from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

privateKey = "cd87934ee007b7a458fa00dc0314fff8b2bd43b3079f46c820c379e483b4fd8e"
passphrase = "mypassword"

w3 = Web3(Web3.HTTPProvider(host))
personal_response = w3.personal.import_raw_key(privateKey, passphrase)

print(personal_response)
