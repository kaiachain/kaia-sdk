curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "admin_importChainFromString",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "f9071...080c0"
  ]
}'
