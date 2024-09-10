curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "governance_getRewardsAccumulated",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [123400489,123416489]
}'
