curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "subbridge_unsubscribeBridge",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4"]
}'
