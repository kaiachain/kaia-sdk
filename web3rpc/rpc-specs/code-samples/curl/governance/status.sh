curl -X 'POST' \
'https://public-en-kairos.node.kaia.io/kaia/accounts' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "governance_status",
  "id": 1,
  "jsonrpc": "2.0",
  "params": []
}'
