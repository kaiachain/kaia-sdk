curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/isSenderTxHashIndexingEnabled' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_isSenderTxHashIndexingEnabled",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
