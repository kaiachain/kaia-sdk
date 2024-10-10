curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_getBlockRlp",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["latest"]
}'
