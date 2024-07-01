curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "eth_createAccessList",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [{
    "from": "0x3bc5885c2941c5cda454bdb4a8c88aa7f248e312",
    "data": "0x20965255",
    "gasPrice": "0x3b9aca00",
    "gas": "0x3d0900",
    "to": "0x00f5f5f3a25f142fafd0af24a754fafa340f32c7"
  }]
}'
