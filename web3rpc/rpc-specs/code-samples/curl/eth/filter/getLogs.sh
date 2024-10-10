curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_getLogs",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [{"fromBlock":"0x1","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b"}]
}'
