export const GaslessSwapRouterAbi = {
  "address": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_wkaia",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "CommissionClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "oldRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newRate",
          "type": "uint256"
        }
      ],
      "name": "CommissionRateUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "proposer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountRepaid",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "finalUserAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "commission",
          "type": "uint256"
        }
      ],
      "name": "SwappedForGas",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "factory",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "router",
          "type": "address"
        }
      ],
      "name": "TokenAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "TokenRemoved",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "WKAIA",
      "outputs": [
        {
          "internalType": "contract IWKAIA",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "router",
          "type": "address"
        }
      ],
      "name": "addToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimCommission",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "commissionRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "dexAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountIn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "getDEXInfo",
      "outputs": [
        {
          "internalType": "address",
          "name": "factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "router",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSupportedTokens",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "isTokenSupported",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "removeToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "minAmountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountRepay",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapForGas",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_commissionRate",
          "type": "uint256"
        }
      ],
      "name": "updateCommissionRate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  "transactionHash": "0x6fcfe87981b395dcd5ffee4c1a18cdd6bba6eece27aeaa921c212c0bfdef1a1a",
  "receipt": {
    "to": null,
    "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "contractAddress": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    "transactionIndex": 0,
    "gasUsed": "1430235",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000240000000000000000000000000000000020000000000000100000800000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000002000000000000001000020000000000000000000000000000000000000000000000000000000000000000000",
    "blockHash": "0x6e541abe22f3ccc72862f89d083b098f855296bdb5a6c3d744fa0b3fd7b8aa87",
    "transactionHash": "0x6fcfe87981b395dcd5ffee4c1a18cdd6bba6eece27aeaa921c212c0bfdef1a1a",
    "logs": [
      {
        "transactionIndex": 0,
        "blockNumber": 91,
        "transactionHash": "0x6fcfe87981b395dcd5ffee4c1a18cdd6bba6eece27aeaa921c212c0bfdef1a1a",
        "address": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
        "topics": [
          "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266"
        ],
        "data": "0x",
        "logIndex": 0,
        "blockHash": "0x6e541abe22f3ccc72862f89d083b098f855296bdb5a6c3d744fa0b3fd7b8aa87"
      },
      {
        "transactionIndex": 0,
        "blockNumber": 91,
        "transactionHash": "0x6fcfe87981b395dcd5ffee4c1a18cdd6bba6eece27aeaa921c212c0bfdef1a1a",
        "address": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
        "topics": [
          "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
          "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
          "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266"
        ],
        "data": "0x",
        "logIndex": 1,
        "blockHash": "0x6e541abe22f3ccc72862f89d083b098f855296bdb5a6c3d744fa0b3fd7b8aa87"
      }
    ],
    "blockNumber": 91,
    "cumulativeGasUsed": "1430235",
    "status": 1,
    "byzantium": true
  },
  "args": [
    "0x75Ec3c04DA63bE95Ec9876Aca967D79A1c74e2cf"
  ],
  "numDeployments": 1,
  "solcInputHash": "55bc0b5b02892ed5ceb834ad0040d22c",
  "metadata": "{\"compiler\":{\"version\":\"0.8.24+commit.e11b9ed9\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_wkaia\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"CommissionClaimed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"oldRate\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newRate\",\"type\":\"uint256\"}],\"name\":\"CommissionRateUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"proposer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amountRepaid\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"finalUserAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"commission\",\"type\":\"uint256\"}],\"name\":\"SwappedForGas\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"factory\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"router\",\"type\":\"address\"}],\"name\":\"TokenAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"TokenRemoved\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"WKAIA\",\"outputs\":[{\"internalType\":\"contract IWKAIA\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"factory\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"router\",\"type\":\"address\"}],\"name\":\"addToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"claimCommission\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"commissionRate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"dexAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amountOut\",\"type\":\"uint256\"}],\"name\":\"getAmountIn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amountIn\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"getDEXInfo\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"factory\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"router\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSupportedTokens\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"isTokenSupported\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"removeToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amountIn\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"minAmountOut\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amountRepay\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"}],\"name\":\"swapForGas\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_commissionRate\",\"type\":\"uint256\"}],\"name\":\"updateCommissionRate\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"details\":\"Implements KIP-247 gasless transaction functionality This contract allows users to swap ERC20 tokens for KAIA for gasless transaction. LIMITATIONS: - This contract does not support Fee-on-transfer (FoT) tokens - Using FoT tokens may result in transaction failures or incorrect amounts\",\"kind\":\"dev\",\"methods\":{\"addToken(address,address,address)\":{\"details\":\"IMPORTANT: This contract does not support Fee-on-transfer (FoT) tokens. Such tokens will not function correctly with this contract and should not be added.\"},\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"renounceOwnership()\":{\"details\":\"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.\"},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"}},\"title\":\"GaslessSwapRouter\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"addToken(address,address,address)\":{\"notice\":\"Adds a token to the list of supported tokens\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"contracts/gasless/GaslessSwapRouter.sol\":\"GaslessSwapRouter\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\",\"useLiteralContent\":true},\"optimizer\":{\"enabled\":true,\"runs\":1000},\"remappings\":[],\"viaIR\":true},\"sources\":{\"@openzeppelin/contracts/access/Ownable.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\\"../utils/Context.sol\\\";\\n\\n/**\\n * @dev Contract module which provides a basic access control mechanism, where\\n * there is an account (an owner) that can be granted exclusive access to\\n * specific functions.\\n *\\n * By default, the owner account will be the one that deploys the contract. This\\n * can later be changed with {transferOwnership}.\\n *\\n * This module is used through inheritance. It will make available the modifier\\n * `onlyOwner`, which can be applied to your functions to restrict their use to\\n * the owner.\\n */\\nabstract contract Ownable is Context {\\n    address private _owner;\\n\\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\\n\\n    /**\\n     * @dev Initializes the contract setting the deployer as the initial owner.\\n     */\\n    constructor() {\\n        _transferOwnership(_msgSender());\\n    }\\n\\n    /**\\n     * @dev Throws if called by any account other than the owner.\\n     */\\n    modifier onlyOwner() {\\n        _checkOwner();\\n        _;\\n    }\\n\\n    /**\\n     * @dev Returns the address of the current owner.\\n     */\\n    function owner() public view virtual returns (address) {\\n        return _owner;\\n    }\\n\\n    /**\\n     * @dev Throws if the sender is not the owner.\\n     */\\n    function _checkOwner() internal view virtual {\\n        require(owner() == _msgSender(), \\\"Ownable: caller is not the owner\\\");\\n    }\\n\\n    /**\\n     * @dev Leaves the contract without owner. It will not be possible to call\\n     * `onlyOwner` functions. Can only be called by the current owner.\\n     *\\n     * NOTE: Renouncing ownership will leave the contract without an owner,\\n     * thereby disabling any functionality that is only available to the owner.\\n     */\\n    function renounceOwnership() public virtual onlyOwner {\\n        _transferOwnership(address(0));\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Can only be called by the current owner.\\n     */\\n    function transferOwnership(address newOwner) public virtual onlyOwner {\\n        require(newOwner != address(0), \\\"Ownable: new owner is the zero address\\\");\\n        _transferOwnership(newOwner);\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Internal function without access restriction.\\n     */\\n    function _transferOwnership(address newOwner) internal virtual {\\n        address oldOwner = _owner;\\n        _owner = newOwner;\\n        emit OwnershipTransferred(oldOwner, newOwner);\\n    }\\n}\\n\",\"keccak256\":\"0xba43b97fba0d32eb4254f6a5a297b39a19a247082a02d6e69349e071e2946218\",\"license\":\"MIT\"},\"@openzeppelin/contracts/token/ERC20/IERC20.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/IERC20.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Interface of the ERC20 standard as defined in the EIP.\\n */\\ninterface IERC20 {\\n    /**\\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\\n     * another (`to`).\\n     *\\n     * Note that `value` may be zero.\\n     */\\n    event Transfer(address indexed from, address indexed to, uint256 value);\\n\\n    /**\\n     * @dev Emitted when the allowance of a `spender` for an `owner` is set by\\n     * a call to {approve}. `value` is the new allowance.\\n     */\\n    event Approval(address indexed owner, address indexed spender, uint256 value);\\n\\n    /**\\n     * @dev Returns the amount of tokens in existence.\\n     */\\n    function totalSupply() external view returns (uint256);\\n\\n    /**\\n     * @dev Returns the amount of tokens owned by `account`.\\n     */\\n    function balanceOf(address account) external view returns (uint256);\\n\\n    /**\\n     * @dev Moves `amount` tokens from the caller's account to `to`.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function transfer(address to, uint256 amount) external returns (bool);\\n\\n    /**\\n     * @dev Returns the remaining number of tokens that `spender` will be\\n     * allowed to spend on behalf of `owner` through {transferFrom}. This is\\n     * zero by default.\\n     *\\n     * This value changes when {approve} or {transferFrom} are called.\\n     */\\n    function allowance(address owner, address spender) external view returns (uint256);\\n\\n    /**\\n     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\\n     * that someone may use both the old and the new allowance by unfortunate\\n     * transaction ordering. One possible solution to mitigate this race\\n     * condition is to first reduce the spender's allowance to 0 and set the\\n     * desired value afterwards:\\n     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\\n     *\\n     * Emits an {Approval} event.\\n     */\\n    function approve(address spender, uint256 amount) external returns (bool);\\n\\n    /**\\n     * @dev Moves `amount` tokens from `from` to `to` using the\\n     * allowance mechanism. `amount` is then deducted from the caller's\\n     * allowance.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function transferFrom(address from, address to, uint256 amount) external returns (bool);\\n}\\n\",\"keccak256\":\"0x287b55befed2961a7eabd7d7b1b2839cbca8a5b80ef8dcbb25ed3d4c2002c305\",\"license\":\"MIT\"},\"@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/extensions/IERC20Permit.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Interface of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in\\n * https://eips.ethereum.org/EIPS/eip-2612[EIP-2612].\\n *\\n * Adds the {permit} method, which can be used to change an account's ERC20 allowance (see {IERC20-allowance}) by\\n * presenting a message signed by the account. By not relying on {IERC20-approve}, the token holder account doesn't\\n * need to send a transaction, and thus is not required to hold Ether at all.\\n */\\ninterface IERC20Permit {\\n    /**\\n     * @dev Sets `value` as the allowance of `spender` over ``owner``'s tokens,\\n     * given ``owner``'s signed approval.\\n     *\\n     * IMPORTANT: The same issues {IERC20-approve} has related to transaction\\n     * ordering also apply here.\\n     *\\n     * Emits an {Approval} event.\\n     *\\n     * Requirements:\\n     *\\n     * - `spender` cannot be the zero address.\\n     * - `deadline` must be a timestamp in the future.\\n     * - `v`, `r` and `s` must be a valid `secp256k1` signature from `owner`\\n     * over the EIP712-formatted function arguments.\\n     * - the signature must use ``owner``'s current nonce (see {nonces}).\\n     *\\n     * For more information on the signature format, see the\\n     * https://eips.ethereum.org/EIPS/eip-2612#specification[relevant EIP\\n     * section].\\n     */\\n    function permit(\\n        address owner,\\n        address spender,\\n        uint256 value,\\n        uint256 deadline,\\n        uint8 v,\\n        bytes32 r,\\n        bytes32 s\\n    ) external;\\n\\n    /**\\n     * @dev Returns the current nonce for `owner`. This value must be\\n     * included whenever a signature is generated for {permit}.\\n     *\\n     * Every successful call to {permit} increases ``owner``'s nonce by one. This\\n     * prevents a signature from being used multiple times.\\n     */\\n    function nonces(address owner) external view returns (uint256);\\n\\n    /**\\n     * @dev Returns the domain separator used in the encoding of the signature for {permit}, as defined by {EIP712}.\\n     */\\n    // solhint-disable-next-line func-name-mixedcase\\n    function DOMAIN_SEPARATOR() external view returns (bytes32);\\n}\\n\",\"keccak256\":\"0xec63854014a5b4f2b3290ab9103a21bdf902a508d0f41a8573fea49e98bf571a\",\"license\":\"MIT\"},\"@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/utils/SafeERC20.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\\"../IERC20.sol\\\";\\nimport \\\"../extensions/IERC20Permit.sol\\\";\\nimport \\\"../../../utils/Address.sol\\\";\\n\\n/**\\n * @title SafeERC20\\n * @dev Wrappers around ERC20 operations that throw on failure (when the token\\n * contract returns false). Tokens that return no value (and instead revert or\\n * throw on failure) are also supported, non-reverting calls are assumed to be\\n * successful.\\n * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,\\n * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.\\n */\\nlibrary SafeERC20 {\\n    using Address for address;\\n\\n    /**\\n     * @dev Transfer `value` amount of `token` from the calling contract to `to`. If `token` returns no value,\\n     * non-reverting calls are assumed to be successful.\\n     */\\n    function safeTransfer(IERC20 token, address to, uint256 value) internal {\\n        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));\\n    }\\n\\n    /**\\n     * @dev Transfer `value` amount of `token` from `from` to `to`, spending the approval given by `from` to the\\n     * calling contract. If `token` returns no value, non-reverting calls are assumed to be successful.\\n     */\\n    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {\\n        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));\\n    }\\n\\n    /**\\n     * @dev Deprecated. This function has issues similar to the ones found in\\n     * {IERC20-approve}, and its usage is discouraged.\\n     *\\n     * Whenever possible, use {safeIncreaseAllowance} and\\n     * {safeDecreaseAllowance} instead.\\n     */\\n    function safeApprove(IERC20 token, address spender, uint256 value) internal {\\n        // safeApprove should only be called when setting an initial allowance,\\n        // or when resetting it to zero. To increase and decrease it, use\\n        // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'\\n        require(\\n            (value == 0) || (token.allowance(address(this), spender) == 0),\\n            \\\"SafeERC20: approve from non-zero to non-zero allowance\\\"\\n        );\\n        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));\\n    }\\n\\n    /**\\n     * @dev Increase the calling contract's allowance toward `spender` by `value`. If `token` returns no value,\\n     * non-reverting calls are assumed to be successful.\\n     */\\n    function safeIncreaseAllowance(IERC20 token, address spender, uint256 value) internal {\\n        uint256 oldAllowance = token.allowance(address(this), spender);\\n        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, oldAllowance + value));\\n    }\\n\\n    /**\\n     * @dev Decrease the calling contract's allowance toward `spender` by `value`. If `token` returns no value,\\n     * non-reverting calls are assumed to be successful.\\n     */\\n    function safeDecreaseAllowance(IERC20 token, address spender, uint256 value) internal {\\n        unchecked {\\n            uint256 oldAllowance = token.allowance(address(this), spender);\\n            require(oldAllowance >= value, \\\"SafeERC20: decreased allowance below zero\\\");\\n            _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, oldAllowance - value));\\n        }\\n    }\\n\\n    /**\\n     * @dev Set the calling contract's allowance toward `spender` to `value`. If `token` returns no value,\\n     * non-reverting calls are assumed to be successful. Compatible with tokens that require the approval to be set to\\n     * 0 before setting it to a non-zero value.\\n     */\\n    function forceApprove(IERC20 token, address spender, uint256 value) internal {\\n        bytes memory approvalCall = abi.encodeWithSelector(token.approve.selector, spender, value);\\n\\n        if (!_callOptionalReturnBool(token, approvalCall)) {\\n            _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, 0));\\n            _callOptionalReturn(token, approvalCall);\\n        }\\n    }\\n\\n    /**\\n     * @dev Use a ERC-2612 signature to set the `owner` approval toward `spender` on `token`.\\n     * Revert on invalid signature.\\n     */\\n    function safePermit(\\n        IERC20Permit token,\\n        address owner,\\n        address spender,\\n        uint256 value,\\n        uint256 deadline,\\n        uint8 v,\\n        bytes32 r,\\n        bytes32 s\\n    ) internal {\\n        uint256 nonceBefore = token.nonces(owner);\\n        token.permit(owner, spender, value, deadline, v, r, s);\\n        uint256 nonceAfter = token.nonces(owner);\\n        require(nonceAfter == nonceBefore + 1, \\\"SafeERC20: permit did not succeed\\\");\\n    }\\n\\n    /**\\n     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement\\n     * on the return value: the return value is optional (but if data is returned, it must not be false).\\n     * @param token The token targeted by the call.\\n     * @param data The call data (encoded using abi.encode or one of its variants).\\n     */\\n    function _callOptionalReturn(IERC20 token, bytes memory data) private {\\n        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since\\n        // we're implementing it ourselves. We use {Address-functionCall} to perform this call, which verifies that\\n        // the target address contains contract code and also asserts for success in the low-level call.\\n\\n        bytes memory returndata = address(token).functionCall(data, \\\"SafeERC20: low-level call failed\\\");\\n        require(returndata.length == 0 || abi.decode(returndata, (bool)), \\\"SafeERC20: ERC20 operation did not succeed\\\");\\n    }\\n\\n    /**\\n     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement\\n     * on the return value: the return value is optional (but if data is returned, it must not be false).\\n     * @param token The token targeted by the call.\\n     * @param data The call data (encoded using abi.encode or one of its variants).\\n     *\\n     * This is a variant of {_callOptionalReturn} that silents catches all reverts and returns a bool instead.\\n     */\\n    function _callOptionalReturnBool(IERC20 token, bytes memory data) private returns (bool) {\\n        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since\\n        // we're implementing it ourselves. We cannot use {Address-functionCall} here since this should return false\\n        // and not revert is the subcall reverts.\\n\\n        (bool success, bytes memory returndata) = address(token).call(data);\\n        return\\n            success && (returndata.length == 0 || abi.decode(returndata, (bool))) && Address.isContract(address(token));\\n    }\\n}\\n\",\"keccak256\":\"0x909d608c2db6eb165ca178c81289a07ed2e118e444d0025b2a85c97d0b44a4fa\",\"license\":\"MIT\"},\"@openzeppelin/contracts/utils/Address.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.9.0) (utils/Address.sol)\\n\\npragma solidity ^0.8.1;\\n\\n/**\\n * @dev Collection of functions related to the address type\\n */\\nlibrary Address {\\n    /**\\n     * @dev Returns true if `account` is a contract.\\n     *\\n     * [IMPORTANT]\\n     * ====\\n     * It is unsafe to assume that an address for which this function returns\\n     * false is an externally-owned account (EOA) and not a contract.\\n     *\\n     * Among others, `isContract` will return false for the following\\n     * types of addresses:\\n     *\\n     *  - an externally-owned account\\n     *  - a contract in construction\\n     *  - an address where a contract will be created\\n     *  - an address where a contract lived, but was destroyed\\n     *\\n     * Furthermore, `isContract` will also return true if the target contract within\\n     * the same transaction is already scheduled for destruction by `SELFDESTRUCT`,\\n     * which only has an effect at the end of a transaction.\\n     * ====\\n     *\\n     * [IMPORTANT]\\n     * ====\\n     * You shouldn't rely on `isContract` to protect against flash loan attacks!\\n     *\\n     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets\\n     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract\\n     * constructor.\\n     * ====\\n     */\\n    function isContract(address account) internal view returns (bool) {\\n        // This method relies on extcodesize/address.code.length, which returns 0\\n        // for contracts in construction, since the code is only stored at the end\\n        // of the constructor execution.\\n\\n        return account.code.length > 0;\\n    }\\n\\n    /**\\n     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to\\n     * `recipient`, forwarding all available gas and reverting on errors.\\n     *\\n     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost\\n     * of certain opcodes, possibly making contracts go over the 2300 gas limit\\n     * imposed by `transfer`, making them unable to receive funds via\\n     * `transfer`. {sendValue} removes this limitation.\\n     *\\n     * https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/[Learn more].\\n     *\\n     * IMPORTANT: because control is transferred to `recipient`, care must be\\n     * taken to not create reentrancy vulnerabilities. Consider using\\n     * {ReentrancyGuard} or the\\n     * https://solidity.readthedocs.io/en/v0.8.0/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].\\n     */\\n    function sendValue(address payable recipient, uint256 amount) internal {\\n        require(address(this).balance >= amount, \\\"Address: insufficient balance\\\");\\n\\n        (bool success, ) = recipient.call{value: amount}(\\\"\\\");\\n        require(success, \\\"Address: unable to send value, recipient may have reverted\\\");\\n    }\\n\\n    /**\\n     * @dev Performs a Solidity function call using a low level `call`. A\\n     * plain `call` is an unsafe replacement for a function call: use this\\n     * function instead.\\n     *\\n     * If `target` reverts with a revert reason, it is bubbled up by this\\n     * function (like regular Solidity function calls).\\n     *\\n     * Returns the raw returned data. To convert to the expected return value,\\n     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].\\n     *\\n     * Requirements:\\n     *\\n     * - `target` must be a contract.\\n     * - calling `target` with `data` must not revert.\\n     *\\n     * _Available since v3.1._\\n     */\\n    function functionCall(address target, bytes memory data) internal returns (bytes memory) {\\n        return functionCallWithValue(target, data, 0, \\\"Address: low-level call failed\\\");\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with\\n     * `errorMessage` as a fallback revert reason when `target` reverts.\\n     *\\n     * _Available since v3.1._\\n     */\\n    function functionCall(\\n        address target,\\n        bytes memory data,\\n        string memory errorMessage\\n    ) internal returns (bytes memory) {\\n        return functionCallWithValue(target, data, 0, errorMessage);\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\\n     * but also transferring `value` wei to `target`.\\n     *\\n     * Requirements:\\n     *\\n     * - the calling contract must have an ETH balance of at least `value`.\\n     * - the called Solidity function must be `payable`.\\n     *\\n     * _Available since v3.1._\\n     */\\n    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {\\n        return functionCallWithValue(target, data, value, \\\"Address: low-level call with value failed\\\");\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but\\n     * with `errorMessage` as a fallback revert reason when `target` reverts.\\n     *\\n     * _Available since v3.1._\\n     */\\n    function functionCallWithValue(\\n        address target,\\n        bytes memory data,\\n        uint256 value,\\n        string memory errorMessage\\n    ) internal returns (bytes memory) {\\n        require(address(this).balance >= value, \\\"Address: insufficient balance for call\\\");\\n        (bool success, bytes memory returndata) = target.call{value: value}(data);\\n        return verifyCallResultFromTarget(target, success, returndata, errorMessage);\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\\n     * but performing a static call.\\n     *\\n     * _Available since v3.3._\\n     */\\n    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {\\n        return functionStaticCall(target, data, \\\"Address: low-level static call failed\\\");\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\\n     * but performing a static call.\\n     *\\n     * _Available since v3.3._\\n     */\\n    function functionStaticCall(\\n        address target,\\n        bytes memory data,\\n        string memory errorMessage\\n    ) internal view returns (bytes memory) {\\n        (bool success, bytes memory returndata) = target.staticcall(data);\\n        return verifyCallResultFromTarget(target, success, returndata, errorMessage);\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\\n     * but performing a delegate call.\\n     *\\n     * _Available since v3.4._\\n     */\\n    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {\\n        return functionDelegateCall(target, data, \\\"Address: low-level delegate call failed\\\");\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\\n     * but performing a delegate call.\\n     *\\n     * _Available since v3.4._\\n     */\\n    function functionDelegateCall(\\n        address target,\\n        bytes memory data,\\n        string memory errorMessage\\n    ) internal returns (bytes memory) {\\n        (bool success, bytes memory returndata) = target.delegatecall(data);\\n        return verifyCallResultFromTarget(target, success, returndata, errorMessage);\\n    }\\n\\n    /**\\n     * @dev Tool to verify that a low level call to smart-contract was successful, and revert (either by bubbling\\n     * the revert reason or using the provided one) in case of unsuccessful call or if target was not a contract.\\n     *\\n     * _Available since v4.8._\\n     */\\n    function verifyCallResultFromTarget(\\n        address target,\\n        bool success,\\n        bytes memory returndata,\\n        string memory errorMessage\\n    ) internal view returns (bytes memory) {\\n        if (success) {\\n            if (returndata.length == 0) {\\n                // only check isContract if the call was successful and the return data is empty\\n                // otherwise we already know that it was a contract\\n                require(isContract(target), \\\"Address: call to non-contract\\\");\\n            }\\n            return returndata;\\n        } else {\\n            _revert(returndata, errorMessage);\\n        }\\n    }\\n\\n    /**\\n     * @dev Tool to verify that a low level call was successful, and revert if it wasn't, either by bubbling the\\n     * revert reason or using the provided one.\\n     *\\n     * _Available since v4.3._\\n     */\\n    function verifyCallResult(\\n        bool success,\\n        bytes memory returndata,\\n        string memory errorMessage\\n    ) internal pure returns (bytes memory) {\\n        if (success) {\\n            return returndata;\\n        } else {\\n            _revert(returndata, errorMessage);\\n        }\\n    }\\n\\n    function _revert(bytes memory returndata, string memory errorMessage) private pure {\\n        // Look for revert reason and bubble it up if present\\n        if (returndata.length > 0) {\\n            // The easiest way to bubble the revert reason is using memory via assembly\\n            /// @solidity memory-safe-assembly\\n            assembly {\\n                let returndata_size := mload(returndata)\\n                revert(add(32, returndata), returndata_size)\\n            }\\n        } else {\\n            revert(errorMessage);\\n        }\\n    }\\n}\\n\",\"keccak256\":\"0x006dd67219697fe68d7fbfdea512e7c4cb64a43565ed86171d67e844982da6fa\",\"license\":\"MIT\"},\"@openzeppelin/contracts/utils/Context.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Provides information about the current execution context, including the\\n * sender of the transaction and its data. While these are generally available\\n * via msg.sender and msg.data, they should not be accessed in such a direct\\n * manner, since when dealing with meta-transactions the account sending and\\n * paying for execution may not be the actual sender (as far as an application\\n * is concerned).\\n *\\n * This contract is only required for intermediate, library-like contracts.\\n */\\nabstract contract Context {\\n    function _msgSender() internal view virtual returns (address) {\\n        return msg.sender;\\n    }\\n\\n    function _msgData() internal view virtual returns (bytes calldata) {\\n        return msg.data;\\n    }\\n}\\n\",\"keccak256\":\"0xe2e337e6dde9ef6b680e07338c493ebea1b5fd09b43424112868e9cc1706bca7\",\"license\":\"MIT\"},\"@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol\":{\"content\":\"pragma solidity >=0.5.0;\\n\\ninterface IUniswapV2Factory {\\n    event PairCreated(address indexed token0, address indexed token1, address pair, uint);\\n\\n    function feeTo() external view returns (address);\\n    function feeToSetter() external view returns (address);\\n\\n    function getPair(address tokenA, address tokenB) external view returns (address pair);\\n    function allPairs(uint) external view returns (address pair);\\n    function allPairsLength() external view returns (uint);\\n\\n    function createPair(address tokenA, address tokenB) external returns (address pair);\\n\\n    function setFeeTo(address) external;\\n    function setFeeToSetter(address) external;\\n}\\n\",\"keccak256\":\"0xe5905c0989cf5a865ed9bb7b9252536ca011c5b744017a82a7d4443b9c00a891\"},\"@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol\":{\"content\":\"pragma solidity >=0.5.0;\\n\\ninterface IUniswapV2Pair {\\n    event Approval(address indexed owner, address indexed spender, uint value);\\n    event Transfer(address indexed from, address indexed to, uint value);\\n\\n    function name() external pure returns (string memory);\\n    function symbol() external pure returns (string memory);\\n    function decimals() external pure returns (uint8);\\n    function totalSupply() external view returns (uint);\\n    function balanceOf(address owner) external view returns (uint);\\n    function allowance(address owner, address spender) external view returns (uint);\\n\\n    function approve(address spender, uint value) external returns (bool);\\n    function transfer(address to, uint value) external returns (bool);\\n    function transferFrom(address from, address to, uint value) external returns (bool);\\n\\n    function DOMAIN_SEPARATOR() external view returns (bytes32);\\n    function PERMIT_TYPEHASH() external pure returns (bytes32);\\n    function nonces(address owner) external view returns (uint);\\n\\n    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;\\n\\n    event Mint(address indexed sender, uint amount0, uint amount1);\\n    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);\\n    event Swap(\\n        address indexed sender,\\n        uint amount0In,\\n        uint amount1In,\\n        uint amount0Out,\\n        uint amount1Out,\\n        address indexed to\\n    );\\n    event Sync(uint112 reserve0, uint112 reserve1);\\n\\n    function MINIMUM_LIQUIDITY() external pure returns (uint);\\n    function factory() external view returns (address);\\n    function token0() external view returns (address);\\n    function token1() external view returns (address);\\n    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);\\n    function price0CumulativeLast() external view returns (uint);\\n    function price1CumulativeLast() external view returns (uint);\\n    function kLast() external view returns (uint);\\n\\n    function mint(address to) external returns (uint liquidity);\\n    function burn(address to) external returns (uint amount0, uint amount1);\\n    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;\\n    function skim(address to) external;\\n    function sync() external;\\n\\n    function initialize(address, address) external;\\n}\\n\",\"keccak256\":\"0x7c9bc70e5996c763e02ff38905282bc24fb242b0ef2519a003b36824fc524a4b\"},\"@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol\":{\"content\":\"pragma solidity >=0.6.2;\\n\\ninterface IUniswapV2Router01 {\\n    function factory() external pure returns (address);\\n    function WETH() external pure returns (address);\\n\\n    function addLiquidity(\\n        address tokenA,\\n        address tokenB,\\n        uint amountADesired,\\n        uint amountBDesired,\\n        uint amountAMin,\\n        uint amountBMin,\\n        address to,\\n        uint deadline\\n    ) external returns (uint amountA, uint amountB, uint liquidity);\\n    function addLiquidityETH(\\n        address token,\\n        uint amountTokenDesired,\\n        uint amountTokenMin,\\n        uint amountETHMin,\\n        address to,\\n        uint deadline\\n    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);\\n    function removeLiquidity(\\n        address tokenA,\\n        address tokenB,\\n        uint liquidity,\\n        uint amountAMin,\\n        uint amountBMin,\\n        address to,\\n        uint deadline\\n    ) external returns (uint amountA, uint amountB);\\n    function removeLiquidityETH(\\n        address token,\\n        uint liquidity,\\n        uint amountTokenMin,\\n        uint amountETHMin,\\n        address to,\\n        uint deadline\\n    ) external returns (uint amountToken, uint amountETH);\\n    function removeLiquidityWithPermit(\\n        address tokenA,\\n        address tokenB,\\n        uint liquidity,\\n        uint amountAMin,\\n        uint amountBMin,\\n        address to,\\n        uint deadline,\\n        bool approveMax, uint8 v, bytes32 r, bytes32 s\\n    ) external returns (uint amountA, uint amountB);\\n    function removeLiquidityETHWithPermit(\\n        address token,\\n        uint liquidity,\\n        uint amountTokenMin,\\n        uint amountETHMin,\\n        address to,\\n        uint deadline,\\n        bool approveMax, uint8 v, bytes32 r, bytes32 s\\n    ) external returns (uint amountToken, uint amountETH);\\n    function swapExactTokensForTokens(\\n        uint amountIn,\\n        uint amountOutMin,\\n        address[] calldata path,\\n        address to,\\n        uint deadline\\n    ) external returns (uint[] memory amounts);\\n    function swapTokensForExactTokens(\\n        uint amountOut,\\n        uint amountInMax,\\n        address[] calldata path,\\n        address to,\\n        uint deadline\\n    ) external returns (uint[] memory amounts);\\n    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)\\n        external\\n        payable\\n        returns (uint[] memory amounts);\\n    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)\\n        external\\n        returns (uint[] memory amounts);\\n    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)\\n        external\\n        returns (uint[] memory amounts);\\n    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)\\n        external\\n        payable\\n        returns (uint[] memory amounts);\\n\\n    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);\\n    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);\\n    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);\\n    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);\\n    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);\\n}\\n\",\"keccak256\":\"0x8a3c5c449d4b7cd76513ed6995f4b86e4a86f222c770f8442f5fc128ce29b4d2\"},\"@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol\":{\"content\":\"pragma solidity >=0.6.2;\\n\\nimport './IUniswapV2Router01.sol';\\n\\ninterface IUniswapV2Router02 is IUniswapV2Router01 {\\n    function removeLiquidityETHSupportingFeeOnTransferTokens(\\n        address token,\\n        uint liquidity,\\n        uint amountTokenMin,\\n        uint amountETHMin,\\n        address to,\\n        uint deadline\\n    ) external returns (uint amountETH);\\n    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(\\n        address token,\\n        uint liquidity,\\n        uint amountTokenMin,\\n        uint amountETHMin,\\n        address to,\\n        uint deadline,\\n        bool approveMax, uint8 v, bytes32 r, bytes32 s\\n    ) external returns (uint amountETH);\\n\\n    function swapExactTokensForTokensSupportingFeeOnTransferTokens(\\n        uint amountIn,\\n        uint amountOutMin,\\n        address[] calldata path,\\n        address to,\\n        uint deadline\\n    ) external;\\n    function swapExactETHForTokensSupportingFeeOnTransferTokens(\\n        uint amountOutMin,\\n        address[] calldata path,\\n        address to,\\n        uint deadline\\n    ) external payable;\\n    function swapExactTokensForETHSupportingFeeOnTransferTokens(\\n        uint amountIn,\\n        uint amountOutMin,\\n        address[] calldata path,\\n        address to,\\n        uint deadline\\n    ) external;\\n}\\n\",\"keccak256\":\"0x744e30c133bd0f7ca9e7163433cf6d72f45c6bb1508c2c9c02f1a6db796ae59d\"},\"contracts/gasless/GaslessSwapRouter.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.24;\\n\\nimport \\\"@openzeppelin/contracts/token/ERC20/IERC20.sol\\\";\\nimport \\\"@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol\\\";\\nimport \\\"@openzeppelin/contracts/access/Ownable.sol\\\";\\nimport \\\"@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol\\\";\\nimport \\\"@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol\\\";\\nimport \\\"@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol\\\";\\nimport \\\"./IKIP247.sol\\\";\\nimport \\\"./IWKAIA.sol\\\";\\n\\n/**\\n * @title GaslessSwapRouter\\n * @dev Implements KIP-247 gasless transaction functionality\\n * This contract allows users to swap ERC20 tokens for KAIA for gasless transaction.\\n *\\n * LIMITATIONS:\\n * - This contract does not support Fee-on-transfer (FoT) tokens\\n * - Using FoT tokens may result in transaction failures or incorrect amounts\\n */\\ncontract GaslessSwapRouter is IKIP247, Ownable {\\n    using SafeERC20 for IERC20;\\n    IWKAIA public immutable WKAIA;\\n\\n    mapping(address => DEXInfo) private _dexInfos;\\n    address[] private _supportedTokens;\\n\\n    uint256 public commissionRate; // 10000 = 100%\\n\\n    event SwappedForGas(\\n        address indexed proposer,\\n        uint256 amountRepaid,\\n        address indexed user,\\n        uint256 finalUserAmount,\\n        uint256 commission\\n    );\\n    event TokenAdded(address indexed token, address indexed factory, address router);\\n    event TokenRemoved(address indexed token);\\n    event CommissionRateUpdated(uint256 oldRate, uint256 newRate);\\n    event CommissionClaimed(uint256 amount);\\n\\n    constructor(address _wkaia) {\\n        require(_wkaia != address(0), \\\"Zero address is not allowed\\\");\\n        _transferOwnership(msg.sender);\\n        WKAIA = IWKAIA(_wkaia);\\n        commissionRate = 0;\\n    }\\n\\n    /**\\n     * @notice Adds a token to the list of supported tokens\\n     * @dev IMPORTANT: This contract does not support Fee-on-transfer (FoT) tokens.\\n     * Such tokens will not function correctly with this contract and should not be added.\\n     */\\n    function addToken(address token, address factory, address router) external override onlyOwner {\\n        require(token != address(0), \\\"Invalid token address\\\");\\n        require(factory != address(0), \\\"Invalid factory address\\\");\\n        require(router != address(0), \\\"Invalid router address\\\");\\n        require(_dexInfos[token].factory == address(0), \\\"TokenAlreadySupported\\\");\\n\\n        address pair;\\n        bool success;\\n        try IUniswapV2Factory(factory).getPair(token, address(WKAIA)) returns (address pairAddress) {\\n            pair = pairAddress;\\n            success = true;\\n        } catch {\\n            success = false;\\n        }\\n\\n        require(success, \\\"InvalidDEXAddress\\\");\\n        require(pair != address(0), \\\"PairDoesNotExist\\\");\\n\\n        (uint112 reserve0, uint112 reserve1, ) = IUniswapV2Pair(pair).getReserves();\\n        require(reserve0 > 0 && reserve1 > 0, \\\"NoLiquidity\\\");\\n\\n        _dexInfos[token] = DEXInfo({factory: factory, router: router});\\n\\n        _supportedTokens.push(token);\\n\\n        emit TokenAdded(token, factory, router);\\n    }\\n\\n    function removeToken(address token) external override onlyOwner {\\n        require(_dexInfos[token].factory != address(0), \\\"TokenNotSupported\\\");\\n\\n        delete _dexInfos[token];\\n\\n        for (uint i = 0; i < _supportedTokens.length; i++) {\\n            if (_supportedTokens[i] == token) {\\n                _supportedTokens[i] = _supportedTokens[_supportedTokens.length - 1];\\n                _supportedTokens.pop();\\n                break;\\n            }\\n        }\\n\\n        emit TokenRemoved(token);\\n    }\\n\\n    function dexAddress(address token) external view override returns (address) {\\n        require(_dexInfos[token].factory != address(0), \\\"TokenNotSupported\\\");\\n        return _dexInfos[token].factory;\\n    }\\n\\n    function getDEXInfo(address token) external view returns (address factory, address router) {\\n        require(isTokenSupported(token), \\\"TokenNotSupported\\\");\\n\\n        DEXInfo memory info = _dexInfos[token];\\n        return (info.factory, info.router);\\n    }\\n\\n    function claimCommission() external override onlyOwner {\\n        uint256 amount = address(this).balance;\\n        require(amount > 0, \\\"NoCommissionToWithdraw\\\");\\n\\n        (bool success, ) = owner().call{value: amount}(\\\"\\\");\\n        require(success, \\\"CommissionClaimFailed\\\");\\n\\n        emit CommissionClaimed(amount);\\n    }\\n\\n    function updateCommissionRate(uint256 _commissionRate) external override onlyOwner {\\n        require(_commissionRate <= 10000, \\\"InvalidCommissionRate\\\");\\n\\n        uint256 oldRate = commissionRate;\\n        commissionRate = _commissionRate;\\n\\n        emit CommissionRateUpdated(oldRate, _commissionRate);\\n    }\\n\\n    function swapForGas(\\n        address token,\\n        uint256 amountIn,\\n        uint256 minAmountOut,\\n        uint256 amountRepay,\\n        uint256 deadline\\n    ) external override {\\n        // R2: Token is whitelisted and has a corresponding DEX info\\n        require(isTokenSupported(token), \\\"TokenNotSupported\\\");\\n\\n        DEXInfo memory dexInfo = _dexInfos[token];\\n\\n        // R1: Sender has enough tokens\\n        require(IERC20(token).balanceOf(msg.sender) >= amountIn, \\\"Insufficient token balance\\\");\\n\\n        // Part of R3: Check minAmountOut >= amountRepay before swap\\n        require(minAmountOut >= amountRepay, \\\"InsufficientSwapOutput\\\");\\n\\n        // Get tokens from user\\n        IERC20(token).safeTransferFrom(msg.sender, address(this), amountIn);\\n\\n        // Approve tokens for router\\n        IERC20(token).safeApprove(dexInfo.router, amountIn);\\n\\n        // Set up path for swap\\n        address[] memory path = new address[](2);\\n        path[0] = token;\\n        path[1] = address(WKAIA);\\n\\n        // Execute swap using token-specific router\\n        IUniswapV2Router02 router = IUniswapV2Router02(dexInfo.router);\\n        uint256[] memory amounts = router.swapExactTokensForETH(amountIn, minAmountOut, path, address(this), deadline);\\n\\n        uint256 receivedAmount = amounts[1];\\n\\n        // Part of R3: Check receivedAmount >= minAmountOut after swap\\n        require(receivedAmount >= minAmountOut, \\\"ReceivedAmountBelowMinimum\\\");\\n\\n        // Pay the block proposer\\n        (bool success, ) = block.coinbase.call{value: amountRepay}(\\\"\\\");\\n        require(success, \\\"Failed to send KAIA to proposer\\\");\\n\\n        // Calculate commission\\n        uint256 userAmount = receivedAmount - amountRepay;\\n        uint256 commission = (userAmount * commissionRate) / 10000;\\n        uint256 finalUserAmount = userAmount - commission;\\n\\n        // Send remaining KAIA to user\\n        (bool userTransferSuccess, ) = msg.sender.call{value: finalUserAmount}(\\\"\\\");\\n        require(userTransferSuccess, \\\"FailedToSendKAIA\\\");\\n\\n        emit SwappedForGas(block.coinbase, amountRepay, msg.sender, finalUserAmount, commission);\\n    }\\n\\n    function getAmountIn(address token, uint256 amountOut) external view override returns (uint256 amountIn) {\\n        require(isTokenSupported(token), \\\"TokenNotSupported\\\");\\n\\n        DEXInfo memory dexInfo = _dexInfos[token];\\n\\n        address[] memory path = new address[](2);\\n        path[0] = token;\\n        path[1] = address(WKAIA);\\n\\n        // Use token-specific router\\n        IUniswapV2Router02 router = IUniswapV2Router02(dexInfo.router);\\n        uint256[] memory amounts = router.getAmountsIn(amountOut, path);\\n        return amounts[0];\\n    }\\n\\n    function isTokenSupported(address token) public view returns (bool) {\\n        return _dexInfos[token].factory != address(0);\\n    }\\n\\n    function getSupportedTokens() external view returns (address[] memory) {\\n        return _supportedTokens;\\n    }\\n\\n    receive() external payable {}\\n}\\n\",\"keccak256\":\"0x9a160866e8a35b04d74a92698cad11e8eefb8ab4c9181b7f73908684b9ef9374\",\"license\":\"MIT\"},\"contracts/gasless/IKIP247.sol\":{\"content\":\"// SPDX-License-Identifier: LGPL-3.0-only\\npragma solidity 0.8.24;\\n\\ninterface IKIP247 {\\n    // `factory` is to check if the token-WKAIA pair has been deployed. (`factory.getPair(token1, WKAIA)`)\\n    // `router` is for swap (`router.swapExactTokensForETH(...)`).\\n    struct DEXInfo {\\n        address factory;\\n        address router;\\n    }\\n\\n    function swapForGas(\\n        address token,\\n        uint256 amountIn,\\n        uint256 minAmountOut,\\n        uint256 amountRepay,\\n        uint256 deadline\\n    ) external;\\n\\n    function addToken(address token, address factory, address router) external;\\n\\n    function removeToken(address token) external;\\n\\n    function claimCommission() external;\\n\\n    function updateCommissionRate(uint256 _commissionRate) external;\\n\\n    function dexAddress(address token) external view returns (address dex);\\n\\n    function getAmountIn(address token, uint amountOut) external view returns (uint amountIn);\\n\\n    function getSupportedTokens() external view returns (address[] memory);\\n}\\n\",\"keccak256\":\"0xeb1f04b0f755494b7c05d95ac88f73525387b028335832241ebdddd32bff8b64\",\"license\":\"LGPL-3.0-only\"},\"contracts/gasless/IWKAIA.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity >=0.5.0;\\n\\ninterface IWKAIA {\\n    function deposit() external payable;\\n\\n    function withdraw(uint256) external;\\n\\n    function balanceOf(address) external view returns (uint256);\\n\\n    function approve(address, uint256) external returns (bool);\\n\\n    function transfer(address, uint256) external returns (bool);\\n\\n    function transferFrom(address, address, uint256) external returns (bool);\\n}\\n\",\"keccak256\":\"0x04e743fc5a7d1d0bf402bf19de7fdc7d1ca38ca5c4f12bb9411e1ec691b8b90f\",\"license\":\"MIT\"}},\"version\":1}",
  "bytecode": "0x60a0346100e557601f620019b138819003918201601f19168301916001600160401b038311848410176100ea578084926020946040528339810103126100e557516001600160a01b038116908190036100e55761005b33610100565b80156100a05761006a33610100565b6080526000600355604051611869908162000148823960805181818161044a01528181610a7701528181610fdc01526112c00152f35b60405162461bcd60e51b815260206004820152601b60248201527f5a65726f2061646472657373206973206e6f7420616c6c6f77656400000000006044820152606490fd5b600080fd5b634e487b7160e01b600052604160045260246000fd5b600080546001600160a01b039283166001600160a01b03198216811783559216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a356fe60406080815260048036101561001f575b5050361561001d57600080fd5b005b600091823560e01c8062fa3d50146112e4578063145d51d8146112a0578063161efb62146112035780635ea1d6f8146111e45780635fa7b5841461109b578063632db21c14610f3c578063715018a614610ed657806375151b6314610e8d57806380426901146108915780638da5cb5b1461086b578063c6e85b3b1461039e578063d3c7c2c714610302578063e3bcccb4146102ad578063f2fde38b146101c65763fad99f98146100d05750610010565b346101c257826003193601126101c2576100e86115ff565b479182156101805783808080866001600160a01b038254165af161010a6115a4565b501561013e57507f812744101ebaaf6b793a9a3057b00dff294aa41e3665594c617fc101fb0387dc9160209151908152a180f35b6020606492519162461bcd60e51b8352820152601560248201527f436f6d6d697373696f6e436c61696d4661696c656400000000000000000000006044820152fd5b6020606492519162461bcd60e51b8352820152601660248201527f4e6f436f6d6d697373696f6e546f5769746864726177000000000000000000006044820152fd5b8280fd5b5090346101c25760203660031901126101c2576101e1611388565b906101ea6115ff565b6001600160a01b0380921692831561024457505082548273ffffffffffffffffffffffffffffffffffffffff198216178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b906020608492519162461bcd60e51b8352820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b8382346102fe5760203660031901126102fe57602091816001600160a01b0391826102d6611388565b16808252600186526102ee84848420541615156113e0565b8152600185522054169051908152f35b5080fd5b50823461039b578060031936011261039b578151918291600254808552602080950194600283527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace92905b82821061037b576103778686610365828b0383611479565b519182916020835260208301906113a3565b0390f35b83546001600160a01b03168752958601956001938401939091019061034d565b80fd5b509190346102fe5760603660031901126102fe576103ba611388565b926024918235926001600160a01b039283851680950361086757604492833592858416809403610863576103ec6115ff565b8589169586156108225787156107e15784156107a0578689526020956001875281858b205416610760578961048d888d8c895180809581947fe6a439050000000000000000000000000000000000000000000000000000000083528a7f000000000000000000000000000000000000000000000000000000000000000016908d84019060209093929360408301946001600160a01b03809216845216910152565b03915afa8c9181610724575b5061071b57508a5b156106db578216801561069b57606085918751928380927f0902f1ac0000000000000000000000000000000000000000000000000000000082525afa908115610691578b908c92610633575b506dffffffffffffffffffffffffffff80911615159182610627575b5050156105e75750835161051c8161142b565b88815286810191868352888b5260018852600181878d209351169273ffffffffffffffffffffffffffffffffffffffff199384825416178155019251169082541617905560025491680100000000000000008310156105d65750507ffc43233c964efa713b168e2361b2c57eafddc32aa7f7d0f85c92e66e113aa28a949596976105af8260016105ce940160025561149b565b9091906001600160a01b038084549260031b9316831b921b1916179055565b51908152a380f35b60418991634e487b7160e01b835252fd5b9050600b7f4e6f4c69717569646974790000000000000000000000000000000000000000009287606496519562461bcd60e51b8752860152840152820152fd5b16151590503880610509565b9150506060813d606011610689575b8161064f60609383611479565b8101031261068557610660816115e4565b8661066c8a84016115e4565b92015163ffffffff81160361068157386104ed565b8b80fd5b8a80fd5b3d9150610642565b86513d8d823e3d90fd5b6064857f50616972446f65734e6f74457869737400000000000000000000000000000000846010888d8c519562461bcd60e51b8752860152840152820152fd5b6064857f496e76616c696444455841646472657373000000000000000000000000000000846011888d8c519562461bcd60e51b8752860152840152820152fd5b905060016104a1565b9091508981813d8311610759575b61073c8183611479565b8101031261075557518481168103610755579038610499565b8c80fd5b503d610732565b905060157f546f6b656e416c7265616479537570706f7274656400000000000000000000009287606496519562461bcd60e51b8752860152840152820152fd5b508460167f496e76616c696420726f75746572206164647265737300000000000000000000926020606496519562461bcd60e51b8752860152840152820152fd5b508460177f496e76616c696420666163746f72792061646472657373000000000000000000926020606496519562461bcd60e51b8752860152840152820152fd5b508460157f496e76616c696420746f6b656e20616464726573730000000000000000000000926020606496519562461bcd60e51b8752860152840152820152fd5b8780fd5b8580fd5b8382346102fe57816003193601126102fe576001600160a01b0360209254169051908152f35b5090346101c25760a03660031901126101c2576108ac611388565b9160248035936044938435906064918235976108e96108e4866001600160a01b03809116600052600160205260406000205416151590565b6113e0565b6001600160a01b0380951694858b5260209560018752888c2090878360018c51946109138661142b565b82815416865201541692019182528c8a517f70a08231000000000000000000000000000000000000000000000000000000008152338882015289818c81865afa918215610e8257908692610e4d575b5010610e0d578b8510610dcd5789517f23b872dd0000000000000000000000000000000000000000000000000000000089820152338a820152308c820152848882015287815260a081019067ffffffffffffffff9181811083821117610dba578f92916109d1918e5284611657565b8b85855116928b848b8a15948515610d19575b505050505015610cb1578b51917f095ea7b3000000000000000000000000000000000000000000000000000000008b8401528b830152858d8301528c8252608082019082821090821117610c9f57878f958b8f8f96908f9893610ae29460a093610a548f9e9a8e9a8d5282611657565b8a805196610a618861145d565b600288523690880137610a738661150b565b52817f000000000000000000000000000000000000000000000000000000000000000016610aa086611518565b52511697519a8b998a9889977f18cbafe500000000000000000000000000000000000000000000000000000000895288015286015284015260a48301906113a3565b308b830152608435608483015203925af1908115610c955790610b0c918b91610c73575b50611518565b51908110610c3557888080808b415af1610b246115a4565b5015610bf75787610b34916114e8565b95600354808802908882041488151715610be557612710610b57910480986114e8565b948980808089335af1610b686115a4565b5015610ba85750505050825194855284015282015233907f60a11b162898ec58576fd25d00009d335193695470e7b3c4a5a34ec15ea71ddc60604192a380f35b9060107f4661696c6564546f53656e644b41494100000000000000000000000000000000928689519562461bcd60e51b8752860152840152820152fd5b858a601185634e487b7160e01b835252fd5b507f4661696c656420746f2073656e64204b41494120746f2070726f706f7365720086601f868689519562461bcd60e51b8752860152840152820152fd5b507f5265636569766564416d6f756e7442656c6f774d696e696d756d00000000000086601a868689519562461bcd60e51b8752860152840152820152fd5b610c8f91503d808d833e610c878183611479565b810190611528565b38610b06565b87513d8c823e3d90fd5b8a8f60418a634e487b7160e01b835252fd5b50506084867f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000897f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f8f8f8f8f603692519762461bcd60e51b8952880152860152840152820152fd5b517fdd62ed3e000000000000000000000000000000000000000000000000000000008152309181019182526001600160a01b03909216602082015292935091829081906040010381885afa918215610daf5791610d7e575b50158f8b848f8c906109e4565b90508a81813d8311610da8575b610d958183611479565b81010312610da4575138610d71565b8f80fd5b503d610d8b565b8e51903d90823e3d90fd5b508a8f60418a634e487b7160e01b835252fd5b5085857f496e73756666696369656e74537761704f7574707574000000000000000000008c60168c8c8f519562461bcd60e51b8752860152840152820152fd5b5085857f496e73756666696369656e7420746f6b656e2062616c616e63650000000000008c601a8c8c8f519562461bcd60e51b8752860152840152820152fd5b8092508a8092503d8311610e7b575b610e668183611479565b81010312610e775784905138610962565b8d80fd5b503d610e5c565b8c51903d90823e3d90fd5b8382346102fe5760203660031901126102fe57602090610ecd610eae611388565b6001600160a01b03809116600052600160205260406000205416151590565b90519015158152f35b833461039b578060031936011261039b57610eef6115ff565b806001600160a01b03815473ffffffffffffffffffffffffffffffffffffffff1981168355167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b5090346101c257828260031936011261039b5761104b91610f5b611388565b90610f826108e4836001600160a01b03809116600052600160205260406000205416151590565b6001600160a01b038092169182845260016020528584206020826001895193610faa8561142b565b8281541685520154169101908152865193610fc48561145d565b6002855287366020870137610fd88561150b565b52817f00000000000000000000000000000000000000000000000000000000000000001661100585611518565b5251169085518095819482937f1f00ca740000000000000000000000000000000000000000000000000000000084526024359084015288602484015260448301906113a3565b03915afa90811561108f579061106c918460209592611074575b505061150b565b519051908152f35b61108892503d8091833e610c878183611479565b3880611065565b505051903d90823e3d90fd5b50346101c25760203660031901126101c2576001906110b8611388565b6110c06115ff565b6001600160a01b038091169384865285848594816020526110e785828520541615156113e0565b878352816020528220828155015585935b611126575b85857f4c910b69fe65a61f7531b9c5042b2329ca7179c77290aa7e2eb3afa3c8511fd38280a280f35b6002805490818610156111dd5783918761113f8861149b565b949054600395861b1c161461115b5750505082809401936110f8565b919590945060001992918381019081116111ca57906105af8561118061118d9461149b565b9054908a1b1c169161149b565b83549081156111b7575001926111a28461149b565b81939154921b1b1916905555388080806110fd565b876031602492634e487b7160e01b835252fd5b602489601185634e487b7160e01b835252fd5b50506110fd565b8382346102fe57816003193601126102fe576020906003549051908152f35b8382346102fe5760203660031901126102fe579061037782602093611226611388565b9361124d6108e4866001600160a01b03809116600052600160205260406000205416151590565b6001600160a01b03809516815260018652209281519061126c8261142b565b84548116808352600190950154169401849052516001600160a01b0392831681529190921660208201529081906040820190565b8382346102fe57816003193601126102fe57602090516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b5090346101c25760203660031901126101c2578035906113026115ff565b61271082116113455750907fd5b010b75d0703745f3c15954fbe4ac8aebb10e4c4aa09de04b1e1e195a67b9d91600354908060035582519182526020820152a180f35b606490602084519162461bcd60e51b8352820152601560248201527f496e76616c6964436f6d6d697373696f6e5261746500000000000000000000006044820152fd5b600435906001600160a01b038216820361139e57565b600080fd5b90815180825260208080930193019160005b8281106113c3575050505090565b83516001600160a01b0316855293810193928101926001016113b5565b156113e757565b606460405162461bcd60e51b815260206004820152601160248201527f546f6b656e4e6f74537570706f727465640000000000000000000000000000006044820152fd5b6040810190811067ffffffffffffffff82111761144757604052565b634e487b7160e01b600052604160045260246000fd5b6060810190811067ffffffffffffffff82111761144757604052565b90601f8019910116810190811067ffffffffffffffff82111761144757604052565b6002548110156114d25760026000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0190600090565b634e487b7160e01b600052603260045260246000fd5b919082039182116114f557565b634e487b7160e01b600052601160045260246000fd5b8051156114d25760200190565b8051600110156114d25760400190565b90602090818382031261139e57825167ffffffffffffffff9384821161139e570181601f8201121561139e578051938411611447578360051b906040519461157285840187611479565b8552838086019282010192831161139e578301905b828210611595575050505090565b81518152908301908301611587565b3d156115df573d9067ffffffffffffffff821161144757604051916115d3601f8201601f191660200184611479565b82523d6000602084013e565b606090565b51906dffffffffffffffffffffffffffff8216820361139e57565b6001600160a01b0360005416330361161357565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b6001600160a01b0316906116b76040516116708161142b565b6020938482527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564858301526000808587829751910182855af16116b16115a4565b91611760565b80519182159184831561173c575b5050509050156116d25750565b6084906040519062461bcd60e51b82526004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152fd5b9193818094500103126102fe5782015190811515820361039b5750803880846116c5565b919290156117c15750815115611774575090565b3b1561177d5790565b606460405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152fd5b8251909150156117d45750805190602001fd5b6040519062461bcd60e51b82528160208060048301528251908160248401526000935b82851061181a575050604492506000838284010152601f80199101168101030190fd5b84810182015186860160440152938101938593506117f756fea264697066735822122049a206df6d18aaf34e34c2d5c115b6c8c0c29a23f77d0ce4223f8f5df6e8288264736f6c63430008180033",
  "deployedBytecode": "0x60406080815260048036101561001f575b5050361561001d57600080fd5b005b600091823560e01c8062fa3d50146112e4578063145d51d8146112a0578063161efb62146112035780635ea1d6f8146111e45780635fa7b5841461109b578063632db21c14610f3c578063715018a614610ed657806375151b6314610e8d57806380426901146108915780638da5cb5b1461086b578063c6e85b3b1461039e578063d3c7c2c714610302578063e3bcccb4146102ad578063f2fde38b146101c65763fad99f98146100d05750610010565b346101c257826003193601126101c2576100e86115ff565b479182156101805783808080866001600160a01b038254165af161010a6115a4565b501561013e57507f812744101ebaaf6b793a9a3057b00dff294aa41e3665594c617fc101fb0387dc9160209151908152a180f35b6020606492519162461bcd60e51b8352820152601560248201527f436f6d6d697373696f6e436c61696d4661696c656400000000000000000000006044820152fd5b6020606492519162461bcd60e51b8352820152601660248201527f4e6f436f6d6d697373696f6e546f5769746864726177000000000000000000006044820152fd5b8280fd5b5090346101c25760203660031901126101c2576101e1611388565b906101ea6115ff565b6001600160a01b0380921692831561024457505082548273ffffffffffffffffffffffffffffffffffffffff198216178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b906020608492519162461bcd60e51b8352820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b8382346102fe5760203660031901126102fe57602091816001600160a01b0391826102d6611388565b16808252600186526102ee84848420541615156113e0565b8152600185522054169051908152f35b5080fd5b50823461039b578060031936011261039b578151918291600254808552602080950194600283527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace92905b82821061037b576103778686610365828b0383611479565b519182916020835260208301906113a3565b0390f35b83546001600160a01b03168752958601956001938401939091019061034d565b80fd5b509190346102fe5760603660031901126102fe576103ba611388565b926024918235926001600160a01b039283851680950361086757604492833592858416809403610863576103ec6115ff565b8589169586156108225787156107e15784156107a0578689526020956001875281858b205416610760578961048d888d8c895180809581947fe6a439050000000000000000000000000000000000000000000000000000000083528a7f000000000000000000000000000000000000000000000000000000000000000016908d84019060209093929360408301946001600160a01b03809216845216910152565b03915afa8c9181610724575b5061071b57508a5b156106db578216801561069b57606085918751928380927f0902f1ac0000000000000000000000000000000000000000000000000000000082525afa908115610691578b908c92610633575b506dffffffffffffffffffffffffffff80911615159182610627575b5050156105e75750835161051c8161142b565b88815286810191868352888b5260018852600181878d209351169273ffffffffffffffffffffffffffffffffffffffff199384825416178155019251169082541617905560025491680100000000000000008310156105d65750507ffc43233c964efa713b168e2361b2c57eafddc32aa7f7d0f85c92e66e113aa28a949596976105af8260016105ce940160025561149b565b9091906001600160a01b038084549260031b9316831b921b1916179055565b51908152a380f35b60418991634e487b7160e01b835252fd5b9050600b7f4e6f4c69717569646974790000000000000000000000000000000000000000009287606496519562461bcd60e51b8752860152840152820152fd5b16151590503880610509565b9150506060813d606011610689575b8161064f60609383611479565b8101031261068557610660816115e4565b8661066c8a84016115e4565b92015163ffffffff81160361068157386104ed565b8b80fd5b8a80fd5b3d9150610642565b86513d8d823e3d90fd5b6064857f50616972446f65734e6f74457869737400000000000000000000000000000000846010888d8c519562461bcd60e51b8752860152840152820152fd5b6064857f496e76616c696444455841646472657373000000000000000000000000000000846011888d8c519562461bcd60e51b8752860152840152820152fd5b905060016104a1565b9091508981813d8311610759575b61073c8183611479565b8101031261075557518481168103610755579038610499565b8c80fd5b503d610732565b905060157f546f6b656e416c7265616479537570706f7274656400000000000000000000009287606496519562461bcd60e51b8752860152840152820152fd5b508460167f496e76616c696420726f75746572206164647265737300000000000000000000926020606496519562461bcd60e51b8752860152840152820152fd5b508460177f496e76616c696420666163746f72792061646472657373000000000000000000926020606496519562461bcd60e51b8752860152840152820152fd5b508460157f496e76616c696420746f6b656e20616464726573730000000000000000000000926020606496519562461bcd60e51b8752860152840152820152fd5b8780fd5b8580fd5b8382346102fe57816003193601126102fe576001600160a01b0360209254169051908152f35b5090346101c25760a03660031901126101c2576108ac611388565b9160248035936044938435906064918235976108e96108e4866001600160a01b03809116600052600160205260406000205416151590565b6113e0565b6001600160a01b0380951694858b5260209560018752888c2090878360018c51946109138661142b565b82815416865201541692019182528c8a517f70a08231000000000000000000000000000000000000000000000000000000008152338882015289818c81865afa918215610e8257908692610e4d575b5010610e0d578b8510610dcd5789517f23b872dd0000000000000000000000000000000000000000000000000000000089820152338a820152308c820152848882015287815260a081019067ffffffffffffffff9181811083821117610dba578f92916109d1918e5284611657565b8b85855116928b848b8a15948515610d19575b505050505015610cb1578b51917f095ea7b3000000000000000000000000000000000000000000000000000000008b8401528b830152858d8301528c8252608082019082821090821117610c9f57878f958b8f8f96908f9893610ae29460a093610a548f9e9a8e9a8d5282611657565b8a805196610a618861145d565b600288523690880137610a738661150b565b52817f000000000000000000000000000000000000000000000000000000000000000016610aa086611518565b52511697519a8b998a9889977f18cbafe500000000000000000000000000000000000000000000000000000000895288015286015284015260a48301906113a3565b308b830152608435608483015203925af1908115610c955790610b0c918b91610c73575b50611518565b51908110610c3557888080808b415af1610b246115a4565b5015610bf75787610b34916114e8565b95600354808802908882041488151715610be557612710610b57910480986114e8565b948980808089335af1610b686115a4565b5015610ba85750505050825194855284015282015233907f60a11b162898ec58576fd25d00009d335193695470e7b3c4a5a34ec15ea71ddc60604192a380f35b9060107f4661696c6564546f53656e644b41494100000000000000000000000000000000928689519562461bcd60e51b8752860152840152820152fd5b858a601185634e487b7160e01b835252fd5b507f4661696c656420746f2073656e64204b41494120746f2070726f706f7365720086601f868689519562461bcd60e51b8752860152840152820152fd5b507f5265636569766564416d6f756e7442656c6f774d696e696d756d00000000000086601a868689519562461bcd60e51b8752860152840152820152fd5b610c8f91503d808d833e610c878183611479565b810190611528565b38610b06565b87513d8c823e3d90fd5b8a8f60418a634e487b7160e01b835252fd5b50506084867f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000897f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f8f8f8f8f603692519762461bcd60e51b8952880152860152840152820152fd5b517fdd62ed3e000000000000000000000000000000000000000000000000000000008152309181019182526001600160a01b03909216602082015292935091829081906040010381885afa918215610daf5791610d7e575b50158f8b848f8c906109e4565b90508a81813d8311610da8575b610d958183611479565b81010312610da4575138610d71565b8f80fd5b503d610d8b565b8e51903d90823e3d90fd5b508a8f60418a634e487b7160e01b835252fd5b5085857f496e73756666696369656e74537761704f7574707574000000000000000000008c60168c8c8f519562461bcd60e51b8752860152840152820152fd5b5085857f496e73756666696369656e7420746f6b656e2062616c616e63650000000000008c601a8c8c8f519562461bcd60e51b8752860152840152820152fd5b8092508a8092503d8311610e7b575b610e668183611479565b81010312610e775784905138610962565b8d80fd5b503d610e5c565b8c51903d90823e3d90fd5b8382346102fe5760203660031901126102fe57602090610ecd610eae611388565b6001600160a01b03809116600052600160205260406000205416151590565b90519015158152f35b833461039b578060031936011261039b57610eef6115ff565b806001600160a01b03815473ffffffffffffffffffffffffffffffffffffffff1981168355167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b5090346101c257828260031936011261039b5761104b91610f5b611388565b90610f826108e4836001600160a01b03809116600052600160205260406000205416151590565b6001600160a01b038092169182845260016020528584206020826001895193610faa8561142b565b8281541685520154169101908152865193610fc48561145d565b6002855287366020870137610fd88561150b565b52817f00000000000000000000000000000000000000000000000000000000000000001661100585611518565b5251169085518095819482937f1f00ca740000000000000000000000000000000000000000000000000000000084526024359084015288602484015260448301906113a3565b03915afa90811561108f579061106c918460209592611074575b505061150b565b519051908152f35b61108892503d8091833e610c878183611479565b3880611065565b505051903d90823e3d90fd5b50346101c25760203660031901126101c2576001906110b8611388565b6110c06115ff565b6001600160a01b038091169384865285848594816020526110e785828520541615156113e0565b878352816020528220828155015585935b611126575b85857f4c910b69fe65a61f7531b9c5042b2329ca7179c77290aa7e2eb3afa3c8511fd38280a280f35b6002805490818610156111dd5783918761113f8861149b565b949054600395861b1c161461115b5750505082809401936110f8565b919590945060001992918381019081116111ca57906105af8561118061118d9461149b565b9054908a1b1c169161149b565b83549081156111b7575001926111a28461149b565b81939154921b1b1916905555388080806110fd565b876031602492634e487b7160e01b835252fd5b602489601185634e487b7160e01b835252fd5b50506110fd565b8382346102fe57816003193601126102fe576020906003549051908152f35b8382346102fe5760203660031901126102fe579061037782602093611226611388565b9361124d6108e4866001600160a01b03809116600052600160205260406000205416151590565b6001600160a01b03809516815260018652209281519061126c8261142b565b84548116808352600190950154169401849052516001600160a01b0392831681529190921660208201529081906040820190565b8382346102fe57816003193601126102fe57602090516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b5090346101c25760203660031901126101c2578035906113026115ff565b61271082116113455750907fd5b010b75d0703745f3c15954fbe4ac8aebb10e4c4aa09de04b1e1e195a67b9d91600354908060035582519182526020820152a180f35b606490602084519162461bcd60e51b8352820152601560248201527f496e76616c6964436f6d6d697373696f6e5261746500000000000000000000006044820152fd5b600435906001600160a01b038216820361139e57565b600080fd5b90815180825260208080930193019160005b8281106113c3575050505090565b83516001600160a01b0316855293810193928101926001016113b5565b156113e757565b606460405162461bcd60e51b815260206004820152601160248201527f546f6b656e4e6f74537570706f727465640000000000000000000000000000006044820152fd5b6040810190811067ffffffffffffffff82111761144757604052565b634e487b7160e01b600052604160045260246000fd5b6060810190811067ffffffffffffffff82111761144757604052565b90601f8019910116810190811067ffffffffffffffff82111761144757604052565b6002548110156114d25760026000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0190600090565b634e487b7160e01b600052603260045260246000fd5b919082039182116114f557565b634e487b7160e01b600052601160045260246000fd5b8051156114d25760200190565b8051600110156114d25760400190565b90602090818382031261139e57825167ffffffffffffffff9384821161139e570181601f8201121561139e578051938411611447578360051b906040519461157285840187611479565b8552838086019282010192831161139e578301905b828210611595575050505090565b81518152908301908301611587565b3d156115df573d9067ffffffffffffffff821161144757604051916115d3601f8201601f191660200184611479565b82523d6000602084013e565b606090565b51906dffffffffffffffffffffffffffff8216820361139e57565b6001600160a01b0360005416330361161357565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b6001600160a01b0316906116b76040516116708161142b565b6020938482527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564858301526000808587829751910182855af16116b16115a4565b91611760565b80519182159184831561173c575b5050509050156116d25750565b6084906040519062461bcd60e51b82526004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152fd5b9193818094500103126102fe5782015190811515820361039b5750803880846116c5565b919290156117c15750815115611774575090565b3b1561177d5790565b606460405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152fd5b8251909150156117d45750805190602001fd5b6040519062461bcd60e51b82528160208060048301528251908160248401526000935b82851061181a575050604492506000838284010152601f80199101168101030190fd5b84810182015186860160440152938101938593506117f756fea264697066735822122049a206df6d18aaf34e34c2d5c115b6c8c0c29a23f77d0ce4223f8f5df6e8288264736f6c63430008180033",
  "devdoc": {
    "details": "Implements KIP-247 gasless transaction functionality This contract allows users to swap ERC20 tokens for KAIA for gasless transaction. LIMITATIONS: - This contract does not support Fee-on-transfer (FoT) tokens - Using FoT tokens may result in transaction failures or incorrect amounts",
    "kind": "dev",
    "methods": {
      "addToken(address,address,address)": {
        "details": "IMPORTANT: This contract does not support Fee-on-transfer (FoT) tokens. Such tokens will not function correctly with this contract and should not be added."
      },
      "owner()": {
        "details": "Returns the address of the current owner."
      },
      "renounceOwnership()": {
        "details": "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner."
      },
      "transferOwnership(address)": {
        "details": "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."
      }
    },
    "title": "GaslessSwapRouter",
    "version": 1
  },
  "userdoc": {
    "kind": "user",
    "methods": {
      "addToken(address,address,address)": {
        "notice": "Adds a token to the list of supported tokens"
      }
    },
    "version": 1
  },
  "storageLayout": {
    "storage": [
      {
        "astId": 7,
        "contract": "contracts/gasless/GaslessSwapRouter.sol:GaslessSwapRouter",
        "label": "_owner",
        "offset": 0,
        "slot": "0",
        "type": "t_address"
      },
      {
        "astId": 1682,
        "contract": "contracts/gasless/GaslessSwapRouter.sol:GaslessSwapRouter",
        "label": "_dexInfos",
        "offset": 0,
        "slot": "1",
        "type": "t_mapping(t_address,t_struct(DEXInfo)2406_storage)"
      },
      {
        "astId": 1685,
        "contract": "contracts/gasless/GaslessSwapRouter.sol:GaslessSwapRouter",
        "label": "_supportedTokens",
        "offset": 0,
        "slot": "2",
        "type": "t_array(t_address)dyn_storage"
      },
      {
        "astId": 1687,
        "contract": "contracts/gasless/GaslessSwapRouter.sol:GaslessSwapRouter",
        "label": "commissionRate",
        "offset": 0,
        "slot": "3",
        "type": "t_uint256"
      }
    ],
    "types": {
      "t_address": {
        "encoding": "inplace",
        "label": "address",
        "numberOfBytes": "20"
      },
      "t_array(t_address)dyn_storage": {
        "base": "t_address",
        "encoding": "dynamic_array",
        "label": "address[]",
        "numberOfBytes": "32"
      },
      "t_mapping(t_address,t_struct(DEXInfo)2406_storage)": {
        "encoding": "mapping",
        "key": "t_address",
        "label": "mapping(address => struct IKIP247.DEXInfo)",
        "numberOfBytes": "32",
        "value": "t_struct(DEXInfo)2406_storage"
      },
      "t_struct(DEXInfo)2406_storage": {
        "encoding": "inplace",
        "label": "struct IKIP247.DEXInfo",
        "members": [
          {
            "astId": 2403,
            "contract": "contracts/gasless/GaslessSwapRouter.sol:GaslessSwapRouter",
            "label": "factory",
            "offset": 0,
            "slot": "0",
            "type": "t_address"
          },
          {
            "astId": 2405,
            "contract": "contracts/gasless/GaslessSwapRouter.sol:GaslessSwapRouter",
            "label": "router",
            "offset": 0,
            "slot": "1",
            "type": "t_address"
          }
        ],
        "numberOfBytes": "64"
      },
      "t_uint256": {
        "encoding": "inplace",
        "label": "uint256",
        "numberOfBytes": "32"
      }
    }
  }
} as const;
