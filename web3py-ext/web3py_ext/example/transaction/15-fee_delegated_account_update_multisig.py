#-*- coding:utf-8 -*-
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.klaytn_account.utils import compressed_key
from web3py_ext.klaytn_account.account_key import KeyType
from web3py_ext.transaction.transaction import (
    empty_tx,
    fill_transaction,
    TxType
)
from web3py_ext.utils.klaytn_utils import (
    to_pretty,
    bytes_to_hex_str
)
from cytoolz import merge

# w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8551'))
w3 = Web3(Web3.HTTPProvider('https://public-en-baobab.klaytn.net'))

def web3_fee_delegated_account_update_multisig():
    # user1_updator = Account.from_key('0x8b0164c3a59d2b1a00a9934f85ae77c14e21094132c34cc3daacd9e632c90807')
    # user1 = Account.from_key('0x8234bdf5e900c9e43401399ae3836340f31dcff52843baf8432f06cca9e3f396')
    user1 = Account.from_key('0xd3973803956f7f08093097fa2c3712f5700c5c58f6d91d79b279a919bb120cc2')
    user2 = Account.from_key('0xedb106f1dcd74b7fb55252051359b5b162f93de0fb8b5aa0c46319f864192c29')
    user3 = Account.from_key('0x797d16ee04c7cec1cf1d4a536fd2dfed81af48d477df1f8409d75f50d91499f6')
    fee_delegator = Account.from_key('0x2380a434b66b5b3ff095632b098055e52fa85ca34517ff8ec504b428f4a81f76')

    account_update_tx = empty_tx(TxType.FEE_DELEGATED_ACCOUNT_UPDATE)
    account_update_tx = merge(account_update_tx, {
        'from' : user1.address,
        'key' : {
            'type': KeyType.MULTISIG,
            'threshold': 2,
            'keys': [
                {
                    'weight':1,
                    'key': compressed_key(user2),
                },
                {
                    'weight':1,
                    'key': compressed_key(user1),
                },
                {
                    'weight':1,
                    'key': compressed_key(user3),
                },
            ] 
        }
    })
    account_update_tx = fill_transaction(account_update_tx, w3)
    print(to_pretty(account_update_tx))

    # sign the klaytn specific transaction type with web3py
    signed_tx = Account.sign_transaction(account_update_tx, user1.key)
    print('\nrawTransaction1:', bytes_to_hex_str(signed_tx.rawTransaction))

    signed_tx2= Account.sign_transaction(signed_tx.rawTransaction, user2.key)
    print('\nrawTransaction2:', bytes_to_hex_str(signed_tx2.rawTransaction))

    signed_tx3= Account.sign_transaction(signed_tx2.rawTransaction, user3.key)
    print('\nrawTransaction3:', bytes_to_hex_str(signed_tx3.rawTransaction))

    recovered_tx = Account.recover_transaction(signed_tx.rawTransaction)
    print("\nrecovered sender address: ", recovered_tx)

    decoded_tx = Account.decode_transaction(signed_tx.rawTransaction)
    print("\ndecoded transaction:", to_pretty(decoded_tx))
    
    feepayer_signed_tx = Account.sign_transaction_as_feepayer(signed_tx3.rawTransaction, fee_delegator.address, fee_delegator.key)
    print("\nraw transaction of feePayer signed tx:", feepayer_signed_tx.rawTransaction.hex())
    
    feepayer_recovered_tx = Account.recover_transaction_as_feepayer(feepayer_signed_tx.rawTransaction)
    print("recovered feepayer address:", feepayer_recovered_tx)
    
    decoded_tx = Account.decode_transaction(feepayer_signed_tx.rawTransaction)
    print("\ndecoded transaction:", to_pretty(decoded_tx))

    tx_hash = w3.eth.send_raw_transaction(feepayer_signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt) 

web3_fee_delegated_account_update_multisig()