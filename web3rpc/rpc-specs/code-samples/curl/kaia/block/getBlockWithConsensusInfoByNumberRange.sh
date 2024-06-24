curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651/kaia/kaia_getBlockWithConsensusInfoByNumberRange' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getBlockWithConsensusInfoByNumberRange",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [1, 1]
}'
