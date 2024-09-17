curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "klay_getBlockTransactionCountByNumber",
  "id": 73,
  "jsonrpc": "2.0",
  "params": ["0xe8"]
}'
