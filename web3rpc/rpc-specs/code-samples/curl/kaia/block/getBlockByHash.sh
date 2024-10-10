curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/getBlockByHash' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getBlockByHash",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xba647d41423faeebe8a7c64737d284fc2eba6f0388a3e1ebf6243db509ec1577", true]
}'
