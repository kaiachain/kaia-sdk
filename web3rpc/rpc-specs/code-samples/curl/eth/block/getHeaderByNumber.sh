curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_getHeaderByNumber",
  "id": 83,
  "jsonrpc": "2.0",
  "params":["0x1b4"]
}'
