curl -X 'POST' \
  'https://api.baobab.klaytn.net:8651' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "method": "debug_traceCall",
  "id": 1,
  "jsonrpc": "2.0",
  "params": [{"to":"0x46eda75e7ca73cb1c2f83c3927211655420dbc44","data":"0x3fb5c1cb00000000000000000000000000000000000000000000000000000000000003e7"}, "latest", {"tracer":"revertTracer"}]
}'
