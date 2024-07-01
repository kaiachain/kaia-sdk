curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/gasPriceAt' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_gasPriceAt",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x64"]
}'
