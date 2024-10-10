curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "personal_unlockAccount",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "0x6b1ac7bda0073095df1d434c39d66fb31a592bdd",
    "helloWorld",
    30
  ]
}'
