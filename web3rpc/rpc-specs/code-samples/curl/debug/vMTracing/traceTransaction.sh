curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_traceTransaction",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x344fc43b5b87984d5a50fe2c54e121f94945ba9ff9da20f9de0f1b4914f47055"]
}'
