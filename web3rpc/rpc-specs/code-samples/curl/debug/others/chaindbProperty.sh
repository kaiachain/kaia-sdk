curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_chaindbProperty",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xe17d821e9a8a8736b9aea8c2de1f3a4934ac0a2f"]
}'
