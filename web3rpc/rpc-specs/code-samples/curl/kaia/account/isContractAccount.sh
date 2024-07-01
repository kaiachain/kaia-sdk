curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/isContractAccount' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_isContractAccount",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"]
}'
