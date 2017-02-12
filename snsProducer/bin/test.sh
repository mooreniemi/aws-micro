command -v curl >/dev/null 2>&1 || { echo >&2 "I require curl (to make web requests) but it's not installed.  Aborting."; exit 1; }
command -v jq >/dev/null 2>&1 || { echo >&2 "I require jq (for parsing json) but it's not installed.  Aborting."; exit 1; }

echo "testing POST"
curl -X POST -d "{\"message\": \"hi from curl in test-prod\"}" https://tby2yge8zc.execute-api.us-east-1.amazonaws.com/prod/snsProducer-development | jq
