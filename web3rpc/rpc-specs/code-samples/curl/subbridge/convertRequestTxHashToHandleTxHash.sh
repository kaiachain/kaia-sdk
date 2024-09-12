curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "subbridge_convertRequestTxHashToHandleTxHash",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xc585cfd1e7047b4faae69e62e77db192d8a339701b40d6ab4adb58453b934bec"]
}'
