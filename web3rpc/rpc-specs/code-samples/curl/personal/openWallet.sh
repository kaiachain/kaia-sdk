curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "personal_openWallet",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "keystore://",
    "hello@1234"
  ]
}'
