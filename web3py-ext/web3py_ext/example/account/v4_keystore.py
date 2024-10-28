from web3py_ext import extend
from eth_account import Account

v4_keystore_str = '''{
  "version": 4,
  "id": "15f20a72-3719-4f10-b63d-2dbd2658a3ca",
  "address": "0x17226c9b4e130551c258eb7b1cdc927c13998cd6",
  "keyring": [
    {
      "ciphertext": "07162b797dcb32dd96686be249f9b3c357642bf5f5454d0fcbefedb265667f37",
      "cipherparams": {
        "iv": "8611384aaa8147ef54cbca175d2e818c"
      },
      "cipher": "aes-128-ctr",
      "kdf": "scrypt",
      "kdfparams": {
        "dklen": 32,
        "salt": "d7cb1f18d9fb7aa81042f61a61de9c456f829f2dc8b46cb6290d1bb9de89b791",
        "n": 4096,
        "r": 8,
        "p": 1
      },
      "mac": "ed0a57bbb11d512f7e3c3025e6dc497c15a2fa3aad1fe558b4cad53f887e06d8"
    },
    {
      "ciphertext": "394200b0c8abae159e7f19c3eee55409ec789ac77a970e4c3f6bc1839a4afbfc",
      "cipherparams": {
        "iv": "3013456d71996e32e231923f289f5c78"
      },
      "cipher": "aes-128-ctr",
      "kdf": "scrypt",
      "kdfparams": {
        "dklen": 32,
        "salt": "fca63eb0670a9bffcc67cb77f43525a8c93d49e0b24acbf7d2a98bff8a5a5cf1",
        "n": 4096,
        "r": 8,
        "p": 1
      },
      "mac": "880fa7e1240c1deb18898edea28a2baeb57a0c250971c5fea333033a92a958f7"
    },
    {
      "ciphertext": "e04e0c8c4eaf5a22a037c0771f41e5e3c6e09cf624832a340d1c962ac5aa03cb",
      "cipherparams": {
        "iv": "8777c8e5c244190b026c54b4a2474bf0"
      },
      "cipher": "aes-128-ctr",
      "kdf": "scrypt",
      "kdfparams": {
        "dklen": 32,
        "salt": "e4b4d5b664f6722a5ad41a1b46249204326c952b3a4ac255ae4a0b5128e4803a",
        "n": 4096,
        "r": 8,
        "p": 1
      },
      "mac": "c618020675a344b3e13dfe9c605115faf32dc80a7d24081b264ebf04fe5db1dd"
    }
  ]
}'''

with open('keystore', 'w') as f:
    f.write(v4_keystore_str)

with open('keystore') as f:
    pk = Account.v4_decrypt(f.read(), "Kaia")
    accs = list(map(lambda acc: Account.from_key_pair(acc['address'], acc['private_key']), pk))
    print("Original Keystores")
    for acc in accs:
        print(acc.address, acc.key.hex())
    print("New Keystores")
    # kaia-sdk only supports encrypting keystore v3
    for acc in accs:
      new_keystore=Account.encrypt(acc.key.hex(),'password1')
      new_pk = Account.decrypt(new_keystore, 'password1')
      new_acc = Account.from_key(new_pk)
      print(new_acc.address,new_acc.key.hex())