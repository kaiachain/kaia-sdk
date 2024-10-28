from web3py_ext import extend
from web3 import Web3

def main():
    # convert from (kei/Gkei/kaia/KAIA) to kei
    print("From Kaia to Kei", Web3.to_kei(1, 'kei'))

    # convert from kei to (kei/Gkei/kaia/KAIA)
    print('From Kei to Kaia',Web3.from_kei(1000000000000000000,'kaia'))

main()
