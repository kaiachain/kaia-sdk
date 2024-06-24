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
from web3.geth import GethAdmin, AsyncGethAdmin

class AdminApi(GethAdmin):
    namespace = "admin"
    
    
    _add_peer: Method[Callable[..., Any]] = Method(
        namespace + "_addPeer".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def add_peer(self, *args) -> Any:
        return self._add_peer(*args)
    
    
    _export_chain: Method[Callable[..., Any]] = Method(
        namespace + "_exportChain".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def export_chain(self, *args) -> Any:
        return self._export_chain(*args)
    
    
    _get_spam_throttler_candidate_list: Method[Callable[..., Any]] = Method(
        namespace + "_getSpamThrottlerCandidateList".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def get_spam_throttler_candidate_list(self, *args) -> Any:
        return self._get_spam_throttler_candidate_list(*args)
    
    
    _get_spam_throttler_throttle_list: Method[Callable[..., Any]] = Method(
        namespace + "_getSpamThrottlerThrottleList".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def get_spam_throttler_throttle_list(self, *args) -> Any:
        return self._get_spam_throttler_throttle_list(*args)
    
    
    _get_spam_throttler_white_list: Method[Callable[..., Any]] = Method(
        namespace + "_getSpamThrottlerWhiteList".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def get_spam_throttler_white_list(self, *args) -> Any:
        return self._get_spam_throttler_white_list(*args)
    
    
    _import_chain: Method[Callable[..., Any]] = Method(
        namespace + "_importChain".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def import_chain(self, *args) -> Any:
        return self._import_chain(*args)
    
    
    _import_chain_from_string: Method[Callable[..., Any]] = Method(
        namespace + "_importChainFromString".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def import_chain_from_string(self, *args) -> Any:
        return self._import_chain_from_string(*args)
    
    
    _node_config: Method[Callable[..., Any]] = Method(
        namespace + "_nodeConfig".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def node_config(self, *args) -> Any:
        return self._node_config(*args)
    
    
    _node_info: Method[Callable[..., Any]] = Method(
        namespace + "_nodeInfo".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def node_info(self, *args) -> Any:
        return self._node_info(*args)
    
    
    _remove_peer: Method[Callable[..., Any]] = Method(
        namespace + "_removePeer".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def remove_peer(self, *args) -> Any:
        return self._remove_peer(*args)
    
    
    _save_trie_node_cache_to_disk: Method[Callable[..., Any]] = Method(
        namespace + "_saveTrieNodeCacheToDisk".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def save_trie_node_cache_to_disk(self, *args) -> Any:
        return self._save_trie_node_cache_to_disk(*args)
    
    
    _set_max_subscription_per_ws_conn: Method[Callable[..., Any]] = Method(
        namespace + "_setMaxSubscriptionPerWsConn".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def set_max_subscription_per_ws_conn(self, *args) -> Any:
        return self._set_max_subscription_per_ws_conn(*args)
    
    
    _set_spam_throttler_white_list: Method[Callable[..., Any]] = Method(
        namespace + "_setSpamThrottlerWhiteList".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def set_spam_throttler_white_list(self, *args) -> Any:
        return self._set_spam_throttler_white_list(*args)
    
    
    _spam_throttler_config: Method[Callable[..., Any]] = Method(
        namespace + "_spamThrottlerConfig".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def spam_throttler_config(self, *args) -> Any:
        return self._spam_throttler_config(*args)
    
    
    _start_http: Method[Callable[..., Any]] = Method(
        namespace + "_startHttp".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def start_http(self, *args) -> Any:
        return self._start_http(*args)
    
    
    _start_spam_throttler: Method[Callable[..., Any]] = Method(
        namespace + "_startSpamThrottler".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def start_spam_throttler(self, *args) -> Any:
        return self._start_spam_throttler(*args)
    
    
    _start_state_migration: Method[Callable[..., Any]] = Method(
        namespace + "_startStateMigration".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def start_state_migration(self, *args) -> Any:
        return self._start_state_migration(*args)
    
    
    _start_ws: Method[Callable[..., Any]] = Method(
        namespace + "_startWs".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def start_ws(self, *args) -> Any:
        return self._start_ws(*args)
    
    
    _state_migration_status: Method[Callable[..., Any]] = Method(
        namespace + "_stateMigrationStatus".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def state_migration_status(self, *args) -> Any:
        return self._state_migration_status(*args)
    
    
    _stop_http: Method[Callable[..., Any]] = Method(
        namespace + "_stopHttp".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def stop_http(self, *args) -> Any:
        return self._stop_http(*args)
    
    
    _stop_spam_throttler: Method[Callable[..., Any]] = Method(
        namespace + "_stopSpamThrottler".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def stop_spam_throttler(self, *args) -> Any:
        return self._stop_spam_throttler(*args)
    
    
    _stop_state_migration: Method[Callable[..., Any]] = Method(
        namespace + "_stopStateMigration".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def stop_state_migration(self, *args) -> Any:
        return self._stop_state_migration(*args)
    
    
    _stop_ws: Method[Callable[..., Any]] = Method(
        namespace + "_stopWs".replace("Ws", "WS"), mungers=[default_root_munger]
    )

    def stop_ws(self, *args) -> Any:
        return self._stop_ws(*args)
    

class AsyncAdminApi(AsyncGethAdmin):
    is_async = True
    namespace = "admin"
    
    
    _add_peer: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_addPeer", mungers=[default_root_munger]
    )

    async def add_peer(self, *args) -> Any:
        return await self._add_peer(*args)
    
    
    _export_chain: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_exportChain", mungers=[default_root_munger]
    )

    async def export_chain(self, *args) -> Any:
        return await self._export_chain(*args)
    
    
    _get_spam_throttler_candidate_list: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_getSpamThrottlerCandidateList", mungers=[default_root_munger]
    )

    async def get_spam_throttler_candidate_list(self, *args) -> Any:
        return await self._get_spam_throttler_candidate_list(*args)
    
    
    _get_spam_throttler_throttle_list: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_getSpamThrottlerThrottleList", mungers=[default_root_munger]
    )

    async def get_spam_throttler_throttle_list(self, *args) -> Any:
        return await self._get_spam_throttler_throttle_list(*args)
    
    
    _get_spam_throttler_white_list: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_getSpamThrottlerWhiteList", mungers=[default_root_munger]
    )

    async def get_spam_throttler_white_list(self, *args) -> Any:
        return await self._get_spam_throttler_white_list(*args)
    
    
    _import_chain: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_importChain", mungers=[default_root_munger]
    )

    async def import_chain(self, *args) -> Any:
        return await self._import_chain(*args)
    
    
    _import_chain_from_string: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_importChainFromString", mungers=[default_root_munger]
    )

    async def import_chain_from_string(self, *args) -> Any:
        return await self._import_chain_from_string(*args)
    
    
    _node_config: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_nodeConfig", mungers=[default_root_munger]
    )

    async def node_config(self, *args) -> Any:
        return await self._node_config(*args)
    
    
    _node_info: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_nodeInfo", mungers=[default_root_munger]
    )

    async def node_info(self, *args) -> Any:
        return await self._node_info(*args)
    
    
    _remove_peer: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_removePeer", mungers=[default_root_munger]
    )

    async def remove_peer(self, *args) -> Any:
        return await self._remove_peer(*args)
    
    
    _save_trie_node_cache_to_disk: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_saveTrieNodeCacheToDisk", mungers=[default_root_munger]
    )

    async def save_trie_node_cache_to_disk(self, *args) -> Any:
        return await self._save_trie_node_cache_to_disk(*args)
    
    
    _set_max_subscription_per_ws_conn: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_setMaxSubscriptionPerWsConn", mungers=[default_root_munger]
    )

    async def set_max_subscription_per_ws_conn(self, *args) -> Any:
        return await self._set_max_subscription_per_ws_conn(*args)
    
    
    _set_spam_throttler_white_list: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_setSpamThrottlerWhiteList", mungers=[default_root_munger]
    )

    async def set_spam_throttler_white_list(self, *args) -> Any:
        return await self._set_spam_throttler_white_list(*args)
    
    
    _spam_throttler_config: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_spamThrottlerConfig", mungers=[default_root_munger]
    )

    async def spam_throttler_config(self, *args) -> Any:
        return await self._spam_throttler_config(*args)
    
    
    _start_http: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_startHttp", mungers=[default_root_munger]
    )

    async def start_http(self, *args) -> Any:
        return await self._start_http(*args)
    
    
    _start_spam_throttler: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_startSpamThrottler", mungers=[default_root_munger]
    )

    async def start_spam_throttler(self, *args) -> Any:
        return await self._start_spam_throttler(*args)
    
    
    _start_state_migration: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_startStateMigration", mungers=[default_root_munger]
    )

    async def start_state_migration(self, *args) -> Any:
        return await self._start_state_migration(*args)
    
    
    _start_ws: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_startWs", mungers=[default_root_munger]
    )

    async def start_ws(self, *args) -> Any:
        return await self._start_ws(*args)
    
    
    _state_migration_status: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_stateMigrationStatus", mungers=[default_root_munger]
    )

    async def state_migration_status(self, *args) -> Any:
        return await self._state_migration_status(*args)
    
    
    _stop_http: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_stopHttp", mungers=[default_root_munger]
    )

    async def stop_http(self, *args) -> Any:
        return await self._stop_http(*args)
    
    
    _stop_spam_throttler: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_stopSpamThrottler", mungers=[default_root_munger]
    )

    async def stop_spam_throttler(self, *args) -> Any:
        return await self._stop_spam_throttler(*args)
    
    
    _stop_state_migration: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_stopStateMigration", mungers=[default_root_munger]
    )

    async def stop_state_migration(self, *args) -> Any:
        return await self._stop_state_migration(*args)
    
    
    _stop_ws: Method[Callable[..., Awaitable[Any]]] = Method(
        namespace + "_stopWs", mungers=[default_root_munger]
    )

    async def stop_ws(self, *args) -> Any:
        return await self._stop_ws(*args)
    
