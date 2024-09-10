curl -X 'POST' \
  'https://public-en-kairos.node.kaia.io/kaia/kaia_getBlockWithConsensusInfoByNumberRange' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "kaia_getBlockWithConsensusInfoByNumberRange",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [1, 1]
}'
