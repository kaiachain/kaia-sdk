curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/chainID' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_chainID",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
