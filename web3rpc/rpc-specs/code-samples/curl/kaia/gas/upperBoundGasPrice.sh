curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/upperBoundGasPrice' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_upperBoundGasPrice",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
