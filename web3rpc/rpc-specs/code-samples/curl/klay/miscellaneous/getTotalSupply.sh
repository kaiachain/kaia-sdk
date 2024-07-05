curl -X POST \
     -H "Content-Type: application/json" \
     --data '{
         "jsonrpc": "2.0",
         "method": "klay_getTotalSupply",
         "params": ["latest"],
         "id": 1
     }' \
     https://api.baobab.klaytn.net:8651
