curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/getTransactionCount' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getTransactionCount",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"]
}'
