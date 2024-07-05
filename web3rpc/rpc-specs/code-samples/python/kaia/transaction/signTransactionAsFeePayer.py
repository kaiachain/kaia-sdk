from web3 import Web3
from web3py_ext import extend

host = "https://api.baobab.klaytn.net:8651"

txObject = {
    "typeInt": 17,
    "from": "0x487f2dfef230c2120b8cc55c5087b103146536ec",
    "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075",
    "gas": "0x76c0", "gasPrice": "0x5d21dba00",
    "value": "0xf4",
    "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
    "feePayer": "0x487f2dfef230c2120b8cc55c5087b103146536ec",
    "nonce": "0x1"
}

w3 = Web3(Web3.HTTPProvider(host))
kaia_response = w3.kaia.sign_transaction_as_fee_payer(txObject)

print(kaia_response)
