curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_submitHashrate",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x5", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"]
}'
