curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_storageRangeAt",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x90c81195698bc9f282bbdec386b0afb4dcc28e43aae834894281c3ecb3c88d21", 1, "0x73a7d19d14f7dfac5b799e405e22133b2adc57a6", "0x12", 1]
}'
