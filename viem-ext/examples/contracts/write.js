import {
    createPublicClient,
    http,
    kairos,
    privateKeyToAccount,
    createWalletClient
} from "@kaiachain/viem-ext";
const publicClient = createPublicClient({
    chain: kairos,
    transport: http(),
});
const walletClient = createWalletClient({
    chain: kairos,
    transport: http(),
    account: privateKeyToAccount(
        // using legacy account only for this example
        "0x71c5a2d04d744d76492640fb3e5cf2650efae106655f27baffc482c53f57dca2"
    ),
});
// Example usage
(async () => {
    const abi = [{ "inputs": [{ "internalType": "uint256", "name": "initNumber", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "number", "type": "uint256" }], "name": "SetNumber", "type": "event" }, { "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "number", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newNumber", "type": "uint256" }], "name": "setNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
    const address = "0x95Be48607498109030592C08aDC9577c7C2dD505";
    const txHash = await walletClient.writeContract({
        address,
        abi,
        functionName: 'setNumber',
        args: [Date.now()]
    })
    console.log('tx hash', txHash);
    const result = await publicClient.readContract({
        address,
        abi,
        functionName: 'number'
    })
    console.log('Current contract value', result);
})();
