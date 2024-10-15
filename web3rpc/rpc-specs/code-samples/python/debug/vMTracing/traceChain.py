from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

startBlock = "10000"
endBlock = "10001"
options = {"tracer":"revertTracer"}
w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.trace_call(startBlock, endBlock,options)

print(debug_response)
