curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_standardTraceBadBlockToFile",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x2d05db16efa693a14a26feb6c1bafa4b2ac4ecabdaf3ed5f965bb38bc91eba62"]
}'
