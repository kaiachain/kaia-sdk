curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/forkStatus' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_forkStatus",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [20]
}'
