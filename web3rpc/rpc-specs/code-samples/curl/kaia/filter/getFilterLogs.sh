curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/getFilterLogs' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getFilterLogs",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xd32fd16b6906e67f6e2b65dcf48fc272"]
}'
