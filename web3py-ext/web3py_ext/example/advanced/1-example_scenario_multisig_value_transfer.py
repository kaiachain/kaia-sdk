#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.transaction.transaction import (
    empty_tx,
    fill_transaction,
    TxType
)
from web3py_ext.utils.klaytn_utils import (
    to_pretty,
)
from cytoolz import merge
from eth_utils.address import to_checksum_address

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def example_scenario_multisig_value_transfer():
    multisig_addr = to_checksum_address('0x82c6a8d94993d49cfd0c1d30f0f8caa65782cc7e')
    user1 = Account.from_key_pair(
        multisig_addr,
        '0xa32c30608667d43be2d652bede413f12a649dd1be93440878e7f712d51a6768a'
        )
    user2 = Account.from_key_pair(
        multisig_addr,
        '0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8'
        )
    user3 = Account.from_key_pair(
        multisig_addr,
        '0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac'
        )
    
    value_transfer_tx = empty_tx(TxType.VALUE_TRANSFER)
    value_transfer_tx = merge(value_transfer_tx, {
        'from' : multisig_addr,
        'to' : multisig_addr, # to self
        'value' : Web3.to_peb(0.1, "klay"),
    })
    value_transfer_tx = fill_transaction(value_transfer_tx, w3)

    # sign the klaytn specific transaction type with web3py
    user1_signed_tx = Account.sign_transaction(value_transfer_tx, user1.key)
    user2_signed_tx = Account.sign_transaction(user1_signed_tx.rawTransaction, user2.key)
    user3_signed_tx = Account.sign_transaction(user2_signed_tx.rawTransaction, user3.key)

    decoded_tx = Account.decode_transaction(user3_signed_tx.rawTransaction)
    print("\ndecoded transaction:", to_pretty(decoded_tx))

    # klaytn recover transaction return a list of all recovered signatures
    recovered = Account.klaytn_recover_transaction(user3_signed_tx.rawTransaction)
    print('recovered addresses', recovered)

    tx_hash = w3.eth.send_raw_transaction(user3_signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt)

example_scenario_multisig_value_transfer()