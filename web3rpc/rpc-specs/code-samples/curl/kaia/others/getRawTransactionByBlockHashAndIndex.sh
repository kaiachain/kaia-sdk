curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/getRawTransactionByBlockHashAndIndex' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getRawTransactionByBlockHashAndIndex",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x29b6cd965c7d9a53a6f068da259dce1d3810ba79fff8eebac5d4da14754e67e6","0x20965255"]
}'
