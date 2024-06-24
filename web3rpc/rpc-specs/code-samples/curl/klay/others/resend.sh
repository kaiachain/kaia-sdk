curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "klay_resend",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [{"from": "0x65b47be3457ff26f2911cf89fd079cef0475a2e6","to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee","value": "0x1","gas": "0x9999","maxFeePerGas": "0x5d21dba00","maxPriorityFeePerGas": "0x5d21dba00","nonce": "0xf"}, "0xba43b7500", "0xe8d4a50fff"]
}'
