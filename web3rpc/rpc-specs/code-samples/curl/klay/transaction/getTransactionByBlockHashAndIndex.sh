curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "klay_getTransactionByBlockHashAndIndex",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68", "0x0"]
}'
