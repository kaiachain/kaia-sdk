curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_getBlobSidecarByTxHash",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xe24ecc1f10799b512817f928a0a45e71b170bd221e2791fdeba992c5bf51418c", false]
}'
