curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/getStorageAt' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getStorageAt",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"]
}'
