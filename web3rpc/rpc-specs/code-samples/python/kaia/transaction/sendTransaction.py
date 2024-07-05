from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

transactionObject = {
    "from": "0x487f2dfef230c2120b8cc55c5087b103146536ec",
    "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
    "value": "0x1",
    "gas": "0x9999",
    "maxFeePerGas": "0x5d21dba00",
    "maxPriorityFeePerGas": "0x5d21dba00"
}

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.send_transaction(transactionObject)

print(kaia_response)
