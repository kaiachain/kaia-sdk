curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "personal_signTransaction",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    {
      "from": "0x413ba0e5f6f00664598b5c80042b1308f4ff1408",
      "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
      "value": "0x1",
      "gas": "0x9999",
      "nonce": "0x1"
    }, "helloWorld"
  ]
}'
