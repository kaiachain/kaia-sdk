curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "subbridge_deregisterToken",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec"]
}'
