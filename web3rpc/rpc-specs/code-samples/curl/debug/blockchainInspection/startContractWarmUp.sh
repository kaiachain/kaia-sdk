curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_startContractWarmUp",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xfD1d63a152f7A7Ef14bd157C1c73c5bC3239EA5D"]
}'
