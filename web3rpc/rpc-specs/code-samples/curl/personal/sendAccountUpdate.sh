curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "personal_sendAccountUpdate",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    {
        "from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4",
        "key":"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"
    },
    "gr8=B!0@uc$b"
  ]
}'
