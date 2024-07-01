curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "personal_lockAccount",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
  ]
}'
