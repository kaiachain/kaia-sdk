curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/getCommittee' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getCommittee",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x1b4"]
}'
