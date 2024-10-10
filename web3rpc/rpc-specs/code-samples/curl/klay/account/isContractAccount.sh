curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "klay_isContractAccount",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"]
}'
