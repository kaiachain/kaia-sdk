curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/lowerBoundGasPrice' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_lowerBoundGasPrice",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
