curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_getCode",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"]
}'
