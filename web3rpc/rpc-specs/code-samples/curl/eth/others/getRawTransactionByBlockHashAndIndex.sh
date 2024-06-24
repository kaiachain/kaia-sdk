curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_getRawTransactionByBlockHashAndIndex",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x4c4cbf242a80183d2ea2daf047c578d5fc89c0b14c4262606c8b6bb0b36715be","0x0"]
}'
