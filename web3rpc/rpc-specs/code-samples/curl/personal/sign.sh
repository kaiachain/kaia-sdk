curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "personal_sign",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "0xdeadbeaf",
    "0x413ba0e5f6f00664598b5c80042b1308f4ff1408",
    "helloWorld"
  ]
}'
