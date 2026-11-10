curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getAccount",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x3111a0577f322e8fb54f78d9982a26ae7ca0f722", "latest"]
}'
