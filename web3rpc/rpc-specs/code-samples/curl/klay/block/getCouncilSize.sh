curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "klay_getCouncilSize",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x1b4"]
}'
