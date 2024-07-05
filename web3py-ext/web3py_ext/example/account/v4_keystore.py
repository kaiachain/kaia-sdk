from web3py_ext import extend
from eth_account import Account

v4_keystore_str = '''{
    "version": 4,
    "id": "c903083c-a42c-4774-8cea-f4c5a7962732",
    "address": "0x17226c9b4e130551c258eb7b1cdc927c13998cd6",
    "keyring": [
      [
        {
          "ciphertext": "e341cf7fb7f19031374a61abb7f2d5d643ca6408bc1e8398de4ac9dd3e0697c1",
          "cipherparams": { "iv": "fb46dcc6521dc880b54f78891b479dc3" },
          "cipher": "aes-128-ctr",
          "kdf": "scrypt",
          "kdfparams": {
            "dklen": 32,
            "salt": "f48e0cd5625e55f62d831d12378fad49ff1a715d490e5996d4a5a275f6a277c2",
            "n": 4096,
            "r": 8,
            "p": 1
          },
          "mac": "a03c2c7b6dff1ad793d2ede88a679d82c734e266fcd40bb875d765e50955edb1"
        },
        {
          "ciphertext": "668b1a501bbf756016647397078982e6a413a89ed45e8eefd85fb5de52ea5c10",
          "cipherparams": { "iv": "ad52c6deefe8fd64ae41dd445c966e08" },
          "cipher": "aes-128-ctr",
          "kdf": "scrypt",
          "kdfparams": {
            "dklen": 32,
            "salt": "31cd14d3d15f902989db0f0f9b839a420384252eb7daf7c93ebe1c19c11b0ff2",
            "n": 4096,
            "r": 8,
            "p": 1
          },
          "mac": "36b47e3cc20656349ca2477b28ed04585eb5712691ea724437d77c7a876faacd"
        }
      ],
      [
        {
          "ciphertext": "6b0f9f13bb721aa97e7eda08cbaaeb873c0ec41f1707b5cd58b8f4932b252067",
          "cipherparams": { "iv": "755c7b650ac384e45d1825f5e73a7bae" },
          "cipher": "aes-128-ctr",
          "kdf": "scrypt",
          "kdfparams": {
            "dklen": 32,
            "salt": "b9e984fe8f8630638aefaf7ad4d112c47acb56ef2b36fb2aaaa29cf149ad32f1",
            "n": 4096,
            "r": 8,
            "p": 1
          },
          "mac": "f1bec38f3c815f09d4a4244596b0514c0e24a837979f70773b313c3a873d7b9b"
        }
      ],
      [
        {
          "ciphertext": "4ca2438538f560570efe0a862d384d6822513d92fb00503b0cf5f20d5ed959af",
          "cipherparams": { "iv": "6d578196eff13d42a71d61b54a7a56ac" },
          "cipher": "aes-128-ctr",
          "kdf": "scrypt",
          "kdfparams": {
            "dklen": 32,
            "salt": "3a5521134feb81fdd47e91165fc391a2f52984a5fd65b15807843b9bbed3d6dc",
            "n": 4096,
            "r": 8,
            "p": 1
          },
          "mac": "b7db297d0a8f7e2044ff7a88da3a27af4a4a3489a210b34911a5c87399075873"
        },
        {
          "ciphertext": "91a2d31625ec96fedf58f0ee48987cf39f6e517103b25d5d0afeac5674c62752",
          "cipherparams": { "iv": "26821451fdaf5215c028eaea756c2797" },
          "cipher": "aes-128-ctr",
          "kdf": "scrypt",
          "kdfparams": {
            "dklen": 32,
            "salt": "a958903f3d1e0065bab28a3c5fb14a2b78804869e1f82a93aabecdc4beded6fd",
            "n": 4096,
            "r": 8,
            "p": 1
          },
          "mac": "e9e004e310fa6648b82839c8ace5e215866ef4ae6db9a4b9987678de5817d533"
        },
        {
          "ciphertext": "7ab47009dd5762dd10990f5182228a01cfaef00e8b581c51908de296bbb10cb2",
          "cipherparams": { "iv": "65d76971b9fae3eca2ff18fca4b23097" },
          "cipher": "aes-128-ctr",
          "kdf": "scrypt",
          "kdfparams": {
            "dklen": 32,
            "salt": "288ea98e079125403157a9e9f0546cb1db234637e8d65550dfab607e2e65d065",
            "n": 4096,
            "r": 8,
            "p": 1
          },
          "mac": "0a60b6b58b7f6bb50aed38b738deffbe7a9cee593829342ebbd57083a80ac508"
        }
      ]
    ]
  }'''

with open('keystore', 'w') as f:
    f.write(v4_keystore_str)

with open('keystore') as f:
    pk = Account.v4_decrypt(f.read(), "Klaytn")
    accs = list(map(lambda acc: Account.from_key_pair(acc['address'], acc['private_key']), pk))
    for acc in accs:
        print(acc.address, acc.key.hex())