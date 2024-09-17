curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/feeHistory' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_feeHistory",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x10", "latest", [0.1, 0.2, 0.3]]
}'
