curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/getRewards' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getRewards",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "latest"
  ]
}'
