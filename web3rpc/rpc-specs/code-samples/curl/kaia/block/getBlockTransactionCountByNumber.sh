curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/getBlockTransactionCountByNumber' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getBlockTransactionCountByNumber",
  "id": 73,
  "jsonrpc": "2.0",
  "params": ["0xe8"]
}'
