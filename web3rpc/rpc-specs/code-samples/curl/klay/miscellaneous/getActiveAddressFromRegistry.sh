curl -X POST \
     -H "Content-Type: application/json" \
     --data '{
         "jsonrpc": "2.0",
         "method": "klay_getActiveAddressFromRegistry",
         "params": ["KIP113", "latest"],
         "id": 1
     }' \
     http://localhost:8551
