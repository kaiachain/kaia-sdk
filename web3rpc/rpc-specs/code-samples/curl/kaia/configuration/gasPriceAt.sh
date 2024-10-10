curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/gasPriceAt' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_gasPriceAt",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x64"]
}'
