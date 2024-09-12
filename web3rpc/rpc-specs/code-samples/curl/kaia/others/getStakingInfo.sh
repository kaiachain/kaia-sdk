curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/getStakingInfo' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getStakingInfo",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["latest"]
}'
