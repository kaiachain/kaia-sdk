from web3py_ext import extend
from eth_account import Account

v3_keystore_str = '''{
  "address": "029e786304c1531af3ac7db24a02448e543a099e",
  "id": "9d492c95-b9e3-42e3-af73-5c77e932208d",
  "version": 3,
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {"iv": "bfcb88a1501e2bb1e6694c03da18953d"},
    "ciphertext": "076510b4e25d5cfc31239bffcad6036fe543cbbb04b9f3ec719bf4f61b58fc05",
    "kdf": "scrypt",
    "kdfparams": {
      "salt": "79124f05995aae98b3088d8365f59a6dfadd1c9ed249abae3c07733f4cbbee53",
      "n": 131072,
      "dklen": 32,
      "p": 1,
      "r": 8
    },
    "mac": "d70f83824c2c30dc5cd3a244d87147b6aa713a6000165789a82a467651284ac7"
  }
}'''

with open('keystore', 'w') as f:
    f.write(v3_keystore_str)

with open('keystore') as f:
    pk = Account.decrypt(f.read(), 'password')
    acc = Account.from_key(pk)
    print(acc.address, acc.key.hex())