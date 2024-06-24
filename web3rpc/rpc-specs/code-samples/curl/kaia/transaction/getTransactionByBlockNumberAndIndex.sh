curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/getTransactionByBlockNumberAndIndex' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getTransactionByBlockNumberAndIndex",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [118593751, "0x0"]
}'
