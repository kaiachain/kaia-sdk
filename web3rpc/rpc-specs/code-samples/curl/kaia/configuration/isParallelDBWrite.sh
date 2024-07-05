curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/isParallelDBWrite' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_isParallelDBWrite",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
