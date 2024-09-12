from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

keyData = "24c34f686a5848edb19180fb723b5db21c626f253e8b63bf8a0054ea67852c0a"
oldPassphrase = "helloWorld"
newPassphrase = "helloWorld"

w3 = Web3(Web3.HTTPProvider(host))
personal_response = w3.personal.replace_raw_key(keyData, oldPassphrase, newPassphrase)

print(personal_response)
