from web3py_ext.utils.klaytn_utils import bytes_to_hex_str, hex_str_to_bytes

def rsv_to_signature_string(r, s, v):
    # Concatenate r, s, and v to form a 65-byte signature
    signature = r + s + v
    return bytes_to_hex_str(signature)
def signature_string_to_rsv(signature_str):
    # Convert the signature string to bytes (remove '0x' if present)
    signature = hex_str_to_bytes(signature_str)
    # Extract r (first 32 bytes), s (next 32 bytes), and v (last byte)
    r = signature[:32]
    s = signature[32:64]
    v = signature[64]
    return bytes_to_hex_str(r), bytes_to_hex_str(s), hex(v)

def main():
    # convert {r,s,v} signature to string
    r = hex_str_to_bytes('0x678f3a7b600169b800828065cda112aa28291311a5dbb729480444a2b905f6e6')
    s = hex_str_to_bytes('0xbaabb5a43a047e75e41a77b88fa7a5bf89e5227f1c8e40bfdfbcceb8164521ed')
    v = hex_str_to_bytes("0x1b")
    print("From r,s,v to string",rsv_to_signature_string(r,s,v))

    # convert string signature to rsv
    signature_str="0x66809fb130a6ea4ae4e823baa92573a5f1bfb4e88e64048aecfb18a2b4012b9975c2c3e5f7b0a182c767137c488649cd5104a5e747371fd922d618e328e5c5081b"
    print("From string to r,s,v",signature_string_to_rsv(signature_str))
main()
