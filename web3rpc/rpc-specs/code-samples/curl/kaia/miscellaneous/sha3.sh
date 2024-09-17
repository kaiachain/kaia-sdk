curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/sha3' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_sha3",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x11223344"]
}'
