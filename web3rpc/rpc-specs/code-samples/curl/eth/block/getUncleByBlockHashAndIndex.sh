curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_getUncleByBlockHashAndIndex",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
    "0x1"
  ]
}'
