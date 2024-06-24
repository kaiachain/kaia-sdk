curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/getDecodedAnchoringTransactionByHash' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getDecodedAnchoringTransactionByHash",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x72cde80650c7c6745e4cf4c162e9ce1e5542f4d86112925faa6aa75f6a6142ec"]
}'
