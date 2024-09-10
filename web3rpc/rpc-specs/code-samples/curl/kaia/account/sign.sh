curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/sign' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_sign",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83",
    "0xdeadbeaf"
  ]
}'
