curl -X POST \
     -H "Content-Type: application/json" \
     --data '{
         "jsonrpc": "2.0",
         "method": "kaia_getTotalSupply",
         "params": ["latest"],
         "id": 1
     }' \
     https://public-en-kairos.node.kaia.io
