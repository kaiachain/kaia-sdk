curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/maxPriorityFeePerGas' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_maxPriorityFeePerGas",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
