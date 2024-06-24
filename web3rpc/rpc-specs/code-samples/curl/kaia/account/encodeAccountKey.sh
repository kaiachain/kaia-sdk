curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/encodeAccountKey' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_encodeAccountKey",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [{"keyType": 0, "key": {}}]
}'
