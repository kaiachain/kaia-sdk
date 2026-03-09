curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_getBlobSidecarByTxHash",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xb4687ea17a0908a4dce2d83f8c2566881474b9da30ee8b8979b028778761c9d7", false]
}'
