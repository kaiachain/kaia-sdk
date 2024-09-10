#-*- coding:utf-8 -*-
import socket
from hexbytes import HexBytes
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.utils.klaytn_utils import to_pretty

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
    server_socket.bind(('', 5555)) # localhost:5555
    server_socket.listen()

    fee_delegator = Account.from_key('0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4')
    while True:
        client_socket, client_addr = server_socket.accept()
        raw_tx_str = client_socket.recv(1024)
        print("[{}] received tx : {}".format(client_addr,raw_tx_str))

        raw_tx_bytes = HexBytes.fromhex(raw_tx_str.decode())
        feepayer_signed_tx = Account.sign_transaction_as_feepayer(
            raw_tx_bytes, fee_delegator.address, fee_delegator.key
        )

        decoded_tx = Account.decode_transaction(feepayer_signed_tx.rawTransaction)
        print("\ndecoded transaction:", to_pretty(decoded_tx))

        tx_hash = w3.eth.send_raw_transaction(feepayer_signed_tx.rawTransaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        client_socket.send(tx_hash.encode())

        client_socket.close()