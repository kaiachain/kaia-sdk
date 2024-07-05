curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_getModifiedAccountsByHash",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x165c29e453dff6e1d9838d9e975a438b6f11a2c0a281b0d5b97c8d3110a79ac5", "0x2a8acdc3e9bb735918dc6a0141b9939976f446fde0b39336d74278da93b8d41d"]
}'
