curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_preimage",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586"]
}'
