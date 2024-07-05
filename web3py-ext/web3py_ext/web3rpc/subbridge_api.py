from web3.module import (
    Module
)
from web3.method import (
    Method,
    default_root_munger,
)
from typing import (
    Callable,
    Awaitable,
    Any,
)
from web3.geth import GethAdmin, GethPersonal, GethTxPool
from web3.net import Net

class SubbridgeApi(Module):
    namespace = "subbridge"
    
    
    _add_peer: Method[Callable[..., Any]] = Method(
        namespace + "_addPeer", mungers=[default_root_munger]
    )

    def add_peer(self, *args) -> Any:
        return self._add_peer(*args)
    
    
    _anchoring: Method[Callable[..., Any]] = Method(
        namespace + "_anchoring", mungers=[default_root_munger]
    )

    def anchoring(self, *args) -> Any:
        return self._anchoring(*args)
    
    
    _child_operator: Method[Callable[..., Any]] = Method(
        namespace + "_childOperator", mungers=[default_root_munger]
    )

    def child_operator(self, *args) -> Any:
        return self._child_operator(*args)
    
    
    _child_operator_balance: Method[Callable[..., Any]] = Method(
        namespace + "_childOperatorBalance", mungers=[default_root_munger]
    )

    def child_operator_balance(self, *args) -> Any:
        return self._child_operator_balance(*args)
    
    
    _child_operator_nonce: Method[Callable[..., Any]] = Method(
        namespace + "_childOperatorNonce", mungers=[default_root_munger]
    )

    def child_operator_nonce(self, *args) -> Any:
        return self._child_operator_nonce(*args)
    
    
    _convert_request_tx_hash_to_handle_tx_hash: Method[Callable[..., Any]] = Method(
        namespace + "_convertRequestTxHashToHandleTxHash", mungers=[default_root_munger]
    )

    def convert_request_tx_hash_to_handle_tx_hash(self, *args) -> Any:
        return self._convert_request_tx_hash_to_handle_tx_hash(*args)
    
    
    _deploy_bridge: Method[Callable[..., Any]] = Method(
        namespace + "_deployBridge", mungers=[default_root_munger]
    )

    def deploy_bridge(self, *args) -> Any:
        return self._deploy_bridge(*args)
    
    
    _deregister_bridge: Method[Callable[..., Any]] = Method(
        namespace + "_deregisterBridge", mungers=[default_root_munger]
    )

    def deregister_bridge(self, *args) -> Any:
        return self._deregister_bridge(*args)
    
    
    _deregister_token: Method[Callable[..., Any]] = Method(
        namespace + "_deregisterToken", mungers=[default_root_munger]
    )

    def deregister_token(self, *args) -> Any:
        return self._deregister_token(*args)
    
    
    _get_bridge_information: Method[Callable[..., Any]] = Method(
        namespace + "_getBridgeInformation", mungers=[default_root_munger]
    )

    def get_bridge_information(self, *args) -> Any:
        return self._get_bridge_information(*args)
    
    
    _get_receipt_from_parent_chain: Method[Callable[..., Any]] = Method(
        namespace + "_getReceiptFromParentChain", mungers=[default_root_munger]
    )

    def get_receipt_from_parent_chain(self, *args) -> Any:
        return self._get_receipt_from_parent_chain(*args)
    
    
    _latest_anchored_block_number: Method[Callable[..., Any]] = Method(
        namespace + "_latestAnchoredBlockNumber", mungers=[default_root_munger]
    )

    def latest_anchored_block_number(self, *args) -> Any:
        return self._latest_anchored_block_number(*args)
    
    
    _list_bridge: Method[Callable[..., Any]] = Method(
        namespace + "_listBridge", mungers=[default_root_munger]
    )

    def list_bridge(self, *args) -> Any:
        return self._list_bridge(*args)
    
    
    _node_info: Method[Callable[..., Any]] = Method(
        namespace + "_nodeInfo", mungers=[default_root_munger]
    )

    def node_info(self, *args) -> Any:
        return self._node_info(*args)
    
    
    _parent_operator: Method[Callable[..., Any]] = Method(
        namespace + "_parentOperator", mungers=[default_root_munger]
    )

    def parent_operator(self, *args) -> Any:
        return self._parent_operator(*args)
    
    
    _parent_operator_balance: Method[Callable[..., Any]] = Method(
        namespace + "_parentOperatorBalance", mungers=[default_root_munger]
    )

    def parent_operator_balance(self, *args) -> Any:
        return self._parent_operator_balance(*args)
    
    
    _parent_operator_nonce: Method[Callable[..., Any]] = Method(
        namespace + "_parentOperatorNonce", mungers=[default_root_munger]
    )

    def parent_operator_nonce(self, *args) -> Any:
        return self._parent_operator_nonce(*args)
    
    
    _register_bridge: Method[Callable[..., Any]] = Method(
        namespace + "_registerBridge", mungers=[default_root_munger]
    )

    def register_bridge(self, *args) -> Any:
        return self._register_bridge(*args)
    
    
    _register_token: Method[Callable[..., Any]] = Method(
        namespace + "_registerToken", mungers=[default_root_munger]
    )

    def register_token(self, *args) -> Any:
        return self._register_token(*args)
    
    
    _remove_peer: Method[Callable[..., Any]] = Method(
        namespace + "_removePeer", mungers=[default_root_munger]
    )

    def remove_peer(self, *args) -> Any:
        return self._remove_peer(*args)
    
    
    _send_chain_txslimit: Method[Callable[..., Any]] = Method(
        namespace + "_sendChainTxslimit", mungers=[default_root_munger]
    )

    def send_chain_txslimit(self, *args) -> Any:
        return self._send_chain_txslimit(*args)
    
    
    _subscribe_bridge: Method[Callable[..., Any]] = Method(
        namespace + "_subscribeBridge", mungers=[default_root_munger]
    )

    def subscribe_bridge(self, *args) -> Any:
        return self._subscribe_bridge(*args)
    
    
    _unsubscribe_bridge: Method[Callable[..., Any]] = Method(
        namespace + "_unsubscribeBridge", mungers=[default_root_munger]
    )

    def unsubscribe_bridge(self, *args) -> Any:
        return self._unsubscribe_bridge(*args)
    

class AsyncSubbridgeApi(Module):
    is_async = True
    namespace = "subbridge"
    
    
    _add_peer: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_addPeer", mungers=[default_root_munger]
    )

    async def add_peer(self, *args) -> Any:
        return await self._add_peer(*args)
    
    
    _anchoring: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_anchoring", mungers=[default_root_munger]
    )

    async def anchoring(self, *args) -> Any:
        return await self._anchoring(*args)
    
    
    _child_operator: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_childOperator", mungers=[default_root_munger]
    )

    async def child_operator(self, *args) -> Any:
        return await self._child_operator(*args)
    
    
    _child_operator_balance: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_childOperatorBalance", mungers=[default_root_munger]
    )

    async def child_operator_balance(self, *args) -> Any:
        return await self._child_operator_balance(*args)
    
    
    _child_operator_nonce: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_childOperatorNonce", mungers=[default_root_munger]
    )

    async def child_operator_nonce(self, *args) -> Any:
        return await self._child_operator_nonce(*args)
    
    
    _convert_request_tx_hash_to_handle_tx_hash: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_convertRequestTxHashToHandleTxHash", mungers=[default_root_munger]
    )

    async def convert_request_tx_hash_to_handle_tx_hash(self, *args) -> Any:
        return await self._convert_request_tx_hash_to_handle_tx_hash(*args)
    
    
    _deploy_bridge: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_deployBridge", mungers=[default_root_munger]
    )

    async def deploy_bridge(self, *args) -> Any:
        return await self._deploy_bridge(*args)
    
    
    _deregister_bridge: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_deregisterBridge", mungers=[default_root_munger]
    )

    async def deregister_bridge(self, *args) -> Any:
        return await self._deregister_bridge(*args)
    
    
    _deregister_token: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_deregisterToken", mungers=[default_root_munger]
    )

    async def deregister_token(self, *args) -> Any:
        return await self._deregister_token(*args)
    
    
    _get_bridge_information: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_getBridgeInformation", mungers=[default_root_munger]
    )

    async def get_bridge_information(self, *args) -> Any:
        return await self._get_bridge_information(*args)
    
    
    _get_receipt_from_parent_chain: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_getReceiptFromParentChain", mungers=[default_root_munger]
    )

    async def get_receipt_from_parent_chain(self, *args) -> Any:
        return await self._get_receipt_from_parent_chain(*args)
    
    
    _latest_anchored_block_number: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_latestAnchoredBlockNumber", mungers=[default_root_munger]
    )

    async def latest_anchored_block_number(self, *args) -> Any:
        return await self._latest_anchored_block_number(*args)
    
    
    _list_bridge: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_listBridge", mungers=[default_root_munger]
    )

    async def list_bridge(self, *args) -> Any:
        return await self._list_bridge(*args)
    
    
    _node_info: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_nodeInfo", mungers=[default_root_munger]
    )

    async def node_info(self, *args) -> Any:
        return await self._node_info(*args)
    
    
    _parent_operator: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_parentOperator", mungers=[default_root_munger]
    )

    async def parent_operator(self, *args) -> Any:
        return await self._parent_operator(*args)
    
    
    _parent_operator_balance: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_parentOperatorBalance", mungers=[default_root_munger]
    )

    async def parent_operator_balance(self, *args) -> Any:
        return await self._parent_operator_balance(*args)
    
    
    _parent_operator_nonce: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_parentOperatorNonce", mungers=[default_root_munger]
    )

    async def parent_operator_nonce(self, *args) -> Any:
        return await self._parent_operator_nonce(*args)
    
    
    _register_bridge: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_registerBridge", mungers=[default_root_munger]
    )

    async def register_bridge(self, *args) -> Any:
        return await self._register_bridge(*args)
    
    
    _register_token: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_registerToken", mungers=[default_root_munger]
    )

    async def register_token(self, *args) -> Any:
        return await self._register_token(*args)
    
    
    _remove_peer: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_removePeer", mungers=[default_root_munger]
    )

    async def remove_peer(self, *args) -> Any:
        return await self._remove_peer(*args)
    
    
    _send_chain_txslimit: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_sendChainTxslimit", mungers=[default_root_munger]
    )

    async def send_chain_txslimit(self, *args) -> Any:
        return await self._send_chain_txslimit(*args)
    
    
    _subscribe_bridge: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_subscribeBridge", mungers=[default_root_munger]
    )

    async def subscribe_bridge(self, *args) -> Any:
        return await self._subscribe_bridge(*args)
    
    
    _unsubscribe_bridge: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_unsubscribeBridge", mungers=[default_root_munger]
    )

    async def unsubscribe_bridge(self, *args) -> Any:
        return await self._unsubscribe_bridge(*args)
    
