from ecies import encrypt, decrypt
from eth_account import Account
from web3py_ext.klaytn_account.utils import compressed_key
from web3py_ext import extend
from web3 import Web3
from eth_utils.address import to_checksum_address
from web3py_ext.transaction.transaction import (
    empty_tx,
    fill_transaction,
    TxType
)
from web3py_ext.utils.klaytn_utils import to_pretty
from cytoolz import merge

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))
# user = Account.from_key_pair(
#     to_checksum_address('0xe15cd70a41dfb05e7214004d7d054801b2a2f06b'),
#     '0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8'
# )
user = Account.from_key('0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8')
privKeyHex = user.key.hex()
pubKeyHex = compressed_key(user)

plaintext = b'KlaytnDevMeetup'

encrypted = encrypt(pubKeyHex, plaintext)

tx = empty_tx(TxType.VALUE_TRANSFER_MEMO)
tx = merge(tx, {
    'from' : user.address,
    'to' : user.address,
    'value' : Web3.to_peb(0, 'klay'),
    'data' : encrypted
})
tx = fill_transaction(tx, w3)

signed_tx = Account.sign_transaction(tx, user.key)
tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
w3.eth.wait_for_transaction_receipt(tx_hash)
receipt = w3.klay.get_transaction_receipt(tx_hash)
decrypted = decrypt(privKeyHex, bytes.fromhex(receipt['input'][2:]))
print("Decrypted:", decrypted)

from eth_account._utils.signing import extract_chain_id, to_standard_v
from eth_account._utils.legacy_transactions import serializable_unsigned_transaction_from_dict

tx_from_node = w3.klay.get_transaction_by_hash(tx_hash)
tx_to_make_hash = {
    'from':tx_from_node['from'],
    'gas':tx_from_node['gas'],
    'gasPrice':tx_from_node['gasPrice'],
    'nonce':tx_from_node['nonce'],
    'to':to_checksum_address(tx_from_node['to']),
    'value':tx_from_node['value'],
    'type':tx_from_node['typeInt'],
    'chainId':extract_chain_id(int(tx_from_node['signatures'][0]['V'],16))[0],
    'data':tx_from_node['input'],
}
hash = serializable_unsigned_transaction_from_dict(tx_to_make_hash).hash()
s = w3.eth.account._keys.Signature(vrs=(
    to_standard_v(int(receipt['signatures'][0]['V'], 16)),
    int(receipt['signatures'][0]['R'],16),
    int(receipt['signatures'][0]['S'],16)
))
pubkey = s.recover_public_key_from_msg_hash(hash).to_compressed_bytes()
encrypted2 = encrypt(pubkey, plaintext)


# tx_from_node = w3.eth.get_transaction('0xa9b7da86a1c32b728216e097568a48ef64572b852c32e2a1391b9d70bbdc2067')
# print(tx_from_node)
# tt = {
# 'to': '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55', 
# 'value': 100000000000000000, 
# 'nonce': 330, 
# 'chainId': 1001, 
# 'gas': 63000, 
# 'maxFeePerGas': 50000000000, 
# 'maxPriorityFeePerGas': 0,
# }
# print(tt)
# hash = serializable_unsigned_transaction_from_dict(tt).hash()
# print(hash.hex())
# s = w3.eth.account._keys.Signature(vrs=(
#     to_standard_v(1),
#     w3.to_int(tx_from_node.r),
#     w3.to_int(tx_from_node.s)
# ))
# print(s.recover_public_key_from_msg_hash(hash).to_checksum_address())