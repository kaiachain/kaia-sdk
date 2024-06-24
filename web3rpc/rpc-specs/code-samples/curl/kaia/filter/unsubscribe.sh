curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/unsubscribe' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_unsubscribe",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xab8ac7a4045025d0c2807d63060eea6d"]
}'
