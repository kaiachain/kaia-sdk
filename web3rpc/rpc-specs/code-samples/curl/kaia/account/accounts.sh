curl -X 'POST' \
'https://api.baobab.klaytn.net:8651/kaia/accounts' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_accounts",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
