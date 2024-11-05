from eth_account import Account
from web3py_ext.klaytn_account.utils import compressed_key_from_xy, address_from_private_key, compressed_key, \
    compressed_key_and_address_from_xy


def main():
    private_key=Account.from_key("0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8")
    print("Public key from private key",address_from_private_key(private_key))
    print("Compress key from private key",compressed_key(private_key))

    x = "0xdc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd"
    y = "0xaf06ca34ae8714cf3dae06bacdb78c7c2d4054bd38961d40853cd5f15955da79"
    print("Compress public key from x,y", compressed_key_from_xy(x, y))
    print("Compress public key and address from x,y", compressed_key_and_address_from_xy(x, y))

main()
