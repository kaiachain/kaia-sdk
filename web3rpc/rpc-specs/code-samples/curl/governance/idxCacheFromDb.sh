curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "governance_idxCacheFromDb",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
