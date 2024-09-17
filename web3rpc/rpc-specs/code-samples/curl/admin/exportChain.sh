curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "admin_exportChain",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "/tmp/chain.txt", 1, 1000
  ]
}'
