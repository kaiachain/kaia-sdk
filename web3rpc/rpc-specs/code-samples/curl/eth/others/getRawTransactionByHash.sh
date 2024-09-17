curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_getRawTransactionByHash",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x5bbcde52084defa9d1c7068a811363cc27a25c80d7e495180964673aa5f47687"]
}'
