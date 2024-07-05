import json
from web3 import Web3
from web3py_ext import extend
from base.constants import KLAYTN_URL, PN_RPC, BAOBAB_URL
from web3 import Web3
from eth_utils.address import to_checksum_address
import random

# w3 = Web3(Web3.HTTPProvider(KLAYTN_URL))
w3 = Web3(Web3.HTTPProvider('http://3.39.84.202:8651/'))
w3_pn = Web3(Web3.HTTPProvider(PN_RPC))
address = to_checksum_address("0x413ba0e5f6f00664598b5c80042b1308f4ff1408")
addressPN = to_checksum_address("0x65b47be3457ff26f2911cf89fd079cef0475a2e6")
passphrasePN = "helloWorld"


def create_new_filter():
    filterOptions = {
        "fromBlock": "earliest",
        "toBlock": "latest",
        "address": to_checksum_address("0x87ac99835e67168d4f9a40580f8f5c33550ba88b"),
        "topics": ["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]
    }

    filter = w3.eth.filter(filterOptions)
    return filter


def unlock_account():
    passphrase = "helloWorld"
    duration = 30
    # unlock_account for address
    w3.geth.personal.unlock_account(address, passphrase, duration)
    return address


def getNonce():
    eth_response = w3.eth.get_transaction_count(address, "latest")
    return eth_response


def getFeePayerSignatures(tx):
    klay_response = w3.klay.sign_transaction(tx)
    return klay_response["tx"]


def get_raw_transaction():
    private_key = "6cb442edb31d8a1c753f0c3c675588fceb4d82435a1c03b8bb92a5a9274ebbe0"
    from_address = to_checksum_address("0xA1ee5975cfa2180450AeD555Ba06AB8108a87D4A")
    to_address = to_checksum_address("0x742d35Cc6634C0532925a3b844Bc454e4438f44e")
    gas_price = "0xba43b7400"
    gas_limit = 21000
    value = w3.to_wei("0.001", "ether")
    nonce = w3.eth.get_transaction_count(from_address)

    tx = {
        "from": from_address,
        "to": to_address,
        "nonce": nonce,
        "gasPrice": gas_price,
        "gas": gas_limit,
        "value": value,
        "data": b""
    }
    signed_tx = w3.eth.account.sign_transaction(tx, private_key)
    return signed_tx.rawTransaction.hex()


def unlock_account_pn():
    duration = 300
    w3_pn.geth.personal.unlock_account(addressPN, passphrasePN, duration)
    return addressPN


def send_transaction_pn():
    klaytnTransactionTypes = {
        "from": unlock_account_pn(),
        "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
        "value": "0x1",
        "gas": "0x9999",
        "maxFeePerGas": "0x5d21dba00",
        "maxPriorityFeePerGas": "0x5d21dba00"
    }
    result = w3_pn.klay.send_transaction(klaytnTransactionTypes)
    return result


def get_nonce_pending():
    data = w3_pn.eth_other.pending_transactions()
    return data[-1]['nonce']


def gen_hex_string():
    random_bytes = bytearray(random.getrandbits(8) for _ in range(32))
    hex_string = ''.join('{:02x}'.format(b) for b in random_bytes)
    return hex_string
