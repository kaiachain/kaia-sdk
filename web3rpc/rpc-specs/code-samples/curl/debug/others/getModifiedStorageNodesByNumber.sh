curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_getModifiedStorageNodesByNumber",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x73a7d19d14f7dfac5b799e405e22133b2adc57a6", 100, 200]
}'
