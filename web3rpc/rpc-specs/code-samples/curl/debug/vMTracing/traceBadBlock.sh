curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_traceBadBlock",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6"]
}'
