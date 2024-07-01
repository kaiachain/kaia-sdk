from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

w3 = Web3(Web3.HTTPProvider(host))

sendArgs = {
    "from": "0x65b47be3457ff26f2911cf89fd079cef0475a2e6",
    "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
    "value": "0x1",
    "gas": "0x9999",
    "maxFeePerGas": "0x5d21dba00",
    "maxPriorityFeePerGas": "0x5d21dba00",
    "nonce": "0xd"
}
gasPrice = "0xba43b7500"
gasLimit = "0xe8d4a50fff"

kaia_response = w3.kaia.resend(sendArgs, gasPrice, gasLimit)

print(kaia_response)
