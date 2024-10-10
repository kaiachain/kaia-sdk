from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

address = '0xA2a8854b1802D8Cd5De631E690817c253d6a9153'
message = '0xdeadbeef'
signature = '0x1e6338d6e4a8d688a25de78cf2a92efec9a92e52eb8425acaaee8c3957e68cdb3f91bdc483f0ed05a0da26eca3be4c566d087d90dc2ca293be23b2a9de0bcafc1c'
blockNumber = 'latest'

w3 = Web3(Web3.HTTPProvider(host))
klay_response = w3.klay.recover_from_message(address, message, signature, blockNumber)

print(klay_response)
