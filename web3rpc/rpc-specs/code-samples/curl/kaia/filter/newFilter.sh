curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/newFilter' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_newFilter",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    {
      "fromBlock":"earliest",
      "toBlock":"latest",
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":[
        "0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"
      ]
    }
  ]
}'
