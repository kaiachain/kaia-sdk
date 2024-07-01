curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "admin_setSpamThrottlerWhiteList",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [["0xfdeedbb2fe5b48d5b49e435ba00e0358740d0cf5"]]
}'