curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getBlockByNumber",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x1b4", true]
}'
