#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.transaction.transaction import (
    empty_tx,
    fill_transaction,
    TxType
)
from web3py_ext.utils.klaytn_utils import to_pretty
from cytoolz import merge

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))

def web3_fee_delegated_value_transfer_sign_recover():
    user = Account.from_key('0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8')
    fee_delegator = Account.from_key('0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4')

    fee_delegated_value_transfer_tx = empty_tx(TxType.FEE_DELEGATED_VALUE_TRANSFER)
    fee_delegated_value_transfer_tx = merge(fee_delegated_value_transfer_tx, {
        'from' : user.address,
        'to' : user.address, # to self
        'value' : Web3.to_peb(0.1, 'klay'),
    })
    fee_delegated_value_transfer_tx = fill_transaction(fee_delegated_value_transfer_tx, w3)

    # sign the klaytn specific transaction type with web3py
    signed_tx = Account.sign_transaction(fee_delegated_value_transfer_tx, user.key)
    print("\nraw transaction of signed tx:", signed_tx.rawTransaction.hex())
    recovered_tx = Account.recover_transaction(signed_tx.rawTransaction)
    print("\nrecovered sender address", recovered_tx)

    feepayer_signed_tx = Account.sign_transaction_as_feepayer(signed_tx.rawTransaction, fee_delegator.address, fee_delegator.key)
    print("\nraw transaction of signed tx:", feepayer_signed_tx.rawTransaction.hex())

    feepayer_recovered_tx = Account.recover_transaction_as_feepayer(feepayer_signed_tx.rawTransaction)
    print("recovered feepayer address:", feepayer_recovered_tx)

    decoded_tx = Account.decode_transaction(feepayer_signed_tx.rawTransaction)
    print("\ndecoded transaction:", to_pretty(decoded_tx))

    tx_hash = w3.eth.send_raw_transaction(feepayer_signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt)

web3_fee_delegated_value_transfer_sign_recover()