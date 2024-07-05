curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "mainbridge_convertChildChainBlockHashToParentChainTxHash",
  "id": 1,
  "jsonrpc": "2.0",
  "params": ["0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880"]
}'
