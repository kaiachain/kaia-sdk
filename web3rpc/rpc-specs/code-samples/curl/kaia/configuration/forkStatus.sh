curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/forkStatus' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_forkStatus",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [20]
}'
