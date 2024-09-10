from web3 import Web3
from web3py_ext import extend

host = "https://public-en-kairos.node.kaia.io"

tracerCallObject = {"to":"0x46eda75e7ca73cb1c2f83c3927211655420dbc44","data":"0x3fb5c1cb00000000000000000000000000000000000000000000000000000000000003e7"};
blockNumber = "latest"
options = {"tracer":"revertTracer"}
w3 = Web3(Web3.HTTPProvider(host))
debug_response = w3.debug.trace_call(tracerCallObject, blockNumber, options)

print(debug_response)
