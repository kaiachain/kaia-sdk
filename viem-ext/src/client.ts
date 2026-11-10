
import { createPublicClient as createDefaultPublicClient, createWalletClient as createDefaultWalletClient, JsonRpcAccount, LocalAccount, OneOf, rpcSchema, Transport, } from "viem";
import { CustomRpcSchema } from "./rpc-schema.js";
import { kaiaWalletAction } from "./actions/wallet-actions.js";
import { KaiaChain, KaiaPublicClient, KaiaWalletClient } from "./types/client.js";

export const createPublicClient = (data: {
    transport: Transport,
    chain: KaiaChain,
}): KaiaPublicClient => {
    return createDefaultPublicClient({
        ...data,
        rpcSchema: rpcSchema<CustomRpcSchema>()
    }).extend(kaiaWalletAction() as any) as any;
}

export const createWalletClient = <account extends OneOf<LocalAccount | JsonRpcAccount> = JsonRpcAccount>
    (data: {
        transport: Transport,
        account?: account,
        chain: KaiaChain,
    }): KaiaWalletClient<account> => {
    return createDefaultWalletClient({
        ...data,
        rpcSchema: rpcSchema<CustomRpcSchema>()
    } as any).extend(kaiaWalletAction() as any) as KaiaWalletClient<account>
}