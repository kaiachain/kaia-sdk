curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "admin_startHTTP",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["127.0.0.1", 8551, "", "klay"]
}'
