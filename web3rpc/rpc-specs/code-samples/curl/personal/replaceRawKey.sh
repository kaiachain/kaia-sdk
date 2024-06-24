curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "personal_replaceRawKey",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "ba4a5bbc0dc57d6348047be71773686d1739bf0a5ac6ca4c390f0e4d596a09a6",
    "hello@1234",
    "hello@1234"
  ]
}'
