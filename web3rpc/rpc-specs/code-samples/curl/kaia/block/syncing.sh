curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/syncing' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_syncing",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
