curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "klay_signTransactionAsFeePayer",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    {
      "typeInt": 17,
      "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
      "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075",
      "gas": "0x76c0",
      "gasPrice": "0x5d21dba00",
      "value": "0xf4",
      "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
      "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"
    }
  ]
}'
