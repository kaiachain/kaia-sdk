curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_getTransactionCount",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "0x413ba0e5f6f00664598b5c80042b1308f4ff1408",
    "latest"
  ]
}'
