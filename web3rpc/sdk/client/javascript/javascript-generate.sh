#!/usr/bin/env bash
set -e

CURRENT_FILE_DIR=$(cd "$( dirname "$0" )" && pwd)
PROJECT_DIR=$(cd "$CURRENT_FILE_DIR" && cd ../../.. && pwd )

cd "${CURRENT_FILE_DIR}"
rm -rf "${CURRENT_FILE_DIR}/openapi"
mkdir "${CURRENT_FILE_DIR}/openapi"

# sh ./scripts/eth/javascript-eth-generate.sh ${CURRENT_FILE_DIR}
# sh ./scripts/klay/javascript-klay-generate.sh ${CURRENT_FILE_DIR}
# sh ./scripts/txpool/javascript-txpool-generate.sh ${CURRENT_FILE_DIR}
# sh ./scripts/net/javascript-net-generate.sh ${CURRENT_FILE_DIR}
# sh ./scripts/debug/javascript-debug-generate.sh ${CURRENT_FILE_DIR}
# sh ./scripts/personal/javascript-personal-generate.sh ${CURRENT_FILE_DIR}
# sh ./scripts/governance/javascript-governance-generate.sh ${CURRENT_FILE_DIR}
# sh ./scripts/admin/javascript-admin-generate.sh ${CURRENT_FILE_DIR}
# sh ./scripts/subbridge/javascript-subbridge-generate.sh ${CURRENT_FILE_DIR}

cp .openapi-generator-ignore "${CURRENT_FILE_DIR}/openapi"
sh "${PROJECT_DIR}"/bin/web3rpc-openapi-generator-cli generate -c "${CURRENT_FILE_DIR}/javascript-config.yaml"

cd "${CURRENT_FILE_DIR}/openapi"
yarn install
yarn link

cd "${CURRENT_FILE_DIR}/opensdk"
yarn link @kaiachain/web3rpc
yarn install
yarn link

cd "${CURRENT_FILE_DIR}/openapi-test"
yarn link opensdk-javascript
#yarn link web3rpc-javascript