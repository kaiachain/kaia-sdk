curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "personal_importRawKey",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "cd87934ee007b7a458fa00dc0314fff8b2bd43b3071f46c820c379e483b4fd8e",
    "gr8=B!0@uc$b"
  ]
}'
