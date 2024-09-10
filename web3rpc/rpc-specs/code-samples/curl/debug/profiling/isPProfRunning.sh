curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/debug/isPProfRunning' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_isPProfRunning",
  "id": 1,
  "jsonrpc": "2.0"
}'
