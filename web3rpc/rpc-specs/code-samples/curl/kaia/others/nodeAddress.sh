curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/nodeAddress' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_nodeAddress",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
