curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/debug/chaindbCompact' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_chaindbCompact",
  "id": 42,
  "jsonrpc": "2.0"
}'
