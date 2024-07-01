curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "subbridge_getBridgeInformation",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x27caeba831d98b5fbb1d81ce0ed20801702f443a"]
}'
