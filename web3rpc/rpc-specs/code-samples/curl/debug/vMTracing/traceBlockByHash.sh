curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_traceBlockByHash",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xed110b330152df2022d40fa3c38987643034aa56fc96079fb6c67b66a6ed4f19"]
}'
