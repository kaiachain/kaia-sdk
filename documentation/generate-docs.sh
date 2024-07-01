#!/bin/bash
set -e

help()
{
    echo "Usage: "
    echo "1)                       $0 split :split into each namespace"
    echo "2)                       $0       :merge all specs"
    echo "3) RPC_SPEC_DIR=./output $0       :in the directory"
}

RPC_SPEC_DIR=${RPC_SPEC_DIR:="."}

if [ $# -lt 1 ]
then
    yarn build index@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc.yaml
    yarn remove_query_param
elif [ "$1" == "split" ]
then
    yarn build klay@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-klay.yaml
    yarn build kaia@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-kaia.yaml
    yarn build eth@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-eth.yaml
    yarn build debug@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-debug.yaml
    yarn build admin@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-admin.yaml
    yarn build governance@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-governance.yaml
    yarn build personal@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-personal.yaml
    yarn build net@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-net.yaml
    yarn build txpool@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-txpool.yaml
    yarn build mainbridge@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-mainbridge.yaml
    yarn build subbridge@v1.0.0 -o "$RPC_SPEC_DIR"/web3rpc-subbridge.yaml
    yarn remove_query_param
else
    help
fi


