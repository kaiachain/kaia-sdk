"use strict";
var PrivySDK = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from14, except, desc) => {
    if (from14 && typeof from14 === "object" || typeof from14 === "function") {
      for (let key of __getOwnPropNames(from14))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from14[key], enumerable: !(desc = __getOwnPropDesc(from14, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

  // node_modules/abitype/dist/esm/version.js
  var version;
  var init_version = __esm({
    "node_modules/abitype/dist/esm/version.js"() {
      version = "1.2.3";
    }
  });

  // node_modules/abitype/dist/esm/errors.js
  var BaseError;
  var init_errors = __esm({
    "node_modules/abitype/dist/esm/errors.js"() {
      init_version();
      BaseError = class _BaseError extends Error {
        constructor(shortMessage, args = {}) {
          const details = args.cause instanceof _BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
          const docsPath8 = args.cause instanceof _BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
          const message = [
            shortMessage || "An error occurred.",
            "",
            ...args.metaMessages ? [...args.metaMessages, ""] : [],
            ...docsPath8 ? [`Docs: https://abitype.dev${docsPath8}`] : [],
            ...details ? [`Details: ${details}`] : [],
            `Version: abitype@${version}`
          ].join("\n");
          super(message);
          Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "AbiTypeError"
          });
          if (args.cause)
            this.cause = args.cause;
          this.details = details;
          this.docsPath = docsPath8;
          this.metaMessages = args.metaMessages;
          this.shortMessage = shortMessage;
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/regex.js
  function execTyped(regex, string) {
    const match = regex.exec(string);
    return match?.groups;
  }
  var bytesRegex, integerRegex, isTupleRegex;
  var init_regex = __esm({
    "node_modules/abitype/dist/esm/regex.js"() {
      bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
      integerRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
      isTupleRegex = /^\(.+?\).*?$/;
    }
  });

  // node_modules/abitype/dist/esm/human-readable/formatAbiParameter.js
  function formatAbiParameter(abiParameter) {
    let type = abiParameter.type;
    if (tupleRegex.test(abiParameter.type) && "components" in abiParameter) {
      type = "(";
      const length = abiParameter.components.length;
      for (let i20 = 0; i20 < length; i20++) {
        const component = abiParameter.components[i20];
        type += formatAbiParameter(component);
        if (i20 < length - 1)
          type += ", ";
      }
      const result = execTyped(tupleRegex, abiParameter.type);
      type += `)${result?.array || ""}`;
      return formatAbiParameter({
        ...abiParameter,
        type
      });
    }
    if ("indexed" in abiParameter && abiParameter.indexed)
      type = `${type} indexed`;
    if (abiParameter.name)
      return `${type} ${abiParameter.name}`;
    return type;
  }
  var tupleRegex;
  var init_formatAbiParameter = __esm({
    "node_modules/abitype/dist/esm/human-readable/formatAbiParameter.js"() {
      init_regex();
      tupleRegex = /^tuple(?<array>(\[(\d*)\])*)$/;
    }
  });

  // node_modules/abitype/dist/esm/human-readable/formatAbiParameters.js
  function formatAbiParameters(abiParameters) {
    let params = "";
    const length = abiParameters.length;
    for (let i20 = 0; i20 < length; i20++) {
      const abiParameter = abiParameters[i20];
      params += formatAbiParameter(abiParameter);
      if (i20 !== length - 1)
        params += ", ";
    }
    return params;
  }
  var init_formatAbiParameters = __esm({
    "node_modules/abitype/dist/esm/human-readable/formatAbiParameters.js"() {
      init_formatAbiParameter();
    }
  });

  // node_modules/abitype/dist/esm/human-readable/formatAbiItem.js
  function formatAbiItem(abiItem) {
    if (abiItem.type === "function")
      return `function ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability && abiItem.stateMutability !== "nonpayable" ? ` ${abiItem.stateMutability}` : ""}${abiItem.outputs?.length ? ` returns (${formatAbiParameters(abiItem.outputs)})` : ""}`;
    if (abiItem.type === "event")
      return `event ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
    if (abiItem.type === "error")
      return `error ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
    if (abiItem.type === "constructor")
      return `constructor(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability === "payable" ? " payable" : ""}`;
    if (abiItem.type === "fallback")
      return `fallback() external${abiItem.stateMutability === "payable" ? " payable" : ""}`;
    return "receive() external payable";
  }
  var init_formatAbiItem = __esm({
    "node_modules/abitype/dist/esm/human-readable/formatAbiItem.js"() {
      init_formatAbiParameters();
    }
  });

  // node_modules/abitype/dist/esm/human-readable/runtime/signatures.js
  function isErrorSignature(signature) {
    return errorSignatureRegex.test(signature);
  }
  function execErrorSignature(signature) {
    return execTyped(errorSignatureRegex, signature);
  }
  function isEventSignature(signature) {
    return eventSignatureRegex.test(signature);
  }
  function execEventSignature(signature) {
    return execTyped(eventSignatureRegex, signature);
  }
  function isFunctionSignature(signature) {
    return functionSignatureRegex.test(signature);
  }
  function execFunctionSignature(signature) {
    return execTyped(functionSignatureRegex, signature);
  }
  function isStructSignature(signature) {
    return structSignatureRegex.test(signature);
  }
  function execStructSignature(signature) {
    return execTyped(structSignatureRegex, signature);
  }
  function isConstructorSignature(signature) {
    return constructorSignatureRegex.test(signature);
  }
  function execConstructorSignature(signature) {
    return execTyped(constructorSignatureRegex, signature);
  }
  function isFallbackSignature(signature) {
    return fallbackSignatureRegex.test(signature);
  }
  function execFallbackSignature(signature) {
    return execTyped(fallbackSignatureRegex, signature);
  }
  function isReceiveSignature(signature) {
    return receiveSignatureRegex.test(signature);
  }
  var errorSignatureRegex, eventSignatureRegex, functionSignatureRegex, structSignatureRegex, constructorSignatureRegex, fallbackSignatureRegex, receiveSignatureRegex, modifiers, eventModifiers, functionModifiers;
  var init_signatures = __esm({
    "node_modules/abitype/dist/esm/human-readable/runtime/signatures.js"() {
      init_regex();
      errorSignatureRegex = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
      eventSignatureRegex = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
      functionSignatureRegex = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
      structSignatureRegex = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
      constructorSignatureRegex = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
      fallbackSignatureRegex = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
      receiveSignatureRegex = /^receive\(\) external payable$/;
      modifiers = /* @__PURE__ */ new Set([
        "memory",
        "indexed",
        "storage",
        "calldata"
      ]);
      eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
      functionModifiers = /* @__PURE__ */ new Set([
        "calldata",
        "memory",
        "storage"
      ]);
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/abiItem.js
  var InvalidAbiItemError, UnknownTypeError, UnknownSolidityTypeError;
  var init_abiItem = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/abiItem.js"() {
      init_errors();
      InvalidAbiItemError = class extends BaseError {
        constructor({ signature }) {
          super("Failed to parse ABI item.", {
            details: `parseAbiItem(${JSON.stringify(signature, null, 2)})`,
            docsPath: "/api/human#parseabiitem-1"
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidAbiItemError"
          });
        }
      };
      UnknownTypeError = class extends BaseError {
        constructor({ type }) {
          super("Unknown type.", {
            metaMessages: [
              `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "UnknownTypeError"
          });
        }
      };
      UnknownSolidityTypeError = class extends BaseError {
        constructor({ type }) {
          super("Unknown type.", {
            metaMessages: [`Type "${type}" is not a valid ABI type.`]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "UnknownSolidityTypeError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js
  var InvalidAbiParametersError, InvalidParameterError, SolidityProtectedKeywordError, InvalidModifierError, InvalidFunctionModifierError, InvalidAbiTypeParameterError;
  var init_abiParameter = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js"() {
      init_errors();
      InvalidAbiParametersError = class extends BaseError {
        constructor({ params }) {
          super("Failed to parse ABI parameters.", {
            details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
            docsPath: "/api/human#parseabiparameters-1"
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidAbiParametersError"
          });
        }
      };
      InvalidParameterError = class extends BaseError {
        constructor({ param }) {
          super("Invalid ABI parameter.", {
            details: param
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidParameterError"
          });
        }
      };
      SolidityProtectedKeywordError = class extends BaseError {
        constructor({ param, name }) {
          super("Invalid ABI parameter.", {
            details: param,
            metaMessages: [
              `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "SolidityProtectedKeywordError"
          });
        }
      };
      InvalidModifierError = class extends BaseError {
        constructor({ param, type, modifier }) {
          super("Invalid ABI parameter.", {
            details: param,
            metaMessages: [
              `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidModifierError"
          });
        }
      };
      InvalidFunctionModifierError = class extends BaseError {
        constructor({ param, type, modifier }) {
          super("Invalid ABI parameter.", {
            details: param,
            metaMessages: [
              `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`,
              `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidFunctionModifierError"
          });
        }
      };
      InvalidAbiTypeParameterError = class extends BaseError {
        constructor({ abiParameter }) {
          super("Invalid ABI parameter.", {
            details: JSON.stringify(abiParameter, null, 2),
            metaMessages: ["ABI parameter type is invalid."]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidAbiTypeParameterError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/signature.js
  var InvalidSignatureError, UnknownSignatureError, InvalidStructSignatureError;
  var init_signature = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/signature.js"() {
      init_errors();
      InvalidSignatureError = class extends BaseError {
        constructor({ signature, type }) {
          super(`Invalid ${type} signature.`, {
            details: signature
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidSignatureError"
          });
        }
      };
      UnknownSignatureError = class extends BaseError {
        constructor({ signature }) {
          super("Unknown signature.", {
            details: signature
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "UnknownSignatureError"
          });
        }
      };
      InvalidStructSignatureError = class extends BaseError {
        constructor({ signature }) {
          super("Invalid struct signature.", {
            details: signature,
            metaMessages: ["No properties exist."]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidStructSignatureError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/struct.js
  var CircularReferenceError;
  var init_struct = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/struct.js"() {
      init_errors();
      CircularReferenceError = class extends BaseError {
        constructor({ type }) {
          super("Circular reference detected.", {
            metaMessages: [`Struct "${type}" is a circular reference.`]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "CircularReferenceError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js
  var InvalidParenthesisError;
  var init_splitParameters = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js"() {
      init_errors();
      InvalidParenthesisError = class extends BaseError {
        constructor({ current, depth }) {
          super("Unbalanced parentheses.", {
            metaMessages: [
              `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
            ],
            details: `Depth "${depth}"`
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidParenthesisError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/runtime/cache.js
  function getParameterCacheKey(param, type, structs) {
    let structKey = "";
    if (structs)
      for (const struct of Object.entries(structs)) {
        if (!struct)
          continue;
        let propertyKey = "";
        for (const property of struct[1]) {
          propertyKey += `[${property.type}${property.name ? `:${property.name}` : ""}]`;
        }
        structKey += `(${struct[0]}{${propertyKey}})`;
      }
    if (type)
      return `${type}:${param}${structKey}`;
    return `${param}${structKey}`;
  }
  var parameterCache;
  var init_cache = __esm({
    "node_modules/abitype/dist/esm/human-readable/runtime/cache.js"() {
      parameterCache = /* @__PURE__ */ new Map([
        // Unnamed
        ["address", { type: "address" }],
        ["bool", { type: "bool" }],
        ["bytes", { type: "bytes" }],
        ["bytes32", { type: "bytes32" }],
        ["int", { type: "int256" }],
        ["int256", { type: "int256" }],
        ["string", { type: "string" }],
        ["uint", { type: "uint256" }],
        ["uint8", { type: "uint8" }],
        ["uint16", { type: "uint16" }],
        ["uint24", { type: "uint24" }],
        ["uint32", { type: "uint32" }],
        ["uint64", { type: "uint64" }],
        ["uint96", { type: "uint96" }],
        ["uint112", { type: "uint112" }],
        ["uint160", { type: "uint160" }],
        ["uint192", { type: "uint192" }],
        ["uint256", { type: "uint256" }],
        // Named
        ["address owner", { type: "address", name: "owner" }],
        ["address to", { type: "address", name: "to" }],
        ["bool approved", { type: "bool", name: "approved" }],
        ["bytes _data", { type: "bytes", name: "_data" }],
        ["bytes data", { type: "bytes", name: "data" }],
        ["bytes signature", { type: "bytes", name: "signature" }],
        ["bytes32 hash", { type: "bytes32", name: "hash" }],
        ["bytes32 r", { type: "bytes32", name: "r" }],
        ["bytes32 root", { type: "bytes32", name: "root" }],
        ["bytes32 s", { type: "bytes32", name: "s" }],
        ["string name", { type: "string", name: "name" }],
        ["string symbol", { type: "string", name: "symbol" }],
        ["string tokenURI", { type: "string", name: "tokenURI" }],
        ["uint tokenId", { type: "uint256", name: "tokenId" }],
        ["uint8 v", { type: "uint8", name: "v" }],
        ["uint256 balance", { type: "uint256", name: "balance" }],
        ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
        ["uint256 value", { type: "uint256", name: "value" }],
        // Indexed
        [
          "event:address indexed from",
          { type: "address", name: "from", indexed: true }
        ],
        ["event:address indexed to", { type: "address", name: "to", indexed: true }],
        [
          "event:uint indexed tokenId",
          { type: "uint256", name: "tokenId", indexed: true }
        ],
        [
          "event:uint256 indexed tokenId",
          { type: "uint256", name: "tokenId", indexed: true }
        ]
      ]);
    }
  });

  // node_modules/abitype/dist/esm/human-readable/runtime/utils.js
  function parseSignature(signature, structs = {}) {
    if (isFunctionSignature(signature))
      return parseFunctionSignature(signature, structs);
    if (isEventSignature(signature))
      return parseEventSignature(signature, structs);
    if (isErrorSignature(signature))
      return parseErrorSignature(signature, structs);
    if (isConstructorSignature(signature))
      return parseConstructorSignature(signature, structs);
    if (isFallbackSignature(signature))
      return parseFallbackSignature(signature);
    if (isReceiveSignature(signature))
      return {
        type: "receive",
        stateMutability: "payable"
      };
    throw new UnknownSignatureError({ signature });
  }
  function parseFunctionSignature(signature, structs = {}) {
    const match = execFunctionSignature(signature);
    if (!match)
      throw new InvalidSignatureError({ signature, type: "function" });
    const inputParams = splitParameters(match.parameters);
    const inputs = [];
    const inputLength = inputParams.length;
    for (let i20 = 0; i20 < inputLength; i20++) {
      inputs.push(parseAbiParameter(inputParams[i20], {
        modifiers: functionModifiers,
        structs,
        type: "function"
      }));
    }
    const outputs = [];
    if (match.returns) {
      const outputParams = splitParameters(match.returns);
      const outputLength = outputParams.length;
      for (let i20 = 0; i20 < outputLength; i20++) {
        outputs.push(parseAbiParameter(outputParams[i20], {
          modifiers: functionModifiers,
          structs,
          type: "function"
        }));
      }
    }
    return {
      name: match.name,
      type: "function",
      stateMutability: match.stateMutability ?? "nonpayable",
      inputs,
      outputs
    };
  }
  function parseEventSignature(signature, structs = {}) {
    const match = execEventSignature(signature);
    if (!match)
      throw new InvalidSignatureError({ signature, type: "event" });
    const params = splitParameters(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i20 = 0; i20 < length; i20++)
      abiParameters.push(parseAbiParameter(params[i20], {
        modifiers: eventModifiers,
        structs,
        type: "event"
      }));
    return { name: match.name, type: "event", inputs: abiParameters };
  }
  function parseErrorSignature(signature, structs = {}) {
    const match = execErrorSignature(signature);
    if (!match)
      throw new InvalidSignatureError({ signature, type: "error" });
    const params = splitParameters(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i20 = 0; i20 < length; i20++)
      abiParameters.push(parseAbiParameter(params[i20], { structs, type: "error" }));
    return { name: match.name, type: "error", inputs: abiParameters };
  }
  function parseConstructorSignature(signature, structs = {}) {
    const match = execConstructorSignature(signature);
    if (!match)
      throw new InvalidSignatureError({ signature, type: "constructor" });
    const params = splitParameters(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i20 = 0; i20 < length; i20++)
      abiParameters.push(parseAbiParameter(params[i20], { structs, type: "constructor" }));
    return {
      type: "constructor",
      stateMutability: match.stateMutability ?? "nonpayable",
      inputs: abiParameters
    };
  }
  function parseFallbackSignature(signature) {
    const match = execFallbackSignature(signature);
    if (!match)
      throw new InvalidSignatureError({ signature, type: "fallback" });
    return {
      type: "fallback",
      stateMutability: match.stateMutability ?? "nonpayable"
    };
  }
  function parseAbiParameter(param, options) {
    const parameterCacheKey = getParameterCacheKey(param, options?.type, options?.structs);
    if (parameterCache.has(parameterCacheKey))
      return parameterCache.get(parameterCacheKey);
    const isTuple = isTupleRegex.test(param);
    const match = execTyped(isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex, param);
    if (!match)
      throw new InvalidParameterError({ param });
    if (match.name && isSolidityKeyword(match.name))
      throw new SolidityProtectedKeywordError({ param, name: match.name });
    const name = match.name ? { name: match.name } : {};
    const indexed = match.modifier === "indexed" ? { indexed: true } : {};
    const structs = options?.structs ?? {};
    let type;
    let components = {};
    if (isTuple) {
      type = "tuple";
      const params = splitParameters(match.type);
      const components_ = [];
      const length = params.length;
      for (let i20 = 0; i20 < length; i20++) {
        components_.push(parseAbiParameter(params[i20], { structs }));
      }
      components = { components: components_ };
    } else if (match.type in structs) {
      type = "tuple";
      components = { components: structs[match.type] };
    } else if (dynamicIntegerRegex.test(match.type)) {
      type = `${match.type}256`;
    } else if (match.type === "address payable") {
      type = "address";
    } else {
      type = match.type;
      if (!(options?.type === "struct") && !isSolidityType(type))
        throw new UnknownSolidityTypeError({ type });
    }
    if (match.modifier) {
      if (!options?.modifiers?.has?.(match.modifier))
        throw new InvalidModifierError({
          param,
          type: options?.type,
          modifier: match.modifier
        });
      if (functionModifiers.has(match.modifier) && !isValidDataLocation(type, !!match.array))
        throw new InvalidFunctionModifierError({
          param,
          type: options?.type,
          modifier: match.modifier
        });
    }
    const abiParameter = {
      type: `${type}${match.array ?? ""}`,
      ...name,
      ...indexed,
      ...components
    };
    parameterCache.set(parameterCacheKey, abiParameter);
    return abiParameter;
  }
  function splitParameters(params, result = [], current = "", depth = 0) {
    const length = params.trim().length;
    for (let i20 = 0; i20 < length; i20++) {
      const char = params[i20];
      const tail = params.slice(i20 + 1);
      switch (char) {
        case ",":
          return depth === 0 ? splitParameters(tail, [...result, current.trim()]) : splitParameters(tail, result, `${current}${char}`, depth);
        case "(":
          return splitParameters(tail, result, `${current}${char}`, depth + 1);
        case ")":
          return splitParameters(tail, result, `${current}${char}`, depth - 1);
        default:
          return splitParameters(tail, result, `${current}${char}`, depth);
      }
    }
    if (current === "")
      return result;
    if (depth !== 0)
      throw new InvalidParenthesisError({ current, depth });
    result.push(current.trim());
    return result;
  }
  function isSolidityType(type) {
    return type === "address" || type === "bool" || type === "function" || type === "string" || bytesRegex.test(type) || integerRegex.test(type);
  }
  function isSolidityKeyword(name) {
    return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || bytesRegex.test(name) || integerRegex.test(name) || protectedKeywordsRegex.test(name);
  }
  function isValidDataLocation(type, isArray) {
    return isArray || type === "bytes" || type === "string" || type === "tuple";
  }
  var abiParameterWithoutTupleRegex, abiParameterWithTupleRegex, dynamicIntegerRegex, protectedKeywordsRegex;
  var init_utils = __esm({
    "node_modules/abitype/dist/esm/human-readable/runtime/utils.js"() {
      init_regex();
      init_abiItem();
      init_abiParameter();
      init_signature();
      init_splitParameters();
      init_cache();
      init_signatures();
      abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
      abiParameterWithTupleRegex = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
      dynamicIntegerRegex = /^u?int$/;
      protectedKeywordsRegex = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
    }
  });

  // node_modules/abitype/dist/esm/human-readable/runtime/structs.js
  function parseStructs(signatures) {
    const shallowStructs = {};
    const signaturesLength = signatures.length;
    for (let i20 = 0; i20 < signaturesLength; i20++) {
      const signature = signatures[i20];
      if (!isStructSignature(signature))
        continue;
      const match = execStructSignature(signature);
      if (!match)
        throw new InvalidSignatureError({ signature, type: "struct" });
      const properties = match.properties.split(";");
      const components = [];
      const propertiesLength = properties.length;
      for (let k2 = 0; k2 < propertiesLength; k2++) {
        const property = properties[k2];
        const trimmed = property.trim();
        if (!trimmed)
          continue;
        const abiParameter = parseAbiParameter(trimmed, {
          type: "struct"
        });
        components.push(abiParameter);
      }
      if (!components.length)
        throw new InvalidStructSignatureError({ signature });
      shallowStructs[match.name] = components;
    }
    const resolvedStructs = {};
    const entries = Object.entries(shallowStructs);
    const entriesLength = entries.length;
    for (let i20 = 0; i20 < entriesLength; i20++) {
      const [name, parameters] = entries[i20];
      resolvedStructs[name] = resolveStructs(parameters, shallowStructs);
    }
    return resolvedStructs;
  }
  function resolveStructs(abiParameters = [], structs = {}, ancestors = /* @__PURE__ */ new Set()) {
    const components = [];
    const length = abiParameters.length;
    for (let i20 = 0; i20 < length; i20++) {
      const abiParameter = abiParameters[i20];
      const isTuple = isTupleRegex.test(abiParameter.type);
      if (isTuple)
        components.push(abiParameter);
      else {
        const match = execTyped(typeWithoutTupleRegex, abiParameter.type);
        if (!match?.type)
          throw new InvalidAbiTypeParameterError({ abiParameter });
        const { array, type } = match;
        if (type in structs) {
          if (ancestors.has(type))
            throw new CircularReferenceError({ type });
          components.push({
            ...abiParameter,
            type: `tuple${array ?? ""}`,
            components: resolveStructs(structs[type], structs, /* @__PURE__ */ new Set([...ancestors, type]))
          });
        } else {
          if (isSolidityType(type))
            components.push(abiParameter);
          else
            throw new UnknownTypeError({ type });
        }
      }
    }
    return components;
  }
  var typeWithoutTupleRegex;
  var init_structs = __esm({
    "node_modules/abitype/dist/esm/human-readable/runtime/structs.js"() {
      init_regex();
      init_abiItem();
      init_abiParameter();
      init_signature();
      init_struct();
      init_signatures();
      init_utils();
      typeWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
    }
  });

  // node_modules/abitype/dist/esm/human-readable/parseAbi.js
  function parseAbi(signatures) {
    const structs = parseStructs(signatures);
    const abi2 = [];
    const length = signatures.length;
    for (let i20 = 0; i20 < length; i20++) {
      const signature = signatures[i20];
      if (isStructSignature(signature))
        continue;
      abi2.push(parseSignature(signature, structs));
    }
    return abi2;
  }
  var init_parseAbi = __esm({
    "node_modules/abitype/dist/esm/human-readable/parseAbi.js"() {
      init_signatures();
      init_structs();
      init_utils();
    }
  });

  // node_modules/abitype/dist/esm/human-readable/parseAbiItem.js
  function parseAbiItem(signature) {
    let abiItem;
    if (typeof signature === "string")
      abiItem = parseSignature(signature);
    else {
      const structs = parseStructs(signature);
      const length = signature.length;
      for (let i20 = 0; i20 < length; i20++) {
        const signature_ = signature[i20];
        if (isStructSignature(signature_))
          continue;
        abiItem = parseSignature(signature_, structs);
        break;
      }
    }
    if (!abiItem)
      throw new InvalidAbiItemError({ signature });
    return abiItem;
  }
  var init_parseAbiItem = __esm({
    "node_modules/abitype/dist/esm/human-readable/parseAbiItem.js"() {
      init_abiItem();
      init_signatures();
      init_structs();
      init_utils();
    }
  });

  // node_modules/abitype/dist/esm/human-readable/parseAbiParameters.js
  function parseAbiParameters(params) {
    const abiParameters = [];
    if (typeof params === "string") {
      const parameters = splitParameters(params);
      const length = parameters.length;
      for (let i20 = 0; i20 < length; i20++) {
        abiParameters.push(parseAbiParameter(parameters[i20], { modifiers }));
      }
    } else {
      const structs = parseStructs(params);
      const length = params.length;
      for (let i20 = 0; i20 < length; i20++) {
        const signature = params[i20];
        if (isStructSignature(signature))
          continue;
        const parameters = splitParameters(signature);
        const length2 = parameters.length;
        for (let k2 = 0; k2 < length2; k2++) {
          abiParameters.push(parseAbiParameter(parameters[k2], { modifiers, structs }));
        }
      }
    }
    if (abiParameters.length === 0)
      throw new InvalidAbiParametersError({ params });
    return abiParameters;
  }
  var init_parseAbiParameters = __esm({
    "node_modules/abitype/dist/esm/human-readable/parseAbiParameters.js"() {
      init_abiParameter();
      init_signatures();
      init_structs();
      init_utils();
      init_utils();
    }
  });

  // node_modules/abitype/dist/esm/exports/index.js
  var init_exports = __esm({
    "node_modules/abitype/dist/esm/exports/index.js"() {
      init_formatAbiItem();
      init_formatAbiParameters();
      init_parseAbi();
      init_parseAbiItem();
      init_parseAbiParameters();
    }
  });

  // node_modules/viem/_esm/utils/abi/formatAbiItem.js
  function formatAbiItem2(abiItem, { includeName = false } = {}) {
    if (abiItem.type !== "function" && abiItem.type !== "event" && abiItem.type !== "error")
      throw new InvalidDefinitionTypeError(abiItem.type);
    return `${abiItem.name}(${formatAbiParams(abiItem.inputs, { includeName })})`;
  }
  function formatAbiParams(params, { includeName = false } = {}) {
    if (!params)
      return "";
    return params.map((param) => formatAbiParam(param, { includeName })).join(includeName ? ", " : ",");
  }
  function formatAbiParam(param, { includeName }) {
    if (param.type.startsWith("tuple")) {
      return `(${formatAbiParams(param.components, { includeName })})${param.type.slice("tuple".length)}`;
    }
    return param.type + (includeName && param.name ? ` ${param.name}` : "");
  }
  var init_formatAbiItem2 = __esm({
    "node_modules/viem/_esm/utils/abi/formatAbiItem.js"() {
      init_abi();
    }
  });

  // node_modules/viem/_esm/utils/data/isHex.js
  function isHex(value, { strict = true } = {}) {
    if (!value)
      return false;
    if (typeof value !== "string")
      return false;
    return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
  }
  var init_isHex = __esm({
    "node_modules/viem/_esm/utils/data/isHex.js"() {
    }
  });

  // node_modules/viem/_esm/utils/data/size.js
  function size(value) {
    if (isHex(value, { strict: false }))
      return Math.ceil((value.length - 2) / 2);
    return value.length;
  }
  var init_size = __esm({
    "node_modules/viem/_esm/utils/data/size.js"() {
      init_isHex();
    }
  });

  // node_modules/viem/_esm/errors/version.js
  var version2;
  var init_version2 = __esm({
    "node_modules/viem/_esm/errors/version.js"() {
      version2 = "2.47.12";
    }
  });

  // node_modules/viem/_esm/errors/base.js
  function walk(err, fn) {
    if (fn?.(err))
      return err;
    if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
      return walk(err.cause, fn);
    return fn ? null : err;
  }
  var errorConfig, BaseError2;
  var init_base = __esm({
    "node_modules/viem/_esm/errors/base.js"() {
      init_version2();
      errorConfig = {
        getDocsUrl: ({ docsBaseUrl, docsPath: docsPath8 = "", docsSlug }) => docsPath8 ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath8}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
        version: `viem@${version2}`
      };
      BaseError2 = class _BaseError extends Error {
        constructor(shortMessage, args = {}) {
          const details = (() => {
            if (args.cause instanceof _BaseError)
              return args.cause.details;
            if (args.cause?.message)
              return args.cause.message;
            return args.details;
          })();
          const docsPath8 = (() => {
            if (args.cause instanceof _BaseError)
              return args.cause.docsPath || args.docsPath;
            return args.docsPath;
          })();
          const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath: docsPath8 });
          const message = [
            shortMessage || "An error occurred.",
            "",
            ...args.metaMessages ? [...args.metaMessages, ""] : [],
            ...docsUrl ? [`Docs: ${docsUrl}`] : [],
            ...details ? [`Details: ${details}`] : [],
            ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
          ].join("\n");
          super(message, args.cause ? { cause: args.cause } : void 0);
          Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "BaseError"
          });
          this.details = details;
          this.docsPath = docsPath8;
          this.metaMessages = args.metaMessages;
          this.name = args.name ?? this.name;
          this.shortMessage = shortMessage;
          this.version = version2;
        }
        walk(fn) {
          return walk(this, fn);
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/abi.js
  var AbiConstructorNotFoundError, AbiConstructorParamsNotFoundError, AbiDecodingDataSizeTooSmallError, AbiDecodingZeroDataError, AbiEncodingArrayLengthMismatchError, AbiEncodingBytesSizeMismatchError, AbiEncodingLengthMismatchError, AbiErrorInputsNotFoundError, AbiErrorNotFoundError, AbiErrorSignatureNotFoundError, AbiEventSignatureEmptyTopicsError, AbiEventSignatureNotFoundError, AbiEventNotFoundError, AbiFunctionNotFoundError, AbiFunctionOutputsNotFoundError, AbiFunctionSignatureNotFoundError, AbiItemAmbiguityError, BytesSizeMismatchError, DecodeLogDataMismatch, DecodeLogTopicsMismatch, InvalidAbiEncodingTypeError, InvalidAbiDecodingTypeError, InvalidArrayError, InvalidDefinitionTypeError;
  var init_abi = __esm({
    "node_modules/viem/_esm/errors/abi.js"() {
      init_formatAbiItem2();
      init_size();
      init_base();
      AbiConstructorNotFoundError = class extends BaseError2 {
        constructor({ docsPath: docsPath8 }) {
          super([
            "A constructor was not found on the ABI.",
            "Make sure you are using the correct ABI and that the constructor exists on it."
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiConstructorNotFoundError"
          });
        }
      };
      AbiConstructorParamsNotFoundError = class extends BaseError2 {
        constructor({ docsPath: docsPath8 }) {
          super([
            "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
            "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiConstructorParamsNotFoundError"
          });
        }
      };
      AbiDecodingDataSizeTooSmallError = class extends BaseError2 {
        constructor({ data, params, size: size5 }) {
          super([`Data size of ${size5} bytes is too small for given parameters.`].join("\n"), {
            metaMessages: [
              `Params: (${formatAbiParams(params, { includeName: true })})`,
              `Data:   ${data} (${size5} bytes)`
            ],
            name: "AbiDecodingDataSizeTooSmallError"
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.data = data;
          this.params = params;
          this.size = size5;
        }
      };
      AbiDecodingZeroDataError = class extends BaseError2 {
        constructor({ cause } = {}) {
          super('Cannot decode zero data ("0x") with ABI parameters.', {
            name: "AbiDecodingZeroDataError",
            cause
          });
        }
      };
      AbiEncodingArrayLengthMismatchError = class extends BaseError2 {
        constructor({ expectedLength, givenLength, type }) {
          super([
            `ABI encoding array length mismatch for type ${type}.`,
            `Expected length: ${expectedLength}`,
            `Given length: ${givenLength}`
          ].join("\n"), { name: "AbiEncodingArrayLengthMismatchError" });
        }
      };
      AbiEncodingBytesSizeMismatchError = class extends BaseError2 {
        constructor({ expectedSize, value }) {
          super(`Size of bytes "${value}" (bytes${size(value)}) does not match expected size (bytes${expectedSize}).`, { name: "AbiEncodingBytesSizeMismatchError" });
        }
      };
      AbiEncodingLengthMismatchError = class extends BaseError2 {
        constructor({ expectedLength, givenLength }) {
          super([
            "ABI encoding params/values length mismatch.",
            `Expected length (params): ${expectedLength}`,
            `Given length (values): ${givenLength}`
          ].join("\n"), { name: "AbiEncodingLengthMismatchError" });
        }
      };
      AbiErrorInputsNotFoundError = class extends BaseError2 {
        constructor(errorName, { docsPath: docsPath8 }) {
          super([
            `Arguments (\`args\`) were provided to "${errorName}", but "${errorName}" on the ABI does not contain any parameters (\`inputs\`).`,
            "Cannot encode error result without knowing what the parameter types are.",
            "Make sure you are using the correct ABI and that the inputs exist on it."
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiErrorInputsNotFoundError"
          });
        }
      };
      AbiErrorNotFoundError = class extends BaseError2 {
        constructor(errorName, { docsPath: docsPath8 } = {}) {
          super([
            `Error ${errorName ? `"${errorName}" ` : ""}not found on ABI.`,
            "Make sure you are using the correct ABI and that the error exists on it."
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiErrorNotFoundError"
          });
        }
      };
      AbiErrorSignatureNotFoundError = class extends BaseError2 {
        constructor(signature, { docsPath: docsPath8, cause }) {
          super([
            `Encoded error signature "${signature}" not found on ABI.`,
            "Make sure you are using the correct ABI and that the error exists on it.",
            `You can look up the decoded signature here: https://4byte.sourcify.dev/?q=${signature}.`
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiErrorSignatureNotFoundError",
            cause
          });
          Object.defineProperty(this, "signature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.signature = signature;
        }
      };
      AbiEventSignatureEmptyTopicsError = class extends BaseError2 {
        constructor({ docsPath: docsPath8 }) {
          super("Cannot extract event signature from empty topics.", {
            docsPath: docsPath8,
            name: "AbiEventSignatureEmptyTopicsError"
          });
        }
      };
      AbiEventSignatureNotFoundError = class extends BaseError2 {
        constructor(signature, { docsPath: docsPath8 }) {
          super([
            `Encoded event signature "${signature}" not found on ABI.`,
            "Make sure you are using the correct ABI and that the event exists on it.",
            `You can look up the signature here: https://4byte.sourcify.dev/?q=${signature}.`
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiEventSignatureNotFoundError"
          });
        }
      };
      AbiEventNotFoundError = class extends BaseError2 {
        constructor(eventName, { docsPath: docsPath8 } = {}) {
          super([
            `Event ${eventName ? `"${eventName}" ` : ""}not found on ABI.`,
            "Make sure you are using the correct ABI and that the event exists on it."
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiEventNotFoundError"
          });
        }
      };
      AbiFunctionNotFoundError = class extends BaseError2 {
        constructor(functionName, { docsPath: docsPath8 } = {}) {
          super([
            `Function ${functionName ? `"${functionName}" ` : ""}not found on ABI.`,
            "Make sure you are using the correct ABI and that the function exists on it."
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiFunctionNotFoundError"
          });
        }
      };
      AbiFunctionOutputsNotFoundError = class extends BaseError2 {
        constructor(functionName, { docsPath: docsPath8 }) {
          super([
            `Function "${functionName}" does not contain any \`outputs\` on ABI.`,
            "Cannot decode function result without knowing what the parameter types are.",
            "Make sure you are using the correct ABI and that the function exists on it."
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiFunctionOutputsNotFoundError"
          });
        }
      };
      AbiFunctionSignatureNotFoundError = class extends BaseError2 {
        constructor(signature, { docsPath: docsPath8 }) {
          super([
            `Encoded function signature "${signature}" not found on ABI.`,
            "Make sure you are using the correct ABI and that the function exists on it.",
            `You can look up the signature here: https://4byte.sourcify.dev/?q=${signature}.`
          ].join("\n"), {
            docsPath: docsPath8,
            name: "AbiFunctionSignatureNotFoundError"
          });
        }
      };
      AbiItemAmbiguityError = class extends BaseError2 {
        constructor(x, y3) {
          super("Found ambiguous types in overloaded ABI items.", {
            metaMessages: [
              `\`${x.type}\` in \`${formatAbiItem2(x.abiItem)}\`, and`,
              `\`${y3.type}\` in \`${formatAbiItem2(y3.abiItem)}\``,
              "",
              "These types encode differently and cannot be distinguished at runtime.",
              "Remove one of the ambiguous items in the ABI."
            ],
            name: "AbiItemAmbiguityError"
          });
        }
      };
      BytesSizeMismatchError = class extends BaseError2 {
        constructor({ expectedSize, givenSize }) {
          super(`Expected bytes${expectedSize}, got bytes${givenSize}.`, {
            name: "BytesSizeMismatchError"
          });
        }
      };
      DecodeLogDataMismatch = class extends BaseError2 {
        constructor({ abiItem, data, params, size: size5 }) {
          super([
            `Data size of ${size5} bytes is too small for non-indexed event parameters.`
          ].join("\n"), {
            metaMessages: [
              `Params: (${formatAbiParams(params, { includeName: true })})`,
              `Data:   ${data} (${size5} bytes)`
            ],
            name: "DecodeLogDataMismatch"
          });
          Object.defineProperty(this, "abiItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.abiItem = abiItem;
          this.data = data;
          this.params = params;
          this.size = size5;
        }
      };
      DecodeLogTopicsMismatch = class extends BaseError2 {
        constructor({ abiItem, param }) {
          super([
            `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ""} on event "${formatAbiItem2(abiItem, { includeName: true })}".`
          ].join("\n"), { name: "DecodeLogTopicsMismatch" });
          Object.defineProperty(this, "abiItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.abiItem = abiItem;
        }
      };
      InvalidAbiEncodingTypeError = class extends BaseError2 {
        constructor(type, { docsPath: docsPath8 }) {
          super([
            `Type "${type}" is not a valid encoding type.`,
            "Please provide a valid ABI type."
          ].join("\n"), { docsPath: docsPath8, name: "InvalidAbiEncodingType" });
        }
      };
      InvalidAbiDecodingTypeError = class extends BaseError2 {
        constructor(type, { docsPath: docsPath8 }) {
          super([
            `Type "${type}" is not a valid decoding type.`,
            "Please provide a valid ABI type."
          ].join("\n"), { docsPath: docsPath8, name: "InvalidAbiDecodingType" });
        }
      };
      InvalidArrayError = class extends BaseError2 {
        constructor(value) {
          super([`Value "${value}" is not a valid array.`].join("\n"), {
            name: "InvalidArrayError"
          });
        }
      };
      InvalidDefinitionTypeError = class extends BaseError2 {
        constructor(type) {
          super([
            `"${type}" is not a valid definition type.`,
            'Valid types: "function", "event", "error"'
          ].join("\n"), { name: "InvalidDefinitionTypeError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/data.js
  var SliceOffsetOutOfBoundsError, SizeExceedsPaddingSizeError, InvalidBytesLengthError;
  var init_data = __esm({
    "node_modules/viem/_esm/errors/data.js"() {
      init_base();
      SliceOffsetOutOfBoundsError = class extends BaseError2 {
        constructor({ offset, position, size: size5 }) {
          super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size5}).`, { name: "SliceOffsetOutOfBoundsError" });
        }
      };
      SizeExceedsPaddingSizeError = class extends BaseError2 {
        constructor({ size: size5, targetSize, type }) {
          super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size5}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
        }
      };
      InvalidBytesLengthError = class extends BaseError2 {
        constructor({ size: size5, targetSize, type }) {
          super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size5} ${type} long.`, { name: "InvalidBytesLengthError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/data/pad.js
  function pad(hexOrBytes, { dir, size: size5 = 32 } = {}) {
    if (typeof hexOrBytes === "string")
      return padHex(hexOrBytes, { dir, size: size5 });
    return padBytes(hexOrBytes, { dir, size: size5 });
  }
  function padHex(hex_, { dir, size: size5 = 32 } = {}) {
    if (size5 === null)
      return hex_;
    const hex2 = hex_.replace("0x", "");
    if (hex2.length > size5 * 2)
      throw new SizeExceedsPaddingSizeError({
        size: Math.ceil(hex2.length / 2),
        targetSize: size5,
        type: "hex"
      });
    return `0x${hex2[dir === "right" ? "padEnd" : "padStart"](size5 * 2, "0")}`;
  }
  function padBytes(bytes, { dir, size: size5 = 32 } = {}) {
    if (size5 === null)
      return bytes;
    if (bytes.length > size5)
      throw new SizeExceedsPaddingSizeError({
        size: bytes.length,
        targetSize: size5,
        type: "bytes"
      });
    const paddedBytes = new Uint8Array(size5);
    for (let i20 = 0; i20 < size5; i20++) {
      const padEnd = dir === "right";
      paddedBytes[padEnd ? i20 : size5 - i20 - 1] = bytes[padEnd ? i20 : bytes.length - i20 - 1];
    }
    return paddedBytes;
  }
  var init_pad = __esm({
    "node_modules/viem/_esm/utils/data/pad.js"() {
      init_data();
    }
  });

  // node_modules/viem/_esm/errors/encoding.js
  var IntegerOutOfRangeError, InvalidBytesBooleanError, InvalidHexBooleanError, SizeOverflowError;
  var init_encoding = __esm({
    "node_modules/viem/_esm/errors/encoding.js"() {
      init_base();
      IntegerOutOfRangeError = class extends BaseError2 {
        constructor({ max, min, signed, size: size5, value }) {
          super(`Number "${value}" is not in safe ${size5 ? `${size5 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
        }
      };
      InvalidBytesBooleanError = class extends BaseError2 {
        constructor(bytes) {
          super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
            name: "InvalidBytesBooleanError"
          });
        }
      };
      InvalidHexBooleanError = class extends BaseError2 {
        constructor(hex2) {
          super(`Hex value "${hex2}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, { name: "InvalidHexBooleanError" });
        }
      };
      SizeOverflowError = class extends BaseError2 {
        constructor({ givenSize, maxSize }) {
          super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/data/trim.js
  function trim(hexOrBytes, { dir = "left" } = {}) {
    let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
    let sliceLength = 0;
    for (let i20 = 0; i20 < data.length - 1; i20++) {
      if (data[dir === "left" ? i20 : data.length - i20 - 1].toString() === "0")
        sliceLength++;
      else
        break;
    }
    data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (typeof hexOrBytes === "string") {
      if (data.length === 1 && dir === "right")
        data = `${data}0`;
      return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
    }
    return data;
  }
  var init_trim = __esm({
    "node_modules/viem/_esm/utils/data/trim.js"() {
    }
  });

  // node_modules/viem/_esm/utils/encoding/fromHex.js
  function assertSize(hexOrBytes, { size: size5 }) {
    if (size(hexOrBytes) > size5)
      throw new SizeOverflowError({
        givenSize: size(hexOrBytes),
        maxSize: size5
      });
  }
  function hexToBigInt(hex2, opts = {}) {
    const { signed } = opts;
    if (opts.size)
      assertSize(hex2, { size: opts.size });
    const value = BigInt(hex2);
    if (!signed)
      return value;
    const size5 = (hex2.length - 2) / 2;
    const max = (1n << BigInt(size5) * 8n - 1n) - 1n;
    if (value <= max)
      return value;
    return value - BigInt(`0x${"f".padStart(size5 * 2, "f")}`) - 1n;
  }
  function hexToBool(hex_, opts = {}) {
    let hex2 = hex_;
    if (opts.size) {
      assertSize(hex2, { size: opts.size });
      hex2 = trim(hex2);
    }
    if (trim(hex2) === "0x00")
      return false;
    if (trim(hex2) === "0x01")
      return true;
    throw new InvalidHexBooleanError(hex2);
  }
  function hexToNumber(hex2, opts = {}) {
    const value = hexToBigInt(hex2, opts);
    const number = Number(value);
    if (!Number.isSafeInteger(number))
      throw new IntegerOutOfRangeError({
        max: `${Number.MAX_SAFE_INTEGER}`,
        min: `${Number.MIN_SAFE_INTEGER}`,
        signed: opts.signed,
        size: opts.size,
        value: `${value}n`
      });
    return number;
  }
  var init_fromHex = __esm({
    "node_modules/viem/_esm/utils/encoding/fromHex.js"() {
      init_encoding();
      init_size();
      init_trim();
    }
  });

  // node_modules/viem/_esm/utils/encoding/toHex.js
  function toHex(value, opts = {}) {
    if (typeof value === "number" || typeof value === "bigint")
      return numberToHex(value, opts);
    if (typeof value === "string") {
      return stringToHex(value, opts);
    }
    if (typeof value === "boolean")
      return boolToHex(value, opts);
    return bytesToHex(value, opts);
  }
  function boolToHex(value, opts = {}) {
    const hex2 = `0x${Number(value)}`;
    if (typeof opts.size === "number") {
      assertSize(hex2, { size: opts.size });
      return pad(hex2, { size: opts.size });
    }
    return hex2;
  }
  function bytesToHex(value, opts = {}) {
    let string = "";
    for (let i20 = 0; i20 < value.length; i20++) {
      string += hexes[value[i20]];
    }
    const hex2 = `0x${string}`;
    if (typeof opts.size === "number") {
      assertSize(hex2, { size: opts.size });
      return pad(hex2, { dir: "right", size: opts.size });
    }
    return hex2;
  }
  function numberToHex(value_, opts = {}) {
    const { signed, size: size5 } = opts;
    const value = BigInt(value_);
    let maxValue;
    if (size5) {
      if (signed)
        maxValue = (1n << BigInt(size5) * 8n - 1n) - 1n;
      else
        maxValue = 2n ** (BigInt(size5) * 8n) - 1n;
    } else if (typeof value_ === "number") {
      maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
    if (maxValue && value > maxValue || value < minValue) {
      const suffix = typeof value_ === "bigint" ? "n" : "";
      throw new IntegerOutOfRangeError({
        max: maxValue ? `${maxValue}${suffix}` : void 0,
        min: `${minValue}${suffix}`,
        signed,
        size: size5,
        value: `${value_}${suffix}`
      });
    }
    const hex2 = `0x${(signed && value < 0 ? (1n << BigInt(size5 * 8)) + BigInt(value) : value).toString(16)}`;
    if (size5)
      return pad(hex2, { size: size5 });
    return hex2;
  }
  function stringToHex(value_, opts = {}) {
    const value = encoder2.encode(value_);
    return bytesToHex(value, opts);
  }
  var hexes, encoder2;
  var init_toHex = __esm({
    "node_modules/viem/_esm/utils/encoding/toHex.js"() {
      init_encoding();
      init_pad();
      init_fromHex();
      hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i20) => i20.toString(16).padStart(2, "0"));
      encoder2 = /* @__PURE__ */ new TextEncoder();
    }
  });

  // node_modules/viem/_esm/utils/encoding/toBytes.js
  function toBytes(value, opts = {}) {
    if (typeof value === "number" || typeof value === "bigint")
      return numberToBytes(value, opts);
    if (typeof value === "boolean")
      return boolToBytes(value, opts);
    if (isHex(value))
      return hexToBytes(value, opts);
    return stringToBytes(value, opts);
  }
  function boolToBytes(value, opts = {}) {
    const bytes = new Uint8Array(1);
    bytes[0] = Number(value);
    if (typeof opts.size === "number") {
      assertSize(bytes, { size: opts.size });
      return pad(bytes, { size: opts.size });
    }
    return bytes;
  }
  function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine)
      return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F)
      return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f)
      return char - (charCodeMap.a - 10);
    return void 0;
  }
  function hexToBytes(hex_, opts = {}) {
    let hex2 = hex_;
    if (opts.size) {
      assertSize(hex2, { size: opts.size });
      hex2 = pad(hex2, { dir: "right", size: opts.size });
    }
    let hexString = hex2.slice(2);
    if (hexString.length % 2)
      hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes = new Uint8Array(length);
    for (let index2 = 0, j = 0; index2 < length; index2++) {
      const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
      const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
      if (nibbleLeft === void 0 || nibbleRight === void 0) {
        throw new BaseError2(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
      }
      bytes[index2] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes;
  }
  function numberToBytes(value, opts) {
    const hex2 = numberToHex(value, opts);
    return hexToBytes(hex2);
  }
  function stringToBytes(value, opts = {}) {
    const bytes = encoder3.encode(value);
    if (typeof opts.size === "number") {
      assertSize(bytes, { size: opts.size });
      return pad(bytes, { dir: "right", size: opts.size });
    }
    return bytes;
  }
  var encoder3, charCodeMap;
  var init_toBytes = __esm({
    "node_modules/viem/_esm/utils/encoding/toBytes.js"() {
      init_base();
      init_isHex();
      init_pad();
      init_fromHex();
      init_toHex();
      encoder3 = /* @__PURE__ */ new TextEncoder();
      charCodeMap = {
        zero: 48,
        nine: 57,
        A: 65,
        F: 70,
        a: 97,
        f: 102
      };
    }
  });

  // node_modules/@noble/hashes/esm/_u64.js
  function fromBig(n10, le = false) {
    if (le)
      return { h: Number(n10 & U32_MASK64), l: Number(n10 >> _32n & U32_MASK64) };
    return { h: Number(n10 >> _32n & U32_MASK64) | 0, l: Number(n10 & U32_MASK64) | 0 };
  }
  function split(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for (let i20 = 0; i20 < len; i20++) {
      const { h: h10, l: l7 } = fromBig(lst[i20], le);
      [Ah[i20], Al[i20]] = [h10, l7];
    }
    return [Ah, Al];
  }
  var U32_MASK64, _32n, rotlSH, rotlSL, rotlBH, rotlBL;
  var init_u64 = __esm({
    "node_modules/@noble/hashes/esm/_u64.js"() {
      U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
      _32n = /* @__PURE__ */ BigInt(32);
      rotlSH = (h10, l7, s12) => h10 << s12 | l7 >>> 32 - s12;
      rotlSL = (h10, l7, s12) => l7 << s12 | h10 >>> 32 - s12;
      rotlBH = (h10, l7, s12) => l7 << s12 - 32 | h10 >>> 64 - s12;
      rotlBL = (h10, l7, s12) => h10 << s12 - 32 | l7 >>> 64 - s12;
    }
  });

  // node_modules/@noble/hashes/esm/crypto.js
  var crypto2;
  var init_crypto = __esm({
    "node_modules/@noble/hashes/esm/crypto.js"() {
      crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
    }
  });

  // node_modules/@noble/hashes/esm/utils.js
  function isBytes(a20) {
    return a20 instanceof Uint8Array || ArrayBuffer.isView(a20) && a20.constructor.name === "Uint8Array";
  }
  function anumber(n10) {
    if (!Number.isSafeInteger(n10) || n10 < 0)
      throw new Error("positive integer expected, got " + n10);
  }
  function abytes(b, ...lengths) {
    if (!isBytes(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function ahash(h10) {
    if (typeof h10 !== "function" || typeof h10.create !== "function")
      throw new Error("Hash should be wrapped by utils.createHasher");
    anumber(h10.outputLen);
    anumber(h10.blockLen);
  }
  function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error("digestInto() expects output buffer of length at least " + min);
    }
  }
  function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  }
  function clean(...arrays) {
    for (let i20 = 0; i20 < arrays.length; i20++) {
      arrays[i20].fill(0);
    }
  }
  function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
  }
  function byteSwap(word) {
    return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
  }
  function byteSwap32(arr) {
    for (let i20 = 0; i20 < arr.length; i20++) {
      arr[i20] = byteSwap(arr[i20]);
    }
    return arr;
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes2(data) {
    if (typeof data === "string")
      data = utf8ToBytes(data);
    abytes(data);
    return data;
  }
  function concatBytes(...arrays) {
    let sum = 0;
    for (let i20 = 0; i20 < arrays.length; i20++) {
      const a20 = arrays[i20];
      abytes(a20);
      sum += a20.length;
    }
    const res = new Uint8Array(sum);
    for (let i20 = 0, pad4 = 0; i20 < arrays.length; i20++) {
      const a20 = arrays[i20];
      res.set(a20, pad4);
      pad4 += a20.length;
    }
    return res;
  }
  function createHasher(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  function randomBytes(bytesLength = 32) {
    if (crypto2 && typeof crypto2.getRandomValues === "function") {
      return crypto2.getRandomValues(new Uint8Array(bytesLength));
    }
    if (crypto2 && typeof crypto2.randomBytes === "function") {
      return Uint8Array.from(crypto2.randomBytes(bytesLength));
    }
    throw new Error("crypto.getRandomValues must be defined");
  }
  var isLE, swap32IfBE, Hash;
  var init_utils2 = __esm({
    "node_modules/@noble/hashes/esm/utils.js"() {
      init_crypto();
      isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
      swap32IfBE = isLE ? (u4) => u4 : byteSwap32;
      Hash = class {
      };
    }
  });

  // node_modules/@noble/hashes/esm/sha3.js
  function keccakP(s12, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s12[x] ^ s12[x + 10] ^ s12[x + 20] ^ s12[x + 30] ^ s12[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
        for (let y3 = 0; y3 < 50; y3 += 10) {
          s12[x + y3] ^= Th;
          s12[x + y3 + 1] ^= Tl;
        }
      }
      let curH = s12[2];
      let curL = s12[3];
      for (let t45 = 0; t45 < 24; t45++) {
        const shift = SHA3_ROTL[t45];
        const Th = rotlH(curH, curL, shift);
        const Tl = rotlL(curH, curL, shift);
        const PI = SHA3_PI[t45];
        curH = s12[PI];
        curL = s12[PI + 1];
        s12[PI] = Th;
        s12[PI + 1] = Tl;
      }
      for (let y3 = 0; y3 < 50; y3 += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s12[y3 + x];
        for (let x = 0; x < 10; x++)
          s12[y3 + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s12[0] ^= SHA3_IOTA_H[round];
      s12[1] ^= SHA3_IOTA_L[round];
    }
    clean(B);
  }
  var _0n, _1n, _2n, _7n, _256n, _0x71n, SHA3_PI, SHA3_ROTL, _SHA3_IOTA, IOTAS, SHA3_IOTA_H, SHA3_IOTA_L, rotlH, rotlL, Keccak, gen, keccak_256;
  var init_sha3 = __esm({
    "node_modules/@noble/hashes/esm/sha3.js"() {
      init_u64();
      init_utils2();
      _0n = BigInt(0);
      _1n = BigInt(1);
      _2n = BigInt(2);
      _7n = BigInt(7);
      _256n = BigInt(256);
      _0x71n = BigInt(113);
      SHA3_PI = [];
      SHA3_ROTL = [];
      _SHA3_IOTA = [];
      for (let round = 0, R = _1n, x = 1, y3 = 0; round < 24; round++) {
        [x, y3] = [y3, (2 * x + 3 * y3) % 5];
        SHA3_PI.push(2 * (5 * y3 + x));
        SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
        let t45 = _0n;
        for (let j = 0; j < 7; j++) {
          R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
          if (R & _2n)
            t45 ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
        }
        _SHA3_IOTA.push(t45);
      }
      IOTAS = split(_SHA3_IOTA, true);
      SHA3_IOTA_H = IOTAS[0];
      SHA3_IOTA_L = IOTAS[1];
      rotlH = (h10, l7, s12) => s12 > 32 ? rotlBH(h10, l7, s12) : rotlSH(h10, l7, s12);
      rotlL = (h10, l7, s12) => s12 > 32 ? rotlBL(h10, l7, s12) : rotlSL(h10, l7, s12);
      Keccak = class _Keccak extends Hash {
        // NOTE: we accept arguments in bytes instead of bits here.
        constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
          super();
          this.pos = 0;
          this.posOut = 0;
          this.finished = false;
          this.destroyed = false;
          this.enableXOF = false;
          this.blockLen = blockLen;
          this.suffix = suffix;
          this.outputLen = outputLen;
          this.enableXOF = enableXOF;
          this.rounds = rounds;
          anumber(outputLen);
          if (!(0 < blockLen && blockLen < 200))
            throw new Error("only keccak-f1600 function is supported");
          this.state = new Uint8Array(200);
          this.state32 = u32(this.state);
        }
        clone() {
          return this._cloneInto();
        }
        keccak() {
          swap32IfBE(this.state32);
          keccakP(this.state32, this.rounds);
          swap32IfBE(this.state32);
          this.posOut = 0;
          this.pos = 0;
        }
        update(data) {
          aexists(this);
          data = toBytes2(data);
          abytes(data);
          const { blockLen, state } = this;
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            for (let i20 = 0; i20 < take; i20++)
              state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen)
              this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished)
            return;
          this.finished = true;
          const { state, suffix, pos, blockLen } = this;
          state[pos] ^= suffix;
          if ((suffix & 128) !== 0 && pos === blockLen - 1)
            this.keccak();
          state[blockLen - 1] ^= 128;
          this.keccak();
        }
        writeInto(out) {
          aexists(this, false);
          abytes(out);
          this.finish();
          const bufferOut = this.state;
          const { blockLen } = this;
          for (let pos = 0, len = out.length; pos < len; ) {
            if (this.posOut >= blockLen)
              this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
          }
          return out;
        }
        xofInto(out) {
          if (!this.enableXOF)
            throw new Error("XOF is not possible for this instance");
          return this.writeInto(out);
        }
        xof(bytes) {
          anumber(bytes);
          return this.xofInto(new Uint8Array(bytes));
        }
        digestInto(out) {
          aoutput(out, this);
          if (this.finished)
            throw new Error("digest() was already called");
          this.writeInto(out);
          this.destroy();
          return out;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          this.destroyed = true;
          clean(this.state);
        }
        _cloneInto(to) {
          const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
          to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
          to.state32.set(this.state32);
          to.pos = this.pos;
          to.posOut = this.posOut;
          to.finished = this.finished;
          to.rounds = rounds;
          to.suffix = suffix;
          to.outputLen = outputLen;
          to.enableXOF = enableXOF;
          to.destroyed = this.destroyed;
          return to;
        }
      };
      gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
      keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
    }
  });

  // node_modules/viem/_esm/utils/hash/keccak256.js
  function keccak256(value, to_) {
    const to = to_ || "hex";
    const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
    if (to === "bytes")
      return bytes;
    return toHex(bytes);
  }
  var init_keccak256 = __esm({
    "node_modules/viem/_esm/utils/hash/keccak256.js"() {
      init_sha3();
      init_isHex();
      init_toBytes();
      init_toHex();
    }
  });

  // node_modules/viem/_esm/utils/hash/hashSignature.js
  function hashSignature(sig) {
    return hash(sig);
  }
  var hash;
  var init_hashSignature = __esm({
    "node_modules/viem/_esm/utils/hash/hashSignature.js"() {
      init_toBytes();
      init_keccak256();
      hash = (value) => keccak256(toBytes(value));
    }
  });

  // node_modules/viem/_esm/utils/hash/normalizeSignature.js
  function normalizeSignature(signature) {
    let active = true;
    let current = "";
    let level = 0;
    let result = "";
    let valid = false;
    for (let i20 = 0; i20 < signature.length; i20++) {
      const char = signature[i20];
      if (["(", ")", ","].includes(char))
        active = true;
      if (char === "(")
        level++;
      if (char === ")")
        level--;
      if (!active)
        continue;
      if (level === 0) {
        if (char === " " && ["event", "function", ""].includes(result))
          result = "";
        else {
          result += char;
          if (char === ")") {
            valid = true;
            break;
          }
        }
        continue;
      }
      if (char === " ") {
        if (signature[i20 - 1] !== "," && current !== "," && current !== ",(") {
          current = "";
          active = false;
        }
        continue;
      }
      result += char;
      current += char;
    }
    if (!valid)
      throw new BaseError2("Unable to normalize signature.");
    return result;
  }
  var init_normalizeSignature = __esm({
    "node_modules/viem/_esm/utils/hash/normalizeSignature.js"() {
      init_base();
    }
  });

  // node_modules/viem/_esm/utils/hash/toSignature.js
  var toSignature;
  var init_toSignature = __esm({
    "node_modules/viem/_esm/utils/hash/toSignature.js"() {
      init_exports();
      init_normalizeSignature();
      toSignature = (def) => {
        const def_ = (() => {
          if (typeof def === "string")
            return def;
          return formatAbiItem(def);
        })();
        return normalizeSignature(def_);
      };
    }
  });

  // node_modules/viem/_esm/utils/hash/toSignatureHash.js
  function toSignatureHash(fn) {
    return hashSignature(toSignature(fn));
  }
  var init_toSignatureHash = __esm({
    "node_modules/viem/_esm/utils/hash/toSignatureHash.js"() {
      init_hashSignature();
      init_toSignature();
    }
  });

  // node_modules/viem/_esm/utils/hash/toEventSelector.js
  var toEventSelector;
  var init_toEventSelector = __esm({
    "node_modules/viem/_esm/utils/hash/toEventSelector.js"() {
      init_toSignatureHash();
      toEventSelector = toSignatureHash;
    }
  });

  // node_modules/viem/_esm/errors/address.js
  var InvalidAddressError;
  var init_address = __esm({
    "node_modules/viem/_esm/errors/address.js"() {
      init_base();
      InvalidAddressError = class extends BaseError2 {
        constructor({ address }) {
          super(`Address "${address}" is invalid.`, {
            metaMessages: [
              "- Address must be a hex value of 20 bytes (40 hex characters).",
              "- Address must match its checksum counterpart."
            ],
            name: "InvalidAddressError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/lru.js
  var LruMap;
  var init_lru = __esm({
    "node_modules/viem/_esm/utils/lru.js"() {
      LruMap = class extends Map {
        constructor(size5) {
          super();
          Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.maxSize = size5;
        }
        get(key) {
          const value = super.get(key);
          if (super.has(key)) {
            super.delete(key);
            super.set(key, value);
          }
          return value;
        }
        set(key, value) {
          if (super.has(key))
            super.delete(key);
          super.set(key, value);
          if (this.maxSize && this.size > this.maxSize) {
            const firstKey = super.keys().next().value;
            if (firstKey !== void 0)
              super.delete(firstKey);
          }
          return this;
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/address/getAddress.js
  function checksumAddress(address_, chainId) {
    if (checksumAddressCache.has(`${address_}.${chainId}`))
      return checksumAddressCache.get(`${address_}.${chainId}`);
    const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
    const hash3 = keccak256(stringToBytes(hexAddress), "bytes");
    const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
    for (let i20 = 0; i20 < 40; i20 += 2) {
      if (hash3[i20 >> 1] >> 4 >= 8 && address[i20]) {
        address[i20] = address[i20].toUpperCase();
      }
      if ((hash3[i20 >> 1] & 15) >= 8 && address[i20 + 1]) {
        address[i20 + 1] = address[i20 + 1].toUpperCase();
      }
    }
    const result = `0x${address.join("")}`;
    checksumAddressCache.set(`${address_}.${chainId}`, result);
    return result;
  }
  function getAddress(address, chainId) {
    if (!isAddress(address, { strict: false }))
      throw new InvalidAddressError({ address });
    return checksumAddress(address, chainId);
  }
  var checksumAddressCache;
  var init_getAddress = __esm({
    "node_modules/viem/_esm/utils/address/getAddress.js"() {
      init_address();
      init_toBytes();
      init_keccak256();
      init_lru();
      init_isAddress();
      checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
    }
  });

  // node_modules/viem/_esm/utils/address/isAddress.js
  function isAddress(address, options) {
    const { strict = true } = options ?? {};
    const cacheKey2 = `${address}.${strict}`;
    if (isAddressCache.has(cacheKey2))
      return isAddressCache.get(cacheKey2);
    const result = (() => {
      if (!addressRegex.test(address))
        return false;
      if (address.toLowerCase() === address)
        return true;
      if (strict)
        return checksumAddress(address) === address;
      return true;
    })();
    isAddressCache.set(cacheKey2, result);
    return result;
  }
  var addressRegex, isAddressCache;
  var init_isAddress = __esm({
    "node_modules/viem/_esm/utils/address/isAddress.js"() {
      init_lru();
      init_getAddress();
      addressRegex = /^0x[a-fA-F0-9]{40}$/;
      isAddressCache = /* @__PURE__ */ new LruMap(8192);
    }
  });

  // node_modules/viem/_esm/utils/data/concat.js
  function concat(values) {
    if (typeof values[0] === "string")
      return concatHex(values);
    return concatBytes2(values);
  }
  function concatBytes2(values) {
    let length = 0;
    for (const arr of values) {
      length += arr.length;
    }
    const result = new Uint8Array(length);
    let offset = 0;
    for (const arr of values) {
      result.set(arr, offset);
      offset += arr.length;
    }
    return result;
  }
  function concatHex(values) {
    return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
  }
  var init_concat = __esm({
    "node_modules/viem/_esm/utils/data/concat.js"() {
    }
  });

  // node_modules/viem/_esm/utils/data/slice.js
  function slice(value, start, end, { strict } = {}) {
    if (isHex(value, { strict: false }))
      return sliceHex(value, start, end, {
        strict
      });
    return sliceBytes(value, start, end, {
      strict
    });
  }
  function assertStartOffset(value, start) {
    if (typeof start === "number" && start > 0 && start > size(value) - 1)
      throw new SliceOffsetOutOfBoundsError({
        offset: start,
        position: "start",
        size: size(value)
      });
  }
  function assertEndOffset(value, start, end) {
    if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
      throw new SliceOffsetOutOfBoundsError({
        offset: end,
        position: "end",
        size: size(value)
      });
    }
  }
  function sliceBytes(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = value_.slice(start, end);
    if (strict)
      assertEndOffset(value, start, end);
    return value;
  }
  function sliceHex(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
    if (strict)
      assertEndOffset(value, start, end);
    return value;
  }
  var init_slice = __esm({
    "node_modules/viem/_esm/utils/data/slice.js"() {
      init_data();
      init_isHex();
      init_size();
    }
  });

  // node_modules/viem/_esm/utils/regex.js
  var bytesRegex2, integerRegex2;
  var init_regex2 = __esm({
    "node_modules/viem/_esm/utils/regex.js"() {
      bytesRegex2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
      integerRegex2 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
    }
  });

  // node_modules/viem/_esm/utils/abi/encodeAbiParameters.js
  function encodeAbiParameters(params, values) {
    if (params.length !== values.length)
      throw new AbiEncodingLengthMismatchError({
        expectedLength: params.length,
        givenLength: values.length
      });
    const preparedParams = prepareParams({
      params,
      values
    });
    const data = encodeParams(preparedParams);
    if (data.length === 0)
      return "0x";
    return data;
  }
  function prepareParams({ params, values }) {
    const preparedParams = [];
    for (let i20 = 0; i20 < params.length; i20++) {
      preparedParams.push(prepareParam({ param: params[i20], value: values[i20] }));
    }
    return preparedParams;
  }
  function prepareParam({ param, value }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return encodeArray(value, { length, param: { ...param, type } });
    }
    if (param.type === "tuple") {
      return encodeTuple(value, {
        param
      });
    }
    if (param.type === "address") {
      return encodeAddress(value);
    }
    if (param.type === "bool") {
      return encodeBool(value);
    }
    if (param.type.startsWith("uint") || param.type.startsWith("int")) {
      const signed = param.type.startsWith("int");
      const [, , size5 = "256"] = integerRegex2.exec(param.type) ?? [];
      return encodeNumber(value, {
        signed,
        size: Number(size5)
      });
    }
    if (param.type.startsWith("bytes")) {
      return encodeBytes(value, { param });
    }
    if (param.type === "string") {
      return encodeString(value);
    }
    throw new InvalidAbiEncodingTypeError(param.type, {
      docsPath: "/docs/contract/encodeAbiParameters"
    });
  }
  function encodeParams(preparedParams) {
    let staticSize = 0;
    for (let i20 = 0; i20 < preparedParams.length; i20++) {
      const { dynamic, encoded } = preparedParams[i20];
      if (dynamic)
        staticSize += 32;
      else
        staticSize += size(encoded);
    }
    const staticParams = [];
    const dynamicParams = [];
    let dynamicSize = 0;
    for (let i20 = 0; i20 < preparedParams.length; i20++) {
      const { dynamic, encoded } = preparedParams[i20];
      if (dynamic) {
        staticParams.push(numberToHex(staticSize + dynamicSize, { size: 32 }));
        dynamicParams.push(encoded);
        dynamicSize += size(encoded);
      } else {
        staticParams.push(encoded);
      }
    }
    return concat([...staticParams, ...dynamicParams]);
  }
  function encodeAddress(value) {
    if (!isAddress(value))
      throw new InvalidAddressError({ address: value });
    return { dynamic: false, encoded: padHex(value.toLowerCase()) };
  }
  function encodeArray(value, { length, param }) {
    const dynamic = length === null;
    if (!Array.isArray(value))
      throw new InvalidArrayError(value);
    if (!dynamic && value.length !== length)
      throw new AbiEncodingArrayLengthMismatchError({
        expectedLength: length,
        givenLength: value.length,
        type: `${param.type}[${length}]`
      });
    let dynamicChild = false;
    const preparedParams = [];
    for (let i20 = 0; i20 < value.length; i20++) {
      const preparedParam = prepareParam({ param, value: value[i20] });
      if (preparedParam.dynamic)
        dynamicChild = true;
      preparedParams.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
      const data = encodeParams(preparedParams);
      if (dynamic) {
        const length2 = numberToHex(preparedParams.length, { size: 32 });
        return {
          dynamic: true,
          encoded: preparedParams.length > 0 ? concat([length2, data]) : length2
        };
      }
      if (dynamicChild)
        return { dynamic: true, encoded: data };
    }
    return {
      dynamic: false,
      encoded: concat(preparedParams.map(({ encoded }) => encoded))
    };
  }
  function encodeBytes(value, { param }) {
    const [, paramSize] = param.type.split("bytes");
    const bytesSize = size(value);
    if (!paramSize) {
      let value_ = value;
      if (bytesSize % 32 !== 0)
        value_ = padHex(value_, {
          dir: "right",
          size: Math.ceil((value.length - 2) / 2 / 32) * 32
        });
      return {
        dynamic: true,
        encoded: concat([padHex(numberToHex(bytesSize, { size: 32 })), value_])
      };
    }
    if (bytesSize !== Number.parseInt(paramSize, 10))
      throw new AbiEncodingBytesSizeMismatchError({
        expectedSize: Number.parseInt(paramSize, 10),
        value
      });
    return { dynamic: false, encoded: padHex(value, { dir: "right" }) };
  }
  function encodeBool(value) {
    if (typeof value !== "boolean")
      throw new BaseError2(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
    return { dynamic: false, encoded: padHex(boolToHex(value)) };
  }
  function encodeNumber(value, { signed, size: size5 = 256 }) {
    if (typeof size5 === "number") {
      const max = 2n ** (BigInt(size5) - (signed ? 1n : 0n)) - 1n;
      const min = signed ? -max - 1n : 0n;
      if (value > max || value < min)
        throw new IntegerOutOfRangeError({
          max: max.toString(),
          min: min.toString(),
          signed,
          size: size5 / 8,
          value: value.toString()
        });
    }
    return {
      dynamic: false,
      encoded: numberToHex(value, {
        size: 32,
        signed
      })
    };
  }
  function encodeString(value) {
    const hexValue = stringToHex(value);
    const partsLength = Math.ceil(size(hexValue) / 32);
    const parts = [];
    for (let i20 = 0; i20 < partsLength; i20++) {
      parts.push(padHex(slice(hexValue, i20 * 32, (i20 + 1) * 32), {
        dir: "right"
      }));
    }
    return {
      dynamic: true,
      encoded: concat([
        padHex(numberToHex(size(hexValue), { size: 32 })),
        ...parts
      ])
    };
  }
  function encodeTuple(value, { param }) {
    let dynamic = false;
    const preparedParams = [];
    for (let i20 = 0; i20 < param.components.length; i20++) {
      const param_ = param.components[i20];
      const index2 = Array.isArray(value) ? i20 : param_.name;
      const preparedParam = prepareParam({
        param: param_,
        value: value[index2]
      });
      preparedParams.push(preparedParam);
      if (preparedParam.dynamic)
        dynamic = true;
    }
    return {
      dynamic,
      encoded: dynamic ? encodeParams(preparedParams) : concat(preparedParams.map(({ encoded }) => encoded))
    };
  }
  function getArrayComponents(type) {
    const matches = type.match(/^(.*)\[(\d+)?\]$/);
    return matches ? (
      // Return `null` if the array is dynamic.
      [matches[2] ? Number(matches[2]) : null, matches[1]]
    ) : void 0;
  }
  var init_encodeAbiParameters = __esm({
    "node_modules/viem/_esm/utils/abi/encodeAbiParameters.js"() {
      init_abi();
      init_address();
      init_base();
      init_encoding();
      init_isAddress();
      init_concat();
      init_pad();
      init_size();
      init_slice();
      init_toHex();
      init_regex2();
    }
  });

  // node_modules/viem/_esm/utils/hash/toFunctionSelector.js
  var toFunctionSelector;
  var init_toFunctionSelector = __esm({
    "node_modules/viem/_esm/utils/hash/toFunctionSelector.js"() {
      init_slice();
      init_toSignatureHash();
      toFunctionSelector = (fn) => slice(toSignatureHash(fn), 0, 4);
    }
  });

  // node_modules/viem/_esm/utils/abi/getAbiItem.js
  function getAbiItem(parameters) {
    const { abi: abi2, args = [], name } = parameters;
    const isSelector = isHex(name, { strict: false });
    const abiItems = abi2.filter((abiItem) => {
      if (isSelector) {
        if (abiItem.type === "function")
          return toFunctionSelector(abiItem) === name;
        if (abiItem.type === "event")
          return toEventSelector(abiItem) === name;
        return false;
      }
      return "name" in abiItem && abiItem.name === name;
    });
    if (abiItems.length === 0)
      return void 0;
    if (abiItems.length === 1)
      return abiItems[0];
    let matchedAbiItem;
    for (const abiItem of abiItems) {
      if (!("inputs" in abiItem))
        continue;
      if (!args || args.length === 0) {
        if (!abiItem.inputs || abiItem.inputs.length === 0)
          return abiItem;
        continue;
      }
      if (!abiItem.inputs)
        continue;
      if (abiItem.inputs.length === 0)
        continue;
      if (abiItem.inputs.length !== args.length)
        continue;
      const matched = args.every((arg, index2) => {
        const abiParameter = "inputs" in abiItem && abiItem.inputs[index2];
        if (!abiParameter)
          return false;
        return isArgOfType(arg, abiParameter);
      });
      if (matched) {
        if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
          const ambiguousTypes = getAmbiguousTypes(abiItem.inputs, matchedAbiItem.inputs, args);
          if (ambiguousTypes)
            throw new AbiItemAmbiguityError({
              abiItem,
              type: ambiguousTypes[0]
            }, {
              abiItem: matchedAbiItem,
              type: ambiguousTypes[1]
            });
        }
        matchedAbiItem = abiItem;
      }
    }
    if (matchedAbiItem)
      return matchedAbiItem;
    return abiItems[0];
  }
  function isArgOfType(arg, abiParameter) {
    const argType = typeof arg;
    const abiParameterType = abiParameter.type;
    switch (abiParameterType) {
      case "address":
        return isAddress(arg, { strict: false });
      case "bool":
        return argType === "boolean";
      case "function":
        return argType === "string";
      case "string":
        return argType === "string";
      default: {
        if (abiParameterType === "tuple" && "components" in abiParameter)
          return Object.values(abiParameter.components).every((component, index2) => {
            return argType === "object" && isArgOfType(Object.values(arg)[index2], component);
          });
        if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
          return argType === "number" || argType === "bigint";
        if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
          return argType === "string" || arg instanceof Uint8Array;
        if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
          return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
            ...abiParameter,
            // Pop off `[]` or `[M]` from end of type
            type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
          }));
        }
        return false;
      }
    }
  }
  function getAmbiguousTypes(sourceParameters, targetParameters, args) {
    for (const parameterIndex in sourceParameters) {
      const sourceParameter = sourceParameters[parameterIndex];
      const targetParameter = targetParameters[parameterIndex];
      if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
        return getAmbiguousTypes(sourceParameter.components, targetParameter.components, args[parameterIndex]);
      const types = [sourceParameter.type, targetParameter.type];
      const ambiguous = (() => {
        if (types.includes("address") && types.includes("bytes20"))
          return true;
        if (types.includes("address") && types.includes("string"))
          return isAddress(args[parameterIndex], { strict: false });
        if (types.includes("address") && types.includes("bytes"))
          return isAddress(args[parameterIndex], { strict: false });
        return false;
      })();
      if (ambiguous)
        return types;
    }
    return;
  }
  var init_getAbiItem = __esm({
    "node_modules/viem/_esm/utils/abi/getAbiItem.js"() {
      init_abi();
      init_isHex();
      init_isAddress();
      init_toEventSelector();
      init_toFunctionSelector();
    }
  });

  // node_modules/viem/_esm/accounts/utils/parseAccount.js
  function parseAccount(account) {
    if (typeof account === "string")
      return { address: account, type: "json-rpc" };
    return account;
  }
  var init_parseAccount = __esm({
    "node_modules/viem/_esm/accounts/utils/parseAccount.js"() {
    }
  });

  // node_modules/viem/_esm/utils/abi/prepareEncodeFunctionData.js
  function prepareEncodeFunctionData(parameters) {
    const { abi: abi2, args, functionName } = parameters;
    let abiItem = abi2[0];
    if (functionName) {
      const item = getAbiItem({
        abi: abi2,
        args,
        name: functionName
      });
      if (!item)
        throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath2 });
      abiItem = item;
    }
    if (abiItem.type !== "function")
      throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath2 });
    return {
      abi: [abiItem],
      functionName: toFunctionSelector(formatAbiItem2(abiItem))
    };
  }
  var docsPath2;
  var init_prepareEncodeFunctionData = __esm({
    "node_modules/viem/_esm/utils/abi/prepareEncodeFunctionData.js"() {
      init_abi();
      init_toFunctionSelector();
      init_formatAbiItem2();
      init_getAbiItem();
      docsPath2 = "/docs/contract/encodeFunctionData";
    }
  });

  // node_modules/viem/_esm/utils/abi/encodeFunctionData.js
  function encodeFunctionData(parameters) {
    const { args } = parameters;
    const { abi: abi2, functionName } = (() => {
      if (parameters.abi.length === 1 && parameters.functionName?.startsWith("0x"))
        return parameters;
      return prepareEncodeFunctionData(parameters);
    })();
    const abiItem = abi2[0];
    const signature = functionName;
    const data = "inputs" in abiItem && abiItem.inputs ? encodeAbiParameters(abiItem.inputs, args ?? []) : void 0;
    return concatHex([signature, data ?? "0x"]);
  }
  var init_encodeFunctionData = __esm({
    "node_modules/viem/_esm/utils/abi/encodeFunctionData.js"() {
      init_concat();
      init_encodeAbiParameters();
      init_prepareEncodeFunctionData();
    }
  });

  // node_modules/viem/_esm/constants/solidity.js
  var panicReasons, solidityError, solidityPanic;
  var init_solidity = __esm({
    "node_modules/viem/_esm/constants/solidity.js"() {
      panicReasons = {
        1: "An `assert` condition failed.",
        17: "Arithmetic operation resulted in underflow or overflow.",
        18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
        33: "Attempted to convert to an invalid type.",
        34: "Attempted to access a storage byte array that is incorrectly encoded.",
        49: "Performed `.pop()` on an empty array",
        50: "Array index is out of bounds.",
        65: "Allocated too much memory or created an array which is too large.",
        81: "Attempted to call a zero-initialized variable of internal function type."
      };
      solidityError = {
        inputs: [
          {
            name: "message",
            type: "string"
          }
        ],
        name: "Error",
        type: "error"
      };
      solidityPanic = {
        inputs: [
          {
            name: "reason",
            type: "uint256"
          }
        ],
        name: "Panic",
        type: "error"
      };
    }
  });

  // node_modules/viem/_esm/errors/cursor.js
  var NegativeOffsetError, PositionOutOfBoundsError, RecursiveReadLimitExceededError;
  var init_cursor = __esm({
    "node_modules/viem/_esm/errors/cursor.js"() {
      init_base();
      NegativeOffsetError = class extends BaseError2 {
        constructor({ offset }) {
          super(`Offset \`${offset}\` cannot be negative.`, {
            name: "NegativeOffsetError"
          });
        }
      };
      PositionOutOfBoundsError = class extends BaseError2 {
        constructor({ length, position }) {
          super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
        }
      };
      RecursiveReadLimitExceededError = class extends BaseError2 {
        constructor({ count, limit }) {
          super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/cursor.js
  function createCursor(bytes, { recursiveReadLimit = 8192 } = {}) {
    const cursor = Object.create(staticCursor);
    cursor.bytes = bytes;
    cursor.dataView = new DataView(bytes.buffer ?? bytes, bytes.byteOffset, bytes.byteLength);
    cursor.positionReadCount = /* @__PURE__ */ new Map();
    cursor.recursiveReadLimit = recursiveReadLimit;
    return cursor;
  }
  var staticCursor;
  var init_cursor2 = __esm({
    "node_modules/viem/_esm/utils/cursor.js"() {
      init_cursor();
      staticCursor = {
        bytes: new Uint8Array(),
        dataView: new DataView(new ArrayBuffer(0)),
        position: 0,
        positionReadCount: /* @__PURE__ */ new Map(),
        recursiveReadCount: 0,
        recursiveReadLimit: Number.POSITIVE_INFINITY,
        assertReadLimit() {
          if (this.recursiveReadCount >= this.recursiveReadLimit)
            throw new RecursiveReadLimitExceededError({
              count: this.recursiveReadCount + 1,
              limit: this.recursiveReadLimit
            });
        },
        assertPosition(position) {
          if (position < 0 || position > this.bytes.length - 1)
            throw new PositionOutOfBoundsError({
              length: this.bytes.length,
              position
            });
        },
        decrementPosition(offset) {
          if (offset < 0)
            throw new NegativeOffsetError({ offset });
          const position = this.position - offset;
          this.assertPosition(position);
          this.position = position;
        },
        getReadCount(position) {
          return this.positionReadCount.get(position || this.position) || 0;
        },
        incrementPosition(offset) {
          if (offset < 0)
            throw new NegativeOffsetError({ offset });
          const position = this.position + offset;
          this.assertPosition(position);
          this.position = position;
        },
        inspectByte(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position);
          return this.bytes[position];
        },
        inspectBytes(length, position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + length - 1);
          return this.bytes.subarray(position, position + length);
        },
        inspectUint8(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position);
          return this.bytes[position];
        },
        inspectUint16(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + 1);
          return this.dataView.getUint16(position);
        },
        inspectUint24(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + 2);
          return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
        },
        inspectUint32(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + 3);
          return this.dataView.getUint32(position);
        },
        pushByte(byte) {
          this.assertPosition(this.position);
          this.bytes[this.position] = byte;
          this.position++;
        },
        pushBytes(bytes) {
          this.assertPosition(this.position + bytes.length - 1);
          this.bytes.set(bytes, this.position);
          this.position += bytes.length;
        },
        pushUint8(value) {
          this.assertPosition(this.position);
          this.bytes[this.position] = value;
          this.position++;
        },
        pushUint16(value) {
          this.assertPosition(this.position + 1);
          this.dataView.setUint16(this.position, value);
          this.position += 2;
        },
        pushUint24(value) {
          this.assertPosition(this.position + 2);
          this.dataView.setUint16(this.position, value >> 8);
          this.dataView.setUint8(this.position + 2, value & ~4294967040);
          this.position += 3;
        },
        pushUint32(value) {
          this.assertPosition(this.position + 3);
          this.dataView.setUint32(this.position, value);
          this.position += 4;
        },
        readByte() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectByte();
          this.position++;
          return value;
        },
        readBytes(length, size5) {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectBytes(length);
          this.position += size5 ?? length;
          return value;
        },
        readUint8() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint8();
          this.position += 1;
          return value;
        },
        readUint16() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint16();
          this.position += 2;
          return value;
        },
        readUint24() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint24();
          this.position += 3;
          return value;
        },
        readUint32() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint32();
          this.position += 4;
          return value;
        },
        get remaining() {
          return this.bytes.length - this.position;
        },
        setPosition(position) {
          const oldPosition = this.position;
          this.assertPosition(position);
          this.position = position;
          return () => this.position = oldPosition;
        },
        _touch() {
          if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
            return;
          const count = this.getReadCount();
          this.positionReadCount.set(this.position, count + 1);
          if (count > 0)
            this.recursiveReadCount++;
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/encoding/fromBytes.js
  function bytesToBigInt(bytes, opts = {}) {
    if (typeof opts.size !== "undefined")
      assertSize(bytes, { size: opts.size });
    const hex2 = bytesToHex(bytes, opts);
    return hexToBigInt(hex2, opts);
  }
  function bytesToBool(bytes_, opts = {}) {
    let bytes = bytes_;
    if (typeof opts.size !== "undefined") {
      assertSize(bytes, { size: opts.size });
      bytes = trim(bytes);
    }
    if (bytes.length > 1 || bytes[0] > 1)
      throw new InvalidBytesBooleanError(bytes);
    return Boolean(bytes[0]);
  }
  function bytesToNumber(bytes, opts = {}) {
    if (typeof opts.size !== "undefined")
      assertSize(bytes, { size: opts.size });
    const hex2 = bytesToHex(bytes, opts);
    return hexToNumber(hex2, opts);
  }
  function bytesToString(bytes_, opts = {}) {
    let bytes = bytes_;
    if (typeof opts.size !== "undefined") {
      assertSize(bytes, { size: opts.size });
      bytes = trim(bytes, { dir: "right" });
    }
    return new TextDecoder().decode(bytes);
  }
  var init_fromBytes = __esm({
    "node_modules/viem/_esm/utils/encoding/fromBytes.js"() {
      init_encoding();
      init_trim();
      init_fromHex();
      init_toHex();
    }
  });

  // node_modules/viem/_esm/utils/abi/decodeAbiParameters.js
  function decodeAbiParameters(params, data) {
    const bytes = typeof data === "string" ? hexToBytes(data) : data;
    const cursor = createCursor(bytes);
    if (size(bytes) === 0 && params.length > 0)
      throw new AbiDecodingZeroDataError();
    if (size(data) && size(data) < 32)
      throw new AbiDecodingDataSizeTooSmallError({
        data: typeof data === "string" ? data : bytesToHex(data),
        params,
        size: size(data)
      });
    let consumed = 0;
    const values = [];
    for (let i20 = 0; i20 < params.length; ++i20) {
      const param = params[i20];
      cursor.setPosition(consumed);
      const [data2, consumed_] = decodeParameter(cursor, param, {
        staticPosition: 0
      });
      consumed += consumed_;
      values.push(data2);
    }
    return values;
  }
  function decodeParameter(cursor, param, { staticPosition }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return decodeArray(cursor, { ...param, type }, { length, staticPosition });
    }
    if (param.type === "tuple")
      return decodeTuple(cursor, param, { staticPosition });
    if (param.type === "address")
      return decodeAddress(cursor);
    if (param.type === "bool")
      return decodeBool(cursor);
    if (param.type.startsWith("bytes"))
      return decodeBytes(cursor, param, { staticPosition });
    if (param.type.startsWith("uint") || param.type.startsWith("int"))
      return decodeNumber(cursor, param);
    if (param.type === "string")
      return decodeString(cursor, { staticPosition });
    throw new InvalidAbiDecodingTypeError(param.type, {
      docsPath: "/docs/contract/decodeAbiParameters"
    });
  }
  function decodeAddress(cursor) {
    const value = cursor.readBytes(32);
    return [checksumAddress(bytesToHex(sliceBytes(value, -20))), 32];
  }
  function decodeArray(cursor, param, { length, staticPosition }) {
    if (!length) {
      const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
      const start = staticPosition + offset;
      const startOfData = start + sizeOfLength;
      cursor.setPosition(start);
      const length2 = bytesToNumber(cursor.readBytes(sizeOfLength));
      const dynamicChild = hasDynamicChild(param);
      let consumed2 = 0;
      const value2 = [];
      for (let i20 = 0; i20 < length2; ++i20) {
        cursor.setPosition(startOfData + (dynamicChild ? i20 * 32 : consumed2));
        const [data, consumed_] = decodeParameter(cursor, param, {
          staticPosition: startOfData
        });
        consumed2 += consumed_;
        value2.push(data);
      }
      cursor.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    if (hasDynamicChild(param)) {
      const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
      const start = staticPosition + offset;
      const value2 = [];
      for (let i20 = 0; i20 < length; ++i20) {
        cursor.setPosition(start + i20 * 32);
        const [data] = decodeParameter(cursor, param, {
          staticPosition: start
        });
        value2.push(data);
      }
      cursor.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    let consumed = 0;
    const value = [];
    for (let i20 = 0; i20 < length; ++i20) {
      const [data, consumed_] = decodeParameter(cursor, param, {
        staticPosition: staticPosition + consumed
      });
      consumed += consumed_;
      value.push(data);
    }
    return [value, consumed];
  }
  function decodeBool(cursor) {
    return [bytesToBool(cursor.readBytes(32), { size: 32 }), 32];
  }
  function decodeBytes(cursor, param, { staticPosition }) {
    const [_4, size5] = param.type.split("bytes");
    if (!size5) {
      const offset = bytesToNumber(cursor.readBytes(32));
      cursor.setPosition(staticPosition + offset);
      const length = bytesToNumber(cursor.readBytes(32));
      if (length === 0) {
        cursor.setPosition(staticPosition + 32);
        return ["0x", 32];
      }
      const data = cursor.readBytes(length);
      cursor.setPosition(staticPosition + 32);
      return [bytesToHex(data), 32];
    }
    const value = bytesToHex(cursor.readBytes(Number.parseInt(size5, 10), 32));
    return [value, 32];
  }
  function decodeNumber(cursor, param) {
    const signed = param.type.startsWith("int");
    const size5 = Number.parseInt(param.type.split("int")[1] || "256", 10);
    const value = cursor.readBytes(32);
    return [
      size5 > 48 ? bytesToBigInt(value, { signed }) : bytesToNumber(value, { signed }),
      32
    ];
  }
  function decodeTuple(cursor, param, { staticPosition }) {
    const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
    const value = hasUnnamedChild ? [] : {};
    let consumed = 0;
    if (hasDynamicChild(param)) {
      const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
      const start = staticPosition + offset;
      for (let i20 = 0; i20 < param.components.length; ++i20) {
        const component = param.components[i20];
        cursor.setPosition(start + consumed);
        const [data, consumed_] = decodeParameter(cursor, component, {
          staticPosition: start
        });
        consumed += consumed_;
        value[hasUnnamedChild ? i20 : component?.name] = data;
      }
      cursor.setPosition(staticPosition + 32);
      return [value, 32];
    }
    for (let i20 = 0; i20 < param.components.length; ++i20) {
      const component = param.components[i20];
      const [data, consumed_] = decodeParameter(cursor, component, {
        staticPosition
      });
      value[hasUnnamedChild ? i20 : component?.name] = data;
      consumed += consumed_;
    }
    return [value, consumed];
  }
  function decodeString(cursor, { staticPosition }) {
    const offset = bytesToNumber(cursor.readBytes(32));
    const start = staticPosition + offset;
    cursor.setPosition(start);
    const length = bytesToNumber(cursor.readBytes(32));
    if (length === 0) {
      cursor.setPosition(staticPosition + 32);
      return ["", 32];
    }
    const data = cursor.readBytes(length, 32);
    const value = bytesToString(trim(data));
    cursor.setPosition(staticPosition + 32);
    return [value, 32];
  }
  function hasDynamicChild(param) {
    const { type } = param;
    if (type === "string")
      return true;
    if (type === "bytes")
      return true;
    if (type.endsWith("[]"))
      return true;
    if (type === "tuple")
      return param.components?.some(hasDynamicChild);
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents && hasDynamicChild({ ...param, type: arrayComponents[1] }))
      return true;
    return false;
  }
  var sizeOfLength, sizeOfOffset;
  var init_decodeAbiParameters = __esm({
    "node_modules/viem/_esm/utils/abi/decodeAbiParameters.js"() {
      init_abi();
      init_getAddress();
      init_cursor2();
      init_size();
      init_slice();
      init_trim();
      init_fromBytes();
      init_toBytes();
      init_toHex();
      init_encodeAbiParameters();
      sizeOfLength = 32;
      sizeOfOffset = 32;
    }
  });

  // node_modules/viem/_esm/utils/abi/decodeErrorResult.js
  function decodeErrorResult(parameters) {
    const { abi: abi2, data, cause } = parameters;
    const signature = slice(data, 0, 4);
    if (signature === "0x")
      throw new AbiDecodingZeroDataError({ cause });
    const abi_ = [...abi2 || [], solidityError, solidityPanic];
    const abiItem = abi_.find((x) => x.type === "error" && signature === toFunctionSelector(formatAbiItem2(x)));
    if (!abiItem)
      throw new AbiErrorSignatureNotFoundError(signature, {
        docsPath: "/docs/contract/decodeErrorResult",
        cause
      });
    return {
      abiItem,
      args: "inputs" in abiItem && abiItem.inputs && abiItem.inputs.length > 0 ? decodeAbiParameters(abiItem.inputs, slice(data, 4)) : void 0,
      errorName: abiItem.name
    };
  }
  var init_decodeErrorResult = __esm({
    "node_modules/viem/_esm/utils/abi/decodeErrorResult.js"() {
      init_solidity();
      init_abi();
      init_slice();
      init_toFunctionSelector();
      init_decodeAbiParameters();
      init_formatAbiItem2();
    }
  });

  // node_modules/viem/_esm/utils/stringify.js
  var stringify;
  var init_stringify = __esm({
    "node_modules/viem/_esm/utils/stringify.js"() {
      stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
        const value2 = typeof value_ === "bigint" ? value_.toString() : value_;
        return typeof replacer === "function" ? replacer(key, value2) : value2;
      }, space);
    }
  });

  // node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js
  function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false }) {
    if (!("name" in abiItem))
      return;
    if (!("inputs" in abiItem))
      return;
    if (!abiItem.inputs)
      return;
    return `${includeFunctionName ? abiItem.name : ""}(${abiItem.inputs.map((input, i20) => `${includeName && input.name ? `${input.name}: ` : ""}${typeof args[i20] === "object" ? stringify(args[i20]) : args[i20]}`).join(", ")})`;
  }
  var init_formatAbiItemWithArgs = __esm({
    "node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js"() {
      init_stringify();
    }
  });

  // node_modules/viem/_esm/constants/unit.js
  var etherUnits, gweiUnits;
  var init_unit = __esm({
    "node_modules/viem/_esm/constants/unit.js"() {
      etherUnits = {
        gwei: 9,
        wei: 18
      };
      gweiUnits = {
        ether: -9,
        wei: 9
      };
    }
  });

  // node_modules/viem/_esm/utils/unit/formatUnits.js
  function formatUnits(value, decimals) {
    let display = value.toString();
    const negative = display.startsWith("-");
    if (negative)
      display = display.slice(1);
    display = display.padStart(decimals, "0");
    let [integer, fraction] = [
      display.slice(0, display.length - decimals),
      display.slice(display.length - decimals)
    ];
    fraction = fraction.replace(/(0+)$/, "");
    return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
  }
  var init_formatUnits = __esm({
    "node_modules/viem/_esm/utils/unit/formatUnits.js"() {
    }
  });

  // node_modules/viem/_esm/utils/unit/formatEther.js
  function formatEther(wei, unit = "wei") {
    return formatUnits(wei, etherUnits[unit]);
  }
  var init_formatEther = __esm({
    "node_modules/viem/_esm/utils/unit/formatEther.js"() {
      init_unit();
      init_formatUnits();
    }
  });

  // node_modules/viem/_esm/utils/unit/formatGwei.js
  function formatGwei(wei, unit = "wei") {
    return formatUnits(wei, gweiUnits[unit]);
  }
  var init_formatGwei = __esm({
    "node_modules/viem/_esm/utils/unit/formatGwei.js"() {
      init_unit();
      init_formatUnits();
    }
  });

  // node_modules/viem/_esm/errors/stateOverride.js
  function prettyStateMapping(stateMapping) {
    return stateMapping.reduce((pretty, { slot, value }) => {
      return `${pretty}        ${slot}: ${value}
`;
    }, "");
  }
  function prettyStateOverride(stateOverride) {
    return stateOverride.reduce((pretty, { address, ...state }) => {
      let val = `${pretty}    ${address}:
`;
      if (state.nonce)
        val += `      nonce: ${state.nonce}
`;
      if (state.balance)
        val += `      balance: ${state.balance}
`;
      if (state.code)
        val += `      code: ${state.code}
`;
      if (state.state) {
        val += "      state:\n";
        val += prettyStateMapping(state.state);
      }
      if (state.stateDiff) {
        val += "      stateDiff:\n";
        val += prettyStateMapping(state.stateDiff);
      }
      return val;
    }, "  State Override:\n").slice(0, -1);
  }
  var AccountStateConflictError, StateAssignmentConflictError;
  var init_stateOverride = __esm({
    "node_modules/viem/_esm/errors/stateOverride.js"() {
      init_base();
      AccountStateConflictError = class extends BaseError2 {
        constructor({ address }) {
          super(`State for account "${address}" is set multiple times.`, {
            name: "AccountStateConflictError"
          });
        }
      };
      StateAssignmentConflictError = class extends BaseError2 {
        constructor() {
          super("state and stateDiff are set on the same account.", {
            name: "StateAssignmentConflictError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/transaction.js
  function prettyPrint(args) {
    const entries = Object.entries(args).map(([key, value]) => {
      if (value === void 0 || value === false)
        return null;
      return [key, value];
    }).filter(Boolean);
    const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
    return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
  }
  var InvalidSerializableTransactionError, TransactionExecutionError, TransactionNotFoundError, TransactionReceiptNotFoundError, TransactionReceiptRevertedError, WaitForTransactionReceiptTimeoutError;
  var init_transaction = __esm({
    "node_modules/viem/_esm/errors/transaction.js"() {
      init_formatEther();
      init_formatGwei();
      init_base();
      InvalidSerializableTransactionError = class extends BaseError2 {
        constructor({ transaction }) {
          super("Cannot infer a transaction type from provided transaction.", {
            metaMessages: [
              "Provided Transaction:",
              "{",
              prettyPrint(transaction),
              "}",
              "",
              "To infer the type, either provide:",
              "- a `type` to the Transaction, or",
              "- an EIP-1559 Transaction with `maxFeePerGas`, or",
              "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
              "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
              "- an EIP-7702 Transaction with `authorizationList`, or",
              "- a Legacy Transaction with `gasPrice`"
            ],
            name: "InvalidSerializableTransactionError"
          });
        }
      };
      TransactionExecutionError = class extends BaseError2 {
        constructor(cause, { account, docsPath: docsPath8, chain: chain2, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
          const prettyArgs = prettyPrint({
            chain: chain2 && `${chain2?.name} (id: ${chain2?.id})`,
            from: account?.address,
            to,
            value: typeof value !== "undefined" && `${formatEther(value)} ${chain2?.nativeCurrency?.symbol || "ETH"}`,
            data,
            gas,
            gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
            maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
            nonce
          });
          super(cause.shortMessage, {
            cause,
            docsPath: docsPath8,
            metaMessages: [
              ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
              "Request Arguments:",
              prettyArgs
            ].filter(Boolean),
            name: "TransactionExecutionError"
          });
          Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.cause = cause;
        }
      };
      TransactionNotFoundError = class extends BaseError2 {
        constructor({ blockHash, blockNumber, blockTag, hash: hash3, index: index2 }) {
          let identifier = "Transaction";
          if (blockTag && index2 !== void 0)
            identifier = `Transaction at block time "${blockTag}" at index "${index2}"`;
          if (blockHash && index2 !== void 0)
            identifier = `Transaction at block hash "${blockHash}" at index "${index2}"`;
          if (blockNumber && index2 !== void 0)
            identifier = `Transaction at block number "${blockNumber}" at index "${index2}"`;
          if (hash3)
            identifier = `Transaction with hash "${hash3}"`;
          super(`${identifier} could not be found.`, {
            name: "TransactionNotFoundError"
          });
        }
      };
      TransactionReceiptNotFoundError = class extends BaseError2 {
        constructor({ hash: hash3 }) {
          super(`Transaction receipt with hash "${hash3}" could not be found. The Transaction may not be processed on a block yet.`, {
            name: "TransactionReceiptNotFoundError"
          });
        }
      };
      TransactionReceiptRevertedError = class extends BaseError2 {
        constructor({ receipt }) {
          super(`Transaction with hash "${receipt.transactionHash}" reverted.`, {
            metaMessages: [
              'The receipt marked the transaction as "reverted". This could mean that the function on the contract you are trying to call threw an error.',
              " ",
              "You can attempt to extract the revert reason by:",
              "- calling the `simulateContract` or `simulateCalls` Action with the `abi` and `functionName` of the contract",
              "- using the `call` Action with raw `data`"
            ],
            name: "TransactionReceiptRevertedError"
          });
          Object.defineProperty(this, "receipt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.receipt = receipt;
        }
      };
      WaitForTransactionReceiptTimeoutError = class extends BaseError2 {
        constructor({ hash: hash3 }) {
          super(`Timed out while waiting for transaction with hash "${hash3}" to be confirmed.`, { name: "WaitForTransactionReceiptTimeoutError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/utils.js
  var getContractAddress, getUrl;
  var init_utils3 = __esm({
    "node_modules/viem/_esm/errors/utils.js"() {
      getContractAddress = (address) => address;
      getUrl = (url) => url;
    }
  });

  // node_modules/viem/_esm/errors/contract.js
  var CallExecutionError, ContractFunctionExecutionError, ContractFunctionRevertedError, ContractFunctionZeroDataError, CounterfactualDeploymentFailedError, RawContractError;
  var init_contract = __esm({
    "node_modules/viem/_esm/errors/contract.js"() {
      init_parseAccount();
      init_solidity();
      init_decodeErrorResult();
      init_formatAbiItem2();
      init_formatAbiItemWithArgs();
      init_getAbiItem();
      init_formatEther();
      init_formatGwei();
      init_abi();
      init_base();
      init_stateOverride();
      init_transaction();
      init_utils3();
      CallExecutionError = class extends BaseError2 {
        constructor(cause, { account: account_, docsPath: docsPath8, chain: chain2, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride }) {
          const account = account_ ? parseAccount(account_) : void 0;
          let prettyArgs = prettyPrint({
            from: account?.address,
            to,
            value: typeof value !== "undefined" && `${formatEther(value)} ${chain2?.nativeCurrency?.symbol || "ETH"}`,
            data,
            gas,
            gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
            maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
            nonce
          });
          if (stateOverride) {
            prettyArgs += `
${prettyStateOverride(stateOverride)}`;
          }
          super(cause.shortMessage, {
            cause,
            docsPath: docsPath8,
            metaMessages: [
              ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
              "Raw Call Arguments:",
              prettyArgs
            ].filter(Boolean),
            name: "CallExecutionError"
          });
          Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.cause = cause;
        }
      };
      ContractFunctionExecutionError = class extends BaseError2 {
        constructor(cause, { abi: abi2, args, contractAddress, docsPath: docsPath8, functionName, sender }) {
          const abiItem = getAbiItem({ abi: abi2, args, name: functionName });
          const formattedArgs = abiItem ? formatAbiItemWithArgs({
            abiItem,
            args,
            includeFunctionName: false,
            includeName: false
          }) : void 0;
          const functionWithParams = abiItem ? formatAbiItem2(abiItem, { includeName: true }) : void 0;
          const prettyArgs = prettyPrint({
            address: contractAddress && getContractAddress(contractAddress),
            function: functionWithParams,
            args: formattedArgs && formattedArgs !== "()" && `${[...Array(functionName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}`,
            sender
          });
          super(cause.shortMessage || `An unknown error occurred while executing the contract function "${functionName}".`, {
            cause,
            docsPath: docsPath8,
            metaMessages: [
              ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
              prettyArgs && "Contract Call:",
              prettyArgs
            ].filter(Boolean),
            name: "ContractFunctionExecutionError"
          });
          Object.defineProperty(this, "abi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "args", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "contractAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "formattedArgs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "functionName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "sender", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.abi = abi2;
          this.args = args;
          this.cause = cause;
          this.contractAddress = contractAddress;
          this.functionName = functionName;
          this.sender = sender;
        }
      };
      ContractFunctionRevertedError = class extends BaseError2 {
        constructor({ abi: abi2, data, functionName, message, cause: error }) {
          let cause;
          let decodedData;
          let metaMessages;
          let reason;
          if (data && data !== "0x") {
            try {
              decodedData = decodeErrorResult({ abi: abi2, data, cause: error });
              const { abiItem, errorName, args: errorArgs } = decodedData;
              if (errorName === "Error") {
                reason = errorArgs[0];
              } else if (errorName === "Panic") {
                const [firstArg] = errorArgs;
                reason = panicReasons[firstArg];
              } else {
                const errorWithParams = abiItem ? formatAbiItem2(abiItem, { includeName: true }) : void 0;
                const formattedArgs = abiItem && errorArgs ? formatAbiItemWithArgs({
                  abiItem,
                  args: errorArgs,
                  includeFunctionName: false,
                  includeName: false
                }) : void 0;
                metaMessages = [
                  errorWithParams ? `Error: ${errorWithParams}` : "",
                  formattedArgs && formattedArgs !== "()" ? `       ${[...Array(errorName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}` : ""
                ];
              }
            } catch (err) {
              cause = err;
            }
          } else if (message)
            reason = message;
          let signature;
          if (cause instanceof AbiErrorSignatureNotFoundError) {
            signature = cause.signature;
            metaMessages = [
              `Unable to decode signature "${signature}" as it was not found on the provided ABI.`,
              "Make sure you are using the correct ABI and that the error exists on it.",
              `You can look up the decoded signature here: https://4byte.sourcify.dev/?q=${signature}.`
            ];
          }
          super(reason && reason !== "execution reverted" || signature ? [
            `The contract function "${functionName}" reverted with the following ${signature ? "signature" : "reason"}:`,
            reason || signature
          ].join("\n") : `The contract function "${functionName}" reverted.`, {
            cause: cause ?? error,
            metaMessages,
            name: "ContractFunctionRevertedError"
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "raw", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "reason", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "signature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.data = decodedData;
          this.raw = data;
          this.reason = reason;
          this.signature = signature;
        }
      };
      ContractFunctionZeroDataError = class extends BaseError2 {
        constructor({ functionName, cause }) {
          super(`The contract function "${functionName}" returned no data ("0x").`, {
            metaMessages: [
              "This could be due to any of the following:",
              `  - The contract does not have the function "${functionName}",`,
              "  - The parameters passed to the contract function may be invalid, or",
              "  - The address is not a contract."
            ],
            name: "ContractFunctionZeroDataError",
            cause
          });
        }
      };
      CounterfactualDeploymentFailedError = class extends BaseError2 {
        constructor({ factory }) {
          super(`Deployment for counterfactual contract call failed${factory ? ` for factory "${factory}".` : ""}`, {
            metaMessages: [
              "Please ensure:",
              "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).",
              "- The `factoryData` is a valid encoded function call for contract deployment function on the factory."
            ],
            name: "CounterfactualDeploymentFailedError"
          });
        }
      };
      RawContractError = class extends BaseError2 {
        constructor({ data, message }) {
          super(message || "", { name: "RawContractError" });
          Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.data = data;
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/request.js
  var HttpRequestError, RpcRequestError, TimeoutError;
  var init_request = __esm({
    "node_modules/viem/_esm/errors/request.js"() {
      init_stringify();
      init_base();
      init_utils3();
      HttpRequestError = class extends BaseError2 {
        constructor({ body, cause, details, headers, status, url }) {
          super("HTTP request failed.", {
            cause,
            details,
            metaMessages: [
              status && `Status: ${status}`,
              `URL: ${getUrl(url)}`,
              body && `Request body: ${stringify(body)}`
            ].filter(Boolean),
            name: "HttpRequestError"
          });
          Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.body = body;
          this.headers = headers;
          this.status = status;
          this.url = url;
        }
      };
      RpcRequestError = class extends BaseError2 {
        constructor({ body, error, url }) {
          super("RPC Request failed.", {
            cause: error,
            details: error.message,
            metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
            name: "RpcRequestError"
          });
          Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.code = error.code;
          this.data = error.data;
          this.url = url;
        }
      };
      TimeoutError = class extends BaseError2 {
        constructor({ body, url }) {
          super("The request took too long to respond.", {
            details: "The request timed out.",
            metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
            name: "TimeoutError"
          });
          Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.url = url;
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/rpc.js
  var unknownErrorCode, RpcError, ProviderRpcError, ParseRpcError, InvalidRequestRpcError, MethodNotFoundRpcError, InvalidParamsRpcError, InternalRpcError, InvalidInputRpcError, ResourceNotFoundRpcError, ResourceUnavailableRpcError, TransactionRejectedRpcError, MethodNotSupportedRpcError, LimitExceededRpcError, JsonRpcVersionUnsupportedError, UserRejectedRequestError, UnauthorizedProviderError, UnsupportedProviderMethodError, ProviderDisconnectedError, ChainDisconnectedError, SwitchChainError, UnsupportedNonOptionalCapabilityError, UnsupportedChainIdError, DuplicateIdError, UnknownBundleIdError, BundleTooLargeError, AtomicReadyWalletRejectedUpgradeError, AtomicityNotSupportedError, WalletConnectSessionSettlementError, UnknownRpcError;
  var init_rpc = __esm({
    "node_modules/viem/_esm/errors/rpc.js"() {
      init_base();
      init_request();
      unknownErrorCode = -1;
      RpcError = class extends BaseError2 {
        constructor(cause, { code, docsPath: docsPath8, metaMessages, name, shortMessage }) {
          super(shortMessage, {
            cause,
            docsPath: docsPath8,
            metaMessages: metaMessages || cause?.metaMessages,
            name: name || "RpcError"
          });
          Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.name = name || cause.name;
          this.code = cause instanceof RpcRequestError ? cause.code : code ?? unknownErrorCode;
        }
      };
      ProviderRpcError = class extends RpcError {
        constructor(cause, options) {
          super(cause, options);
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.data = options.data;
        }
      };
      ParseRpcError = class _ParseRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _ParseRpcError.code,
            name: "ParseRpcError",
            shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
          });
        }
      };
      Object.defineProperty(ParseRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32700
      });
      InvalidRequestRpcError = class _InvalidRequestRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InvalidRequestRpcError.code,
            name: "InvalidRequestRpcError",
            shortMessage: "JSON is not a valid request object."
          });
        }
      };
      Object.defineProperty(InvalidRequestRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32600
      });
      MethodNotFoundRpcError = class _MethodNotFoundRpcError extends RpcError {
        constructor(cause, { method } = {}) {
          super(cause, {
            code: _MethodNotFoundRpcError.code,
            name: "MethodNotFoundRpcError",
            shortMessage: `The method${method ? ` "${method}"` : ""} does not exist / is not available.`
          });
        }
      };
      Object.defineProperty(MethodNotFoundRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32601
      });
      InvalidParamsRpcError = class _InvalidParamsRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InvalidParamsRpcError.code,
            name: "InvalidParamsRpcError",
            shortMessage: [
              "Invalid parameters were provided to the RPC method.",
              "Double check you have provided the correct parameters."
            ].join("\n")
          });
        }
      };
      Object.defineProperty(InvalidParamsRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32602
      });
      InternalRpcError = class _InternalRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InternalRpcError.code,
            name: "InternalRpcError",
            shortMessage: "An internal error was received."
          });
        }
      };
      Object.defineProperty(InternalRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32603
      });
      InvalidInputRpcError = class _InvalidInputRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InvalidInputRpcError.code,
            name: "InvalidInputRpcError",
            shortMessage: [
              "Missing or invalid parameters.",
              "Double check you have provided the correct parameters."
            ].join("\n")
          });
        }
      };
      Object.defineProperty(InvalidInputRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32e3
      });
      ResourceNotFoundRpcError = class _ResourceNotFoundRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _ResourceNotFoundRpcError.code,
            name: "ResourceNotFoundRpcError",
            shortMessage: "Requested resource not found."
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "ResourceNotFoundRpcError"
          });
        }
      };
      Object.defineProperty(ResourceNotFoundRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32001
      });
      ResourceUnavailableRpcError = class _ResourceUnavailableRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _ResourceUnavailableRpcError.code,
            name: "ResourceUnavailableRpcError",
            shortMessage: "Requested resource not available."
          });
        }
      };
      Object.defineProperty(ResourceUnavailableRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32002
      });
      TransactionRejectedRpcError = class _TransactionRejectedRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _TransactionRejectedRpcError.code,
            name: "TransactionRejectedRpcError",
            shortMessage: "Transaction creation failed."
          });
        }
      };
      Object.defineProperty(TransactionRejectedRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32003
      });
      MethodNotSupportedRpcError = class _MethodNotSupportedRpcError extends RpcError {
        constructor(cause, { method } = {}) {
          super(cause, {
            code: _MethodNotSupportedRpcError.code,
            name: "MethodNotSupportedRpcError",
            shortMessage: `Method${method ? ` "${method}"` : ""} is not supported.`
          });
        }
      };
      Object.defineProperty(MethodNotSupportedRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32004
      });
      LimitExceededRpcError = class _LimitExceededRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _LimitExceededRpcError.code,
            name: "LimitExceededRpcError",
            shortMessage: "Request exceeds defined limit."
          });
        }
      };
      Object.defineProperty(LimitExceededRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32005
      });
      JsonRpcVersionUnsupportedError = class _JsonRpcVersionUnsupportedError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _JsonRpcVersionUnsupportedError.code,
            name: "JsonRpcVersionUnsupportedError",
            shortMessage: "Version of JSON-RPC protocol is not supported."
          });
        }
      };
      Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32006
      });
      UserRejectedRequestError = class _UserRejectedRequestError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UserRejectedRequestError.code,
            name: "UserRejectedRequestError",
            shortMessage: "User rejected the request."
          });
        }
      };
      Object.defineProperty(UserRejectedRequestError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4001
      });
      UnauthorizedProviderError = class _UnauthorizedProviderError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UnauthorizedProviderError.code,
            name: "UnauthorizedProviderError",
            shortMessage: "The requested method and/or account has not been authorized by the user."
          });
        }
      };
      Object.defineProperty(UnauthorizedProviderError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4100
      });
      UnsupportedProviderMethodError = class _UnsupportedProviderMethodError extends ProviderRpcError {
        constructor(cause, { method } = {}) {
          super(cause, {
            code: _UnsupportedProviderMethodError.code,
            name: "UnsupportedProviderMethodError",
            shortMessage: `The Provider does not support the requested method${method ? ` " ${method}"` : ""}.`
          });
        }
      };
      Object.defineProperty(UnsupportedProviderMethodError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4200
      });
      ProviderDisconnectedError = class _ProviderDisconnectedError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _ProviderDisconnectedError.code,
            name: "ProviderDisconnectedError",
            shortMessage: "The Provider is disconnected from all chains."
          });
        }
      };
      Object.defineProperty(ProviderDisconnectedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4900
      });
      ChainDisconnectedError = class _ChainDisconnectedError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _ChainDisconnectedError.code,
            name: "ChainDisconnectedError",
            shortMessage: "The Provider is not connected to the requested chain."
          });
        }
      };
      Object.defineProperty(ChainDisconnectedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4901
      });
      SwitchChainError = class _SwitchChainError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _SwitchChainError.code,
            name: "SwitchChainError",
            shortMessage: "An error occurred when attempting to switch chain."
          });
        }
      };
      Object.defineProperty(SwitchChainError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4902
      });
      UnsupportedNonOptionalCapabilityError = class _UnsupportedNonOptionalCapabilityError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UnsupportedNonOptionalCapabilityError.code,
            name: "UnsupportedNonOptionalCapabilityError",
            shortMessage: "This Wallet does not support a capability that was not marked as optional."
          });
        }
      };
      Object.defineProperty(UnsupportedNonOptionalCapabilityError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5700
      });
      UnsupportedChainIdError = class _UnsupportedChainIdError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UnsupportedChainIdError.code,
            name: "UnsupportedChainIdError",
            shortMessage: "This Wallet does not support the requested chain ID."
          });
        }
      };
      Object.defineProperty(UnsupportedChainIdError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5710
      });
      DuplicateIdError = class _DuplicateIdError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _DuplicateIdError.code,
            name: "DuplicateIdError",
            shortMessage: "There is already a bundle submitted with this ID."
          });
        }
      };
      Object.defineProperty(DuplicateIdError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5720
      });
      UnknownBundleIdError = class _UnknownBundleIdError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UnknownBundleIdError.code,
            name: "UnknownBundleIdError",
            shortMessage: "This bundle id is unknown / has not been submitted"
          });
        }
      };
      Object.defineProperty(UnknownBundleIdError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5730
      });
      BundleTooLargeError = class _BundleTooLargeError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _BundleTooLargeError.code,
            name: "BundleTooLargeError",
            shortMessage: "The call bundle is too large for the Wallet to process."
          });
        }
      };
      Object.defineProperty(BundleTooLargeError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5740
      });
      AtomicReadyWalletRejectedUpgradeError = class _AtomicReadyWalletRejectedUpgradeError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _AtomicReadyWalletRejectedUpgradeError.code,
            name: "AtomicReadyWalletRejectedUpgradeError",
            shortMessage: "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."
          });
        }
      };
      Object.defineProperty(AtomicReadyWalletRejectedUpgradeError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5750
      });
      AtomicityNotSupportedError = class _AtomicityNotSupportedError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _AtomicityNotSupportedError.code,
            name: "AtomicityNotSupportedError",
            shortMessage: "The wallet does not support atomic execution but the request requires it."
          });
        }
      };
      Object.defineProperty(AtomicityNotSupportedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5760
      });
      WalletConnectSessionSettlementError = class _WalletConnectSessionSettlementError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _WalletConnectSessionSettlementError.code,
            name: "WalletConnectSessionSettlementError",
            shortMessage: "WalletConnect session settlement failed."
          });
        }
      };
      Object.defineProperty(WalletConnectSessionSettlementError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 7e3
      });
      UnknownRpcError = class extends RpcError {
        constructor(cause) {
          super(cause, {
            name: "UnknownRpcError",
            shortMessage: "An unknown RPC error occurred."
          });
        }
      };
    }
  });

  // node_modules/@noble/hashes/esm/_md.js
  function setBigUint64(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h10 = isLE2 ? 4 : 0;
    const l7 = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h10, wh, isLE2);
    view.setUint32(byteOffset + l7, wl, isLE2);
  }
  function Chi(a20, b, c4) {
    return a20 & b ^ ~a20 & c4;
  }
  function Maj(a20, b, c4) {
    return a20 & b ^ a20 & c4 ^ b & c4;
  }
  var HashMD, SHA256_IV;
  var init_md = __esm({
    "node_modules/@noble/hashes/esm/_md.js"() {
      init_utils2();
      HashMD = class extends Hash {
        constructor(blockLen, outputLen, padOffset, isLE2) {
          super();
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE2;
          this.buffer = new Uint8Array(blockLen);
          this.view = createView(this.buffer);
        }
        update(data) {
          aexists(this);
          data = toBytes2(data);
          abytes(data);
          const { view, buffer: buffer2, blockLen } = this;
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = createView(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer2.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          aexists(this);
          aoutput(out, this);
          this.finished = true;
          const { buffer: buffer2, view, blockLen, isLE: isLE2 } = this;
          let { pos } = this;
          buffer2[pos++] = 128;
          clean(this.buffer.subarray(pos));
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i20 = pos; i20 < blockLen; i20++)
            buffer2[i20] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
          this.process(view, 0);
          const oview = createView(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i20 = 0; i20 < outLen; i20++)
            oview.setUint32(4 * i20, state[i20], isLE2);
        }
        digest() {
          const { buffer: buffer2, outputLen } = this;
          this.digestInto(buffer2);
          const res = buffer2.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const { blockLen, buffer: buffer2, length, finished, destroyed, pos } = this;
          to.destroyed = destroyed;
          to.finished = finished;
          to.length = length;
          to.pos = pos;
          if (length % blockLen)
            to.buffer.set(buffer2);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
      };
      SHA256_IV = /* @__PURE__ */ Uint32Array.from([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
    }
  });

  // node_modules/@noble/hashes/esm/sha2.js
  var SHA256_K, SHA256_W, SHA256, sha256;
  var init_sha2 = __esm({
    "node_modules/@noble/hashes/esm/sha2.js"() {
      init_md();
      init_utils2();
      SHA256_K = /* @__PURE__ */ Uint32Array.from([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      SHA256_W = /* @__PURE__ */ new Uint32Array(64);
      SHA256 = class extends HashMD {
        constructor(outputLen = 32) {
          super(64, outputLen, 8, false);
          this.A = SHA256_IV[0] | 0;
          this.B = SHA256_IV[1] | 0;
          this.C = SHA256_IV[2] | 0;
          this.D = SHA256_IV[3] | 0;
          this.E = SHA256_IV[4] | 0;
          this.F = SHA256_IV[5] | 0;
          this.G = SHA256_IV[6] | 0;
          this.H = SHA256_IV[7] | 0;
        }
        get() {
          const { A, B, C, D, E: E2, F, G, H: H2 } = this;
          return [A, B, C, D, E2, F, G, H2];
        }
        // prettier-ignore
        set(A, B, C, D, E2, F, G, H2) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E2 | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H2 | 0;
        }
        process(view, offset) {
          for (let i20 = 0; i20 < 16; i20++, offset += 4)
            SHA256_W[i20] = view.getUint32(offset, false);
          for (let i20 = 16; i20 < 64; i20++) {
            const W15 = SHA256_W[i20 - 15];
            const W2 = SHA256_W[i20 - 2];
            const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
            const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
            SHA256_W[i20] = s1 + SHA256_W[i20 - 7] + s0 + SHA256_W[i20 - 16] | 0;
          }
          let { A, B, C, D, E: E2, F, G, H: H2 } = this;
          for (let i20 = 0; i20 < 64; i20++) {
            const sigma1 = rotr(E2, 6) ^ rotr(E2, 11) ^ rotr(E2, 25);
            const T1 = H2 + sigma1 + Chi(E2, F, G) + SHA256_K[i20] + SHA256_W[i20] | 0;
            const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
            const T2 = sigma0 + Maj(A, B, C) | 0;
            H2 = G;
            G = F;
            F = E2;
            E2 = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E2 = E2 + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H2 = H2 + this.H | 0;
          this.set(A, B, C, D, E2, F, G, H2);
        }
        roundClean() {
          clean(SHA256_W);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          clean(this.buffer);
        }
      };
      sha256 = /* @__PURE__ */ createHasher(() => new SHA256());
    }
  });

  // node_modules/@noble/hashes/esm/hmac.js
  var HMAC, hmac;
  var init_hmac = __esm({
    "node_modules/@noble/hashes/esm/hmac.js"() {
      init_utils2();
      HMAC = class extends Hash {
        constructor(hash3, _key) {
          super();
          this.finished = false;
          this.destroyed = false;
          ahash(hash3);
          const key = toBytes2(_key);
          this.iHash = hash3.create();
          if (typeof this.iHash.update !== "function")
            throw new Error("Expected instance of class which extends utils.Hash");
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const blockLen = this.blockLen;
          const pad4 = new Uint8Array(blockLen);
          pad4.set(key.length > blockLen ? hash3.create().update(key).digest() : key);
          for (let i20 = 0; i20 < pad4.length; i20++)
            pad4[i20] ^= 54;
          this.iHash.update(pad4);
          this.oHash = hash3.create();
          for (let i20 = 0; i20 < pad4.length; i20++)
            pad4[i20] ^= 54 ^ 92;
          this.oHash.update(pad4);
          clean(pad4);
        }
        update(buf) {
          aexists(this);
          this.iHash.update(buf);
          return this;
        }
        digestInto(out) {
          aexists(this);
          abytes(out, this.outputLen);
          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }
        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }
        _cloneInto(to) {
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }
      };
      hmac = (hash3, key, message) => new HMAC(hash3, key).update(message).digest();
      hmac.create = (hash3, key) => new HMAC(hash3, key);
    }
  });

  // node_modules/@noble/curves/esm/abstract/utils.js
  function isBytes2(a20) {
    return a20 instanceof Uint8Array || ArrayBuffer.isView(a20) && a20.constructor.name === "Uint8Array";
  }
  function abytes2(item) {
    if (!isBytes2(item))
      throw new Error("Uint8Array expected");
  }
  function abool(title, value) {
    if (typeof value !== "boolean")
      throw new Error(title + " boolean expected, got " + value);
  }
  function numberToHexUnpadded(num2) {
    const hex2 = num2.toString(16);
    return hex2.length & 1 ? "0" + hex2 : hex2;
  }
  function hexToNumber2(hex2) {
    if (typeof hex2 !== "string")
      throw new Error("hex string expected, got " + typeof hex2);
    return hex2 === "" ? _0n2 : BigInt("0x" + hex2);
  }
  function bytesToHex2(bytes) {
    abytes2(bytes);
    if (hasHexBuiltin)
      return bytes.toHex();
    let hex2 = "";
    for (let i20 = 0; i20 < bytes.length; i20++) {
      hex2 += hexes2[bytes[i20]];
    }
    return hex2;
  }
  function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9)
      return ch - asciis._0;
    if (ch >= asciis.A && ch <= asciis.F)
      return ch - (asciis.A - 10);
    if (ch >= asciis.a && ch <= asciis.f)
      return ch - (asciis.a - 10);
    return;
  }
  function hexToBytes2(hex2) {
    if (typeof hex2 !== "string")
      throw new Error("hex string expected, got " + typeof hex2);
    if (hasHexBuiltin)
      return Uint8Array.fromHex(hex2);
    const hl = hex2.length;
    const al = hl / 2;
    if (hl % 2)
      throw new Error("hex string expected, got unpadded hex of length " + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
      const n1 = asciiToBase16(hex2.charCodeAt(hi));
      const n22 = asciiToBase16(hex2.charCodeAt(hi + 1));
      if (n1 === void 0 || n22 === void 0) {
        const char = hex2[hi] + hex2[hi + 1];
        throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
      }
      array[ai] = n1 * 16 + n22;
    }
    return array;
  }
  function bytesToNumberBE(bytes) {
    return hexToNumber2(bytesToHex2(bytes));
  }
  function bytesToNumberLE(bytes) {
    abytes2(bytes);
    return hexToNumber2(bytesToHex2(Uint8Array.from(bytes).reverse()));
  }
  function numberToBytesBE(n10, len) {
    return hexToBytes2(n10.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE(n10, len) {
    return numberToBytesBE(n10, len).reverse();
  }
  function ensureBytes(title, hex2, expectedLength) {
    let res;
    if (typeof hex2 === "string") {
      try {
        res = hexToBytes2(hex2);
      } catch (e42) {
        throw new Error(title + " must be hex string or Uint8Array, cause: " + e42);
      }
    } else if (isBytes2(hex2)) {
      res = Uint8Array.from(hex2);
    } else {
      throw new Error(title + " must be hex string or Uint8Array");
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(title + " of length " + expectedLength + " expected, got " + len);
    return res;
  }
  function concatBytes3(...arrays) {
    let sum = 0;
    for (let i20 = 0; i20 < arrays.length; i20++) {
      const a20 = arrays[i20];
      abytes2(a20);
      sum += a20.length;
    }
    const res = new Uint8Array(sum);
    for (let i20 = 0, pad4 = 0; i20 < arrays.length; i20++) {
      const a20 = arrays[i20];
      res.set(a20, pad4);
      pad4 += a20.length;
    }
    return res;
  }
  function utf8ToBytes2(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function inRange(n10, min, max) {
    return isPosBig(n10) && isPosBig(min) && isPosBig(max) && min <= n10 && n10 < max;
  }
  function aInRange(title, n10, min, max) {
    if (!inRange(n10, min, max))
      throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n10);
  }
  function bitLen(n10) {
    let len;
    for (len = 0; n10 > _0n2; n10 >>= _1n2, len += 1)
      ;
    return len;
  }
  function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== "number" || hashLen < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    if (typeof hmacFn !== "function")
      throw new Error("hmacFn must be a function");
    let v = u8n(hashLen);
    let k2 = u8n(hashLen);
    let i20 = 0;
    const reset = () => {
      v.fill(1);
      k2.fill(0);
      i20 = 0;
    };
    const h10 = (...b) => hmacFn(k2, v, ...b);
    const reseed = (seed = u8n(0)) => {
      k2 = h10(u8fr([0]), seed);
      v = h10();
      if (seed.length === 0)
        return;
      k2 = h10(u8fr([1]), seed);
      v = h10();
    };
    const gen2 = () => {
      if (i20++ >= 1e3)
        throw new Error("drbg: tried 1000 values");
      let len = 0;
      const out = [];
      while (len < qByteLen) {
        v = h10();
        const sl = v.slice();
        out.push(sl);
        len += v.length;
      }
      return concatBytes3(...out);
    };
    const genUntil = (seed, pred) => {
      reset();
      reseed(seed);
      let res = void 0;
      while (!(res = pred(gen2())))
        reseed();
      reset();
      return res;
    };
    return genUntil;
  }
  function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns[type];
      if (typeof checkVal !== "function")
        throw new Error("invalid validator function");
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }
  function memoized(fn) {
    const map = /* @__PURE__ */ new WeakMap();
    return (arg, ...args) => {
      const val = map.get(arg);
      if (val !== void 0)
        return val;
      const computed = fn(arg, ...args);
      map.set(arg, computed);
      return computed;
    };
  }
  var _0n2, _1n2, hasHexBuiltin, hexes2, asciis, isPosBig, bitMask, u8n, u8fr, validatorFns;
  var init_utils4 = __esm({
    "node_modules/@noble/curves/esm/abstract/utils.js"() {
      _0n2 = /* @__PURE__ */ BigInt(0);
      _1n2 = /* @__PURE__ */ BigInt(1);
      hasHexBuiltin = // @ts-ignore
      typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function";
      hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_4, i20) => i20.toString(16).padStart(2, "0"));
      asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      isPosBig = (n10) => typeof n10 === "bigint" && _0n2 <= n10;
      bitMask = (n10) => (_1n2 << BigInt(n10)) - _1n2;
      u8n = (len) => new Uint8Array(len);
      u8fr = (arr) => Uint8Array.from(arr);
      validatorFns = {
        bigint: (val) => typeof val === "bigint",
        function: (val) => typeof val === "function",
        boolean: (val) => typeof val === "boolean",
        string: (val) => typeof val === "string",
        stringOrUint8Array: (val) => typeof val === "string" || isBytes2(val),
        isSafeInteger: (val) => Number.isSafeInteger(val),
        array: (val) => Array.isArray(val),
        field: (val, object) => object.Fp.isValid(val),
        hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
      };
    }
  });

  // node_modules/@noble/curves/esm/abstract/modular.js
  function mod(a20, b) {
    const result = a20 % b;
    return result >= _0n3 ? result : b + result;
  }
  function pow2(x, power, modulo) {
    let res = x;
    while (power-- > _0n3) {
      res *= res;
      res %= modulo;
    }
    return res;
  }
  function invert(number, modulo) {
    if (number === _0n3)
      throw new Error("invert: expected non-zero number");
    if (modulo <= _0n3)
      throw new Error("invert: expected positive modulus, got " + modulo);
    let a20 = mod(number, modulo);
    let b = modulo;
    let x = _0n3, y3 = _1n3, u4 = _1n3, v = _0n3;
    while (a20 !== _0n3) {
      const q = b / a20;
      const r20 = b % a20;
      const m3 = x - u4 * q;
      const n10 = y3 - v * q;
      b = a20, a20 = r20, x = u4, y3 = v, u4 = m3, v = n10;
    }
    const gcd2 = b;
    if (gcd2 !== _1n3)
      throw new Error("invert: does not exist");
    return mod(x, modulo);
  }
  function sqrt3mod4(Fp, n10) {
    const p1div4 = (Fp.ORDER + _1n3) / _4n;
    const root = Fp.pow(n10, p1div4);
    if (!Fp.eql(Fp.sqr(root), n10))
      throw new Error("Cannot find square root");
    return root;
  }
  function sqrt5mod8(Fp, n10) {
    const p5div8 = (Fp.ORDER - _5n) / _8n;
    const n22 = Fp.mul(n10, _2n2);
    const v = Fp.pow(n22, p5div8);
    const nv = Fp.mul(n10, v);
    const i20 = Fp.mul(Fp.mul(nv, _2n2), v);
    const root = Fp.mul(nv, Fp.sub(i20, Fp.ONE));
    if (!Fp.eql(Fp.sqr(root), n10))
      throw new Error("Cannot find square root");
    return root;
  }
  function tonelliShanks(P) {
    if (P < BigInt(3))
      throw new Error("sqrt is not defined for small field");
    let Q = P - _1n3;
    let S = 0;
    while (Q % _2n2 === _0n3) {
      Q /= _2n2;
      S++;
    }
    let Z2 = _2n2;
    const _Fp = Field(P);
    while (FpLegendre(_Fp, Z2) === 1) {
      if (Z2++ > 1e3)
        throw new Error("Cannot find square root: probably non-prime P");
    }
    if (S === 1)
      return sqrt3mod4;
    let cc = _Fp.pow(Z2, Q);
    const Q1div2 = (Q + _1n3) / _2n2;
    return function tonelliSlow(Fp, n10) {
      if (Fp.is0(n10))
        return n10;
      if (FpLegendre(Fp, n10) !== 1)
        throw new Error("Cannot find square root");
      let M = S;
      let c4 = Fp.mul(Fp.ONE, cc);
      let t45 = Fp.pow(n10, Q);
      let R = Fp.pow(n10, Q1div2);
      while (!Fp.eql(t45, Fp.ONE)) {
        if (Fp.is0(t45))
          return Fp.ZERO;
        let i20 = 1;
        let t_tmp = Fp.sqr(t45);
        while (!Fp.eql(t_tmp, Fp.ONE)) {
          i20++;
          t_tmp = Fp.sqr(t_tmp);
          if (i20 === M)
            throw new Error("Cannot find square root");
        }
        const exponent = _1n3 << BigInt(M - i20 - 1);
        const b = Fp.pow(c4, exponent);
        M = i20;
        c4 = Fp.sqr(b);
        t45 = Fp.mul(t45, c4);
        R = Fp.mul(R, b);
      }
      return R;
    };
  }
  function FpSqrt(P) {
    if (P % _4n === _3n)
      return sqrt3mod4;
    if (P % _8n === _5n)
      return sqrt5mod8;
    return tonelliShanks(P);
  }
  function validateField(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger"
    };
    const opts = FIELD_FIELDS.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    return validateObject(field, opts);
  }
  function FpPow(Fp, num2, power) {
    if (power < _0n3)
      throw new Error("invalid exponent, negatives unsupported");
    if (power === _0n3)
      return Fp.ONE;
    if (power === _1n3)
      return num2;
    let p14 = Fp.ONE;
    let d8 = num2;
    while (power > _0n3) {
      if (power & _1n3)
        p14 = Fp.mul(p14, d8);
      d8 = Fp.sqr(d8);
      power >>= _1n3;
    }
    return p14;
  }
  function FpInvertBatch(Fp, nums, passZero = false) {
    const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
    const multipliedAcc = nums.reduce((acc, num2, i20) => {
      if (Fp.is0(num2))
        return acc;
      inverted[i20] = acc;
      return Fp.mul(acc, num2);
    }, Fp.ONE);
    const invertedAcc = Fp.inv(multipliedAcc);
    nums.reduceRight((acc, num2, i20) => {
      if (Fp.is0(num2))
        return acc;
      inverted[i20] = Fp.mul(acc, inverted[i20]);
      return Fp.mul(acc, num2);
    }, invertedAcc);
    return inverted;
  }
  function FpLegendre(Fp, n10) {
    const p1mod2 = (Fp.ORDER - _1n3) / _2n2;
    const powered = Fp.pow(n10, p1mod2);
    const yes = Fp.eql(powered, Fp.ONE);
    const zero = Fp.eql(powered, Fp.ZERO);
    const no = Fp.eql(powered, Fp.neg(Fp.ONE));
    if (!yes && !zero && !no)
      throw new Error("invalid Legendre symbol result");
    return yes ? 1 : zero ? 0 : -1;
  }
  function nLength(n10, nBitLength) {
    if (nBitLength !== void 0)
      anumber(nBitLength);
    const _nBitLength = nBitLength !== void 0 ? nBitLength : n10.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
    if (ORDER <= _0n3)
      throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
    if (BYTES > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let sqrtP;
    const f2 = Object.freeze({
      ORDER,
      isLE: isLE2,
      BITS,
      BYTES,
      MASK: bitMask(BITS),
      ZERO: _0n3,
      ONE: _1n3,
      create: (num2) => mod(num2, ORDER),
      isValid: (num2) => {
        if (typeof num2 !== "bigint")
          throw new Error("invalid field element: expected bigint, got " + typeof num2);
        return _0n3 <= num2 && num2 < ORDER;
      },
      is0: (num2) => num2 === _0n3,
      isOdd: (num2) => (num2 & _1n3) === _1n3,
      neg: (num2) => mod(-num2, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num2) => mod(num2 * num2, ORDER),
      add: (lhs, rhs) => mod(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
      pow: (num2, power) => FpPow(f2, num2, power),
      div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num2) => num2 * num2,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num2) => invert(num2, ORDER),
      sqrt: redef.sqrt || ((n10) => {
        if (!sqrtP)
          sqrtP = FpSqrt(ORDER);
        return sqrtP(f2, n10);
      }),
      toBytes: (num2) => isLE2 ? numberToBytesLE(num2, BYTES) : numberToBytesBE(num2, BYTES),
      fromBytes: (bytes) => {
        if (bytes.length !== BYTES)
          throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
        return isLE2 ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
      },
      // TODO: we don't need it here, move out to separate fn
      invertBatch: (lst) => FpInvertBatch(f2, lst),
      // We can't move this out because Fp6, Fp12 implement it
      // and it's unclear what to return in there.
      cmov: (a20, b, c4) => c4 ? b : a20
    });
    return Object.freeze(f2);
  }
  function getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength(fieldOrder) {
    const length = getFieldBytesLength(fieldOrder);
    return length + Math.ceil(length / 2);
  }
  function mapHashToField(key, fieldOrder, isLE2 = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength(fieldOrder);
    const minLen = getMinHashLength(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
    const num2 = isLE2 ? bytesToNumberLE(key) : bytesToNumberBE(key);
    const reduced = mod(num2, fieldOrder - _1n3) + _1n3;
    return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
  }
  var _0n3, _1n3, _2n2, _3n, _4n, _5n, _8n, FIELD_FIELDS;
  var init_modular = __esm({
    "node_modules/@noble/curves/esm/abstract/modular.js"() {
      init_utils2();
      init_utils4();
      _0n3 = BigInt(0);
      _1n3 = BigInt(1);
      _2n2 = /* @__PURE__ */ BigInt(2);
      _3n = /* @__PURE__ */ BigInt(3);
      _4n = /* @__PURE__ */ BigInt(4);
      _5n = /* @__PURE__ */ BigInt(5);
      _8n = /* @__PURE__ */ BigInt(8);
      FIELD_FIELDS = [
        "create",
        "isValid",
        "is0",
        "neg",
        "inv",
        "sqrt",
        "sqr",
        "eql",
        "add",
        "sub",
        "mul",
        "pow",
        "div",
        "addN",
        "subN",
        "mulN",
        "sqrN"
      ];
    }
  });

  // node_modules/@noble/curves/esm/abstract/curve.js
  function constTimeNegate(condition, item) {
    const neg = item.negate();
    return condition ? neg : item;
  }
  function validateW(W, bits) {
    if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
      throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
  }
  function calcWOpts(W, scalarBits) {
    validateW(W, scalarBits);
    const windows = Math.ceil(scalarBits / W) + 1;
    const windowSize = 2 ** (W - 1);
    const maxNumber = 2 ** W;
    const mask = bitMask(W);
    const shiftBy = BigInt(W);
    return { windows, windowSize, mask, maxNumber, shiftBy };
  }
  function calcOffsets(n10, window, wOpts) {
    const { windowSize, mask, maxNumber, shiftBy } = wOpts;
    let wbits = Number(n10 & mask);
    let nextN = n10 >> shiftBy;
    if (wbits > windowSize) {
      wbits -= maxNumber;
      nextN += _1n4;
    }
    const offsetStart = window * windowSize;
    const offset = offsetStart + Math.abs(wbits) - 1;
    const isZero = wbits === 0;
    const isNeg = wbits < 0;
    const isNegF = window % 2 !== 0;
    const offsetF = offsetStart;
    return { nextN, offset, isZero, isNeg, isNegF, offsetF };
  }
  function validateMSMPoints(points, c4) {
    if (!Array.isArray(points))
      throw new Error("array expected");
    points.forEach((p14, i20) => {
      if (!(p14 instanceof c4))
        throw new Error("invalid point at index " + i20);
    });
  }
  function validateMSMScalars(scalars, field) {
    if (!Array.isArray(scalars))
      throw new Error("array of scalars expected");
    scalars.forEach((s12, i20) => {
      if (!field.isValid(s12))
        throw new Error("invalid scalar at index " + i20);
    });
  }
  function getW(P) {
    return pointWindowSizes.get(P) || 1;
  }
  function wNAF(c4, bits) {
    return {
      constTimeNegate,
      hasPrecomputes(elm) {
        return getW(elm) !== 1;
      },
      // non-const time multiplication ladder
      unsafeLadder(elm, n10, p14 = c4.ZERO) {
        let d8 = elm;
        while (n10 > _0n4) {
          if (n10 & _1n4)
            p14 = p14.add(d8);
          d8 = d8.double();
          n10 >>= _1n4;
        }
        return p14;
      },
      /**
       * Creates a wNAF precomputation window. Used for caching.
       * Default window size is set by `utils.precompute()` and is equal to 8.
       * Number of precomputed points depends on the curve size:
       * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
       * - 𝑊 is the window size
       * - 𝑛 is the bitlength of the curve order.
       * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
       * @param elm Point instance
       * @param W window size
       * @returns precomputed point tables flattened to a single array
       */
      precomputeWindow(elm, W) {
        const { windows, windowSize } = calcWOpts(W, bits);
        const points = [];
        let p14 = elm;
        let base = p14;
        for (let window = 0; window < windows; window++) {
          base = p14;
          points.push(base);
          for (let i20 = 1; i20 < windowSize; i20++) {
            base = base.add(p14);
            points.push(base);
          }
          p14 = base.double();
        }
        return points;
      },
      /**
       * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @returns real and fake (for const-time) points
       */
      wNAF(W, precomputes, n10) {
        let p14 = c4.ZERO;
        let f2 = c4.BASE;
        const wo = calcWOpts(W, bits);
        for (let window = 0; window < wo.windows; window++) {
          const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n10, window, wo);
          n10 = nextN;
          if (isZero) {
            f2 = f2.add(constTimeNegate(isNegF, precomputes[offsetF]));
          } else {
            p14 = p14.add(constTimeNegate(isNeg, precomputes[offset]));
          }
        }
        return { p: p14, f: f2 };
      },
      /**
       * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @param acc accumulator point to add result of multiplication
       * @returns point
       */
      wNAFUnsafe(W, precomputes, n10, acc = c4.ZERO) {
        const wo = calcWOpts(W, bits);
        for (let window = 0; window < wo.windows; window++) {
          if (n10 === _0n4)
            break;
          const { nextN, offset, isZero, isNeg } = calcOffsets(n10, window, wo);
          n10 = nextN;
          if (isZero) {
            continue;
          } else {
            const item = precomputes[offset];
            acc = acc.add(isNeg ? item.negate() : item);
          }
        }
        return acc;
      },
      getPrecomputes(W, P, transform) {
        let comp = pointPrecomputes.get(P);
        if (!comp) {
          comp = this.precomputeWindow(P, W);
          if (W !== 1)
            pointPrecomputes.set(P, transform(comp));
        }
        return comp;
      },
      wNAFCached(P, n10, transform) {
        const W = getW(P);
        return this.wNAF(W, this.getPrecomputes(W, P, transform), n10);
      },
      wNAFCachedUnsafe(P, n10, transform, prev) {
        const W = getW(P);
        if (W === 1)
          return this.unsafeLadder(P, n10, prev);
        return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n10, prev);
      },
      // We calculate precomputes for elliptic curve point multiplication
      // using windowed method. This specifies window size and
      // stores precomputed values. Usually only base point would be precomputed.
      setWindowSize(P, W) {
        validateW(W, bits);
        pointWindowSizes.set(P, W);
        pointPrecomputes.delete(P);
      }
    };
  }
  function pippenger(c4, fieldN, points, scalars) {
    validateMSMPoints(points, c4);
    validateMSMScalars(scalars, fieldN);
    const plength = points.length;
    const slength = scalars.length;
    if (plength !== slength)
      throw new Error("arrays of points and scalars must have equal length");
    const zero = c4.ZERO;
    const wbits = bitLen(BigInt(plength));
    let windowSize = 1;
    if (wbits > 12)
      windowSize = wbits - 3;
    else if (wbits > 4)
      windowSize = wbits - 2;
    else if (wbits > 0)
      windowSize = 2;
    const MASK = bitMask(windowSize);
    const buckets = new Array(Number(MASK) + 1).fill(zero);
    const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
    let sum = zero;
    for (let i20 = lastBits; i20 >= 0; i20 -= windowSize) {
      buckets.fill(zero);
      for (let j = 0; j < slength; j++) {
        const scalar = scalars[j];
        const wbits2 = Number(scalar >> BigInt(i20) & MASK);
        buckets[wbits2] = buckets[wbits2].add(points[j]);
      }
      let resI = zero;
      for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
        sumI = sumI.add(buckets[j]);
        resI = resI.add(sumI);
      }
      sum = sum.add(resI);
      if (i20 !== 0)
        for (let j = 0; j < windowSize; j++)
          sum = sum.double();
    }
    return sum;
  }
  function validateBasic(curve) {
    validateField(curve.Fp);
    validateObject(curve, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...nLength(curve.n, curve.nBitLength),
      ...curve,
      ...{ p: curve.Fp.ORDER }
    });
  }
  var _0n4, _1n4, pointPrecomputes, pointWindowSizes;
  var init_curve = __esm({
    "node_modules/@noble/curves/esm/abstract/curve.js"() {
      init_modular();
      init_utils4();
      _0n4 = BigInt(0);
      _1n4 = BigInt(1);
      pointPrecomputes = /* @__PURE__ */ new WeakMap();
      pointWindowSizes = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/@noble/curves/esm/abstract/weierstrass.js
  function validateSigVerOpts(opts) {
    if (opts.lowS !== void 0)
      abool("lowS", opts.lowS);
    if (opts.prehash !== void 0)
      abool("prehash", opts.prehash);
  }
  function validatePointOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      a: "field",
      b: "field"
    }, {
      allowInfinityPoint: "boolean",
      allowedPrivateKeyLengths: "array",
      clearCofactor: "function",
      fromBytes: "function",
      isTorsionFree: "function",
      toBytes: "function",
      wrapPrivateKey: "boolean"
    });
    const { endo, Fp, a: a20 } = opts;
    if (endo) {
      if (!Fp.eql(a20, Fp.ZERO)) {
        throw new Error("invalid endo: CURVE.a must be 0");
      }
      if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
        throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
      }
    }
    return Object.freeze({ ...opts });
  }
  function numToSizedHex(num2, size5) {
    return bytesToHex2(numberToBytesBE(num2, size5));
  }
  function weierstrassPoints(opts) {
    const CURVE = validatePointOpts(opts);
    const { Fp } = CURVE;
    const Fn = Field(CURVE.n, CURVE.nBitLength);
    const toBytes4 = CURVE.toBytes || ((_c, point, _isCompressed) => {
      const a20 = point.toAffine();
      return concatBytes3(Uint8Array.from([4]), Fp.toBytes(a20.x), Fp.toBytes(a20.y));
    });
    const fromBytes4 = CURVE.fromBytes || ((bytes) => {
      const tail = bytes.subarray(1);
      const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
      const y3 = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
      return { x, y: y3 };
    });
    function weierstrassEquation(x) {
      const { a: a20, b } = CURVE;
      const x2 = Fp.sqr(x);
      const x3 = Fp.mul(x2, x);
      return Fp.add(Fp.add(x3, Fp.mul(x, a20)), b);
    }
    function isValidXY(x, y3) {
      const left = Fp.sqr(y3);
      const right = weierstrassEquation(x);
      return Fp.eql(left, right);
    }
    if (!isValidXY(CURVE.Gx, CURVE.Gy))
      throw new Error("bad curve params: generator point");
    const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n2), _4n2);
    const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
    if (Fp.is0(Fp.add(_4a3, _27b2)))
      throw new Error("bad curve params: a or b");
    function isWithinCurveOrder(num2) {
      return inRange(num2, _1n5, CURVE.n);
    }
    function normPrivateKeyToScalar(key) {
      const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N2 } = CURVE;
      if (lengths && typeof key !== "bigint") {
        if (isBytes2(key))
          key = bytesToHex2(key);
        if (typeof key !== "string" || !lengths.includes(key.length))
          throw new Error("invalid private key");
        key = key.padStart(nByteLength * 2, "0");
      }
      let num2;
      try {
        num2 = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
      } catch (error) {
        throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
      }
      if (wrapPrivateKey)
        num2 = mod(num2, N2);
      aInRange("private key", num2, _1n5, N2);
      return num2;
    }
    function aprjpoint(other) {
      if (!(other instanceof Point2))
        throw new Error("ProjectivePoint expected");
    }
    const toAffineMemo = memoized((p14, iz) => {
      const { px: x, py: y3, pz: z } = p14;
      if (Fp.eql(z, Fp.ONE))
        return { x, y: y3 };
      const is0 = p14.is0();
      if (iz == null)
        iz = is0 ? Fp.ONE : Fp.inv(z);
      const ax = Fp.mul(x, iz);
      const ay = Fp.mul(y3, iz);
      const zz = Fp.mul(z, iz);
      if (is0)
        return { x: Fp.ZERO, y: Fp.ZERO };
      if (!Fp.eql(zz, Fp.ONE))
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    });
    const assertValidMemo = memoized((p14) => {
      if (p14.is0()) {
        if (CURVE.allowInfinityPoint && !Fp.is0(p14.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x, y: y3 } = p14.toAffine();
      if (!Fp.isValid(x) || !Fp.isValid(y3))
        throw new Error("bad point: x or y not FE");
      if (!isValidXY(x, y3))
        throw new Error("bad point: equation left != right");
      if (!p14.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
      return true;
    });
    class Point2 {
      constructor(px, py, pz) {
        if (px == null || !Fp.isValid(px))
          throw new Error("x required");
        if (py == null || !Fp.isValid(py) || Fp.is0(py))
          throw new Error("y required");
        if (pz == null || !Fp.isValid(pz))
          throw new Error("z required");
        this.px = px;
        this.py = py;
        this.pz = pz;
        Object.freeze(this);
      }
      // Does not validate if the point is on-curve.
      // Use fromHex instead, or call assertValidity() later.
      static fromAffine(p14) {
        const { x, y: y3 } = p14 || {};
        if (!p14 || !Fp.isValid(x) || !Fp.isValid(y3))
          throw new Error("invalid affine point");
        if (p14 instanceof Point2)
          throw new Error("projective point not allowed");
        const is0 = (i20) => Fp.eql(i20, Fp.ZERO);
        if (is0(x) && is0(y3))
          return Point2.ZERO;
        return new Point2(x, y3, Fp.ONE);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      /**
       * Takes a bunch of Projective Points but executes only one
       * inversion on all of them. Inversion is very slow operation,
       * so this improves performance massively.
       * Optimization: converts a list of projective points to a list of identical points with Z=1.
       */
      static normalizeZ(points) {
        const toInv = FpInvertBatch(Fp, points.map((p14) => p14.pz));
        return points.map((p14, i20) => p14.toAffine(toInv[i20])).map(Point2.fromAffine);
      }
      /**
       * Converts hash string or Uint8Array to Point.
       * @param hex short/long ECDSA hex
       */
      static fromHex(hex2) {
        const P = Point2.fromAffine(fromBytes4(ensureBytes("pointHex", hex2)));
        P.assertValidity();
        return P;
      }
      // Multiplies generator point by privateKey.
      static fromPrivateKey(privateKey) {
        return Point2.BASE.multiply(normPrivateKeyToScalar(privateKey));
      }
      // Multiscalar Multiplication
      static msm(points, scalars) {
        return pippenger(Point2, Fn, points, scalars);
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        wnaf.setWindowSize(this, windowSize);
      }
      // A point on curve is valid if it conforms to equation.
      assertValidity() {
        assertValidMemo(this);
      }
      hasEvenY() {
        const { y: y3 } = this.toAffine();
        if (Fp.isOdd)
          return !Fp.isOdd(y3);
        throw new Error("Field doesn't support isOdd");
      }
      /**
       * Compare one point to another.
       */
      equals(other) {
        aprjpoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
        const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
        return U1 && U2;
      }
      /**
       * Flips point to one corresponding to (x, -y) in Affine coordinates.
       */
      negate() {
        return new Point2(this.px, Fp.neg(this.py), this.pz);
      }
      // Renes-Costello-Batina exception-free doubling formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 3
      // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
      double() {
        const { a: a20, b } = CURVE;
        const b3 = Fp.mul(b, _3n2);
        const { px: X1, py: Y1, pz: Z1 } = this;
        let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
        let t0 = Fp.mul(X1, X1);
        let t1 = Fp.mul(Y1, Y1);
        let t210 = Fp.mul(Z1, Z1);
        let t310 = Fp.mul(X1, Y1);
        t310 = Fp.add(t310, t310);
        Z3 = Fp.mul(X1, Z1);
        Z3 = Fp.add(Z3, Z3);
        X3 = Fp.mul(a20, Z3);
        Y3 = Fp.mul(b3, t210);
        Y3 = Fp.add(X3, Y3);
        X3 = Fp.sub(t1, Y3);
        Y3 = Fp.add(t1, Y3);
        Y3 = Fp.mul(X3, Y3);
        X3 = Fp.mul(t310, X3);
        Z3 = Fp.mul(b3, Z3);
        t210 = Fp.mul(a20, t210);
        t310 = Fp.sub(t0, t210);
        t310 = Fp.mul(a20, t310);
        t310 = Fp.add(t310, Z3);
        Z3 = Fp.add(t0, t0);
        t0 = Fp.add(Z3, t0);
        t0 = Fp.add(t0, t210);
        t0 = Fp.mul(t0, t310);
        Y3 = Fp.add(Y3, t0);
        t210 = Fp.mul(Y1, Z1);
        t210 = Fp.add(t210, t210);
        t0 = Fp.mul(t210, t310);
        X3 = Fp.sub(X3, t0);
        Z3 = Fp.mul(t210, t1);
        Z3 = Fp.add(Z3, Z3);
        Z3 = Fp.add(Z3, Z3);
        return new Point2(X3, Y3, Z3);
      }
      // Renes-Costello-Batina exception-free addition formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 1
      // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
      add(other) {
        aprjpoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
        const a20 = CURVE.a;
        const b3 = Fp.mul(CURVE.b, _3n2);
        let t0 = Fp.mul(X1, X2);
        let t1 = Fp.mul(Y1, Y2);
        let t210 = Fp.mul(Z1, Z2);
        let t310 = Fp.add(X1, Y1);
        let t45 = Fp.add(X2, Y2);
        t310 = Fp.mul(t310, t45);
        t45 = Fp.add(t0, t1);
        t310 = Fp.sub(t310, t45);
        t45 = Fp.add(X1, Z1);
        let t52 = Fp.add(X2, Z2);
        t45 = Fp.mul(t45, t52);
        t52 = Fp.add(t0, t210);
        t45 = Fp.sub(t45, t52);
        t52 = Fp.add(Y1, Z1);
        X3 = Fp.add(Y2, Z2);
        t52 = Fp.mul(t52, X3);
        X3 = Fp.add(t1, t210);
        t52 = Fp.sub(t52, X3);
        Z3 = Fp.mul(a20, t45);
        X3 = Fp.mul(b3, t210);
        Z3 = Fp.add(X3, Z3);
        X3 = Fp.sub(t1, Z3);
        Z3 = Fp.add(t1, Z3);
        Y3 = Fp.mul(X3, Z3);
        t1 = Fp.add(t0, t0);
        t1 = Fp.add(t1, t0);
        t210 = Fp.mul(a20, t210);
        t45 = Fp.mul(b3, t45);
        t1 = Fp.add(t1, t210);
        t210 = Fp.sub(t0, t210);
        t210 = Fp.mul(a20, t210);
        t45 = Fp.add(t45, t210);
        t0 = Fp.mul(t1, t45);
        Y3 = Fp.add(Y3, t0);
        t0 = Fp.mul(t52, t45);
        X3 = Fp.mul(t310, X3);
        X3 = Fp.sub(X3, t0);
        t0 = Fp.mul(t310, t1);
        Z3 = Fp.mul(t52, Z3);
        Z3 = Fp.add(Z3, t0);
        return new Point2(X3, Y3, Z3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      is0() {
        return this.equals(Point2.ZERO);
      }
      wNAF(n10) {
        return wnaf.wNAFCached(this, n10, Point2.normalizeZ);
      }
      /**
       * Non-constant-time multiplication. Uses double-and-add algorithm.
       * It's faster, but should only be used when you don't care about
       * an exposed private key e.g. sig verification, which works over *public* keys.
       */
      multiplyUnsafe(sc) {
        const { endo: endo2, n: N2 } = CURVE;
        aInRange("scalar", sc, _0n5, N2);
        const I2 = Point2.ZERO;
        if (sc === _0n5)
          return I2;
        if (this.is0() || sc === _1n5)
          return this;
        if (!endo2 || wnaf.hasPrecomputes(this))
          return wnaf.wNAFCachedUnsafe(this, sc, Point2.normalizeZ);
        let { k1neg, k1, k2neg, k2 } = endo2.splitScalar(sc);
        let k1p = I2;
        let k2p = I2;
        let d8 = this;
        while (k1 > _0n5 || k2 > _0n5) {
          if (k1 & _1n5)
            k1p = k1p.add(d8);
          if (k2 & _1n5)
            k2p = k2p.add(d8);
          d8 = d8.double();
          k1 >>= _1n5;
          k2 >>= _1n5;
        }
        if (k1neg)
          k1p = k1p.negate();
        if (k2neg)
          k2p = k2p.negate();
        k2p = new Point2(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
        return k1p.add(k2p);
      }
      /**
       * Constant time multiplication.
       * Uses wNAF method. Windowed method may be 10% faster,
       * but takes 2x longer to generate and consumes 2x memory.
       * Uses precomputes when available.
       * Uses endomorphism for Koblitz curves.
       * @param scalar by which the point would be multiplied
       * @returns New point
       */
      multiply(scalar) {
        const { endo: endo2, n: N2 } = CURVE;
        aInRange("scalar", scalar, _1n5, N2);
        let point, fake;
        if (endo2) {
          const { k1neg, k1, k2neg, k2 } = endo2.splitScalar(scalar);
          let { p: k1p, f: f1p } = this.wNAF(k1);
          let { p: k2p, f: f2p } = this.wNAF(k2);
          k1p = wnaf.constTimeNegate(k1neg, k1p);
          k2p = wnaf.constTimeNegate(k2neg, k2p);
          k2p = new Point2(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
          point = k1p.add(k2p);
          fake = f1p.add(f2p);
        } else {
          const { p: p14, f: f2 } = this.wNAF(scalar);
          point = p14;
          fake = f2;
        }
        return Point2.normalizeZ([point, fake])[0];
      }
      /**
       * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
       * Not using Strauss-Shamir trick: precomputation tables are faster.
       * The trick could be useful if both P and Q are not G (not in our case).
       * @returns non-zero affine point
       */
      multiplyAndAddUnsafe(Q, a20, b) {
        const G = Point2.BASE;
        const mul = (P, a21) => a21 === _0n5 || a21 === _1n5 || !P.equals(G) ? P.multiplyUnsafe(a21) : P.multiply(a21);
        const sum = mul(this, a20).add(mul(Q, b));
        return sum.is0() ? void 0 : sum;
      }
      // Converts Projective point to affine (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      // (x, y, z) ∋ (x=x/z, y=y/z)
      toAffine(iz) {
        return toAffineMemo(this, iz);
      }
      isTorsionFree() {
        const { h: cofactor, isTorsionFree } = CURVE;
        if (cofactor === _1n5)
          return true;
        if (isTorsionFree)
          return isTorsionFree(Point2, this);
        throw new Error("isTorsionFree() has not been declared for the elliptic curve");
      }
      clearCofactor() {
        const { h: cofactor, clearCofactor } = CURVE;
        if (cofactor === _1n5)
          return this;
        if (clearCofactor)
          return clearCofactor(Point2, this);
        return this.multiplyUnsafe(CURVE.h);
      }
      toRawBytes(isCompressed = true) {
        abool("isCompressed", isCompressed);
        this.assertValidity();
        return toBytes4(Point2, this, isCompressed);
      }
      toHex(isCompressed = true) {
        abool("isCompressed", isCompressed);
        return bytesToHex2(this.toRawBytes(isCompressed));
      }
    }
    Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, Fp.ONE);
    Point2.ZERO = new Point2(Fp.ZERO, Fp.ONE, Fp.ZERO);
    const { endo, nBitLength } = CURVE;
    const wnaf = wNAF(Point2, endo ? Math.ceil(nBitLength / 2) : nBitLength);
    return {
      CURVE,
      ProjectivePoint: Point2,
      normPrivateKeyToScalar,
      weierstrassEquation,
      isWithinCurveOrder
    };
  }
  function validateOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      hash: "hash",
      hmac: "function",
      randomBytes: "function"
    }, {
      bits2int: "function",
      bits2int_modN: "function",
      lowS: "boolean"
    });
    return Object.freeze({ lowS: true, ...opts });
  }
  function weierstrass(curveDef) {
    const CURVE = validateOpts(curveDef);
    const { Fp, n: CURVE_ORDER, nByteLength, nBitLength } = CURVE;
    const compressedLen = Fp.BYTES + 1;
    const uncompressedLen = 2 * Fp.BYTES + 1;
    function modN2(a20) {
      return mod(a20, CURVE_ORDER);
    }
    function invN(a20) {
      return invert(a20, CURVE_ORDER);
    }
    const { ProjectivePoint: Point2, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
      ...CURVE,
      toBytes(_c, point, isCompressed) {
        const a20 = point.toAffine();
        const x = Fp.toBytes(a20.x);
        const cat = concatBytes3;
        abool("isCompressed", isCompressed);
        if (isCompressed) {
          return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
        } else {
          return cat(Uint8Array.from([4]), x, Fp.toBytes(a20.y));
        }
      },
      fromBytes(bytes) {
        const len = bytes.length;
        const head = bytes[0];
        const tail = bytes.subarray(1);
        if (len === compressedLen && (head === 2 || head === 3)) {
          const x = bytesToNumberBE(tail);
          if (!inRange(x, _1n5, Fp.ORDER))
            throw new Error("Point is not on curve");
          const y22 = weierstrassEquation(x);
          let y3;
          try {
            y3 = Fp.sqrt(y22);
          } catch (sqrtError) {
            const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
            throw new Error("Point is not on curve" + suffix);
          }
          const isYOdd = (y3 & _1n5) === _1n5;
          const isHeadOdd = (head & 1) === 1;
          if (isHeadOdd !== isYOdd)
            y3 = Fp.neg(y3);
          return { x, y: y3 };
        } else if (len === uncompressedLen && head === 4) {
          const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
          const y3 = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
          return { x, y: y3 };
        } else {
          const cl = compressedLen;
          const ul = uncompressedLen;
          throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
        }
      }
    });
    function isBiggerThanHalfOrder(number) {
      const HALF = CURVE_ORDER >> _1n5;
      return number > HALF;
    }
    function normalizeS(s12) {
      return isBiggerThanHalfOrder(s12) ? modN2(-s12) : s12;
    }
    const slcNum = (b, from14, to) => bytesToNumberBE(b.slice(from14, to));
    class Signature {
      constructor(r20, s12, recovery) {
        aInRange("r", r20, _1n5, CURVE_ORDER);
        aInRange("s", s12, _1n5, CURVE_ORDER);
        this.r = r20;
        this.s = s12;
        if (recovery != null)
          this.recovery = recovery;
        Object.freeze(this);
      }
      // pair (bytes of r, bytes of s)
      static fromCompact(hex2) {
        const l7 = nByteLength;
        hex2 = ensureBytes("compactSignature", hex2, l7 * 2);
        return new Signature(slcNum(hex2, 0, l7), slcNum(hex2, l7, 2 * l7));
      }
      // DER encoded ECDSA signature
      // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
      static fromDER(hex2) {
        const { r: r20, s: s12 } = DER.toSig(ensureBytes("DER", hex2));
        return new Signature(r20, s12);
      }
      /**
       * @todo remove
       * @deprecated
       */
      assertValidity() {
      }
      addRecoveryBit(recovery) {
        return new Signature(this.r, this.s, recovery);
      }
      recoverPublicKey(msgHash) {
        const { r: r20, s: s12, recovery: rec } = this;
        const h10 = bits2int_modN(ensureBytes("msgHash", msgHash));
        if (rec == null || ![0, 1, 2, 3].includes(rec))
          throw new Error("recovery id invalid");
        const radj = rec === 2 || rec === 3 ? r20 + CURVE.n : r20;
        if (radj >= Fp.ORDER)
          throw new Error("recovery id 2 or 3 invalid");
        const prefix = (rec & 1) === 0 ? "02" : "03";
        const R = Point2.fromHex(prefix + numToSizedHex(radj, Fp.BYTES));
        const ir = invN(radj);
        const u1 = modN2(-h10 * ir);
        const u22 = modN2(s12 * ir);
        const Q = Point2.BASE.multiplyAndAddUnsafe(R, u1, u22);
        if (!Q)
          throw new Error("point at infinify");
        Q.assertValidity();
        return Q;
      }
      // Signatures should be low-s, to prevent malleability.
      hasHighS() {
        return isBiggerThanHalfOrder(this.s);
      }
      normalizeS() {
        return this.hasHighS() ? new Signature(this.r, modN2(-this.s), this.recovery) : this;
      }
      // DER-encoded
      toDERRawBytes() {
        return hexToBytes2(this.toDERHex());
      }
      toDERHex() {
        return DER.hexFromSig(this);
      }
      // padded bytes of r, then padded bytes of s
      toCompactRawBytes() {
        return hexToBytes2(this.toCompactHex());
      }
      toCompactHex() {
        const l7 = nByteLength;
        return numToSizedHex(this.r, l7) + numToSizedHex(this.s, l7);
      }
    }
    const utils = {
      isValidPrivateKey(privateKey) {
        try {
          normPrivateKeyToScalar(privateKey);
          return true;
        } catch (error) {
          return false;
        }
      },
      normPrivateKeyToScalar,
      /**
       * Produces cryptographically secure private key from random of size
       * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
       */
      randomPrivateKey: () => {
        const length = getMinHashLength(CURVE.n);
        return mapHashToField(CURVE.randomBytes(length), CURVE.n);
      },
      /**
       * Creates precompute table for an arbitrary EC point. Makes point "cached".
       * Allows to massively speed-up `point.multiply(scalar)`.
       * @returns cached point
       * @example
       * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
       * fast.multiply(privKey); // much faster ECDH now
       */
      precompute(windowSize = 8, point = Point2.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    function getPublicKey(privateKey, isCompressed = true) {
      return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    function isProbPub(item) {
      if (typeof item === "bigint")
        return false;
      if (item instanceof Point2)
        return true;
      const arr = ensureBytes("key", item);
      const len = arr.length;
      const fpl = Fp.BYTES;
      const compLen = fpl + 1;
      const uncompLen = 2 * fpl + 1;
      if (CURVE.allowedPrivateKeyLengths || nByteLength === compLen) {
        return void 0;
      } else {
        return len === compLen || len === uncompLen;
      }
    }
    function getSharedSecret(privateA, publicB, isCompressed = true) {
      if (isProbPub(privateA) === true)
        throw new Error("first arg must be private key");
      if (isProbPub(publicB) === false)
        throw new Error("second arg must be public key");
      const b = Point2.fromHex(publicB);
      return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    const bits2int = CURVE.bits2int || function(bytes) {
      if (bytes.length > 8192)
        throw new Error("input is too large");
      const num2 = bytesToNumberBE(bytes);
      const delta = bytes.length * 8 - nBitLength;
      return delta > 0 ? num2 >> BigInt(delta) : num2;
    };
    const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
      return modN2(bits2int(bytes));
    };
    const ORDER_MASK = bitMask(nBitLength);
    function int2octets(num2) {
      aInRange("num < 2^" + nBitLength, num2, _0n5, ORDER_MASK);
      return numberToBytesBE(num2, nByteLength);
    }
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
      if (["recovered", "canonical"].some((k2) => k2 in opts))
        throw new Error("sign() legacy options not supported");
      const { hash: hash3, randomBytes: randomBytes2 } = CURVE;
      let { lowS, prehash, extraEntropy: ent } = opts;
      if (lowS == null)
        lowS = true;
      msgHash = ensureBytes("msgHash", msgHash);
      validateSigVerOpts(opts);
      if (prehash)
        msgHash = ensureBytes("prehashed msgHash", hash3(msgHash));
      const h1int = bits2int_modN(msgHash);
      const d8 = normPrivateKeyToScalar(privateKey);
      const seedArgs = [int2octets(d8), int2octets(h1int)];
      if (ent != null && ent !== false) {
        const e42 = ent === true ? randomBytes2(Fp.BYTES) : ent;
        seedArgs.push(ensureBytes("extraEntropy", e42));
      }
      const seed = concatBytes3(...seedArgs);
      const m3 = h1int;
      function k2sig(kBytes) {
        const k2 = bits2int(kBytes);
        if (!isWithinCurveOrder(k2))
          return;
        const ik = invN(k2);
        const q = Point2.BASE.multiply(k2).toAffine();
        const r20 = modN2(q.x);
        if (r20 === _0n5)
          return;
        const s12 = modN2(ik * modN2(m3 + r20 * d8));
        if (s12 === _0n5)
          return;
        let recovery = (q.x === r20 ? 0 : 2) | Number(q.y & _1n5);
        let normS = s12;
        if (lowS && isBiggerThanHalfOrder(s12)) {
          normS = normalizeS(s12);
          recovery ^= 1;
        }
        return new Signature(r20, normS, recovery);
      }
      return { seed, k2sig };
    }
    const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
    const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
    function sign(msgHash, privKey, opts = defaultSigOpts) {
      const { seed, k2sig } = prepSig(msgHash, privKey, opts);
      const C = CURVE;
      const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
      return drbg(seed, k2sig);
    }
    Point2.BASE._setWindowSize(8);
    function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
      const sg = signature;
      msgHash = ensureBytes("msgHash", msgHash);
      publicKey = ensureBytes("publicKey", publicKey);
      const { lowS, prehash, format } = opts;
      validateSigVerOpts(opts);
      if ("strict" in opts)
        throw new Error("options.strict was renamed to lowS");
      if (format !== void 0 && format !== "compact" && format !== "der")
        throw new Error("format must be compact or der");
      const isHex2 = typeof sg === "string" || isBytes2(sg);
      const isObj = !isHex2 && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
      if (!isHex2 && !isObj)
        throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
      let _sig = void 0;
      let P;
      try {
        if (isObj)
          _sig = new Signature(sg.r, sg.s);
        if (isHex2) {
          try {
            if (format !== "compact")
              _sig = Signature.fromDER(sg);
          } catch (derError) {
            if (!(derError instanceof DER.Err))
              throw derError;
          }
          if (!_sig && format !== "der")
            _sig = Signature.fromCompact(sg);
        }
        P = Point2.fromHex(publicKey);
      } catch (error) {
        return false;
      }
      if (!_sig)
        return false;
      if (lowS && _sig.hasHighS())
        return false;
      if (prehash)
        msgHash = CURVE.hash(msgHash);
      const { r: r20, s: s12 } = _sig;
      const h10 = bits2int_modN(msgHash);
      const is = invN(s12);
      const u1 = modN2(h10 * is);
      const u22 = modN2(r20 * is);
      const R = Point2.BASE.multiplyAndAddUnsafe(P, u1, u22)?.toAffine();
      if (!R)
        return false;
      const v = modN2(R.x);
      return v === r20;
    }
    return {
      CURVE,
      getPublicKey,
      getSharedSecret,
      sign,
      verify,
      ProjectivePoint: Point2,
      Signature,
      utils
    };
  }
  function SWUFpSqrtRatio(Fp, Z2) {
    const q = Fp.ORDER;
    let l7 = _0n5;
    for (let o26 = q - _1n5; o26 % _2n3 === _0n5; o26 /= _2n3)
      l7 += _1n5;
    const c1 = l7;
    const _2n_pow_c1_1 = _2n3 << c1 - _1n5 - _1n5;
    const _2n_pow_c1 = _2n_pow_c1_1 * _2n3;
    const c22 = (q - _1n5) / _2n_pow_c1;
    const c32 = (c22 - _1n5) / _2n3;
    const c4 = _2n_pow_c1 - _1n5;
    const c5 = _2n_pow_c1_1;
    const c6 = Fp.pow(Z2, c22);
    const c7 = Fp.pow(Z2, (c22 + _1n5) / _2n3);
    let sqrtRatio = (u4, v) => {
      let tv1 = c6;
      let tv2 = Fp.pow(v, c4);
      let tv3 = Fp.sqr(tv2);
      tv3 = Fp.mul(tv3, v);
      let tv5 = Fp.mul(u4, tv3);
      tv5 = Fp.pow(tv5, c32);
      tv5 = Fp.mul(tv5, tv2);
      tv2 = Fp.mul(tv5, v);
      tv3 = Fp.mul(tv5, u4);
      let tv4 = Fp.mul(tv3, tv2);
      tv5 = Fp.pow(tv4, c5);
      let isQR = Fp.eql(tv5, Fp.ONE);
      tv2 = Fp.mul(tv3, c7);
      tv5 = Fp.mul(tv4, tv1);
      tv3 = Fp.cmov(tv2, tv3, isQR);
      tv4 = Fp.cmov(tv5, tv4, isQR);
      for (let i20 = c1; i20 > _1n5; i20--) {
        let tv52 = i20 - _2n3;
        tv52 = _2n3 << tv52 - _1n5;
        let tvv5 = Fp.pow(tv4, tv52);
        const e1 = Fp.eql(tvv5, Fp.ONE);
        tv2 = Fp.mul(tv3, tv1);
        tv1 = Fp.mul(tv1, tv1);
        tvv5 = Fp.mul(tv4, tv1);
        tv3 = Fp.cmov(tv2, tv3, e1);
        tv4 = Fp.cmov(tvv5, tv4, e1);
      }
      return { isValid: isQR, value: tv3 };
    };
    if (Fp.ORDER % _4n2 === _3n2) {
      const c12 = (Fp.ORDER - _3n2) / _4n2;
      const c23 = Fp.sqrt(Fp.neg(Z2));
      sqrtRatio = (u4, v) => {
        let tv1 = Fp.sqr(v);
        const tv2 = Fp.mul(u4, v);
        tv1 = Fp.mul(tv1, tv2);
        let y1 = Fp.pow(tv1, c12);
        y1 = Fp.mul(y1, tv2);
        const y22 = Fp.mul(y1, c23);
        const tv3 = Fp.mul(Fp.sqr(y1), v);
        const isQR = Fp.eql(tv3, u4);
        let y3 = Fp.cmov(y22, y1, isQR);
        return { isValid: isQR, value: y3 };
      };
    }
    return sqrtRatio;
  }
  function mapToCurveSimpleSWU(Fp, opts) {
    validateField(Fp);
    if (!Fp.isValid(opts.A) || !Fp.isValid(opts.B) || !Fp.isValid(opts.Z))
      throw new Error("mapToCurveSimpleSWU: invalid opts");
    const sqrtRatio = SWUFpSqrtRatio(Fp, opts.Z);
    if (!Fp.isOdd)
      throw new Error("Fp.isOdd is not implemented!");
    return (u4) => {
      let tv1, tv2, tv3, tv4, tv5, tv6, x, y3;
      tv1 = Fp.sqr(u4);
      tv1 = Fp.mul(tv1, opts.Z);
      tv2 = Fp.sqr(tv1);
      tv2 = Fp.add(tv2, tv1);
      tv3 = Fp.add(tv2, Fp.ONE);
      tv3 = Fp.mul(tv3, opts.B);
      tv4 = Fp.cmov(opts.Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO));
      tv4 = Fp.mul(tv4, opts.A);
      tv2 = Fp.sqr(tv3);
      tv6 = Fp.sqr(tv4);
      tv5 = Fp.mul(tv6, opts.A);
      tv2 = Fp.add(tv2, tv5);
      tv2 = Fp.mul(tv2, tv3);
      tv6 = Fp.mul(tv6, tv4);
      tv5 = Fp.mul(tv6, opts.B);
      tv2 = Fp.add(tv2, tv5);
      x = Fp.mul(tv1, tv3);
      const { isValid, value } = sqrtRatio(tv2, tv6);
      y3 = Fp.mul(tv1, u4);
      y3 = Fp.mul(y3, value);
      x = Fp.cmov(x, tv3, isValid);
      y3 = Fp.cmov(y3, value, isValid);
      const e1 = Fp.isOdd(u4) === Fp.isOdd(y3);
      y3 = Fp.cmov(Fp.neg(y3), y3, e1);
      const tv4_inv = FpInvertBatch(Fp, [tv4], true)[0];
      x = Fp.mul(x, tv4_inv);
      return { x, y: y3 };
    };
  }
  var DERErr, DER, _0n5, _1n5, _2n3, _3n2, _4n2;
  var init_weierstrass = __esm({
    "node_modules/@noble/curves/esm/abstract/weierstrass.js"() {
      init_curve();
      init_modular();
      init_utils4();
      DERErr = class extends Error {
        constructor(m3 = "") {
          super(m3);
        }
      };
      DER = {
        // asn.1 DER encoding utils
        Err: DERErr,
        // Basic building block is TLV (Tag-Length-Value)
        _tlv: {
          encode: (tag, data) => {
            const { Err: E2 } = DER;
            if (tag < 0 || tag > 256)
              throw new E2("tlv.encode: wrong tag");
            if (data.length & 1)
              throw new E2("tlv.encode: unpadded data");
            const dataLen = data.length / 2;
            const len = numberToHexUnpadded(dataLen);
            if (len.length / 2 & 128)
              throw new E2("tlv.encode: long form length too big");
            const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
            const t45 = numberToHexUnpadded(tag);
            return t45 + lenLen + len + data;
          },
          // v - value, l - left bytes (unparsed)
          decode(tag, data) {
            const { Err: E2 } = DER;
            let pos = 0;
            if (tag < 0 || tag > 256)
              throw new E2("tlv.encode: wrong tag");
            if (data.length < 2 || data[pos++] !== tag)
              throw new E2("tlv.decode: wrong tlv");
            const first = data[pos++];
            const isLong = !!(first & 128);
            let length = 0;
            if (!isLong)
              length = first;
            else {
              const lenLen = first & 127;
              if (!lenLen)
                throw new E2("tlv.decode(long): indefinite length not supported");
              if (lenLen > 4)
                throw new E2("tlv.decode(long): byte length is too big");
              const lengthBytes = data.subarray(pos, pos + lenLen);
              if (lengthBytes.length !== lenLen)
                throw new E2("tlv.decode: length bytes not complete");
              if (lengthBytes[0] === 0)
                throw new E2("tlv.decode(long): zero leftmost byte");
              for (const b of lengthBytes)
                length = length << 8 | b;
              pos += lenLen;
              if (length < 128)
                throw new E2("tlv.decode(long): not minimal encoding");
            }
            const v = data.subarray(pos, pos + length);
            if (v.length !== length)
              throw new E2("tlv.decode: wrong value length");
            return { v, l: data.subarray(pos + length) };
          }
        },
        // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
        // since we always use positive integers here. It must always be empty:
        // - add zero byte if exists
        // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
        _int: {
          encode(num2) {
            const { Err: E2 } = DER;
            if (num2 < _0n5)
              throw new E2("integer: negative integers are not allowed");
            let hex2 = numberToHexUnpadded(num2);
            if (Number.parseInt(hex2[0], 16) & 8)
              hex2 = "00" + hex2;
            if (hex2.length & 1)
              throw new E2("unexpected DER parsing assertion: unpadded hex");
            return hex2;
          },
          decode(data) {
            const { Err: E2 } = DER;
            if (data[0] & 128)
              throw new E2("invalid signature integer: negative");
            if (data[0] === 0 && !(data[1] & 128))
              throw new E2("invalid signature integer: unnecessary leading zero");
            return bytesToNumberBE(data);
          }
        },
        toSig(hex2) {
          const { Err: E2, _int: int, _tlv: tlv } = DER;
          const data = ensureBytes("signature", hex2);
          const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
          if (seqLeftBytes.length)
            throw new E2("invalid signature: left bytes after parsing");
          const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
          const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
          if (sLeftBytes.length)
            throw new E2("invalid signature: left bytes after parsing");
          return { r: int.decode(rBytes), s: int.decode(sBytes) };
        },
        hexFromSig(sig) {
          const { _tlv: tlv, _int: int } = DER;
          const rs = tlv.encode(2, int.encode(sig.r));
          const ss = tlv.encode(2, int.encode(sig.s));
          const seq = rs + ss;
          return tlv.encode(48, seq);
        }
      };
      _0n5 = BigInt(0);
      _1n5 = BigInt(1);
      _2n3 = BigInt(2);
      _3n2 = BigInt(3);
      _4n2 = BigInt(4);
    }
  });

  // node_modules/@noble/curves/esm/_shortw_utils.js
  function getHash(hash3) {
    return {
      hash: hash3,
      hmac: (key, ...msgs) => hmac(hash3, key, concatBytes(...msgs)),
      randomBytes
    };
  }
  function createCurve(curveDef, defHash) {
    const create2 = (hash3) => weierstrass({ ...curveDef, ...getHash(hash3) });
    return { ...create2(defHash), create: create2 };
  }
  var init_shortw_utils = __esm({
    "node_modules/@noble/curves/esm/_shortw_utils.js"() {
      init_hmac();
      init_utils2();
      init_weierstrass();
    }
  });

  // node_modules/@noble/curves/esm/abstract/hash-to-curve.js
  function i2osp(value, length) {
    anum(value);
    anum(length);
    if (value < 0 || value >= 1 << 8 * length)
      throw new Error("invalid I2OSP input: " + value);
    const res = Array.from({ length }).fill(0);
    for (let i20 = length - 1; i20 >= 0; i20--) {
      res[i20] = value & 255;
      value >>>= 8;
    }
    return new Uint8Array(res);
  }
  function strxor(a20, b) {
    const arr = new Uint8Array(a20.length);
    for (let i20 = 0; i20 < a20.length; i20++) {
      arr[i20] = a20[i20] ^ b[i20];
    }
    return arr;
  }
  function anum(item) {
    if (!Number.isSafeInteger(item))
      throw new Error("number expected");
  }
  function expand_message_xmd(msg, DST, lenInBytes, H2) {
    abytes2(msg);
    abytes2(DST);
    anum(lenInBytes);
    if (DST.length > 255)
      DST = H2(concatBytes3(utf8ToBytes2("H2C-OVERSIZE-DST-"), DST));
    const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H2;
    const ell = Math.ceil(lenInBytes / b_in_bytes);
    if (lenInBytes > 65535 || ell > 255)
      throw new Error("expand_message_xmd: invalid lenInBytes");
    const DST_prime = concatBytes3(DST, i2osp(DST.length, 1));
    const Z_pad = i2osp(0, r_in_bytes);
    const l_i_b_str = i2osp(lenInBytes, 2);
    const b = new Array(ell);
    const b_0 = H2(concatBytes3(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
    b[0] = H2(concatBytes3(b_0, i2osp(1, 1), DST_prime));
    for (let i20 = 1; i20 <= ell; i20++) {
      const args = [strxor(b_0, b[i20 - 1]), i2osp(i20 + 1, 1), DST_prime];
      b[i20] = H2(concatBytes3(...args));
    }
    const pseudo_random_bytes = concatBytes3(...b);
    return pseudo_random_bytes.slice(0, lenInBytes);
  }
  function expand_message_xof(msg, DST, lenInBytes, k2, H2) {
    abytes2(msg);
    abytes2(DST);
    anum(lenInBytes);
    if (DST.length > 255) {
      const dkLen = Math.ceil(2 * k2 / 8);
      DST = H2.create({ dkLen }).update(utf8ToBytes2("H2C-OVERSIZE-DST-")).update(DST).digest();
    }
    if (lenInBytes > 65535 || DST.length > 255)
      throw new Error("expand_message_xof: invalid lenInBytes");
    return H2.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
  }
  function hash_to_field(msg, count, options) {
    validateObject(options, {
      DST: "stringOrUint8Array",
      p: "bigint",
      m: "isSafeInteger",
      k: "isSafeInteger",
      hash: "hash"
    });
    const { p: p14, k: k2, m: m3, hash: hash3, expand, DST: _DST } = options;
    abytes2(msg);
    anum(count);
    const DST = typeof _DST === "string" ? utf8ToBytes2(_DST) : _DST;
    const log2p = p14.toString(2).length;
    const L = Math.ceil((log2p + k2) / 8);
    const len_in_bytes = count * m3 * L;
    let prb;
    if (expand === "xmd") {
      prb = expand_message_xmd(msg, DST, len_in_bytes, hash3);
    } else if (expand === "xof") {
      prb = expand_message_xof(msg, DST, len_in_bytes, k2, hash3);
    } else if (expand === "_internal_pass") {
      prb = msg;
    } else {
      throw new Error('expand must be "xmd" or "xof"');
    }
    const u4 = new Array(count);
    for (let i20 = 0; i20 < count; i20++) {
      const e42 = new Array(m3);
      for (let j = 0; j < m3; j++) {
        const elm_offset = L * (j + i20 * m3);
        const tv = prb.subarray(elm_offset, elm_offset + L);
        e42[j] = mod(os2ip(tv), p14);
      }
      u4[i20] = e42;
    }
    return u4;
  }
  function isogenyMap(field, map) {
    const coeff = map.map((i20) => Array.from(i20).reverse());
    return (x, y3) => {
      const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i20) => field.add(field.mul(acc, x), i20)));
      const [xd_inv, yd_inv] = FpInvertBatch(field, [xd, yd], true);
      x = field.mul(xn, xd_inv);
      y3 = field.mul(y3, field.mul(yn, yd_inv));
      return { x, y: y3 };
    };
  }
  function createHasher2(Point2, mapToCurve, defaults) {
    if (typeof mapToCurve !== "function")
      throw new Error("mapToCurve() must be defined");
    function map(num2) {
      return Point2.fromAffine(mapToCurve(num2));
    }
    function clear(initial) {
      const P = initial.clearCofactor();
      if (P.equals(Point2.ZERO))
        return Point2.ZERO;
      P.assertValidity();
      return P;
    }
    return {
      defaults,
      // Encodes byte string to elliptic curve.
      // hash_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      hashToCurve(msg, options) {
        const u4 = hash_to_field(msg, 2, { ...defaults, DST: defaults.DST, ...options });
        const u0 = map(u4[0]);
        const u1 = map(u4[1]);
        return clear(u0.add(u1));
      },
      // Encodes byte string to elliptic curve.
      // encode_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      encodeToCurve(msg, options) {
        const u4 = hash_to_field(msg, 1, { ...defaults, DST: defaults.encodeDST, ...options });
        return clear(map(u4[0]));
      },
      // Same as encodeToCurve, but without hash
      mapToCurve(scalars) {
        if (!Array.isArray(scalars))
          throw new Error("expected array of bigints");
        for (const i20 of scalars)
          if (typeof i20 !== "bigint")
            throw new Error("expected array of bigints");
        return clear(map(scalars));
      }
    };
  }
  var os2ip;
  var init_hash_to_curve = __esm({
    "node_modules/@noble/curves/esm/abstract/hash-to-curve.js"() {
      init_modular();
      init_utils4();
      os2ip = bytesToNumberBE;
    }
  });

  // node_modules/@noble/curves/esm/secp256k1.js
  var secp256k1_exports = {};
  __export(secp256k1_exports, {
    encodeToCurve: () => encodeToCurve,
    hashToCurve: () => hashToCurve,
    schnorr: () => schnorr,
    secp256k1: () => secp256k1,
    secp256k1_hasher: () => secp256k1_hasher
  });
  function sqrtMod(y3) {
    const P = secp256k1P;
    const _3n3 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
    const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
    const b2 = y3 * y3 * y3 % P;
    const b3 = b2 * b2 * y3 % P;
    const b6 = pow2(b3, _3n3, P) * b3 % P;
    const b9 = pow2(b6, _3n3, P) * b3 % P;
    const b11 = pow2(b9, _2n4, P) * b2 % P;
    const b22 = pow2(b11, _11n, P) * b11 % P;
    const b44 = pow2(b22, _22n, P) * b22 % P;
    const b88 = pow2(b44, _44n, P) * b44 % P;
    const b176 = pow2(b88, _88n, P) * b88 % P;
    const b220 = pow2(b176, _44n, P) * b44 % P;
    const b223 = pow2(b220, _3n3, P) * b3 % P;
    const t1 = pow2(b223, _23n, P) * b22 % P;
    const t210 = pow2(t1, _6n, P) * b2 % P;
    const root = pow2(t210, _2n4, P);
    if (!Fpk1.eql(Fpk1.sqr(root), y3))
      throw new Error("Cannot find square root");
    return root;
  }
  function taggedHash(tag, ...messages) {
    let tagP = TAGGED_HASH_PREFIXES[tag];
    if (tagP === void 0) {
      const tagH = sha256(Uint8Array.from(tag, (c4) => c4.charCodeAt(0)));
      tagP = concatBytes3(tagH, tagH);
      TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return sha256(concatBytes3(tagP, ...messages));
  }
  function schnorrGetExtPubKey(priv) {
    let d_ = secp256k1.utils.normPrivateKeyToScalar(priv);
    let p14 = Point.fromPrivateKey(d_);
    const scalar = p14.hasEvenY() ? d_ : modN(-d_);
    return { scalar, bytes: pointToBytes(p14) };
  }
  function lift_x(x) {
    aInRange("x", x, _1n6, secp256k1P);
    const xx = modP(x * x);
    const c4 = modP(xx * x + BigInt(7));
    let y3 = sqrtMod(c4);
    if (y3 % _2n4 !== _0n6)
      y3 = modP(-y3);
    const p14 = new Point(x, y3, _1n6);
    p14.assertValidity();
    return p14;
  }
  function challenge(...args) {
    return modN(num(taggedHash("BIP0340/challenge", ...args)));
  }
  function schnorrGetPublicKey(privateKey) {
    return schnorrGetExtPubKey(privateKey).bytes;
  }
  function schnorrSign(message, privateKey, auxRand = randomBytes(32)) {
    const m3 = ensureBytes("message", message);
    const { bytes: px, scalar: d8 } = schnorrGetExtPubKey(privateKey);
    const a20 = ensureBytes("auxRand", auxRand, 32);
    const t45 = numTo32b(d8 ^ num(taggedHash("BIP0340/aux", a20)));
    const rand = taggedHash("BIP0340/nonce", t45, px, m3);
    const k_ = modN(num(rand));
    if (k_ === _0n6)
      throw new Error("sign failed: k is zero");
    const { bytes: rx, scalar: k2 } = schnorrGetExtPubKey(k_);
    const e42 = challenge(rx, px, m3);
    const sig = new Uint8Array(64);
    sig.set(rx, 0);
    sig.set(numTo32b(modN(k2 + e42 * d8)), 32);
    if (!schnorrVerify(sig, m3, px))
      throw new Error("sign: Invalid signature produced");
    return sig;
  }
  function schnorrVerify(signature, message, publicKey) {
    const sig = ensureBytes("signature", signature, 64);
    const m3 = ensureBytes("message", message);
    const pub = ensureBytes("publicKey", publicKey, 32);
    try {
      const P = lift_x(num(pub));
      const r20 = num(sig.subarray(0, 32));
      if (!inRange(r20, _1n6, secp256k1P))
        return false;
      const s12 = num(sig.subarray(32, 64));
      if (!inRange(s12, _1n6, secp256k1N))
        return false;
      const e42 = challenge(numTo32b(r20), pointToBytes(P), m3);
      const R = GmulAdd(P, s12, modN(-e42));
      if (!R || !R.hasEvenY() || R.toAffine().x !== r20)
        return false;
      return true;
    } catch (error) {
      return false;
    }
  }
  var secp256k1P, secp256k1N, _0n6, _1n6, _2n4, divNearest, Fpk1, secp256k1, TAGGED_HASH_PREFIXES, pointToBytes, numTo32b, modP, modN, Point, GmulAdd, num, schnorr, isoMap, mapSWU, secp256k1_hasher, hashToCurve, encodeToCurve;
  var init_secp256k1 = __esm({
    "node_modules/@noble/curves/esm/secp256k1.js"() {
      init_sha2();
      init_utils2();
      init_shortw_utils();
      init_hash_to_curve();
      init_modular();
      init_utils4();
      init_weierstrass();
      secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
      secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
      _0n6 = BigInt(0);
      _1n6 = BigInt(1);
      _2n4 = BigInt(2);
      divNearest = (a20, b) => (a20 + b / _2n4) / b;
      Fpk1 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
      secp256k1 = createCurve({
        a: _0n6,
        b: BigInt(7),
        Fp: Fpk1,
        n: secp256k1N,
        Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
        Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
        h: BigInt(1),
        lowS: true,
        // Allow only low-S signatures by default in sign() and verify()
        endo: {
          // Endomorphism, see above
          beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
          splitScalar: (k2) => {
            const n10 = secp256k1N;
            const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
            const b1 = -_1n6 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
            const a22 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
            const b2 = a1;
            const POW_2_128 = BigInt("0x100000000000000000000000000000000");
            const c1 = divNearest(b2 * k2, n10);
            const c22 = divNearest(-b1 * k2, n10);
            let k1 = mod(k2 - c1 * a1 - c22 * a22, n10);
            let k22 = mod(-c1 * b1 - c22 * b2, n10);
            const k1neg = k1 > POW_2_128;
            const k2neg = k22 > POW_2_128;
            if (k1neg)
              k1 = n10 - k1;
            if (k2neg)
              k22 = n10 - k22;
            if (k1 > POW_2_128 || k22 > POW_2_128) {
              throw new Error("splitScalar: Endomorphism failed, k=" + k2);
            }
            return { k1neg, k1, k2neg, k2: k22 };
          }
        }
      }, sha256);
      TAGGED_HASH_PREFIXES = {};
      pointToBytes = (point) => point.toRawBytes(true).slice(1);
      numTo32b = (n10) => numberToBytesBE(n10, 32);
      modP = (x) => mod(x, secp256k1P);
      modN = (x) => mod(x, secp256k1N);
      Point = /* @__PURE__ */ (() => secp256k1.ProjectivePoint)();
      GmulAdd = (Q, a20, b) => Point.BASE.multiplyAndAddUnsafe(Q, a20, b);
      num = bytesToNumberBE;
      schnorr = /* @__PURE__ */ (() => ({
        getPublicKey: schnorrGetPublicKey,
        sign: schnorrSign,
        verify: schnorrVerify,
        utils: {
          randomPrivateKey: secp256k1.utils.randomPrivateKey,
          lift_x,
          pointToBytes,
          numberToBytesBE,
          bytesToNumberBE,
          taggedHash,
          mod
        }
      }))();
      isoMap = /* @__PURE__ */ (() => isogenyMap(Fpk1, [
        // xNum
        [
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
          "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
          "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
        ],
        // xDen
        [
          "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
          "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
          "0x0000000000000000000000000000000000000000000000000000000000000001"
          // LAST 1
        ],
        // yNum
        [
          "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
          "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
          "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
          "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
        ],
        // yDen
        [
          "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
          "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
          "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
          "0x0000000000000000000000000000000000000000000000000000000000000001"
          // LAST 1
        ]
      ].map((i20) => i20.map((j) => BigInt(j)))))();
      mapSWU = /* @__PURE__ */ (() => mapToCurveSimpleSWU(Fpk1, {
        A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
        B: BigInt("1771"),
        Z: Fpk1.create(BigInt("-11"))
      }))();
      secp256k1_hasher = /* @__PURE__ */ (() => createHasher2(secp256k1.ProjectivePoint, (scalars) => {
        const { x, y: y3 } = mapSWU(Fpk1.create(scalars[0]));
        return isoMap(x, y3);
      }, {
        DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
        encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
        p: Fpk1.ORDER,
        m: 1,
        k: 128,
        expand: "xmd",
        hash: sha256
      }))();
      hashToCurve = /* @__PURE__ */ (() => secp256k1_hasher.hashToCurve)();
      encodeToCurve = /* @__PURE__ */ (() => secp256k1_hasher.encodeToCurve)();
    }
  });

  // node_modules/viem/_esm/errors/node.js
  var ExecutionRevertedError, FeeCapTooHighError, FeeCapTooLowError, NonceTooHighError, NonceTooLowError, NonceMaxValueError, InsufficientFundsError, IntrinsicGasTooHighError, IntrinsicGasTooLowError, TransactionTypeNotSupportedError, TipAboveFeeCapError, UnknownNodeError;
  var init_node = __esm({
    "node_modules/viem/_esm/errors/node.js"() {
      init_formatGwei();
      init_base();
      ExecutionRevertedError = class extends BaseError2 {
        constructor({ cause, message } = {}) {
          const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
          super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
            cause,
            name: "ExecutionRevertedError"
          });
        }
      };
      Object.defineProperty(ExecutionRevertedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 3
      });
      Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /execution reverted|gas required exceeds allowance/
      });
      FeeCapTooHighError = class extends BaseError2 {
        constructor({ cause, maxFeePerGas } = {}) {
          super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
            cause,
            name: "FeeCapTooHighError"
          });
        }
      };
      Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
      });
      FeeCapTooLowError = class extends BaseError2 {
        constructor({ cause, maxFeePerGas } = {}) {
          super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
            cause,
            name: "FeeCapTooLowError"
          });
        }
      };
      Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
      });
      NonceTooHighError = class extends BaseError2 {
        constructor({ cause, nonce } = {}) {
          super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause, name: "NonceTooHighError" });
        }
      };
      Object.defineProperty(NonceTooHighError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /nonce too high/
      });
      NonceTooLowError = class extends BaseError2 {
        constructor({ cause, nonce } = {}) {
          super([
            `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
            "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
          ].join("\n"), { cause, name: "NonceTooLowError" });
        }
      };
      Object.defineProperty(NonceTooLowError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /nonce too low|transaction already imported|already known/
      });
      NonceMaxValueError = class extends BaseError2 {
        constructor({ cause, nonce } = {}) {
          super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause, name: "NonceMaxValueError" });
        }
      };
      Object.defineProperty(NonceMaxValueError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /nonce has max value/
      });
      InsufficientFundsError = class extends BaseError2 {
        constructor({ cause } = {}) {
          super([
            "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
          ].join("\n"), {
            cause,
            metaMessages: [
              "This error could arise when the account does not have enough funds to:",
              " - pay for the total gas fee,",
              " - pay for the value to send.",
              " ",
              "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
              " - `gas` is the amount of gas needed for transaction to execute,",
              " - `gas fee` is the gas fee,",
              " - `value` is the amount of ether to send to the recipient."
            ],
            name: "InsufficientFundsError"
          });
        }
      };
      Object.defineProperty(InsufficientFundsError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /insufficient funds|exceeds transaction sender account balance/
      });
      IntrinsicGasTooHighError = class extends BaseError2 {
        constructor({ cause, gas } = {}) {
          super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
            cause,
            name: "IntrinsicGasTooHighError"
          });
        }
      };
      Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /intrinsic gas too high|gas limit reached/
      });
      IntrinsicGasTooLowError = class extends BaseError2 {
        constructor({ cause, gas } = {}) {
          super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
            cause,
            name: "IntrinsicGasTooLowError"
          });
        }
      };
      Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /intrinsic gas too low/
      });
      TransactionTypeNotSupportedError = class extends BaseError2 {
        constructor({ cause }) {
          super("The transaction type is not supported for this chain.", {
            cause,
            name: "TransactionTypeNotSupportedError"
          });
        }
      };
      Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /transaction type not valid/
      });
      TipAboveFeeCapError = class extends BaseError2 {
        constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
          super([
            `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
          ].join("\n"), {
            cause,
            name: "TipAboveFeeCapError"
          });
        }
      };
      Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
      });
      UnknownNodeError = class extends BaseError2 {
        constructor({ cause }) {
          super(`An error occurred while executing: ${cause?.shortMessage}`, {
            cause,
            name: "UnknownNodeError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/errors/getNodeError.js
  function getNodeError(err, args) {
    const message = (err.details || "").toLowerCase();
    const executionRevertedError = err instanceof BaseError2 ? err.walk((e42) => e42?.code === ExecutionRevertedError.code) : err;
    if (executionRevertedError instanceof BaseError2)
      return new ExecutionRevertedError({
        cause: err,
        message: executionRevertedError.details
      });
    if (ExecutionRevertedError.nodeMessage.test(message))
      return new ExecutionRevertedError({
        cause: err,
        message: err.details
      });
    if (FeeCapTooHighError.nodeMessage.test(message))
      return new FeeCapTooHighError({
        cause: err,
        maxFeePerGas: args?.maxFeePerGas
      });
    if (FeeCapTooLowError.nodeMessage.test(message))
      return new FeeCapTooLowError({
        cause: err,
        maxFeePerGas: args?.maxFeePerGas
      });
    if (NonceTooHighError.nodeMessage.test(message))
      return new NonceTooHighError({ cause: err, nonce: args?.nonce });
    if (NonceTooLowError.nodeMessage.test(message))
      return new NonceTooLowError({ cause: err, nonce: args?.nonce });
    if (NonceMaxValueError.nodeMessage.test(message))
      return new NonceMaxValueError({ cause: err, nonce: args?.nonce });
    if (InsufficientFundsError.nodeMessage.test(message))
      return new InsufficientFundsError({ cause: err });
    if (IntrinsicGasTooHighError.nodeMessage.test(message))
      return new IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
    if (IntrinsicGasTooLowError.nodeMessage.test(message))
      return new IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
    if (TransactionTypeNotSupportedError.nodeMessage.test(message))
      return new TransactionTypeNotSupportedError({ cause: err });
    if (TipAboveFeeCapError.nodeMessage.test(message))
      return new TipAboveFeeCapError({
        cause: err,
        maxFeePerGas: args?.maxFeePerGas,
        maxPriorityFeePerGas: args?.maxPriorityFeePerGas
      });
    return new UnknownNodeError({
      cause: err
    });
  }
  var init_getNodeError = __esm({
    "node_modules/viem/_esm/utils/errors/getNodeError.js"() {
      init_base();
      init_node();
    }
  });

  // node_modules/viem/_esm/utils/formatters/extract.js
  function extract(value_, { format }) {
    if (!format)
      return {};
    const value = {};
    function extract_(formatted2) {
      const keys = Object.keys(formatted2);
      for (const key of keys) {
        if (key in value_)
          value[key] = value_[key];
        if (formatted2[key] && typeof formatted2[key] === "object" && !Array.isArray(formatted2[key]))
          extract_(formatted2[key]);
      }
    }
    const formatted = format(value_ || {});
    extract_(formatted);
    return value;
  }
  var init_extract = __esm({
    "node_modules/viem/_esm/utils/formatters/extract.js"() {
    }
  });

  // node_modules/viem/_esm/utils/formatters/transactionRequest.js
  function formatTransactionRequest(request, _4) {
    const rpcRequest = {};
    if (typeof request.authorizationList !== "undefined")
      rpcRequest.authorizationList = formatAuthorizationList(request.authorizationList);
    if (typeof request.accessList !== "undefined")
      rpcRequest.accessList = request.accessList;
    if (typeof request.blobVersionedHashes !== "undefined")
      rpcRequest.blobVersionedHashes = request.blobVersionedHashes;
    if (typeof request.blobs !== "undefined") {
      if (typeof request.blobs[0] !== "string")
        rpcRequest.blobs = request.blobs.map((x) => bytesToHex(x));
      else
        rpcRequest.blobs = request.blobs;
    }
    if (typeof request.data !== "undefined")
      rpcRequest.data = request.data;
    if (request.account)
      rpcRequest.from = request.account.address;
    if (typeof request.from !== "undefined")
      rpcRequest.from = request.from;
    if (typeof request.gas !== "undefined")
      rpcRequest.gas = numberToHex(request.gas);
    if (typeof request.gasPrice !== "undefined")
      rpcRequest.gasPrice = numberToHex(request.gasPrice);
    if (typeof request.maxFeePerBlobGas !== "undefined")
      rpcRequest.maxFeePerBlobGas = numberToHex(request.maxFeePerBlobGas);
    if (typeof request.maxFeePerGas !== "undefined")
      rpcRequest.maxFeePerGas = numberToHex(request.maxFeePerGas);
    if (typeof request.maxPriorityFeePerGas !== "undefined")
      rpcRequest.maxPriorityFeePerGas = numberToHex(request.maxPriorityFeePerGas);
    if (typeof request.nonce !== "undefined")
      rpcRequest.nonce = numberToHex(request.nonce);
    if (typeof request.to !== "undefined")
      rpcRequest.to = request.to;
    if (typeof request.type !== "undefined")
      rpcRequest.type = rpcTransactionType[request.type];
    if (typeof request.value !== "undefined")
      rpcRequest.value = numberToHex(request.value);
    return rpcRequest;
  }
  function formatAuthorizationList(authorizationList) {
    return authorizationList.map((authorization) => ({
      address: authorization.address,
      r: authorization.r ? numberToHex(BigInt(authorization.r)) : authorization.r,
      s: authorization.s ? numberToHex(BigInt(authorization.s)) : authorization.s,
      chainId: numberToHex(authorization.chainId),
      nonce: numberToHex(authorization.nonce),
      ...typeof authorization.yParity !== "undefined" ? { yParity: numberToHex(authorization.yParity) } : {},
      ...typeof authorization.v !== "undefined" && typeof authorization.yParity === "undefined" ? { v: numberToHex(authorization.v) } : {}
    }));
  }
  var rpcTransactionType;
  var init_transactionRequest = __esm({
    "node_modules/viem/_esm/utils/formatters/transactionRequest.js"() {
      init_toHex();
      rpcTransactionType = {
        legacy: "0x0",
        eip2930: "0x1",
        eip1559: "0x2",
        eip4844: "0x3",
        eip7702: "0x4"
      };
    }
  });

  // node_modules/viem/_esm/utils/stateOverride.js
  function serializeStateMapping(stateMapping) {
    if (!stateMapping || stateMapping.length === 0)
      return void 0;
    return stateMapping.reduce((acc, { slot, value }) => {
      if (slot.length !== 66)
        throw new InvalidBytesLengthError({
          size: slot.length,
          targetSize: 66,
          type: "hex"
        });
      if (value.length !== 66)
        throw new InvalidBytesLengthError({
          size: value.length,
          targetSize: 66,
          type: "hex"
        });
      acc[slot] = value;
      return acc;
    }, {});
  }
  function serializeAccountStateOverride(parameters) {
    const { balance, nonce, state, stateDiff, code } = parameters;
    const rpcAccountStateOverride = {};
    if (code !== void 0)
      rpcAccountStateOverride.code = code;
    if (balance !== void 0)
      rpcAccountStateOverride.balance = numberToHex(balance);
    if (nonce !== void 0)
      rpcAccountStateOverride.nonce = numberToHex(nonce);
    if (state !== void 0)
      rpcAccountStateOverride.state = serializeStateMapping(state);
    if (stateDiff !== void 0) {
      if (rpcAccountStateOverride.state)
        throw new StateAssignmentConflictError();
      rpcAccountStateOverride.stateDiff = serializeStateMapping(stateDiff);
    }
    return rpcAccountStateOverride;
  }
  function serializeStateOverride(parameters) {
    if (!parameters)
      return void 0;
    const rpcStateOverride = {};
    for (const { address, ...accountState } of parameters) {
      if (!isAddress(address, { strict: false }))
        throw new InvalidAddressError({ address });
      if (rpcStateOverride[address])
        throw new AccountStateConflictError({ address });
      rpcStateOverride[address] = serializeAccountStateOverride(accountState);
    }
    return rpcStateOverride;
  }
  var init_stateOverride2 = __esm({
    "node_modules/viem/_esm/utils/stateOverride.js"() {
      init_address();
      init_data();
      init_stateOverride();
      init_isAddress();
      init_toHex();
    }
  });

  // node_modules/viem/_esm/constants/number.js
  var maxInt8, maxInt16, maxInt24, maxInt32, maxInt40, maxInt48, maxInt56, maxInt64, maxInt72, maxInt80, maxInt88, maxInt96, maxInt104, maxInt112, maxInt120, maxInt128, maxInt136, maxInt144, maxInt152, maxInt160, maxInt168, maxInt176, maxInt184, maxInt192, maxInt200, maxInt208, maxInt216, maxInt224, maxInt232, maxInt240, maxInt248, maxInt256, minInt8, minInt16, minInt24, minInt32, minInt40, minInt48, minInt56, minInt64, minInt72, minInt80, minInt88, minInt96, minInt104, minInt112, minInt120, minInt128, minInt136, minInt144, minInt152, minInt160, minInt168, minInt176, minInt184, minInt192, minInt200, minInt208, minInt216, minInt224, minInt232, minInt240, minInt248, minInt256, maxUint8, maxUint16, maxUint24, maxUint32, maxUint40, maxUint48, maxUint56, maxUint64, maxUint72, maxUint80, maxUint88, maxUint96, maxUint104, maxUint112, maxUint120, maxUint128, maxUint136, maxUint144, maxUint152, maxUint160, maxUint168, maxUint176, maxUint184, maxUint192, maxUint200, maxUint208, maxUint216, maxUint224, maxUint232, maxUint240, maxUint248, maxUint256;
  var init_number = __esm({
    "node_modules/viem/_esm/constants/number.js"() {
      maxInt8 = 2n ** (8n - 1n) - 1n;
      maxInt16 = 2n ** (16n - 1n) - 1n;
      maxInt24 = 2n ** (24n - 1n) - 1n;
      maxInt32 = 2n ** (32n - 1n) - 1n;
      maxInt40 = 2n ** (40n - 1n) - 1n;
      maxInt48 = 2n ** (48n - 1n) - 1n;
      maxInt56 = 2n ** (56n - 1n) - 1n;
      maxInt64 = 2n ** (64n - 1n) - 1n;
      maxInt72 = 2n ** (72n - 1n) - 1n;
      maxInt80 = 2n ** (80n - 1n) - 1n;
      maxInt88 = 2n ** (88n - 1n) - 1n;
      maxInt96 = 2n ** (96n - 1n) - 1n;
      maxInt104 = 2n ** (104n - 1n) - 1n;
      maxInt112 = 2n ** (112n - 1n) - 1n;
      maxInt120 = 2n ** (120n - 1n) - 1n;
      maxInt128 = 2n ** (128n - 1n) - 1n;
      maxInt136 = 2n ** (136n - 1n) - 1n;
      maxInt144 = 2n ** (144n - 1n) - 1n;
      maxInt152 = 2n ** (152n - 1n) - 1n;
      maxInt160 = 2n ** (160n - 1n) - 1n;
      maxInt168 = 2n ** (168n - 1n) - 1n;
      maxInt176 = 2n ** (176n - 1n) - 1n;
      maxInt184 = 2n ** (184n - 1n) - 1n;
      maxInt192 = 2n ** (192n - 1n) - 1n;
      maxInt200 = 2n ** (200n - 1n) - 1n;
      maxInt208 = 2n ** (208n - 1n) - 1n;
      maxInt216 = 2n ** (216n - 1n) - 1n;
      maxInt224 = 2n ** (224n - 1n) - 1n;
      maxInt232 = 2n ** (232n - 1n) - 1n;
      maxInt240 = 2n ** (240n - 1n) - 1n;
      maxInt248 = 2n ** (248n - 1n) - 1n;
      maxInt256 = 2n ** (256n - 1n) - 1n;
      minInt8 = -(2n ** (8n - 1n));
      minInt16 = -(2n ** (16n - 1n));
      minInt24 = -(2n ** (24n - 1n));
      minInt32 = -(2n ** (32n - 1n));
      minInt40 = -(2n ** (40n - 1n));
      minInt48 = -(2n ** (48n - 1n));
      minInt56 = -(2n ** (56n - 1n));
      minInt64 = -(2n ** (64n - 1n));
      minInt72 = -(2n ** (72n - 1n));
      minInt80 = -(2n ** (80n - 1n));
      minInt88 = -(2n ** (88n - 1n));
      minInt96 = -(2n ** (96n - 1n));
      minInt104 = -(2n ** (104n - 1n));
      minInt112 = -(2n ** (112n - 1n));
      minInt120 = -(2n ** (120n - 1n));
      minInt128 = -(2n ** (128n - 1n));
      minInt136 = -(2n ** (136n - 1n));
      minInt144 = -(2n ** (144n - 1n));
      minInt152 = -(2n ** (152n - 1n));
      minInt160 = -(2n ** (160n - 1n));
      minInt168 = -(2n ** (168n - 1n));
      minInt176 = -(2n ** (176n - 1n));
      minInt184 = -(2n ** (184n - 1n));
      minInt192 = -(2n ** (192n - 1n));
      minInt200 = -(2n ** (200n - 1n));
      minInt208 = -(2n ** (208n - 1n));
      minInt216 = -(2n ** (216n - 1n));
      minInt224 = -(2n ** (224n - 1n));
      minInt232 = -(2n ** (232n - 1n));
      minInt240 = -(2n ** (240n - 1n));
      minInt248 = -(2n ** (248n - 1n));
      minInt256 = -(2n ** (256n - 1n));
      maxUint8 = 2n ** 8n - 1n;
      maxUint16 = 2n ** 16n - 1n;
      maxUint24 = 2n ** 24n - 1n;
      maxUint32 = 2n ** 32n - 1n;
      maxUint40 = 2n ** 40n - 1n;
      maxUint48 = 2n ** 48n - 1n;
      maxUint56 = 2n ** 56n - 1n;
      maxUint64 = 2n ** 64n - 1n;
      maxUint72 = 2n ** 72n - 1n;
      maxUint80 = 2n ** 80n - 1n;
      maxUint88 = 2n ** 88n - 1n;
      maxUint96 = 2n ** 96n - 1n;
      maxUint104 = 2n ** 104n - 1n;
      maxUint112 = 2n ** 112n - 1n;
      maxUint120 = 2n ** 120n - 1n;
      maxUint128 = 2n ** 128n - 1n;
      maxUint136 = 2n ** 136n - 1n;
      maxUint144 = 2n ** 144n - 1n;
      maxUint152 = 2n ** 152n - 1n;
      maxUint160 = 2n ** 160n - 1n;
      maxUint168 = 2n ** 168n - 1n;
      maxUint176 = 2n ** 176n - 1n;
      maxUint184 = 2n ** 184n - 1n;
      maxUint192 = 2n ** 192n - 1n;
      maxUint200 = 2n ** 200n - 1n;
      maxUint208 = 2n ** 208n - 1n;
      maxUint216 = 2n ** 216n - 1n;
      maxUint224 = 2n ** 224n - 1n;
      maxUint232 = 2n ** 232n - 1n;
      maxUint240 = 2n ** 240n - 1n;
      maxUint248 = 2n ** 248n - 1n;
      maxUint256 = 2n ** 256n - 1n;
    }
  });

  // node_modules/viem/_esm/utils/transaction/assertRequest.js
  function assertRequest(args) {
    const { account: account_, maxFeePerGas, maxPriorityFeePerGas, to } = args;
    const account = account_ ? parseAccount(account_) : void 0;
    if (account && !isAddress(account.address))
      throw new InvalidAddressError({ address: account.address });
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
    if (maxFeePerGas && maxFeePerGas > maxUint256)
      throw new FeeCapTooHighError({ maxFeePerGas });
    if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
      throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
  }
  var init_assertRequest = __esm({
    "node_modules/viem/_esm/utils/transaction/assertRequest.js"() {
      init_parseAccount();
      init_number();
      init_address();
      init_node();
      init_isAddress();
    }
  });

  // node_modules/viem/_esm/utils/address/isAddressEqual.js
  function isAddressEqual(a20, b) {
    if (!isAddress(a20, { strict: false }))
      throw new InvalidAddressError({ address: a20 });
    if (!isAddress(b, { strict: false }))
      throw new InvalidAddressError({ address: b });
    return a20.toLowerCase() === b.toLowerCase();
  }
  var init_isAddressEqual = __esm({
    "node_modules/viem/_esm/utils/address/isAddressEqual.js"() {
      init_address();
      init_isAddress();
    }
  });

  // node_modules/viem/_esm/utils/abi/decodeFunctionResult.js
  function decodeFunctionResult(parameters) {
    const { abi: abi2, args, functionName, data } = parameters;
    let abiItem = abi2[0];
    if (functionName) {
      const item = getAbiItem({ abi: abi2, args, name: functionName });
      if (!item)
        throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath4 });
      abiItem = item;
    }
    if (abiItem.type !== "function")
      throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath4 });
    if (!abiItem.outputs)
      throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath4 });
    const values = decodeAbiParameters(abiItem.outputs, data);
    if (values && values.length > 1)
      return values;
    if (values && values.length === 1)
      return values[0];
    return void 0;
  }
  var docsPath4;
  var init_decodeFunctionResult = __esm({
    "node_modules/viem/_esm/utils/abi/decodeFunctionResult.js"() {
      init_abi();
      init_decodeAbiParameters();
      init_getAbiItem();
      docsPath4 = "/docs/contract/decodeFunctionResult";
    }
  });

  // node_modules/ox/_esm/core/version.js
  var version3;
  var init_version3 = __esm({
    "node_modules/ox/_esm/core/version.js"() {
      version3 = "0.1.1";
    }
  });

  // node_modules/ox/_esm/core/internal/errors.js
  function getVersion() {
    return version3;
  }
  var init_errors2 = __esm({
    "node_modules/ox/_esm/core/internal/errors.js"() {
      init_version3();
    }
  });

  // node_modules/ox/_esm/core/Errors.js
  function walk2(err, fn) {
    if (fn?.(err))
      return err;
    if (err && typeof err === "object" && "cause" in err && err.cause)
      return walk2(err.cause, fn);
    return fn ? null : err;
  }
  var BaseError3;
  var init_Errors = __esm({
    "node_modules/ox/_esm/core/Errors.js"() {
      init_errors2();
      BaseError3 = class _BaseError extends Error {
        static setStaticOptions(options) {
          _BaseError.prototype.docsOrigin = options.docsOrigin;
          _BaseError.prototype.showVersion = options.showVersion;
          _BaseError.prototype.version = options.version;
        }
        constructor(shortMessage, options = {}) {
          const details = (() => {
            if (options.cause instanceof _BaseError) {
              if (options.cause.details)
                return options.cause.details;
              if (options.cause.shortMessage)
                return options.cause.shortMessage;
            }
            if (options.cause && "details" in options.cause && typeof options.cause.details === "string")
              return options.cause.details;
            if (options.cause?.message)
              return options.cause.message;
            return options.details;
          })();
          const docsPath8 = (() => {
            if (options.cause instanceof _BaseError)
              return options.cause.docsPath || options.docsPath;
            return options.docsPath;
          })();
          const docsBaseUrl = options.docsOrigin ?? _BaseError.prototype.docsOrigin;
          const docs = `${docsBaseUrl}${docsPath8 ?? ""}`;
          const showVersion = Boolean(options.version ?? _BaseError.prototype.showVersion);
          const version4 = options.version ?? _BaseError.prototype.version;
          const message = [
            shortMessage || "An error occurred.",
            ...options.metaMessages ? ["", ...options.metaMessages] : [],
            ...details || docsPath8 || showVersion ? [
              "",
              details ? `Details: ${details}` : void 0,
              docsPath8 ? `See: ${docs}` : void 0,
              showVersion ? `Version: ${version4}` : void 0
            ] : []
          ].filter((x) => typeof x === "string").join("\n");
          super(message, options.cause ? { cause: options.cause } : void 0);
          Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "docs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "docsOrigin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "showVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "BaseError"
          });
          this.cause = options.cause;
          this.details = details;
          this.docs = docs;
          this.docsOrigin = docsBaseUrl;
          this.docsPath = docsPath8;
          this.shortMessage = shortMessage;
          this.showVersion = showVersion;
          this.version = version4;
        }
        walk(fn) {
          return walk2(this, fn);
        }
      };
      Object.defineProperty(BaseError3, "defaultStaticOptions", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
          docsOrigin: "https://oxlib.sh",
          showVersion: false,
          version: `ox@${getVersion()}`
        }
      });
      (() => {
        BaseError3.setStaticOptions(BaseError3.defaultStaticOptions);
      })();
    }
  });

  // node_modules/ox/_esm/core/internal/bytes.js
  function assertSize2(bytes, size_) {
    if (size2(bytes) > size_)
      throw new SizeOverflowError2({
        givenSize: size2(bytes),
        maxSize: size_
      });
  }
  function assertStartOffset2(value, start) {
    if (typeof start === "number" && start > 0 && start > size2(value) - 1)
      throw new SliceOffsetOutOfBoundsError2({
        offset: start,
        position: "start",
        size: size2(value)
      });
  }
  function assertEndOffset2(value, start, end) {
    if (typeof start === "number" && typeof end === "number" && size2(value) !== end - start) {
      throw new SliceOffsetOutOfBoundsError2({
        offset: end,
        position: "end",
        size: size2(value)
      });
    }
  }
  function charCodeToBase162(char) {
    if (char >= charCodeMap2.zero && char <= charCodeMap2.nine)
      return char - charCodeMap2.zero;
    if (char >= charCodeMap2.A && char <= charCodeMap2.F)
      return char - (charCodeMap2.A - 10);
    if (char >= charCodeMap2.a && char <= charCodeMap2.f)
      return char - (charCodeMap2.a - 10);
    return void 0;
  }
  function pad2(bytes, options = {}) {
    const { dir, size: size5 = 32 } = options;
    if (size5 === 0)
      return bytes;
    if (bytes.length > size5)
      throw new SizeExceedsPaddingSizeError2({
        size: bytes.length,
        targetSize: size5,
        type: "Bytes"
      });
    const paddedBytes = new Uint8Array(size5);
    for (let i20 = 0; i20 < size5; i20++) {
      const padEnd = dir === "right";
      paddedBytes[padEnd ? i20 : size5 - i20 - 1] = bytes[padEnd ? i20 : bytes.length - i20 - 1];
    }
    return paddedBytes;
  }
  function trim2(value, options = {}) {
    const { dir = "left" } = options;
    let data = value;
    let sliceLength = 0;
    for (let i20 = 0; i20 < data.length - 1; i20++) {
      if (data[dir === "left" ? i20 : data.length - i20 - 1].toString() === "0")
        sliceLength++;
      else
        break;
    }
    data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    return data;
  }
  var charCodeMap2;
  var init_bytes = __esm({
    "node_modules/ox/_esm/core/internal/bytes.js"() {
      init_Bytes();
      charCodeMap2 = {
        zero: 48,
        nine: 57,
        A: 65,
        F: 70,
        a: 97,
        f: 102
      };
    }
  });

  // node_modules/ox/_esm/core/internal/hex.js
  function assertSize3(hex2, size_) {
    if (size3(hex2) > size_)
      throw new SizeOverflowError3({
        givenSize: size3(hex2),
        maxSize: size_
      });
  }
  function assertStartOffset3(value, start) {
    if (typeof start === "number" && start > 0 && start > size3(value) - 1)
      throw new SliceOffsetOutOfBoundsError3({
        offset: start,
        position: "start",
        size: size3(value)
      });
  }
  function assertEndOffset3(value, start, end) {
    if (typeof start === "number" && typeof end === "number" && size3(value) !== end - start) {
      throw new SliceOffsetOutOfBoundsError3({
        offset: end,
        position: "end",
        size: size3(value)
      });
    }
  }
  function pad3(hex_, options = {}) {
    const { dir, size: size5 = 32 } = options;
    if (size5 === 0)
      return hex_;
    const hex2 = hex_.replace("0x", "");
    if (hex2.length > size5 * 2)
      throw new SizeExceedsPaddingSizeError3({
        size: Math.ceil(hex2.length / 2),
        targetSize: size5,
        type: "Hex"
      });
    return `0x${hex2[dir === "right" ? "padEnd" : "padStart"](size5 * 2, "0")}`;
  }
  function trim3(value, options = {}) {
    const { dir = "left" } = options;
    let data = value.replace("0x", "");
    let sliceLength = 0;
    for (let i20 = 0; i20 < data.length - 1; i20++) {
      if (data[dir === "left" ? i20 : data.length - i20 - 1].toString() === "0")
        sliceLength++;
      else
        break;
    }
    data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (data === "0")
      return "0x";
    if (dir === "right" && data.length % 2 === 1)
      return `0x${data}0`;
    return `0x${data}`;
  }
  var init_hex = __esm({
    "node_modules/ox/_esm/core/internal/hex.js"() {
      init_Hex();
    }
  });

  // node_modules/ox/_esm/core/Json.js
  function stringify2(value, replacer, space) {
    return JSON.stringify(value, (key, value2) => {
      if (typeof replacer === "function")
        return replacer(key, value2);
      if (typeof value2 === "bigint")
        return value2.toString() + bigIntSuffix;
      return value2;
    }, space);
  }
  var bigIntSuffix;
  var init_Json = __esm({
    "node_modules/ox/_esm/core/Json.js"() {
      bigIntSuffix = "#__bigint";
    }
  });

  // node_modules/ox/_esm/core/Bytes.js
  function assert(value) {
    if (value instanceof Uint8Array)
      return;
    if (!value)
      throw new InvalidBytesTypeError(value);
    if (typeof value !== "object")
      throw new InvalidBytesTypeError(value);
    if (!("BYTES_PER_ELEMENT" in value))
      throw new InvalidBytesTypeError(value);
    if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
      throw new InvalidBytesTypeError(value);
  }
  function from(value) {
    if (value instanceof Uint8Array)
      return value;
    if (typeof value === "string")
      return fromHex(value);
    return fromArray(value);
  }
  function fromArray(value) {
    return value instanceof Uint8Array ? value : new Uint8Array(value);
  }
  function fromHex(value, options = {}) {
    const { size: size5 } = options;
    let hex2 = value;
    if (size5) {
      assertSize3(value, size5);
      hex2 = padRight(value, size5);
    }
    let hexString = hex2.slice(2);
    if (hexString.length % 2)
      hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes = new Uint8Array(length);
    for (let index2 = 0, j = 0; index2 < length; index2++) {
      const nibbleLeft = charCodeToBase162(hexString.charCodeAt(j++));
      const nibbleRight = charCodeToBase162(hexString.charCodeAt(j++));
      if (nibbleLeft === void 0 || nibbleRight === void 0) {
        throw new BaseError3(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
      }
      bytes[index2] = nibbleLeft << 4 | nibbleRight;
    }
    return bytes;
  }
  function fromString(value, options = {}) {
    const { size: size5 } = options;
    const bytes = encoder4.encode(value);
    if (typeof size5 === "number") {
      assertSize2(bytes, size5);
      return padRight2(bytes, size5);
    }
    return bytes;
  }
  function padRight2(value, size5) {
    return pad2(value, { dir: "right", size: size5 });
  }
  function size2(value) {
    return value.length;
  }
  function slice2(value, start, end, options = {}) {
    const { strict } = options;
    assertStartOffset2(value, start);
    const value_ = value.slice(start, end);
    if (strict)
      assertEndOffset2(value_, start, end);
    return value_;
  }
  function toBigInt2(bytes, options = {}) {
    const { size: size5 } = options;
    if (typeof size5 !== "undefined")
      assertSize2(bytes, size5);
    const hex2 = fromBytes(bytes, options);
    return toBigInt(hex2, options);
  }
  function toBoolean(bytes, options = {}) {
    const { size: size5 } = options;
    let bytes_ = bytes;
    if (typeof size5 !== "undefined") {
      assertSize2(bytes_, size5);
      bytes_ = trimLeft(bytes_);
    }
    if (bytes_.length > 1 || bytes_[0] > 1)
      throw new InvalidBytesBooleanError2(bytes_);
    return Boolean(bytes_[0]);
  }
  function toNumber2(bytes, options = {}) {
    const { size: size5 } = options;
    if (typeof size5 !== "undefined")
      assertSize2(bytes, size5);
    const hex2 = fromBytes(bytes, options);
    return toNumber(hex2, options);
  }
  function toString(bytes, options = {}) {
    const { size: size5 } = options;
    let bytes_ = bytes;
    if (typeof size5 !== "undefined") {
      assertSize2(bytes_, size5);
      bytes_ = trimRight(bytes_);
    }
    return decoder2.decode(bytes_);
  }
  function trimLeft(value) {
    return trim2(value, { dir: "left" });
  }
  function trimRight(value) {
    return trim2(value, { dir: "right" });
  }
  function validate(value) {
    try {
      assert(value);
      return true;
    } catch {
      return false;
    }
  }
  var decoder2, encoder4, InvalidBytesBooleanError2, InvalidBytesTypeError, SizeOverflowError2, SliceOffsetOutOfBoundsError2, SizeExceedsPaddingSizeError2;
  var init_Bytes = __esm({
    "node_modules/ox/_esm/core/Bytes.js"() {
      init_Errors();
      init_Hex();
      init_bytes();
      init_hex();
      init_Json();
      decoder2 = /* @__PURE__ */ new TextDecoder();
      encoder4 = /* @__PURE__ */ new TextEncoder();
      InvalidBytesBooleanError2 = class extends BaseError3 {
        constructor(bytes) {
          super(`Bytes value \`${bytes}\` is not a valid boolean.`, {
            metaMessages: [
              "The bytes array must contain a single byte of either a `0` or `1` value."
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Bytes.InvalidBytesBooleanError"
          });
        }
      };
      InvalidBytesTypeError = class extends BaseError3 {
        constructor(value) {
          super(`Value \`${typeof value === "object" ? stringify2(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
            metaMessages: ["Bytes values must be of type `Bytes`."]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Bytes.InvalidBytesTypeError"
          });
        }
      };
      SizeOverflowError2 = class extends BaseError3 {
        constructor({ givenSize, maxSize }) {
          super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Bytes.SizeOverflowError"
          });
        }
      };
      SliceOffsetOutOfBoundsError2 = class extends BaseError3 {
        constructor({ offset, position, size: size5 }) {
          super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size5}\`).`);
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Bytes.SliceOffsetOutOfBoundsError"
          });
        }
      };
      SizeExceedsPaddingSizeError2 = class extends BaseError3 {
        constructor({ size: size5, targetSize, type }) {
          super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size5}\`) exceeds padding size (\`${targetSize}\`).`);
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Bytes.SizeExceedsPaddingSizeError"
          });
        }
      };
    }
  });

  // node_modules/ox/_esm/core/Hex.js
  function assert2(value, options = {}) {
    const { strict = false } = options;
    if (!value)
      throw new InvalidHexTypeError(value);
    if (typeof value !== "string")
      throw new InvalidHexTypeError(value);
    if (strict) {
      if (!/^0x[0-9a-fA-F]*$/.test(value))
        throw new InvalidHexValueError(value);
    }
    if (!value.startsWith("0x"))
      throw new InvalidHexValueError(value);
  }
  function concat2(...values) {
    return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
  }
  function from2(value) {
    if (value instanceof Uint8Array)
      return fromBytes(value);
    if (Array.isArray(value))
      return fromBytes(new Uint8Array(value));
    return value;
  }
  function fromBoolean(value, options = {}) {
    const hex2 = `0x${Number(value)}`;
    if (typeof options.size === "number") {
      assertSize3(hex2, options.size);
      return padLeft(hex2, options.size);
    }
    return hex2;
  }
  function fromBytes(value, options = {}) {
    let string = "";
    for (let i20 = 0; i20 < value.length; i20++)
      string += hexes3[value[i20]];
    const hex2 = `0x${string}`;
    if (typeof options.size === "number") {
      assertSize3(hex2, options.size);
      return padRight(hex2, options.size);
    }
    return hex2;
  }
  function fromNumber(value, options = {}) {
    const { signed, size: size5 } = options;
    const value_ = BigInt(value);
    let maxValue;
    if (size5) {
      if (signed)
        maxValue = (1n << BigInt(size5) * 8n - 1n) - 1n;
      else
        maxValue = 2n ** (BigInt(size5) * 8n) - 1n;
    } else if (typeof value === "number") {
      maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
    if (maxValue && value_ > maxValue || value_ < minValue) {
      const suffix = typeof value === "bigint" ? "n" : "";
      throw new IntegerOutOfRangeError2({
        max: maxValue ? `${maxValue}${suffix}` : void 0,
        min: `${minValue}${suffix}`,
        signed,
        size: size5,
        value: `${value}${suffix}`
      });
    }
    const stringValue = (signed && value_ < 0 ? BigInt.asUintN(size5 * 8, BigInt(value_)) : value_).toString(16);
    const hex2 = `0x${stringValue}`;
    if (size5)
      return padLeft(hex2, size5);
    return hex2;
  }
  function fromString2(value, options = {}) {
    return fromBytes(encoder5.encode(value), options);
  }
  function padLeft(value, size5) {
    return pad3(value, { dir: "left", size: size5 });
  }
  function padRight(value, size5) {
    return pad3(value, { dir: "right", size: size5 });
  }
  function slice3(value, start, end, options = {}) {
    const { strict } = options;
    assertStartOffset3(value, start);
    const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
    if (strict)
      assertEndOffset3(value_, start, end);
    return value_;
  }
  function size3(value) {
    return Math.ceil((value.length - 2) / 2);
  }
  function trimLeft2(value) {
    return trim3(value, { dir: "left" });
  }
  function toBigInt(hex2, options = {}) {
    const { signed } = options;
    if (options.size)
      assertSize3(hex2, options.size);
    const value = BigInt(hex2);
    if (!signed)
      return value;
    const size5 = (hex2.length - 2) / 2;
    const max_unsigned = (1n << BigInt(size5) * 8n) - 1n;
    const max_signed = max_unsigned >> 1n;
    if (value <= max_signed)
      return value;
    return value - max_unsigned - 1n;
  }
  function toNumber(hex2, options = {}) {
    const { signed, size: size5 } = options;
    if (!signed && !size5)
      return Number(hex2);
    return Number(toBigInt(hex2, options));
  }
  function validate2(value, options = {}) {
    const { strict = false } = options;
    try {
      assert2(value, { strict });
      return true;
    } catch {
      return false;
    }
  }
  var encoder5, hexes3, IntegerOutOfRangeError2, InvalidHexTypeError, InvalidHexValueError, SizeOverflowError3, SliceOffsetOutOfBoundsError3, SizeExceedsPaddingSizeError3;
  var init_Hex = __esm({
    "node_modules/ox/_esm/core/Hex.js"() {
      init_Errors();
      init_hex();
      init_Json();
      encoder5 = /* @__PURE__ */ new TextEncoder();
      hexes3 = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i20) => i20.toString(16).padStart(2, "0"));
      IntegerOutOfRangeError2 = class extends BaseError3 {
        constructor({ max, min, signed, size: size5, value }) {
          super(`Number \`${value}\` is not in safe${size5 ? ` ${size5 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Hex.IntegerOutOfRangeError"
          });
        }
      };
      InvalidHexTypeError = class extends BaseError3 {
        constructor(value) {
          super(`Value \`${typeof value === "object" ? stringify2(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
            metaMessages: ['Hex types must be represented as `"0x${string}"`.']
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Hex.InvalidHexTypeError"
          });
        }
      };
      InvalidHexValueError = class extends BaseError3 {
        constructor(value) {
          super(`Value \`${value}\` is an invalid hex value.`, {
            metaMessages: [
              'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Hex.InvalidHexValueError"
          });
        }
      };
      SizeOverflowError3 = class extends BaseError3 {
        constructor({ givenSize, maxSize }) {
          super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Hex.SizeOverflowError"
          });
        }
      };
      SliceOffsetOutOfBoundsError3 = class extends BaseError3 {
        constructor({ offset, position, size: size5 }) {
          super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size5}\`).`);
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Hex.SliceOffsetOutOfBoundsError"
          });
        }
      };
      SizeExceedsPaddingSizeError3 = class extends BaseError3 {
        constructor({ size: size5, targetSize, type }) {
          super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size5}\`) exceeds padding size (\`${targetSize}\`).`);
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Hex.SizeExceedsPaddingSizeError"
          });
        }
      };
    }
  });

  // node_modules/ox/_esm/core/Withdrawal.js
  function toRpc(withdrawal) {
    return {
      address: withdrawal.address,
      amount: fromNumber(withdrawal.amount),
      index: fromNumber(withdrawal.index),
      validatorIndex: fromNumber(withdrawal.validatorIndex)
    };
  }
  var init_Withdrawal = __esm({
    "node_modules/ox/_esm/core/Withdrawal.js"() {
      init_Hex();
    }
  });

  // node_modules/ox/_esm/core/BlockOverrides.js
  function toRpc2(blockOverrides) {
    return {
      ...typeof blockOverrides.baseFeePerGas === "bigint" && {
        baseFeePerGas: fromNumber(blockOverrides.baseFeePerGas)
      },
      ...typeof blockOverrides.blobBaseFee === "bigint" && {
        blobBaseFee: fromNumber(blockOverrides.blobBaseFee)
      },
      ...typeof blockOverrides.feeRecipient === "string" && {
        feeRecipient: blockOverrides.feeRecipient
      },
      ...typeof blockOverrides.gasLimit === "bigint" && {
        gasLimit: fromNumber(blockOverrides.gasLimit)
      },
      ...typeof blockOverrides.number === "bigint" && {
        number: fromNumber(blockOverrides.number)
      },
      ...typeof blockOverrides.prevRandao === "bigint" && {
        prevRandao: fromNumber(blockOverrides.prevRandao)
      },
      ...typeof blockOverrides.time === "bigint" && {
        time: fromNumber(blockOverrides.time)
      },
      ...blockOverrides.withdrawals && {
        withdrawals: blockOverrides.withdrawals.map(toRpc)
      }
    };
  }
  var init_BlockOverrides = __esm({
    "node_modules/ox/_esm/core/BlockOverrides.js"() {
      init_Hex();
      init_Withdrawal();
    }
  });

  // node_modules/viem/_esm/constants/abis.js
  var multicall3Abi, batchGatewayAbi, universalResolverErrors, universalResolverResolveAbi, universalResolverReverseAbi, textResolverAbi, addressResolverAbi, erc1271Abi, erc6492SignatureValidatorAbi;
  var init_abis = __esm({
    "node_modules/viem/_esm/constants/abis.js"() {
      multicall3Abi = [
        {
          inputs: [
            {
              components: [
                {
                  name: "target",
                  type: "address"
                },
                {
                  name: "allowFailure",
                  type: "bool"
                },
                {
                  name: "callData",
                  type: "bytes"
                }
              ],
              name: "calls",
              type: "tuple[]"
            }
          ],
          name: "aggregate3",
          outputs: [
            {
              components: [
                {
                  name: "success",
                  type: "bool"
                },
                {
                  name: "returnData",
                  type: "bytes"
                }
              ],
              name: "returnData",
              type: "tuple[]"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              name: "addr",
              type: "address"
            }
          ],
          name: "getEthBalance",
          outputs: [
            {
              name: "balance",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "getCurrentBlockTimestamp",
          outputs: [
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        }
      ];
      batchGatewayAbi = [
        {
          name: "query",
          type: "function",
          stateMutability: "view",
          inputs: [
            {
              type: "tuple[]",
              name: "queries",
              components: [
                {
                  type: "address",
                  name: "sender"
                },
                {
                  type: "string[]",
                  name: "urls"
                },
                {
                  type: "bytes",
                  name: "data"
                }
              ]
            }
          ],
          outputs: [
            {
              type: "bool[]",
              name: "failures"
            },
            {
              type: "bytes[]",
              name: "responses"
            }
          ]
        },
        {
          name: "HttpError",
          type: "error",
          inputs: [
            {
              type: "uint16",
              name: "status"
            },
            {
              type: "string",
              name: "message"
            }
          ]
        }
      ];
      universalResolverErrors = [
        {
          inputs: [
            {
              name: "dns",
              type: "bytes"
            }
          ],
          name: "DNSDecodingFailed",
          type: "error"
        },
        {
          inputs: [
            {
              name: "ens",
              type: "string"
            }
          ],
          name: "DNSEncodingFailed",
          type: "error"
        },
        {
          inputs: [],
          name: "EmptyAddress",
          type: "error"
        },
        {
          inputs: [
            {
              name: "status",
              type: "uint16"
            },
            {
              name: "message",
              type: "string"
            }
          ],
          name: "HttpError",
          type: "error"
        },
        {
          inputs: [],
          name: "InvalidBatchGatewayResponse",
          type: "error"
        },
        {
          inputs: [
            {
              name: "errorData",
              type: "bytes"
            }
          ],
          name: "ResolverError",
          type: "error"
        },
        {
          inputs: [
            {
              name: "name",
              type: "bytes"
            },
            {
              name: "resolver",
              type: "address"
            }
          ],
          name: "ResolverNotContract",
          type: "error"
        },
        {
          inputs: [
            {
              name: "name",
              type: "bytes"
            }
          ],
          name: "ResolverNotFound",
          type: "error"
        },
        {
          inputs: [
            {
              name: "primary",
              type: "string"
            },
            {
              name: "primaryAddress",
              type: "bytes"
            }
          ],
          name: "ReverseAddressMismatch",
          type: "error"
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "selector",
              type: "bytes4"
            }
          ],
          name: "UnsupportedResolverProfile",
          type: "error"
        }
      ];
      universalResolverResolveAbi = [
        ...universalResolverErrors,
        {
          name: "resolveWithGateways",
          type: "function",
          stateMutability: "view",
          inputs: [
            { name: "name", type: "bytes" },
            { name: "data", type: "bytes" },
            { name: "gateways", type: "string[]" }
          ],
          outputs: [
            { name: "", type: "bytes" },
            { name: "address", type: "address" }
          ]
        }
      ];
      universalResolverReverseAbi = [
        ...universalResolverErrors,
        {
          name: "reverseWithGateways",
          type: "function",
          stateMutability: "view",
          inputs: [
            { type: "bytes", name: "reverseName" },
            { type: "uint256", name: "coinType" },
            { type: "string[]", name: "gateways" }
          ],
          outputs: [
            { type: "string", name: "resolvedName" },
            { type: "address", name: "resolver" },
            { type: "address", name: "reverseResolver" }
          ]
        }
      ];
      textResolverAbi = [
        {
          name: "text",
          type: "function",
          stateMutability: "view",
          inputs: [
            { name: "name", type: "bytes32" },
            { name: "key", type: "string" }
          ],
          outputs: [{ name: "", type: "string" }]
        }
      ];
      addressResolverAbi = [
        {
          name: "addr",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "name", type: "bytes32" }],
          outputs: [{ name: "", type: "address" }]
        },
        {
          name: "addr",
          type: "function",
          stateMutability: "view",
          inputs: [
            { name: "name", type: "bytes32" },
            { name: "coinType", type: "uint256" }
          ],
          outputs: [{ name: "", type: "bytes" }]
        }
      ];
      erc1271Abi = [
        {
          name: "isValidSignature",
          type: "function",
          stateMutability: "view",
          inputs: [
            { name: "hash", type: "bytes32" },
            { name: "signature", type: "bytes" }
          ],
          outputs: [{ name: "", type: "bytes4" }]
        }
      ];
      erc6492SignatureValidatorAbi = [
        {
          inputs: [
            {
              name: "_signer",
              type: "address"
            },
            {
              name: "_hash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          stateMutability: "nonpayable",
          type: "constructor"
        },
        {
          inputs: [
            {
              name: "_signer",
              type: "address"
            },
            {
              name: "_hash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          outputs: [
            {
              type: "bool"
            }
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "isValidSig"
        }
      ];
    }
  });

  // node_modules/viem/_esm/constants/contract.js
  var aggregate3Signature;
  var init_contract2 = __esm({
    "node_modules/viem/_esm/constants/contract.js"() {
      aggregate3Signature = "0x82ad56cb";
    }
  });

  // node_modules/viem/_esm/constants/contracts.js
  var deploylessCallViaBytecodeBytecode, deploylessCallViaFactoryBytecode, erc6492SignatureValidatorByteCode, multicall3Bytecode;
  var init_contracts = __esm({
    "node_modules/viem/_esm/constants/contracts.js"() {
      deploylessCallViaBytecodeBytecode = "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe";
      deploylessCallViaFactoryBytecode = "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe";
      erc6492SignatureValidatorByteCode = "0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
      multicall3Bytecode = "0x608060405234801561001057600080fd5b506115b9806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e14610325578063bce38bd714610350578063c3077fa914610380578063ee82ac5e146103b2576100f3565b80634d2301cc1461026257806372425d9d1461029f57806382ad56cb146102ca57806386d516e8146102fa576100f3565b80633408e470116100c65780633408e470146101af578063399542e9146101da5780633e64a6961461020c57806342cbb15c14610237576100f3565b80630f28c97d146100f8578063174dea7114610123578063252dba421461015357806327e86d6e14610184575b600080fd5b34801561010457600080fd5b5061010d6103ef565b60405161011a9190610c0a565b60405180910390f35b61013d60048036038101906101389190610c94565b6103f7565b60405161014a9190610e94565b60405180910390f35b61016d60048036038101906101689190610f0c565b610615565b60405161017b92919061101b565b60405180910390f35b34801561019057600080fd5b506101996107ab565b6040516101a69190611064565b60405180910390f35b3480156101bb57600080fd5b506101c46107b7565b6040516101d19190610c0a565b60405180910390f35b6101f460048036038101906101ef91906110ab565b6107bf565b6040516102039392919061110b565b60405180910390f35b34801561021857600080fd5b506102216107e1565b60405161022e9190610c0a565b60405180910390f35b34801561024357600080fd5b5061024c6107e9565b6040516102599190610c0a565b60405180910390f35b34801561026e57600080fd5b50610289600480360381019061028491906111a7565b6107f1565b6040516102969190610c0a565b60405180910390f35b3480156102ab57600080fd5b506102b4610812565b6040516102c19190610c0a565b60405180910390f35b6102e460048036038101906102df919061122a565b61081a565b6040516102f19190610e94565b60405180910390f35b34801561030657600080fd5b5061030f6109e4565b60405161031c9190610c0a565b60405180910390f35b34801561033157600080fd5b5061033a6109ec565b6040516103479190611286565b60405180910390f35b61036a600480360381019061036591906110ab565b6109f4565b6040516103779190610e94565b60405180910390f35b61039a60048036038101906103959190610f0c565b610ba6565b6040516103a99392919061110b565b60405180910390f35b3480156103be57600080fd5b506103d960048036038101906103d491906112cd565b610bca565b6040516103e69190611064565b60405180910390f35b600042905090565b60606000808484905090508067ffffffffffffffff81111561041c5761041b6112fa565b5b60405190808252806020026020018201604052801561045557816020015b610442610bd5565b81526020019060019003908161043a5790505b5092503660005b828110156105c957600085828151811061047957610478611329565b5b6020026020010151905087878381811061049657610495611329565b5b90506020028101906104a89190611367565b925060008360400135905080860195508360000160208101906104cb91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16818580606001906104f2919061138f565b604051610500929190611431565b60006040518083038185875af1925050503d806000811461053d576040519150601f19603f3d011682016040523d82523d6000602084013e610542565b606091505b5083600001846020018290528215151515815250505081516020850135176105bc577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b826001019250505061045c565b5082341461060c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610603906114a7565b60405180910390fd5b50505092915050565b6000606043915060008484905090508067ffffffffffffffff81111561063e5761063d6112fa565b5b60405190808252806020026020018201604052801561067157816020015b606081526020019060019003908161065c5790505b5091503660005b828110156107a157600087878381811061069557610694611329565b5b90506020028101906106a791906114c7565b92508260000160208101906106bc91906111a7565b73ffffffffffffffffffffffffffffffffffffffff168380602001906106e2919061138f565b6040516106f0929190611431565b6000604051808303816000865af19150503d806000811461072d576040519150601f19603f3d011682016040523d82523d6000602084013e610732565b606091505b5086848151811061074657610745611329565b5b60200260200101819052819250505080610795576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078c9061153b565b60405180910390fd5b81600101915050610678565b5050509250929050565b60006001430340905090565b600046905090565b6000806060439250434091506107d68686866109f4565b905093509350939050565b600048905090565b600043905090565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b600044905090565b606060008383905090508067ffffffffffffffff81111561083e5761083d6112fa565b5b60405190808252806020026020018201604052801561087757816020015b610864610bd5565b81526020019060019003908161085c5790505b5091503660005b828110156109db57600084828151811061089b5761089a611329565b5b602002602001015190508686838181106108b8576108b7611329565b5b90506020028101906108ca919061155b565b92508260000160208101906108df91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060400190610905919061138f565b604051610913929190611431565b6000604051808303816000865af19150503d8060008114610950576040519150601f19603f3d011682016040523d82523d6000602084013e610955565b606091505b5082600001836020018290528215151515815250505080516020840135176109cf577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b8160010191505061087e565b50505092915050565b600045905090565b600041905090565b606060008383905090508067ffffffffffffffff811115610a1857610a176112fa565b5b604051908082528060200260200182016040528015610a5157816020015b610a3e610bd5565b815260200190600190039081610a365790505b5091503660005b82811015610b9c576000848281518110610a7557610a74611329565b5b60200260200101519050868683818110610a9257610a91611329565b5b9050602002810190610aa491906114c7565b9250826000016020810190610ab991906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060200190610adf919061138f565b604051610aed929190611431565b6000604051808303816000865af19150503d8060008114610b2a576040519150601f19603f3d011682016040523d82523d6000602084013e610b2f565b606091505b508260000183602001829052821515151581525050508715610b90578060000151610b8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b869061153b565b60405180910390fd5b5b81600101915050610a58565b5050509392505050565b6000806060610bb7600186866107bf565b8093508194508295505050509250925092565b600081409050919050565b6040518060400160405280600015158152602001606081525090565b6000819050919050565b610c0481610bf1565b82525050565b6000602082019050610c1f6000830184610bfb565b92915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f840112610c5457610c53610c2f565b5b8235905067ffffffffffffffff811115610c7157610c70610c34565b5b602083019150836020820283011115610c8d57610c8c610c39565b5b9250929050565b60008060208385031215610cab57610caa610c25565b5b600083013567ffffffffffffffff811115610cc957610cc8610c2a565b5b610cd585828601610c3e565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b610d2281610d0d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d62578082015181840152602081019050610d47565b83811115610d71576000848401525b50505050565b6000601f19601f8301169050919050565b6000610d9382610d28565b610d9d8185610d33565b9350610dad818560208601610d44565b610db681610d77565b840191505092915050565b6000604083016000830151610dd96000860182610d19565b5060208301518482036020860152610df18282610d88565b9150508091505092915050565b6000610e0a8383610dc1565b905092915050565b6000602082019050919050565b6000610e2a82610ce1565b610e348185610cec565b935083602082028501610e4685610cfd565b8060005b85811015610e825784840389528151610e638582610dfe565b9450610e6e83610e12565b925060208a01995050600181019050610e4a565b50829750879550505050505092915050565b60006020820190508181036000830152610eae8184610e1f565b905092915050565b60008083601f840112610ecc57610ecb610c2f565b5b8235905067ffffffffffffffff811115610ee957610ee8610c34565b5b602083019150836020820283011115610f0557610f04610c39565b5b9250929050565b60008060208385031215610f2357610f22610c25565b5b600083013567ffffffffffffffff811115610f4157610f40610c2a565b5b610f4d85828601610eb6565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610f918383610d88565b905092915050565b6000602082019050919050565b6000610fb182610f59565b610fbb8185610f64565b935083602082028501610fcd85610f75565b8060005b858110156110095784840389528151610fea8582610f85565b9450610ff583610f99565b925060208a01995050600181019050610fd1565b50829750879550505050505092915050565b60006040820190506110306000830185610bfb565b81810360208301526110428184610fa6565b90509392505050565b6000819050919050565b61105e8161104b565b82525050565b60006020820190506110796000830184611055565b92915050565b61108881610d0d565b811461109357600080fd5b50565b6000813590506110a58161107f565b92915050565b6000806000604084860312156110c4576110c3610c25565b5b60006110d286828701611096565b935050602084013567ffffffffffffffff8111156110f3576110f2610c2a565b5b6110ff86828701610eb6565b92509250509250925092565b60006060820190506111206000830186610bfb565b61112d6020830185611055565b818103604083015261113f8184610e1f565b9050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061117482611149565b9050919050565b61118481611169565b811461118f57600080fd5b50565b6000813590506111a18161117b565b92915050565b6000602082840312156111bd576111bc610c25565b5b60006111cb84828501611192565b91505092915050565b60008083601f8401126111ea576111e9610c2f565b5b8235905067ffffffffffffffff81111561120757611206610c34565b5b60208301915083602082028301111561122357611222610c39565b5b9250929050565b6000806020838503121561124157611240610c25565b5b600083013567ffffffffffffffff81111561125f5761125e610c2a565b5b61126b858286016111d4565b92509250509250929050565b61128081611169565b82525050565b600060208201905061129b6000830184611277565b92915050565b6112aa81610bf1565b81146112b557600080fd5b50565b6000813590506112c7816112a1565b92915050565b6000602082840312156112e3576112e2610c25565b5b60006112f1848285016112b8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b60008235600160800383360303811261138357611382611358565b5b80830191505092915050565b600080833560016020038436030381126113ac576113ab611358565b5b80840192508235915067ffffffffffffffff8211156113ce576113cd61135d565b5b6020830192506001820236038313156113ea576113e9611362565b5b509250929050565b600081905092915050565b82818337600083830152505050565b600061141883856113f2565b93506114258385846113fd565b82840190509392505050565b600061143e82848661140c565b91508190509392505050565b600082825260208201905092915050565b7f4d756c746963616c6c333a2076616c7565206d69736d61746368000000000000600082015250565b6000611491601a8361144a565b915061149c8261145b565b602082019050919050565b600060208201905081810360008301526114c081611484565b9050919050565b6000823560016040038336030381126114e3576114e2611358565b5b80830191505092915050565b7f4d756c746963616c6c333a2063616c6c206661696c6564000000000000000000600082015250565b600061152560178361144a565b9150611530826114ef565b602082019050919050565b6000602082019050818103600083015261155481611518565b9050919050565b60008235600160600383360303811261157757611576611358565b5b8083019150509291505056fea264697066735822122020c1bc9aacf8e4a6507193432a895a8e77094f45a1395583f07b24e860ef06cd64736f6c634300080c0033";
    }
  });

  // node_modules/viem/_esm/errors/chain.js
  var ChainDoesNotSupportContract, ClientChainNotConfiguredError;
  var init_chain = __esm({
    "node_modules/viem/_esm/errors/chain.js"() {
      init_base();
      ChainDoesNotSupportContract = class extends BaseError2 {
        constructor({ blockNumber, chain: chain2, contract }) {
          super(`Chain "${chain2.name}" does not support contract "${contract.name}".`, {
            metaMessages: [
              "This could be due to any of the following:",
              ...blockNumber && contract.blockCreated && contract.blockCreated > blockNumber ? [
                `- The contract "${contract.name}" was not deployed until block ${contract.blockCreated} (current block ${blockNumber}).`
              ] : [
                `- The chain does not have the contract "${contract.name}" configured.`
              ]
            ],
            name: "ChainDoesNotSupportContract"
          });
        }
      };
      ClientChainNotConfiguredError = class extends BaseError2 {
        constructor() {
          super("No chain was provided to the Client.", {
            name: "ClientChainNotConfiguredError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/abi/encodeDeployData.js
  function encodeDeployData(parameters) {
    const { abi: abi2, args, bytecode } = parameters;
    if (!args || args.length === 0)
      return bytecode;
    const description = abi2.find((x) => "type" in x && x.type === "constructor");
    if (!description)
      throw new AbiConstructorNotFoundError({ docsPath: docsPath5 });
    if (!("inputs" in description))
      throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath5 });
    if (!description.inputs || description.inputs.length === 0)
      throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath5 });
    const data = encodeAbiParameters(description.inputs, args);
    return concatHex([bytecode, data]);
  }
  var docsPath5;
  var init_encodeDeployData = __esm({
    "node_modules/viem/_esm/utils/abi/encodeDeployData.js"() {
      init_abi();
      init_concat();
      init_encodeAbiParameters();
      docsPath5 = "/docs/contract/encodeDeployData";
    }
  });

  // node_modules/viem/_esm/utils/chain/getChainContractAddress.js
  function getChainContractAddress({ blockNumber, chain: chain2, contract: name }) {
    const contract = chain2?.contracts?.[name];
    if (!contract)
      throw new ChainDoesNotSupportContract({
        chain: chain2,
        contract: { name }
      });
    if (blockNumber && contract.blockCreated && contract.blockCreated > blockNumber)
      throw new ChainDoesNotSupportContract({
        blockNumber,
        chain: chain2,
        contract: {
          name,
          blockCreated: contract.blockCreated
        }
      });
    return contract.address;
  }
  var init_getChainContractAddress = __esm({
    "node_modules/viem/_esm/utils/chain/getChainContractAddress.js"() {
      init_chain();
    }
  });

  // node_modules/viem/_esm/utils/errors/getCallError.js
  function getCallError(err, { docsPath: docsPath8, ...args }) {
    const cause = (() => {
      const cause2 = getNodeError(err, args);
      if (cause2 instanceof UnknownNodeError)
        return err;
      return cause2;
    })();
    return new CallExecutionError(cause, {
      docsPath: docsPath8,
      ...args
    });
  }
  var init_getCallError = __esm({
    "node_modules/viem/_esm/utils/errors/getCallError.js"() {
      init_contract();
      init_node();
      init_getNodeError();
    }
  });

  // node_modules/viem/_esm/utils/promise/withResolvers.js
  function withResolvers() {
    let resolve = () => void 0;
    let reject = () => void 0;
    const promise = new Promise((resolve_, reject_) => {
      resolve = resolve_;
      reject = reject_;
    });
    return { promise, resolve, reject };
  }
  var init_withResolvers = __esm({
    "node_modules/viem/_esm/utils/promise/withResolvers.js"() {
    }
  });

  // node_modules/viem/_esm/utils/promise/createBatchScheduler.js
  function createBatchScheduler({ fn, id, shouldSplitBatch, wait: wait2 = 0, sort }) {
    const exec = async () => {
      const scheduler = getScheduler();
      flush();
      const args = scheduler.map(({ args: args2 }) => args2);
      if (args.length === 0)
        return;
      fn(args).then((data) => {
        if (sort && Array.isArray(data))
          data.sort(sort);
        for (let i20 = 0; i20 < scheduler.length; i20++) {
          const { resolve } = scheduler[i20];
          resolve?.([data[i20], data]);
        }
      }).catch((err) => {
        for (let i20 = 0; i20 < scheduler.length; i20++) {
          const { reject } = scheduler[i20];
          reject?.(err);
        }
      });
    };
    const flush = () => schedulerCache.delete(id);
    const getBatchedArgs = () => getScheduler().map(({ args }) => args);
    const getScheduler = () => schedulerCache.get(id) || [];
    const setScheduler = (item) => schedulerCache.set(id, [...getScheduler(), item]);
    return {
      flush,
      async schedule(args) {
        const { promise, resolve, reject } = withResolvers();
        const split2 = shouldSplitBatch?.([...getBatchedArgs(), args]);
        if (split2)
          exec();
        const hasActiveScheduler = getScheduler().length > 0;
        if (hasActiveScheduler) {
          setScheduler({ args, resolve, reject });
          return promise;
        }
        setScheduler({ args, resolve, reject });
        setTimeout(exec, wait2);
        return promise;
      }
    };
  }
  var schedulerCache;
  var init_createBatchScheduler = __esm({
    "node_modules/viem/_esm/utils/promise/createBatchScheduler.js"() {
      init_withResolvers();
      schedulerCache = /* @__PURE__ */ new Map();
    }
  });

  // node_modules/viem/_esm/errors/ccip.js
  var OffchainLookupError, OffchainLookupResponseMalformedError, OffchainLookupSenderMismatchError;
  var init_ccip = __esm({
    "node_modules/viem/_esm/errors/ccip.js"() {
      init_stringify();
      init_base();
      init_utils3();
      OffchainLookupError = class extends BaseError2 {
        constructor({ callbackSelector, cause, data, extraData, sender, urls }) {
          super(cause.shortMessage || "An error occurred while fetching for an offchain result.", {
            cause,
            metaMessages: [
              ...cause.metaMessages || [],
              cause.metaMessages?.length ? "" : [],
              "Offchain Gateway Call:",
              urls && [
                "  Gateway URL(s):",
                ...urls.map((url) => `    ${getUrl(url)}`)
              ],
              `  Sender: ${sender}`,
              `  Data: ${data}`,
              `  Callback selector: ${callbackSelector}`,
              `  Extra data: ${extraData}`
            ].flat(),
            name: "OffchainLookupError"
          });
        }
      };
      OffchainLookupResponseMalformedError = class extends BaseError2 {
        constructor({ result, url }) {
          super("Offchain gateway response is malformed. Response data must be a hex value.", {
            metaMessages: [
              `Gateway URL: ${getUrl(url)}`,
              `Response: ${stringify(result)}`
            ],
            name: "OffchainLookupResponseMalformedError"
          });
        }
      };
      OffchainLookupSenderMismatchError = class extends BaseError2 {
        constructor({ sender, to }) {
          super("Reverted sender address does not match target contract address (`to`).", {
            metaMessages: [
              `Contract address: ${to}`,
              `OffchainLookup sender address: ${sender}`
            ],
            name: "OffchainLookupSenderMismatchError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/abi/decodeFunctionData.js
  function decodeFunctionData(parameters) {
    const { abi: abi2, data } = parameters;
    const signature = slice(data, 0, 4);
    const description = abi2.find((x) => x.type === "function" && signature === toFunctionSelector(formatAbiItem2(x)));
    if (!description)
      throw new AbiFunctionSignatureNotFoundError(signature, {
        docsPath: "/docs/contract/decodeFunctionData"
      });
    return {
      functionName: description.name,
      args: "inputs" in description && description.inputs && description.inputs.length > 0 ? decodeAbiParameters(description.inputs, slice(data, 4)) : void 0
    };
  }
  var init_decodeFunctionData = __esm({
    "node_modules/viem/_esm/utils/abi/decodeFunctionData.js"() {
      init_abi();
      init_slice();
      init_toFunctionSelector();
      init_decodeAbiParameters();
      init_formatAbiItem2();
    }
  });

  // node_modules/viem/_esm/utils/abi/encodeErrorResult.js
  function encodeErrorResult(parameters) {
    const { abi: abi2, errorName, args } = parameters;
    let abiItem = abi2[0];
    if (errorName) {
      const item = getAbiItem({ abi: abi2, args, name: errorName });
      if (!item)
        throw new AbiErrorNotFoundError(errorName, { docsPath: docsPath6 });
      abiItem = item;
    }
    if (abiItem.type !== "error")
      throw new AbiErrorNotFoundError(void 0, { docsPath: docsPath6 });
    const definition = formatAbiItem2(abiItem);
    const signature = toFunctionSelector(definition);
    let data = "0x";
    if (args && args.length > 0) {
      if (!abiItem.inputs)
        throw new AbiErrorInputsNotFoundError(abiItem.name, { docsPath: docsPath6 });
      data = encodeAbiParameters(abiItem.inputs, args);
    }
    return concatHex([signature, data]);
  }
  var docsPath6;
  var init_encodeErrorResult = __esm({
    "node_modules/viem/_esm/utils/abi/encodeErrorResult.js"() {
      init_abi();
      init_concat();
      init_toFunctionSelector();
      init_encodeAbiParameters();
      init_formatAbiItem2();
      init_getAbiItem();
      docsPath6 = "/docs/contract/encodeErrorResult";
    }
  });

  // node_modules/viem/_esm/utils/abi/encodeFunctionResult.js
  function encodeFunctionResult(parameters) {
    const { abi: abi2, functionName, result } = parameters;
    let abiItem = abi2[0];
    if (functionName) {
      const item = getAbiItem({ abi: abi2, name: functionName });
      if (!item)
        throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath7 });
      abiItem = item;
    }
    if (abiItem.type !== "function")
      throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath7 });
    if (!abiItem.outputs)
      throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath7 });
    const values = (() => {
      if (abiItem.outputs.length === 0)
        return [];
      if (abiItem.outputs.length === 1)
        return [result];
      if (Array.isArray(result))
        return result;
      throw new InvalidArrayError(result);
    })();
    return encodeAbiParameters(abiItem.outputs, values);
  }
  var docsPath7;
  var init_encodeFunctionResult = __esm({
    "node_modules/viem/_esm/utils/abi/encodeFunctionResult.js"() {
      init_abi();
      init_encodeAbiParameters();
      init_getAbiItem();
      docsPath7 = "/docs/contract/encodeFunctionResult";
    }
  });

  // node_modules/viem/_esm/utils/ens/localBatchGatewayRequest.js
  async function localBatchGatewayRequest(parameters) {
    const { data, ccipRequest: ccipRequest2 } = parameters;
    const { args: [queries] } = decodeFunctionData({ abi: batchGatewayAbi, data });
    const failures = [];
    const responses = [];
    await Promise.all(queries.map(async (query, i20) => {
      try {
        responses[i20] = query.urls.includes(localBatchGatewayUrl) ? await localBatchGatewayRequest({ data: query.data, ccipRequest: ccipRequest2 }) : await ccipRequest2(query);
        failures[i20] = false;
      } catch (err) {
        failures[i20] = true;
        responses[i20] = encodeError(err);
      }
    }));
    return encodeFunctionResult({
      abi: batchGatewayAbi,
      functionName: "query",
      result: [failures, responses]
    });
  }
  function encodeError(error) {
    if (error.name === "HttpRequestError" && error.status)
      return encodeErrorResult({
        abi: batchGatewayAbi,
        errorName: "HttpError",
        args: [error.status, error.shortMessage]
      });
    return encodeErrorResult({
      abi: [solidityError],
      errorName: "Error",
      args: ["shortMessage" in error ? error.shortMessage : error.message]
    });
  }
  var localBatchGatewayUrl;
  var init_localBatchGatewayRequest = __esm({
    "node_modules/viem/_esm/utils/ens/localBatchGatewayRequest.js"() {
      init_abis();
      init_solidity();
      init_decodeFunctionData();
      init_encodeErrorResult();
      init_encodeFunctionResult();
      localBatchGatewayUrl = "x-batch-gateway:true";
    }
  });

  // node_modules/viem/_esm/utils/ccip.js
  var ccip_exports = {};
  __export(ccip_exports, {
    ccipRequest: () => ccipRequest,
    offchainLookup: () => offchainLookup,
    offchainLookupAbiItem: () => offchainLookupAbiItem,
    offchainLookupSignature: () => offchainLookupSignature
  });
  async function offchainLookup(client, { blockNumber, blockTag, data, to }) {
    const { args } = decodeErrorResult({
      data,
      abi: [offchainLookupAbiItem]
    });
    const [sender, urls, callData, callbackSelector, extraData] = args;
    const { ccipRead } = client;
    const ccipRequest_ = ccipRead && typeof ccipRead?.request === "function" ? ccipRead.request : ccipRequest;
    try {
      if (!isAddressEqual(to, sender))
        throw new OffchainLookupSenderMismatchError({ sender, to });
      const result = urls.includes(localBatchGatewayUrl) ? await localBatchGatewayRequest({
        data: callData,
        ccipRequest: ccipRequest_
      }) : await ccipRequest_({ data: callData, sender, urls });
      const { data: data_ } = await call(client, {
        blockNumber,
        blockTag,
        data: concat([
          callbackSelector,
          encodeAbiParameters([{ type: "bytes" }, { type: "bytes" }], [result, extraData])
        ]),
        to
      });
      return data_;
    } catch (err) {
      throw new OffchainLookupError({
        callbackSelector,
        cause: err,
        data,
        extraData,
        sender,
        urls
      });
    }
  }
  async function ccipRequest({ data, sender, urls }) {
    let error = new Error("An unknown error occurred.");
    for (let i20 = 0; i20 < urls.length; i20++) {
      const url = urls[i20];
      const method = url.includes("{data}") ? "GET" : "POST";
      const body = method === "POST" ? { data, sender } : void 0;
      const headers = method === "POST" ? { "Content-Type": "application/json" } : {};
      try {
        const response = await fetch(url.replace("{sender}", sender.toLowerCase()).replace("{data}", data), {
          body: JSON.stringify(body),
          headers,
          method
        });
        let result;
        if (response.headers.get("Content-Type")?.startsWith("application/json")) {
          result = (await response.json()).data;
        } else {
          result = await response.text();
        }
        if (!response.ok) {
          error = new HttpRequestError({
            body,
            details: result?.error ? stringify(result.error) : response.statusText,
            headers: response.headers,
            status: response.status,
            url
          });
          continue;
        }
        if (!isHex(result)) {
          error = new OffchainLookupResponseMalformedError({
            result,
            url
          });
          continue;
        }
        return result;
      } catch (err) {
        error = new HttpRequestError({
          body,
          details: err.message,
          url
        });
      }
    }
    throw error;
  }
  var offchainLookupSignature, offchainLookupAbiItem;
  var init_ccip2 = __esm({
    "node_modules/viem/_esm/utils/ccip.js"() {
      init_call();
      init_ccip();
      init_request();
      init_decodeErrorResult();
      init_encodeAbiParameters();
      init_isAddressEqual();
      init_concat();
      init_isHex();
      init_localBatchGatewayRequest();
      init_stringify();
      offchainLookupSignature = "0x556f1830";
      offchainLookupAbiItem = {
        name: "OffchainLookup",
        type: "error",
        inputs: [
          {
            name: "sender",
            type: "address"
          },
          {
            name: "urls",
            type: "string[]"
          },
          {
            name: "callData",
            type: "bytes"
          },
          {
            name: "callbackFunction",
            type: "bytes4"
          },
          {
            name: "extraData",
            type: "bytes"
          }
        ]
      };
    }
  });

  // node_modules/viem/_esm/actions/public/call.js
  async function call(client, args) {
    const { account: account_ = client.account, authorizationList, batch = Boolean(client.batch?.multicall), blockNumber, blockTag = client.experimental_blockTag ?? "latest", accessList, blobs, blockOverrides, code, data: data_, factory, factoryData, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride, ...rest } = args;
    const account = account_ ? parseAccount(account_) : void 0;
    if (code && (factory || factoryData))
      throw new BaseError2("Cannot provide both `code` & `factory`/`factoryData` as parameters.");
    if (code && to)
      throw new BaseError2("Cannot provide both `code` & `to` as parameters.");
    const deploylessCallViaBytecode = code && data_;
    const deploylessCallViaFactory = factory && factoryData && to && data_;
    const deploylessCall = deploylessCallViaBytecode || deploylessCallViaFactory;
    const data = (() => {
      if (deploylessCallViaBytecode)
        return toDeploylessCallViaBytecodeData({
          code,
          data: data_
        });
      if (deploylessCallViaFactory)
        return toDeploylessCallViaFactoryData({
          data: data_,
          factory,
          factoryData,
          to
        });
      return data_;
    })();
    try {
      assertRequest(args);
      const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
      const block = blockNumberHex || blockTag;
      const rpcBlockOverrides = blockOverrides ? toRpc2(blockOverrides) : void 0;
      const rpcStateOverride = serializeStateOverride(stateOverride);
      const chainFormat = client.chain?.formatters?.transactionRequest?.format;
      const format = chainFormat || formatTransactionRequest;
      const request = format({
        // Pick out extra data that might exist on the chain's transaction request type.
        ...extract(rest, { format: chainFormat }),
        accessList,
        account,
        authorizationList,
        blobs,
        data,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to: deploylessCall ? void 0 : to,
        value
      }, "call");
      if (batch && shouldPerformMulticall({ request }) && !rpcStateOverride && !rpcBlockOverrides) {
        try {
          return await scheduleMulticall(client, {
            ...request,
            blockNumber,
            blockTag
          });
        } catch (err) {
          if (!(err instanceof ClientChainNotConfiguredError) && !(err instanceof ChainDoesNotSupportContract))
            throw err;
        }
      }
      const params = (() => {
        const base = [
          request,
          block
        ];
        if (rpcStateOverride && rpcBlockOverrides)
          return [...base, rpcStateOverride, rpcBlockOverrides];
        if (rpcStateOverride)
          return [...base, rpcStateOverride];
        if (rpcBlockOverrides)
          return [...base, {}, rpcBlockOverrides];
        return base;
      })();
      const response = await client.request({
        method: "eth_call",
        params
      });
      if (response === "0x")
        return { data: void 0 };
      return { data: response };
    } catch (err) {
      const data2 = getRevertErrorData(err);
      const { offchainLookup: offchainLookup2, offchainLookupSignature: offchainLookupSignature2 } = await Promise.resolve().then(() => (init_ccip2(), ccip_exports));
      if (client.ccipRead !== false && data2?.slice(0, 10) === offchainLookupSignature2 && to)
        return { data: await offchainLookup2(client, { data: data2, to }) };
      if (deploylessCall && data2?.slice(0, 10) === "0x101bb98d")
        throw new CounterfactualDeploymentFailedError({ factory });
      throw getCallError(err, {
        ...args,
        account,
        chain: client.chain
      });
    }
  }
  function shouldPerformMulticall({ request }) {
    const { data, to, ...request_ } = request;
    if (!data)
      return false;
    if (data.startsWith(aggregate3Signature))
      return false;
    if (!to)
      return false;
    if (Object.values(request_).filter((x) => typeof x !== "undefined").length > 0)
      return false;
    return true;
  }
  async function scheduleMulticall(client, args) {
    const { batchSize = 1024, deployless = false, wait: wait2 = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
    const { blockNumber, blockTag = client.experimental_blockTag ?? "latest", data, to } = args;
    const multicallAddress = (() => {
      if (deployless)
        return null;
      if (args.multicallAddress)
        return args.multicallAddress;
      if (client.chain) {
        return getChainContractAddress({
          blockNumber,
          chain: client.chain,
          contract: "multicall3"
        });
      }
      throw new ClientChainNotConfiguredError();
    })();
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const { schedule } = createBatchScheduler({
      id: `${client.uid}.${block}`,
      wait: wait2,
      shouldSplitBatch(args2) {
        const size5 = args2.reduce((size6, { data: data2 }) => size6 + (data2.length - 2), 0);
        return size5 > batchSize * 2;
      },
      fn: async (requests) => {
        const calls = requests.map((request) => ({
          allowFailure: true,
          callData: request.data,
          target: request.to
        }));
        const calldata = encodeFunctionData({
          abi: multicall3Abi,
          args: [calls],
          functionName: "aggregate3"
        });
        const data2 = await client.request({
          method: "eth_call",
          params: [
            {
              ...multicallAddress === null ? {
                data: toDeploylessCallViaBytecodeData({
                  code: multicall3Bytecode,
                  data: calldata
                })
              } : { to: multicallAddress, data: calldata }
            },
            block
          ]
        });
        return decodeFunctionResult({
          abi: multicall3Abi,
          args: [calls],
          functionName: "aggregate3",
          data: data2 || "0x"
        });
      }
    });
    const [{ returnData, success }] = await schedule({ data, to });
    if (!success)
      throw new RawContractError({ data: returnData });
    if (returnData === "0x")
      return { data: void 0 };
    return { data: returnData };
  }
  function toDeploylessCallViaBytecodeData(parameters) {
    const { code, data } = parameters;
    return encodeDeployData({
      abi: parseAbi(["constructor(bytes, bytes)"]),
      bytecode: deploylessCallViaBytecodeBytecode,
      args: [code, data]
    });
  }
  function toDeploylessCallViaFactoryData(parameters) {
    const { data, factory, factoryData, to } = parameters;
    return encodeDeployData({
      abi: parseAbi(["constructor(address, bytes, address, bytes)"]),
      bytecode: deploylessCallViaFactoryBytecode,
      args: [to, data, factory, factoryData]
    });
  }
  function getRevertErrorData(err) {
    if (!(err instanceof BaseError2))
      return void 0;
    const error = err.walk();
    return typeof error?.data === "object" ? error.data?.data : error.data;
  }
  var init_call = __esm({
    "node_modules/viem/_esm/actions/public/call.js"() {
      init_exports();
      init_BlockOverrides();
      init_parseAccount();
      init_abis();
      init_contract2();
      init_contracts();
      init_base();
      init_chain();
      init_contract();
      init_decodeFunctionResult();
      init_encodeDeployData();
      init_encodeFunctionData();
      init_getChainContractAddress();
      init_toHex();
      init_getCallError();
      init_extract();
      init_transactionRequest();
      init_createBatchScheduler();
      init_stateOverride2();
      init_assertRequest();
    }
  });

  // node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__) prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
        else emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0) emitter._events = new Events();
        else delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0) return names;
        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        for (var i20 = 0, l7 = handlers.length, ee = new Array(l7); i20 < l7; i20++) {
          ee[i20] = handlers[i20].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a22, a32, a42, a52) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return false;
        var listeners = this._events[evt], len = arguments.length, args, i20;
        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a22), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a22, a32), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a22, a32, a42), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a22, a32, a42, a52), true;
          }
          for (i20 = 1, args = new Array(len - 1); i20 < len; i20++) {
            args[i20 - 1] = arguments[i20];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i20 = 0; i20 < length; i20++) {
            if (listeners[i20].once) this.removeListener(event, listeners[i20].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i20].fn.call(listeners[i20].context);
                break;
              case 2:
                listeners[i20].fn.call(listeners[i20].context, a1);
                break;
              case 3:
                listeners[i20].fn.call(listeners[i20].context, a1, a22);
                break;
              case 4:
                listeners[i20].fn.call(listeners[i20].context, a1, a22, a32);
                break;
              default:
                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
                listeners[i20].fn.apply(listeners[i20].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i20 = 0, events = [], length = listeners.length; i20 < length; i20++) {
            if (listeners[i20].fn !== fn || once && !listeners[i20].once || context && listeners[i20].context !== context) {
              events.push(listeners[i20]);
            }
          }
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
          else clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // node_modules/canonicalize/lib/canonicalize.js
  var require_canonicalize = __commonJS({
    "node_modules/canonicalize/lib/canonicalize.js"(exports, module) {
      "use strict";
      module.exports = function serialize(object) {
        if (typeof object === "number" && isNaN(object)) {
          throw new Error("NaN is not allowed");
        }
        if (typeof object === "number" && !isFinite(object)) {
          throw new Error("Infinity is not allowed");
        }
        if (object === null || typeof object !== "object") {
          return JSON.stringify(object);
        }
        if (object.toJSON instanceof Function) {
          return serialize(object.toJSON());
        }
        if (Array.isArray(object)) {
          const values2 = object.reduce((t45, cv, ci) => {
            const comma = ci === 0 ? "" : ",";
            const value = cv === void 0 || typeof cv === "symbol" ? null : cv;
            return `${t45}${comma}${serialize(value)}`;
          }, "");
          return `[${values2}]`;
        }
        const values = Object.keys(object).sort().reduce((t45, cv) => {
          if (object[cv] === void 0 || typeof object[cv] === "symbol") {
            return t45;
          }
          const comma = t45.length === 0 ? "" : ",";
          return `${t45}${comma}${serialize(cv)}:${serialize(object[cv])}`;
        }, "");
        return `{${values}}`;
      };
    }
  });

  // node_modules/fetch-retry/dist/fetch-retry.umd.js
  var require_fetch_retry_umd = __commonJS({
    "node_modules/fetch-retry/dist/fetch-retry.umd.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.fetchRetry = factory());
      })(exports, (function() {
        "use strict";
        var fetchRetry = function(fetch2, defaults) {
          defaults = defaults || {};
          if (typeof fetch2 !== "function") {
            throw new ArgumentError("fetch must be a function");
          }
          if (typeof defaults !== "object") {
            throw new ArgumentError("defaults must be an object");
          }
          if (defaults.retries !== void 0 && !isPositiveInteger(defaults.retries)) {
            throw new ArgumentError("retries must be a positive integer");
          }
          if (defaults.retryDelay !== void 0 && !isPositiveInteger(defaults.retryDelay) && typeof defaults.retryDelay !== "function") {
            throw new ArgumentError("retryDelay must be a positive integer or a function returning a positive integer");
          }
          if (defaults.retryOn !== void 0 && !Array.isArray(defaults.retryOn) && typeof defaults.retryOn !== "function") {
            throw new ArgumentError("retryOn property expects an array or function");
          }
          var baseDefaults = {
            retries: 3,
            retryDelay: 1e3,
            retryOn: []
          };
          defaults = Object.assign(baseDefaults, defaults);
          return function fetchRetry2(input, init2) {
            var retries = defaults.retries;
            var retryDelay = defaults.retryDelay;
            var retryOn = defaults.retryOn;
            if (init2 && init2.retries !== void 0) {
              if (isPositiveInteger(init2.retries)) {
                retries = init2.retries;
              } else {
                throw new ArgumentError("retries must be a positive integer");
              }
            }
            if (init2 && init2.retryDelay !== void 0) {
              if (isPositiveInteger(init2.retryDelay) || typeof init2.retryDelay === "function") {
                retryDelay = init2.retryDelay;
              } else {
                throw new ArgumentError("retryDelay must be a positive integer or a function returning a positive integer");
              }
            }
            if (init2 && init2.retryOn) {
              if (Array.isArray(init2.retryOn) || typeof init2.retryOn === "function") {
                retryOn = init2.retryOn;
              } else {
                throw new ArgumentError("retryOn property expects an array or function");
              }
            }
            return new Promise(function(resolve, reject) {
              var wrappedFetch = function(attempt) {
                var _input = typeof Request !== "undefined" && input instanceof Request ? input.clone() : input;
                fetch2(_input, init2).then(function(response) {
                  if (Array.isArray(retryOn) && retryOn.indexOf(response.status) === -1) {
                    resolve(response);
                  } else if (typeof retryOn === "function") {
                    try {
                      return Promise.resolve(retryOn(attempt, null, response)).then(function(retryOnResponse) {
                        if (retryOnResponse) {
                          retry(attempt, null, response);
                        } else {
                          resolve(response);
                        }
                      }).catch(reject);
                    } catch (error) {
                      reject(error);
                    }
                  } else {
                    if (attempt < retries) {
                      retry(attempt, null, response);
                    } else {
                      resolve(response);
                    }
                  }
                }).catch(function(error) {
                  if (typeof retryOn === "function") {
                    try {
                      Promise.resolve(retryOn(attempt, error, null)).then(function(retryOnResponse) {
                        if (retryOnResponse) {
                          retry(attempt, error, null);
                        } else {
                          reject(error);
                        }
                      }).catch(function(error2) {
                        reject(error2);
                      });
                    } catch (error2) {
                      reject(error2);
                    }
                  } else if (attempt < retries) {
                    retry(attempt, error, null);
                  } else {
                    reject(error);
                  }
                });
              };
              function retry(attempt, error, response) {
                var delay = typeof retryDelay === "function" ? retryDelay(attempt, error, response) : retryDelay;
                setTimeout(function() {
                  wrappedFetch(++attempt);
                }, delay);
              }
              wrappedFetch(0);
            });
          };
        };
        function isPositiveInteger(value) {
          return Number.isInteger(value) && value >= 0;
        }
        function ArgumentError(message) {
          this.name = "ArgumentError";
          this.message = message;
        }
        return fetchRetry;
      }));
    }
  });

  // privy-wrapper.js
  var privy_wrapper_exports = {};
  __export(privy_wrapper_exports, {
    LocalStorage: () => e41,
    Privy: () => d6,
    getEntropyDetailsFromUser: () => t43,
    getUserEmbeddedEthereumWallet: () => l4
  });

  // node_modules/@privy-io/routes/dist/esm/analytics-events.mjs
  var t = { path: "/api/v1/analytics_events", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/apps.mjs
  var p = { path: "/api/v1/apps/:app_id", method: "GET" };

  // node_modules/@privy-io/routes/dist/esm/coinbase.mjs
  var n = { path: "/api/v1/funding/coinbase_on_ramp/init", method: "POST" };
  var a = { path: "/api/v1/funding/coinbase_on_ramp/status", method: "GET" };

  // node_modules/@privy-io/routes/dist/esm/cross-app.mjs
  var p2 = { path: "/api/v1/apps/:app_id/cross-app/connections", method: "GET" };

  // node_modules/@privy-io/routes/dist/esm/custom-jwt-account.mjs
  var t2 = { path: "/api/v1/custom_jwt_account/authenticate", method: "POST" };
  var a2 = { path: "/api/v1/custom_jwt_account/link", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/farcaster.mjs
  var a3 = { path: "/api/v1/farcaster/init", method: "POST" };
  var t3 = { path: "/api/v1/farcaster/authenticate", method: "POST" };
  var e = { path: "/api/v1/farcaster/link", method: "POST" };
  var h = { path: "/api/v1/farcaster/unlink", method: "POST" };
  var i = { path: "/api/v1/farcaster/status", method: "GET" };
  var p3 = { path: "/api/v2/farcaster/init", method: "POST" };
  var r = { path: "/api/v2/farcaster/authenticate", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/guest.mjs
  var t4 = { path: "/api/v1/guest/authenticate", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/mfa-passkey.mjs
  var a4 = { path: "/api/v1/mfa/passkeys/init", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/mfa-passwordless-sms.mjs
  var p4 = { path: "/api/v1/mfa/passwordless_sms/init", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/oauth.mjs
  var t5 = { path: "/api/v1/oauth/authenticate", method: "POST" };
  var a5 = { path: "/api/v1/oauth/init", method: "POST" };
  var h2 = { path: "/api/v1/oauth/link", method: "POST" };
  var o = { path: "/api/v1/oauth/unlink", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/passkey.mjs
  var t6 = { path: "/api/v1/passkeys/link", method: "POST" };
  var a6 = { path: "/api/v1/passkeys/authenticate", method: "POST" };
  var s = { path: "/api/v1/passkeys/register", method: "POST" };
  var e2 = { path: "/api/v1/passkeys/authenticate/init", method: "POST" };
  var p5 = { path: "/api/v1/passkeys/register/init", method: "POST" };
  var i2 = { path: "/api/v1/passkeys/link/init", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/passwordless.mjs
  var s2 = { path: "/api/v1/passwordless/authenticate", method: "POST" };
  var a7 = { path: "/api/v1/passwordless/init", method: "POST" };
  var p6 = { path: "/api/v1/passwordless/link", method: "POST" };
  var t7 = { path: "/api/v1/passwordless/unlink", method: "POST" };
  var e3 = { path: "/api/v1/passwordless/update", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/passwordless-sms.mjs
  var s3 = { path: "/api/v1/passwordless_sms/authenticate", method: "POST" };
  var a8 = { path: "/api/v1/passwordless_sms/init", method: "POST" };
  var p7 = { path: "/api/v1/passwordless_sms/link", method: "POST" };
  var t8 = { path: "/api/v1/passwordless_sms/unlink", method: "POST" };
  var e4 = { path: "/api/v1/passwordless_sms/update", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/recovery.mjs
  var e5 = { path: "/api/v1/embedded_wallets/:address/recovery/key_material", method: "POST" };
  var a9 = { path: "/api/v1/recovery/oauth/init", method: "POST" };
  var t9 = { path: "/api/v1/recovery/oauth/authenticate", method: "POST" };
  var o2 = { path: "/api/v1/recovery/oauth/init_icloud", method: "POST" };
  var h3 = { path: "/api/v1/recovery/configuration_icloud", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/types.mjs
  var e6 = (e42, c4) => c4 ? Object.entries(c4).reduce(((e43, [c5, r20]) => e43.replace(`:${c5}`, `${r20}`)), e42) : e42;

  // node_modules/@privy-io/routes/dist/esm/sessions.mjs
  var s4 = { path: "/api/v1/sessions", method: "POST" };
  var o3 = { path: "/api/v1/sessions/logout", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/smart-wallets.mjs
  var p8 = { path: "/api/v1/apps/:app_id/smart_wallets", method: "GET" };

  // node_modules/@privy-io/routes/dist/esm/siwe.mjs
  var t10 = { path: "/api/v1/siwe/init", method: "POST" };
  var i3 = { path: "/api/v1/siwe/authenticate", method: "POST" };
  var a10 = { path: "/api/v1/siwe/link", method: "POST" };
  var e7 = { path: "/api/v1/siwe/link_smart_wallet", method: "POST" };
  var h4 = { path: "/api/v1/siwe/unlink", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/siws.mjs
  var t11 = { path: "/api/v1/siws/init", method: "POST" };
  var i4 = { path: "/api/v1/siws/authenticate", method: "POST" };
  var a11 = { path: "/api/v1/siws/link", method: "POST" };
  var h5 = { path: "/api/v1/siws/unlink", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/terms.mjs
  var e8 = { path: "/api/v1/users/me/accept_terms", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/moonpay.mjs
  var o4 = { path: "/api/v1/plugins/moonpay_on_ramp/sign", method: "POST" };

  // node_modules/@privy-io/routes/dist/esm/wallet-api.mjs
  var t12 = { path: "/api/v1/wallets", method: "POST" };
  var p9 = { path: "/api/v1/wallets/:wallet_id/rpc", method: "POST" };
  var d = { path: "/api/v1/wallets/revoke", method: "POST" };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/AppApi.mjs
  var r2 = class {
    getConfig() {
      return this._privyInternal.config;
    }
    async getSmartWalletConfig() {
      return this._smartWalletConfig || (this._smartWalletConfig = await this._privyInternal.fetch(p8, { params: { app_id: this.appId } })), this._smartWalletConfig;
    }
    get appId() {
      return this._privyInternal.appId;
    }
    constructor(t45) {
      this._privyInternal = t45;
    }
  };

  // node_modules/jose/dist/browser/lib/buffer_utils.js
  var encoder = new TextEncoder();
  var decoder = new TextDecoder();
  var MAX_INT32 = 2 ** 32;

  // node_modules/jose/dist/browser/runtime/base64url.js
  var encodeBase64 = (input) => {
    let unencoded = input;
    if (typeof unencoded === "string") {
      unencoded = encoder.encode(unencoded);
    }
    const CHUNK_SIZE = 32768;
    const arr = [];
    for (let i20 = 0; i20 < unencoded.length; i20 += CHUNK_SIZE) {
      arr.push(String.fromCharCode.apply(null, unencoded.subarray(i20, i20 + CHUNK_SIZE)));
    }
    return btoa(arr.join(""));
  };
  var encode = (input) => {
    return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  };
  var decodeBase64 = (encoded) => {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i20 = 0; i20 < binary.length; i20++) {
      bytes[i20] = binary.charCodeAt(i20);
    }
    return bytes;
  };
  var decode = (input) => {
    let encoded = input;
    if (encoded instanceof Uint8Array) {
      encoded = decoder.decode(encoded);
    }
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
    try {
      return decodeBase64(encoded);
    } catch (_a) {
      throw new TypeError("The input to be decoded is not correctly encoded.");
    }
  };

  // node_modules/jose/dist/browser/util/errors.js
  var JOSEError = class extends Error {
    static get code() {
      return "ERR_JOSE_GENERIC";
    }
    constructor(message) {
      var _a;
      super(message);
      this.code = "ERR_JOSE_GENERIC";
      this.name = this.constructor.name;
      (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
    }
  };
  var JWTInvalid = class extends JOSEError {
    constructor() {
      super(...arguments);
      this.code = "ERR_JWT_INVALID";
    }
    static get code() {
      return "ERR_JWT_INVALID";
    }
  };

  // node_modules/jose/dist/browser/lib/is_object.js
  function isObjectLike(value) {
    return typeof value === "object" && value !== null;
  }
  function isObject(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
      return false;
    }
    if (Object.getPrototypeOf(input) === null) {
      return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
  }

  // node_modules/jose/dist/browser/util/base64url.js
  var base64url_exports = {};
  __export(base64url_exports, {
    decode: () => decode2,
    encode: () => encode2
  });
  var encode2 = encode;
  var decode2 = decode;

  // node_modules/jose/dist/browser/util/decode_jwt.js
  function decodeJwt(jwt) {
    if (typeof jwt !== "string")
      throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
    const { 1: payload, length } = jwt.split(".");
    if (length === 5)
      throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
    if (length !== 3)
      throw new JWTInvalid("Invalid JWT");
    if (!payload)
      throw new JWTInvalid("JWTs must contain a payload");
    let decoded;
    try {
      decoded = decode2(payload);
    } catch (_a) {
      throw new JWTInvalid("Failed to base64url decode the payload");
    }
    let result;
    try {
      result = JSON.parse(decoder.decode(decoded));
    } catch (_b) {
      throw new JWTInvalid("Failed to parse the decoded payload as JSON");
    }
    if (!isObject(result))
      throw new JWTInvalid("Invalid JWT Claims Set");
    return result;
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/Token.mjs
  var t13 = class _t {
    static parse(e42) {
      try {
        return new _t(e42);
      } catch (e43) {
        return null;
      }
    }
    get subject() {
      return this._decoded.sub;
    }
    get expiration() {
      return this._decoded.exp;
    }
    get issuer() {
      return this._decoded.iss;
    }
    get audience() {
      return this._decoded.aud;
    }
    isExpired(e42 = 0) {
      return Date.now() >= 1e3 * (this.expiration - e42);
    }
    constructor(t45) {
      this.value = t45, this._decoded = decodeJwt(t45);
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/CrossAppApi.mjs
  var t14 = class _t {
    async updateOnCrossAppAuthentication(r20, e42) {
      let s12 = e42.access_token, o26 = _t.providerAccessTokenStorageKey(r20);
      await this._storage.put(o26, s12);
    }
    async getProviderAccessToken(r20) {
      let s12 = _t.providerAccessTokenStorageKey(r20), o26 = await this._storage.get(s12);
      if ("string" != typeof o26) return null;
      try {
        if (new t13(o26).isExpired()) throw Error("JWT is expired");
        return o26;
      } catch {
        return await this._storage.del(s12), null;
      }
    }
    async getCrossAppConnections() {
      return await this._privyInternal.fetch(p2, { params: { app_id: this._privyInternal.appId } });
    }
    constructor(r20, e42) {
      this._privyInternal = r20, this._storage = e42;
    }
  };
  t14.providerAccessTokenStorageKey = (r20) => `privy:cross-app:${r20}`;

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/DelegatedWalletsApi.mjs
  var t15 = class {
    async revoke() {
      await this._privyInternal.fetch(d, {});
    }
    constructor(r20) {
      this._privyInternal = r20;
    }
  };

  // node_modules/@privy-io/chains/dist/esm/ethereum/add-privy-rpc-to-chain.mjs
  function r3(r20, p14) {
    return { ...r20, rpcUrls: { ...r20.rpcUrls, privy: { http: [p14] } } };
  }

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/arbitrum.mjs
  var t16 = { id: 42161, name: "Arbitrum One", network: "arbitrum", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { privy: { http: ["https://arbitrum-mainnet.rpc.privy.systems"] }, alchemy: { http: ["https://arb-mainnet.g.alchemy.com/v2"], webSocket: ["wss://arb-mainnet.g.alchemy.com/v2"] }, infura: { http: ["https://arbitrum-mainnet.infura.io/v3"], webSocket: ["wss://arbitrum-mainnet.infura.io/ws/v3"] }, default: { http: ["https://arb1.arbitrum.io/rpc"] }, public: { http: ["https://arb1.arbitrum.io/rpc"] } }, blockExplorers: { etherscan: { name: "Arbiscan", url: "https://arbiscan.io" }, default: { name: "Arbiscan", url: "https://arbiscan.io" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/arbitrumSepolia.mjs
  var r4 = { id: 421614, name: "Arbitrum Sepolia", network: "arbitrum-sepolia", nativeCurrency: { name: "Arbitrum Sepolia Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { privy: { http: ["https://arbitrum-sepolia.rpc.privy.systems"] }, default: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] }, public: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] } }, blockExplorers: { default: { name: "Blockscout", url: "https://sepolia-explorer.arbitrum.io" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/avalanche.mjs
  var a15 = { id: 43114, name: "Avalanche", network: "avalanche", nativeCurrency: { decimals: 18, name: "Avalanche", symbol: "AVAX" }, rpcUrls: { default: { http: ["https://api.avax.network/ext/bc/C/rpc"] }, public: { http: ["https://api.avax.network/ext/bc/C/rpc"] } }, blockExplorers: { etherscan: { name: "SnowTrace", url: "https://snowtrace.io" }, default: { name: "SnowTrace", url: "https://snowtrace.io" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/avalancheFuji.mjs
  var t17 = { id: 43113, name: "Avalanche Fuji", network: "avalanche-fuji", nativeCurrency: { decimals: 18, name: "Avalanche Fuji", symbol: "AVAX" }, rpcUrls: { default: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] }, public: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] } }, blockExplorers: { etherscan: { name: "SnowTrace", url: "https://testnet.snowtrace.io" }, default: { name: "SnowTrace", url: "https://testnet.snowtrace.io" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/base.mjs
  var e12 = { id: 8453, network: "base", name: "Base", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { privy: { http: ["https://base-mainnet.rpc.privy.systems"] }, default: { http: ["https://mainnet.base.org"] }, public: { http: ["https://mainnet.base.org"] } }, blockExplorers: { etherscan: { name: "Basescan", url: "https://basescan.org" }, default: { name: "Basescan", url: "https://basescan.org" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/baseSepolia.mjs
  var e13 = { id: 84532, network: "base-sepolia", name: "Base Sepolia", nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { privy: { http: ["https://base-sepolia.rpc.privy.systems"] }, default: { http: ["https://sepolia.base.org"] }, public: { http: ["https://sepolia.base.org"] } }, blockExplorers: { default: { name: "Blockscout", url: "https://base-sepolia.blockscout.com" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/berachainArtio.mjs
  var t18 = { id: 80085, network: "berachain-artio", name: "Berachain Artio", nativeCurrency: { name: "BERA", symbol: "BERA", decimals: 18 }, rpcUrls: { default: { http: ["https://berachain-artio.rpc.privy.systems"] }, public: { http: ["https://berachain-artio.rpc.privy.systems"] } }, blockExplorers: { default: { name: "Beratrail", url: "https://artio.beratrail.io" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/bsc.mjs
  var t19 = { id: 56, network: "bsc", name: "Binance Smart Chain", nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 }, rpcUrls: { privy: { http: ["https://bsc-mainnet.rpc.privy.systems"] }, default: { http: ["https://56.rpc.thirdweb.com"] }, public: { http: ["https://56.rpc.thirdweb.com"] } }, blockExplorers: { etherscan: { name: "BscScan", url: "https://bscscan.com" }, default: { name: "BscScan", url: "https://bscscan.com" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/celo.mjs
  var e14 = { id: 42220, name: "Celo Mainnet", network: "celo", nativeCurrency: { decimals: 18, name: "CELO", symbol: "CELO" }, rpcUrls: { default: { http: ["https://forno.celo.org"] }, infura: { http: ["https://celo-mainnet.infura.io/v3"] }, public: { http: ["https://forno.celo.org"] } }, blockExplorers: { default: { name: "Celo Explorer", url: "https://explorer.celo.org/mainnet" }, etherscan: { name: "CeloScan", url: "https://celoscan.io" } }, testnet: false };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/celoAlfajores.mjs
  var e15 = { id: 44787, name: "Celo Alfajores Testnet", network: "celo-alfajores", nativeCurrency: { decimals: 18, name: "CELO", symbol: "CELO" }, rpcUrls: { default: { http: ["https://alfajores-forno.celo-testnet.org"] }, infura: { http: ["https://celo-alfajores.infura.io/v3"] }, public: { http: ["https://alfajores-forno.celo-testnet.org"] } }, blockExplorers: { default: { name: "Celo Explorer", url: "https://explorer.celo.org/alfajores" }, etherscan: { name: "CeloScan", url: "https://alfajores.celoscan.io/" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/filecoin.mjs
  var i7 = { id: 314, name: "Filecoin - Mainnet", network: "filecoin-mainnet", nativeCurrency: { decimals: 18, name: "filecoin", symbol: "FIL" }, rpcUrls: { default: { http: ["https://api.node.glif.io/rpc/v1"] }, public: { http: ["https://api.node.glif.io/rpc/v1"] } }, blockExplorers: { default: { name: "Filfox", url: "https://filfox.info/en" }, filscan: { name: "Filscan", url: "https://filscan.io" }, filscout: { name: "Filscout", url: "https://filscout.io/en" }, glif: { name: "Glif", url: "https://explorer.glif.io" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/filecoinCalibration.mjs
  var i8 = { id: 314159, name: "Filecoin - Calibration testnet", network: "filecoin-calibration", nativeCurrency: { decimals: 18, name: "testnet filecoin", symbol: "tFIL" }, rpcUrls: { default: { http: ["https://api.calibration.node.glif.io/rpc/v1"] }, public: { http: ["https://api.calibration.node.glif.io/rpc/v1"] } }, blockExplorers: { default: { name: "Filscan", url: "https://calibration.filscan.io" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/garnetHolesky.mjs
  var t20 = { id: 17069, name: "Garnet Holesky", network: "garnet-holesky", nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: ["https://rpc.garnetchain.com"] }, public: { http: ["https://rpc.garnetchain.com"] } }, blockExplorers: { default: { name: "Blockscout", url: "https://explorer.garnetchain.com" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/gunz.mjs
  var t21 = { id: 43419, name: "Gunz Mainnet", network: "gunz", nativeCurrency: { name: "GUN", symbol: "GUN", decimals: 18 }, rpcUrls: { privy: { http: ["https://gunz-mainnet.rpc.privy.systems"] }, default: { http: ["https://rpc.gunzchain.io/ext/bc/2M47TxWHGnhNtq6pM5zPXdATBtuqubxn5EPFgFmEawCQr9WFML/rpc"] }, public: { http: ["https://rpc.gunzchain.io/ext/bc/2M47TxWHGnhNtq6pM5zPXdATBtuqubxn5EPFgFmEawCQr9WFML/rpc"] } }, blockExplorers: { default: { name: "Gunz Explorer", url: "https://gunzscan.io" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/holesky.mjs
  var e16 = { id: 17e3, name: "Holesky", network: "holesky", nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: ["https://ethereum-holesky.publicnode.com"] }, public: { http: ["https://ethereum-holesky.publicnode.com"] } }, blockExplorers: { etherscan: { name: "EtherScan", url: "https://holesky.etherscan.io" }, default: { name: "EtherScan", url: "https://holesky.etherscan.io" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/immutableZkEvm.mjs
  var t22 = { id: 13371, name: "Immutable zkEVM", network: "immutable-zkevm", nativeCurrency: { name: "Immutable Coin", symbol: "IMX", decimals: 18 }, rpcUrls: { privy: { http: ["https://immutable-mainnet.rpc.privy.systems"] }, default: { http: ["https://rpc.immutable.com"] }, public: { http: ["https://rpc.immutable.com"] } }, blockExplorers: { default: { name: "Immutable Explorer", url: "https://explorer.immutable.com" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/linea.mjs
  var e17 = { id: 59144, network: "linea-mainnet", name: "Linea Mainnet", nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: ["https://rpc.linea.build"], webSocket: ["wss://rpc.linea.build"] }, public: { http: ["https://rpc.linea.build"], webSocket: ["wss://rpc.linea.build"] } }, blockExplorers: { default: { name: "Etherscan", url: "https://lineascan.build" }, etherscan: { name: "Etherscan", url: "https://lineascan.build" } }, testnet: false };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/lineaTestnet.mjs
  var e18 = { id: 59140, network: "linea-testnet", name: "Linea Goerli Testnet", nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { infura: { http: ["https://linea-goerli.infura.io/v3"], webSocket: ["wss://linea-goerli.infura.io/ws/v3"] }, default: { http: ["https://rpc.goerli.linea.build"], webSocket: ["wss://rpc.goerli.linea.build"] }, public: { http: ["https://rpc.goerli.linea.build"], webSocket: ["wss://rpc.goerli.linea.build"] } }, blockExplorers: { default: { name: "Etherscan", url: "https://goerli.lineascan.build" }, etherscan: { name: "Etherscan", url: "https://goerli.lineascan.build" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/lukso.mjs
  var e19 = { id: 42, network: "lukso", name: "LUKSO", nativeCurrency: { name: "LUKSO", symbol: "LYX", decimals: 18 }, rpcUrls: { default: { http: ["https://rpc.mainnet.lukso.network"], webSocket: ["wss://ws-rpc.mainnet.lukso.network"] } }, blockExplorers: { default: { name: "LUKSO Mainnet Explorer", url: "https://explorer.execution.mainnet.lukso.network" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/mainnet.mjs
  var t23 = { id: 1, network: "homestead", name: "Ethereum", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { privy: { http: ["https://mainnet.rpc.privy.systems"] }, alchemy: { http: ["https://eth-mainnet.g.alchemy.com/v2"], webSocket: ["wss://eth-mainnet.g.alchemy.com/v2"] }, infura: { http: ["https://mainnet.infura.io/v3"], webSocket: ["wss://mainnet.infura.io/ws/v3"] }, default: { http: ["https://cloudflare-eth.com"] }, public: { http: ["https://cloudflare-eth.com"] } }, blockExplorers: { etherscan: { name: "Etherscan", url: "https://etherscan.io" }, default: { name: "Etherscan", url: "https://etherscan.io" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/optimism.mjs
  var t24 = { id: 10, name: "OP Mainnet", network: "optimism", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { privy: { http: ["https://optimism-mainnet.rpc.privy.systems"] }, alchemy: { http: ["https://opt-mainnet.g.alchemy.com/v2"], webSocket: ["wss://opt-mainnet.g.alchemy.com/v2"] }, infura: { http: ["https://optimism-mainnet.infura.io/v3"], webSocket: ["wss://optimism-mainnet.infura.io/ws/v3"] }, default: { http: ["https://mainnet.optimism.io"] }, public: { http: ["https://mainnet.optimism.io"] } }, blockExplorers: { etherscan: { name: "Etherscan", url: "https://optimistic.etherscan.io" }, default: { name: "Optimism Explorer", url: "https://explorer.optimism.io" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/optimismSepolia.mjs
  var t25 = { id: 11155420, name: "Optimism Sepolia", network: "optimism-sepolia", nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { privy: { http: ["https://optimism-sepolia.rpc.privy.systems"] }, default: { http: ["https://sepolia.optimism.io"] }, public: { http: ["https://sepolia.optimism.io"] }, infura: { http: ["https://optimism-sepolia.infura.io/v3"] } }, blockExplorers: { default: { name: "Blockscout", url: "https://optimism-sepolia.blockscout.com" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/polygon.mjs
  var o6 = { id: 137, name: "Polygon Mainnet", network: "polygon", nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 }, rpcUrls: { privy: { http: ["https://polygon-mainnet.rpc.privy.systems"] }, alchemy: { http: ["https://polygon-mainnet.g.alchemy.com/v2"], webSocket: ["wss://polygon-mainnet.g.alchemy.com/v2"] }, infura: { http: ["https://polygon-mainnet.infura.io/v3"], webSocket: ["wss://polygon-mainnet.infura.io/ws/v3"] }, default: { http: ["https://polygon-rpc.com"] }, public: { http: ["https://polygon-rpc.com"] } }, blockExplorers: { etherscan: { name: "PolygonScan", url: "https://polygonscan.com" }, default: { name: "PolygonScan", url: "https://polygonscan.com" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/polygonAmoy.mjs
  var o7 = { id: 80002, name: "Polygon Amoy", network: "polygon-amoy", nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 }, rpcUrls: { privy: { http: ["https://polygon-amoy.rpc.privy.systems"] }, infura: { http: ["https://polygon-amoy.infura.io/v3"], webSocket: ["wss://polygon-amoy.infura.io/ws/v3"] }, default: { http: ["https://rpc-amoy.polygon.technology"] } }, blockExplorers: { default: { name: "OK LINK", url: "https://www.oklink.com/amoy" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/redstone.mjs
  var e20 = { id: 690, name: "Redstone", network: "redstone", nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: ["https://rpc.redstonechain.com"] }, public: { http: ["https://rpc.redstonechain.com"] } }, blockExplorers: { default: { name: "Blockscout", url: "https://explorer.redstone.xyz/" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/sepolia.mjs
  var e21 = { id: 11155111, network: "sepolia", name: "Sepolia", nativeCurrency: { name: "Sepolia Ether", symbol: "SEP", decimals: 18 }, rpcUrls: { privy: { http: ["https://sepolia.rpc.privy.systems"] }, alchemy: { http: ["https://eth-sepolia.g.alchemy.com/v2"], webSocket: ["wss://eth-sepolia.g.alchemy.com/v2"] }, infura: { http: ["https://sepolia.infura.io/v3"], webSocket: ["wss://sepolia.infura.io/ws/v3"] }, default: { http: ["https://rpc.sepolia.org"] }, public: { http: ["https://rpc.sepolia.org"] } }, blockExplorers: { etherscan: { name: "Etherscan", url: "https://sepolia.etherscan.io" }, default: { name: "Etherscan", url: "https://sepolia.etherscan.io" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/soneium.mjs
  var t26 = { id: 1868, name: "Soneium Mainnet", network: "soneium", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { privy: { http: ["https://soneium-mainnet.rpc.privy.systems"] }, default: { http: ["https://rpc.soneium.org"] }, public: { http: ["https://rpc.soneium.org"] } }, blockExplorers: { default: { name: "Blockscout", url: "https://soneium.blockscout.com" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/unichain.mjs
  var n2 = { id: 130, name: "Unichain", network: "unichain", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { privy: { http: ["https://unichain-mainnet.rpc.privy.systems"] }, default: { http: ["https://mainnet.unichain.org"] }, public: { http: ["https://mainnet.unichain.org"] } }, blockExplorers: { default: { name: "Uniscan", url: "https://uniscan.xyz" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/zora.mjs
  var r5 = { id: 7777777, name: "Zora", network: "zora", nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" }, rpcUrls: { privy: { http: ["https://zora-mainnet.rpc.privy.systems"] }, default: { http: ["https://rpc.zora.energy"], webSocket: ["wss://rpc.zora.energy"] }, public: { http: ["https://rpc.zora.energy"], webSocket: ["wss://rpc.zora.energy"] } }, blockExplorers: { default: { name: "Explorer", url: "https://explorer.zora.energy" } } };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/zoraSepolia.mjs
  var e22 = { id: 999999999, name: "Zora Sepolia", network: "zora-sepolia", nativeCurrency: { decimals: 18, name: "Zora Sepolia", symbol: "ETH" }, rpcUrls: { default: { http: ["https://sepolia.rpc.zora.energy"], webSocket: ["wss://sepolia.rpc.zora.energy"] }, public: { http: ["https://sepolia.rpc.zora.energy"], webSocket: ["wss://sepolia.rpc.zora.energy"] } }, blockExplorers: { default: { name: "Zora Sepolia Explorer", url: "https://sepolia.explorer.zora.energy/" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/zoraTestnet.mjs
  var e23 = { id: 999, name: "Zora Goerli Testnet", network: "zora-testnet", nativeCurrency: { decimals: 18, name: "Zora Goerli", symbol: "ETH" }, rpcUrls: { default: { http: ["https://testnet.rpc.zora.energy"], webSocket: ["wss://testnet.rpc.zora.energy"] }, public: { http: ["https://testnet.rpc.zora.energy"], webSocket: ["wss://testnet.rpc.zora.energy"] } }, blockExplorers: { default: { name: "Explorer", url: "https://testnet.explorer.zora.energy" } }, testnet: true };

  // node_modules/@privy-io/chains/dist/esm/ethereum/default-supported-chains.mjs
  var H = [t23, e21, e16, t16, r4, t24, t25, o6, o7, e14, e15, i7, i8, e12, e13, t18, t19, t21, t22, e19, e17, e18, a15, t17, t26, n2, r5, e23, e22, e20, t20];
  var Z = new Set(H.map(((i20) => i20.id)));

  // node_modules/@privy-io/chains/dist/esm/ethereum/dedupe-supported-chains.mjs
  var t27 = (t45) => t45.map(((t46) => {
    if (t46.rpcUrls.privyWalletOverride) return t46;
    let n10 = H.find(((i20) => i20.id === t46.id)), s12 = n10?.rpcUrls.privy?.http[0];
    return s12 ? r3(t46, s12) : t46;
  }));

  // node_modules/@privy-io/chains/dist/esm/ethereum/definitions/monadMainnet.mjs
  var t28 = { id: 143, name: "Monad", network: "monad", nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 }, rpcUrls: { privy: { http: ["https://monad-mainnet.rpc.privy.systems"] }, default: { http: ["https://rpc.monad.xyz"] }, public: { http: ["https://rpc.monad.xyz"] } }, blockExplorers: { default: { name: "Monadscan", url: "https://mainnet-beta.monvision.io" } } };

  // node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs
  var r6 = class extends Error {
    constructor({ error: r20, code: e42, status: o26 }) {
      super(r20), this.name = "PrivyApiError", this.error = r20, this.code = e42, this.status = o26;
    }
  };
  var e24 = class extends Error {
    constructor({ error: r20, code: e42 }) {
      super(r20), this.code = e42, this.error = r20;
    }
  };
  var o8 = class extends Error {
    constructor({ error: r20, code: e42, response: o26 }) {
      super(r20), this.code = e42, this.error = r20, this.response = o26;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/unified-wallet.mjs
  var e25 = (e42) => !!e42.id && "privy-v2" === e42.recovery_method;

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedBitcoinWalletProvider.mjs
  var r7 = class {
    async sign({ message: e42 }) {
      return await this.request({ method: "sign", params: { message: new TextDecoder("utf8").decode(e42) } });
    }
    async signTransaction({ psbt: e42 }) {
      return await this.request({ method: "signTransaction", params: { psbt: e42 } });
    }
    async request(r20) {
      if (e25(this._account)) throw new e24({ code: "unsupported_wallet_type", error: "Bitcoin wallet providers are only supported for on-device execution and this app uses TEE execution. Use the useSignRawHash hook from @privy-io/expo/extended-chains to sign over a hash with this wallet. Learn more at https://docs.privy.io/recipes/tee-wallet-migration-guide" });
      if (!await this._privyInternal.getAccessTokenInternal()) throw new e24({ error: "Missing access token", code: "attempted_rpc_call_before_logged_in" });
      return this.handleIFrameRpc(r20);
    }
    async handleIFrameRpc(t45) {
      try {
        let e42 = await this._privyInternal.getAccessTokenInternal();
        if (!e42) throw Error("Missing access token. User must be authenticated.");
        return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", { method: t45.method, address: this._account.address }), (await this._proxy.rpcWallet({ accessToken: e42, request: t45, entropyId: this._entropyId, entropyIdVerifier: this._entropyIdVerifier, hdWalletIndex: this._account.wallet_index, chainType: this._account.chain_type })).response.data;
      } catch (r20) {
        console.error(r20);
        let s12 = r20 instanceof Error ? r20.message : "Unable to make wallet request";
        throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", { method: t45.method, address: this._account.address, error: s12 }), new e24({ code: "embedded_wallet_request_error", error: s12 });
      }
    }
    toJSON() {
      return `PrivyEmbeddedBitcoinProvider { address: '${this._account.address}', request: [Function] }`;
    }
    constructor({ proxy: e42, privyInternal: t45, account: r20, entropyId: s12, entropyIdVerifier: a20 }) {
      this._proxy = e42, this._privyInternal = t45, this._account = r20, this._entropyId = s12, this._entropyIdVerifier = a20;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/types.mjs
  var t29 = ["error", "invalid_request_arguments", "wallet_not_on_device", "invalid_recovery_pin", "insufficient_funds", "mfa_timeout", "missing_or_invalid_mfa", "mfa_verification_max_attempts_reached"];

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/errors.mjs
  var t30;
  var r8 = ((t30 = {}).MISSING_OR_INVALID_PRIVY_APP_ID = "missing_or_invalid_privy_app_id", t30.MISSING_OR_INVALID_PRIVY_ACCOUNT_ID = "missing_or_invalid_privy_account_id", t30.INVALID_DATA = "invalid_data", t30.LINKED_TO_ANOTHER_USER = "linked_to_another_user", t30.ALLOWLIST_REJECTED = "allowlist_rejected", t30.OAUTH_USER_DENIED = "oauth_user_denied", t30.UNKNOWN_AUTH_ERROR = "unknown_auth_error", t30.USER_EXITED_AUTH_FLOW = "exited_auth_flow", t30.MUST_BE_AUTHENTICATED = "must_be_authenticated", t30.UNKNOWN_CONNECT_WALLET_ERROR = "unknown_connect_wallet_error", t30.GENERIC_CONNECT_WALLET_ERROR = "generic_connect_wallet_error", t30.CLIENT_REQUEST_TIMEOUT = "client_request_timeout", t30.INVALID_CREDENTIALS = "invalid_credentials", t30);
  var s6 = class extends Error {
    toString() {
      return `${this.type}${this.privyErrorCode ? `-${this.privyErrorCode}` : ""}: ${this.message}${this.cause ? ` [cause: ${this.cause}]` : ""}`;
    }
    constructor(e42, t45, r20) {
      super(e42), t45 instanceof Error && (this.cause = t45), this.privyErrorCode = r20;
    }
  };
  var o9 = class extends Error {
    constructor(e42, t45) {
      super(t45), this.type = e42;
    }
  };
  var i9 = class extends s6 {
    constructor(e42, t45, r20) {
      super(e42, t45, r20), this.type = "connector_error";
    }
  };
  var d2 = class extends Error {
    constructor(e42, t45, r20) {
      super(e42), this.code = t45, this.data = r20;
    }
  };
  function _(t45) {
    let r20 = t45.type;
    return "string" == typeof r20 && t29.includes(r20);
  }
  function E(e42) {
    return _(e42) && "wallet_not_on_device" === e42.type;
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/create.mjs
  async function r9(r20, { request: t45, headers: o26 }) {
    return await r20.fetchPrivyRoute(t12, { body: t45, headers: o26 });
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/walletCreate.mjs
  async function t31({ context: t45, chainType: i20, idempotencyKey: o26 }) {
    return { wallet: await r9(t45, { request: { chain_type: i20, owner_id: void 0 }, headers: o26 ? { "privy-idempotency-key": o26 } : void 0 }) };
  }

  // node_modules/viem/_esm/utils/getAction.js
  function getAction(client, actionFn, name) {
    const action_implicit = client[actionFn.name];
    if (typeof action_implicit === "function")
      return action_implicit;
    const action_explicit = client[name];
    if (typeof action_explicit === "function")
      return action_explicit;
    return (params) => actionFn(client, params);
  }

  // node_modules/viem/_esm/utils/abi/encodeEventTopics.js
  init_abi();

  // node_modules/viem/_esm/errors/log.js
  init_base();
  var FilterTypeNotSupportedError = class extends BaseError2 {
    constructor(type) {
      super(`Filter type "${type}" is not supported.`, {
        name: "FilterTypeNotSupportedError"
      });
    }
  };

  // node_modules/viem/_esm/utils/abi/encodeEventTopics.js
  init_toBytes();
  init_keccak256();
  init_toEventSelector();
  init_encodeAbiParameters();
  init_formatAbiItem2();
  init_getAbiItem();
  var docsPath = "/docs/contract/encodeEventTopics";
  function encodeEventTopics(parameters) {
    const { abi: abi2, eventName, args } = parameters;
    let abiItem = abi2[0];
    if (eventName) {
      const item = getAbiItem({ abi: abi2, name: eventName });
      if (!item)
        throw new AbiEventNotFoundError(eventName, { docsPath });
      abiItem = item;
    }
    if (abiItem.type !== "event")
      throw new AbiEventNotFoundError(void 0, { docsPath });
    const definition = formatAbiItem2(abiItem);
    const signature = toEventSelector(definition);
    let topics = [];
    if (args && "inputs" in abiItem) {
      const indexedInputs = abiItem.inputs?.filter((param) => "indexed" in param && param.indexed);
      const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x) => args[x.name]) ?? [] : [];
      if (args_.length > 0) {
        topics = indexedInputs?.map((param, i20) => {
          if (Array.isArray(args_[i20]))
            return args_[i20].map((_4, j) => encodeArg({ param, value: args_[i20][j] }));
          return typeof args_[i20] !== "undefined" && args_[i20] !== null ? encodeArg({ param, value: args_[i20] }) : null;
        }) ?? [];
      }
    }
    return [signature, ...topics];
  }
  function encodeArg({ param, value }) {
    if (param.type === "string" || param.type === "bytes")
      return keccak256(toBytes(value));
    if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
      throw new FilterTypeNotSupportedError(param.type);
    return encodeAbiParameters([param], [value]);
  }

  // node_modules/viem/_esm/actions/public/createContractEventFilter.js
  init_toHex();

  // node_modules/viem/_esm/utils/filters/createFilterRequestScope.js
  function createFilterRequestScope(client, { method }) {
    const requestMap = {};
    if (client.transport.type === "fallback")
      client.transport.onResponse?.(({ method: method_, response: id, status, transport }) => {
        if (status === "success" && method === method_)
          requestMap[id] = transport.request;
      });
    return ((id) => requestMap[id] || client.request);
  }

  // node_modules/viem/_esm/actions/public/createContractEventFilter.js
  async function createContractEventFilter(client, parameters) {
    const { address, abi: abi2, args, eventName, fromBlock, strict, toBlock } = parameters;
    const getRequest = createFilterRequestScope(client, {
      method: "eth_newFilter"
    });
    const topics = eventName ? encodeEventTopics({
      abi: abi2,
      args,
      eventName
    }) : void 0;
    const id = await client.request({
      method: "eth_newFilter",
      params: [
        {
          address,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
          topics
        }
      ]
    });
    return {
      abi: abi2,
      args,
      eventName,
      id,
      request: getRequest(id),
      strict: Boolean(strict),
      type: "event"
    };
  }

  // node_modules/viem/_esm/actions/public/estimateContractGas.js
  init_parseAccount();
  init_encodeFunctionData();

  // node_modules/viem/_esm/utils/errors/getContractError.js
  init_abi();
  init_base();
  init_contract();
  init_request();
  init_rpc();
  var EXECUTION_REVERTED_ERROR_CODE = 3;
  function getContractError(err, { abi: abi2, address, args, docsPath: docsPath8, functionName, sender }) {
    const error = err instanceof RawContractError ? err : err instanceof BaseError2 ? err.walk((err2) => "data" in err2) || err.walk() : {};
    const { code, data, details, message, shortMessage } = error;
    const cause = (() => {
      if (err instanceof AbiDecodingZeroDataError)
        return new ContractFunctionZeroDataError({ functionName, cause: err });
      if ([EXECUTION_REVERTED_ERROR_CODE, InternalRpcError.code].includes(code) && (data || details || message || shortMessage) || code === InvalidInputRpcError.code && details === "execution reverted" && data) {
        return new ContractFunctionRevertedError({
          abi: abi2,
          data: typeof data === "object" ? data.data : data,
          functionName,
          message: error instanceof RpcRequestError ? details : shortMessage ?? message,
          cause: err
        });
      }
      return err;
    })();
    return new ContractFunctionExecutionError(cause, {
      abi: abi2,
      args,
      contractAddress: address,
      docsPath: docsPath8,
      functionName,
      sender
    });
  }

  // node_modules/viem/_esm/actions/public/estimateGas.js
  init_parseAccount();
  init_base();

  // node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
  init_getAddress();
  init_keccak256();
  function publicKeyToAddress(publicKey) {
    const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
    return checksumAddress(`0x${address}`);
  }

  // node_modules/viem/_esm/utils/signature/recoverPublicKey.js
  init_isHex();
  init_size();
  init_fromHex();
  init_toHex();
  async function recoverPublicKey({ hash: hash3, signature }) {
    const hashHex = isHex(hash3) ? hash3 : toHex(hash3);
    const { secp256k1: secp256k12 } = await Promise.resolve().then(() => (init_secp256k1(), secp256k1_exports));
    const signature_ = (() => {
      if (typeof signature === "object" && "r" in signature && "s" in signature) {
        const { r: r20, s: s12, v, yParity } = signature;
        const yParityOrV2 = Number(yParity ?? v);
        const recoveryBit2 = toRecoveryBit(yParityOrV2);
        return new secp256k12.Signature(hexToBigInt(r20), hexToBigInt(s12)).addRecoveryBit(recoveryBit2);
      }
      const signatureHex = isHex(signature) ? signature : toHex(signature);
      if (size(signatureHex) !== 65)
        throw new Error("invalid signature length");
      const yParityOrV = hexToNumber(`0x${signatureHex.slice(130)}`);
      const recoveryBit = toRecoveryBit(yParityOrV);
      return secp256k12.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
    })();
    const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
    return `0x${publicKey}`;
  }
  function toRecoveryBit(yParityOrV) {
    if (yParityOrV === 0 || yParityOrV === 1)
      return yParityOrV;
    if (yParityOrV === 27)
      return 0;
    if (yParityOrV === 28)
      return 1;
    throw new Error("Invalid yParityOrV value");
  }

  // node_modules/viem/_esm/utils/signature/recoverAddress.js
  async function recoverAddress({ hash: hash3, signature }) {
    return publicKeyToAddress(await recoverPublicKey({ hash: hash3, signature }));
  }

  // node_modules/viem/_esm/utils/authorization/hashAuthorization.js
  init_concat();
  init_toBytes();
  init_toHex();

  // node_modules/viem/_esm/utils/encoding/toRlp.js
  init_base();
  init_cursor2();
  init_toBytes();
  init_toHex();
  function toRlp(bytes, to = "hex") {
    const encodable = getEncodable(bytes);
    const cursor = createCursor(new Uint8Array(encodable.length));
    encodable.encode(cursor);
    if (to === "hex")
      return bytesToHex(cursor.bytes);
    return cursor.bytes;
  }
  function getEncodable(bytes) {
    if (Array.isArray(bytes))
      return getEncodableList(bytes.map((x) => getEncodable(x)));
    return getEncodableBytes(bytes);
  }
  function getEncodableList(list) {
    const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
    const sizeOfBodyLength = getSizeOfLength(bodyLength);
    const length = (() => {
      if (bodyLength <= 55)
        return 1 + bodyLength;
      return 1 + sizeOfBodyLength + bodyLength;
    })();
    return {
      length,
      encode(cursor) {
        if (bodyLength <= 55) {
          cursor.pushByte(192 + bodyLength);
        } else {
          cursor.pushByte(192 + 55 + sizeOfBodyLength);
          if (sizeOfBodyLength === 1)
            cursor.pushUint8(bodyLength);
          else if (sizeOfBodyLength === 2)
            cursor.pushUint16(bodyLength);
          else if (sizeOfBodyLength === 3)
            cursor.pushUint24(bodyLength);
          else
            cursor.pushUint32(bodyLength);
        }
        for (const { encode: encode6 } of list) {
          encode6(cursor);
        }
      }
    };
  }
  function getEncodableBytes(bytesOrHex) {
    const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
    const sizeOfBytesLength = getSizeOfLength(bytes.length);
    const length = (() => {
      if (bytes.length === 1 && bytes[0] < 128)
        return 1;
      if (bytes.length <= 55)
        return 1 + bytes.length;
      return 1 + sizeOfBytesLength + bytes.length;
    })();
    return {
      length,
      encode(cursor) {
        if (bytes.length === 1 && bytes[0] < 128) {
          cursor.pushBytes(bytes);
        } else if (bytes.length <= 55) {
          cursor.pushByte(128 + bytes.length);
          cursor.pushBytes(bytes);
        } else {
          cursor.pushByte(128 + 55 + sizeOfBytesLength);
          if (sizeOfBytesLength === 1)
            cursor.pushUint8(bytes.length);
          else if (sizeOfBytesLength === 2)
            cursor.pushUint16(bytes.length);
          else if (sizeOfBytesLength === 3)
            cursor.pushUint24(bytes.length);
          else
            cursor.pushUint32(bytes.length);
          cursor.pushBytes(bytes);
        }
      }
    };
  }
  function getSizeOfLength(length) {
    if (length < 2 ** 8)
      return 1;
    if (length < 2 ** 16)
      return 2;
    if (length < 2 ** 24)
      return 3;
    if (length < 2 ** 32)
      return 4;
    throw new BaseError2("Length is too large.");
  }

  // node_modules/viem/_esm/utils/authorization/hashAuthorization.js
  init_keccak256();
  function hashAuthorization(parameters) {
    const { chainId, nonce, to } = parameters;
    const address = parameters.contractAddress ?? parameters.address;
    const hash3 = keccak256(concatHex([
      "0x05",
      toRlp([
        chainId ? numberToHex(chainId) : "0x",
        address,
        nonce ? numberToHex(nonce) : "0x"
      ])
    ]));
    if (to === "bytes")
      return hexToBytes(hash3);
    return hash3;
  }

  // node_modules/viem/_esm/utils/authorization/recoverAuthorizationAddress.js
  async function recoverAuthorizationAddress(parameters) {
    const { authorization, signature } = parameters;
    return recoverAddress({
      hash: hashAuthorization(authorization),
      signature: signature ?? authorization
    });
  }

  // node_modules/viem/_esm/actions/public/estimateGas.js
  init_toHex();

  // node_modules/viem/_esm/errors/estimateGas.js
  init_formatEther();
  init_formatGwei();
  init_base();
  init_transaction();
  var EstimateGasExecutionError = class extends BaseError2 {
    constructor(cause, { account, docsPath: docsPath8, chain: chain2, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
      const prettyArgs = prettyPrint({
        from: account?.address,
        to,
        value: typeof value !== "undefined" && `${formatEther(value)} ${chain2?.nativeCurrency?.symbol || "ETH"}`,
        data,
        gas,
        gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
        maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
        maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
        nonce
      });
      super(cause.shortMessage, {
        cause,
        docsPath: docsPath8,
        metaMessages: [
          ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
          "Estimate Gas Arguments:",
          prettyArgs
        ].filter(Boolean),
        name: "EstimateGasExecutionError"
      });
      Object.defineProperty(this, "cause", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.cause = cause;
    }
  };

  // node_modules/viem/_esm/utils/errors/getEstimateGasError.js
  init_node();
  init_getNodeError();
  function getEstimateGasError(err, { docsPath: docsPath8, ...args }) {
    const cause = (() => {
      const cause2 = getNodeError(err, args);
      if (cause2 instanceof UnknownNodeError)
        return err;
      return cause2;
    })();
    return new EstimateGasExecutionError(cause, {
      docsPath: docsPath8,
      ...args
    });
  }

  // node_modules/viem/_esm/actions/public/estimateGas.js
  init_extract();
  init_transactionRequest();
  init_stateOverride2();
  init_assertRequest();

  // node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
  init_parseAccount();

  // node_modules/viem/_esm/errors/fee.js
  init_formatGwei();
  init_base();
  var BaseFeeScalarError = class extends BaseError2 {
    constructor() {
      super("`baseFeeMultiplier` must be greater than 1.", {
        name: "BaseFeeScalarError"
      });
    }
  };
  var Eip1559FeesNotSupportedError = class extends BaseError2 {
    constructor() {
      super("Chain does not support EIP-1559 fees.", {
        name: "Eip1559FeesNotSupportedError"
      });
    }
  };
  var MaxFeePerGasTooLowError = class extends BaseError2 {
    constructor({ maxPriorityFeePerGas }) {
      super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei(maxPriorityFeePerGas)} gwei).`, { name: "MaxFeePerGasTooLowError" });
    }
  };

  // node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
  init_fromHex();

  // node_modules/viem/_esm/errors/block.js
  init_base();
  var BlockNotFoundError = class extends BaseError2 {
    constructor({ blockHash, blockNumber }) {
      let identifier = "Block";
      if (blockHash)
        identifier = `Block at hash "${blockHash}"`;
      if (blockNumber)
        identifier = `Block at number "${blockNumber}"`;
      super(`${identifier} could not be found.`, { name: "BlockNotFoundError" });
    }
  };

  // node_modules/viem/_esm/actions/public/getBlock.js
  init_toHex();

  // node_modules/viem/_esm/utils/formatters/transaction.js
  init_fromHex();
  var transactionType = {
    "0x0": "legacy",
    "0x1": "eip2930",
    "0x2": "eip1559",
    "0x3": "eip4844",
    "0x4": "eip7702"
  };
  function formatTransaction(transaction, _4) {
    const transaction_ = {
      ...transaction,
      blockHash: transaction.blockHash ? transaction.blockHash : null,
      blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
      chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
      gas: transaction.gas ? BigInt(transaction.gas) : void 0,
      gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
      maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
      maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
      maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
      nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
      to: transaction.to ? transaction.to : null,
      transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
      type: transaction.type ? transactionType[transaction.type] : void 0,
      typeHex: transaction.type ? transaction.type : void 0,
      value: transaction.value ? BigInt(transaction.value) : void 0,
      v: transaction.v ? BigInt(transaction.v) : void 0
    };
    if (transaction.authorizationList)
      transaction_.authorizationList = formatAuthorizationList2(transaction.authorizationList);
    transaction_.yParity = (() => {
      if (transaction.yParity)
        return Number(transaction.yParity);
      if (typeof transaction_.v === "bigint") {
        if (transaction_.v === 0n || transaction_.v === 27n)
          return 0;
        if (transaction_.v === 1n || transaction_.v === 28n)
          return 1;
        if (transaction_.v >= 35n)
          return transaction_.v % 2n === 0n ? 1 : 0;
      }
      return void 0;
    })();
    if (transaction_.type === "legacy") {
      delete transaction_.accessList;
      delete transaction_.maxFeePerBlobGas;
      delete transaction_.maxFeePerGas;
      delete transaction_.maxPriorityFeePerGas;
      delete transaction_.yParity;
    }
    if (transaction_.type === "eip2930") {
      delete transaction_.maxFeePerBlobGas;
      delete transaction_.maxFeePerGas;
      delete transaction_.maxPriorityFeePerGas;
    }
    if (transaction_.type === "eip1559")
      delete transaction_.maxFeePerBlobGas;
    return transaction_;
  }
  function formatAuthorizationList2(authorizationList) {
    return authorizationList.map((authorization) => ({
      address: authorization.address,
      chainId: Number(authorization.chainId),
      nonce: Number(authorization.nonce),
      r: authorization.r,
      s: authorization.s,
      yParity: Number(authorization.yParity)
    }));
  }

  // node_modules/viem/_esm/utils/formatters/block.js
  function formatBlock(block, _4) {
    const transactions = (block.transactions ?? []).map((transaction) => {
      if (typeof transaction === "string")
        return transaction;
      return formatTransaction(transaction);
    });
    return {
      ...block,
      baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
      blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
      difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
      excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
      gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
      gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
      hash: block.hash ? block.hash : null,
      logsBloom: block.logsBloom ? block.logsBloom : null,
      nonce: block.nonce ? block.nonce : null,
      number: block.number ? BigInt(block.number) : null,
      size: block.size ? BigInt(block.size) : void 0,
      timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
      transactions,
      totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
    };
  }

  // node_modules/viem/_esm/actions/public/getBlock.js
  async function getBlock(client, { blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", includeTransactions: includeTransactions_ } = {}) {
    const includeTransactions = includeTransactions_ ?? false;
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    let block = null;
    if (blockHash) {
      block = await client.request({
        method: "eth_getBlockByHash",
        params: [blockHash, includeTransactions]
      }, { dedupe: true });
    } else {
      block = await client.request({
        method: "eth_getBlockByNumber",
        params: [blockNumberHex || blockTag, includeTransactions]
      }, { dedupe: Boolean(blockNumberHex) });
    }
    if (!block)
      throw new BlockNotFoundError({ blockHash, blockNumber });
    const format = client.chain?.formatters?.block?.format || formatBlock;
    return format(block, "getBlock");
  }

  // node_modules/viem/_esm/actions/public/getGasPrice.js
  async function getGasPrice(client) {
    const gasPrice = await client.request({
      method: "eth_gasPrice"
    });
    return BigInt(gasPrice);
  }

  // node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
  async function estimateMaxPriorityFeePerGas(client, args) {
    return internal_estimateMaxPriorityFeePerGas(client, args);
  }
  async function internal_estimateMaxPriorityFeePerGas(client, args) {
    const { block: block_, chain: chain2 = client.chain, request } = args || {};
    try {
      const maxPriorityFeePerGas = chain2?.fees?.maxPriorityFeePerGas ?? chain2?.fees?.defaultPriorityFee;
      if (typeof maxPriorityFeePerGas === "function") {
        const block = block_ || await getAction(client, getBlock, "getBlock")({});
        const maxPriorityFeePerGas_ = await maxPriorityFeePerGas({
          block,
          client,
          request
        });
        if (maxPriorityFeePerGas_ === null)
          throw new Error();
        return maxPriorityFeePerGas_;
      }
      if (typeof maxPriorityFeePerGas !== "undefined")
        return maxPriorityFeePerGas;
      const maxPriorityFeePerGasHex = await client.request({
        method: "eth_maxPriorityFeePerGas"
      });
      return hexToBigInt(maxPriorityFeePerGasHex);
    } catch {
      const [block, gasPrice] = await Promise.all([
        block_ ? Promise.resolve(block_) : getAction(client, getBlock, "getBlock")({}),
        getAction(client, getGasPrice, "getGasPrice")({})
      ]);
      if (typeof block.baseFeePerGas !== "bigint")
        throw new Eip1559FeesNotSupportedError();
      const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas;
      if (maxPriorityFeePerGas < 0n)
        return 0n;
      return maxPriorityFeePerGas;
    }
  }

  // node_modules/viem/_esm/actions/public/estimateFeesPerGas.js
  async function estimateFeesPerGas(client, args) {
    return internal_estimateFeesPerGas(client, args);
  }
  async function internal_estimateFeesPerGas(client, args) {
    const { block: block_, chain: chain2 = client.chain, request, type = "eip1559" } = args || {};
    const baseFeeMultiplier = await (async () => {
      if (typeof chain2?.fees?.baseFeeMultiplier === "function")
        return chain2.fees.baseFeeMultiplier({
          block: block_,
          client,
          request
        });
      return chain2?.fees?.baseFeeMultiplier ?? 1.2;
    })();
    if (baseFeeMultiplier < 1)
      throw new BaseFeeScalarError();
    const decimals = baseFeeMultiplier.toString().split(".")[1]?.length ?? 0;
    const denominator = 10 ** decimals;
    const multiply = (base) => base * BigInt(Math.ceil(baseFeeMultiplier * denominator)) / BigInt(denominator);
    const block = block_ ? block_ : await getAction(client, getBlock, "getBlock")({});
    if (typeof chain2?.fees?.estimateFeesPerGas === "function") {
      const fees = await chain2.fees.estimateFeesPerGas({
        block: block_,
        client,
        multiply,
        request,
        type
      });
      if (fees !== null)
        return fees;
    }
    if (type === "eip1559") {
      if (typeof block.baseFeePerGas !== "bigint")
        throw new Eip1559FeesNotSupportedError();
      const maxPriorityFeePerGas = typeof request?.maxPriorityFeePerGas === "bigint" ? request.maxPriorityFeePerGas : await internal_estimateMaxPriorityFeePerGas(client, {
        block,
        chain: chain2,
        request
      });
      const baseFeePerGas = multiply(block.baseFeePerGas);
      const maxFeePerGas = request?.maxFeePerGas ?? baseFeePerGas + maxPriorityFeePerGas;
      return {
        maxFeePerGas,
        maxPriorityFeePerGas
      };
    }
    const gasPrice = request?.gasPrice ?? multiply(await getAction(client, getGasPrice, "getGasPrice")({}));
    return {
      gasPrice
    };
  }

  // node_modules/viem/_esm/actions/public/getTransactionCount.js
  init_fromHex();
  init_toHex();
  async function getTransactionCount(client, { address, blockTag = "latest", blockNumber }) {
    const count = await client.request({
      method: "eth_getTransactionCount",
      params: [
        address,
        typeof blockNumber === "bigint" ? numberToHex(blockNumber) : blockTag
      ]
    }, {
      dedupe: Boolean(blockNumber)
    });
    return hexToNumber(count);
  }

  // node_modules/viem/_esm/utils/blob/blobsToCommitments.js
  init_toBytes();
  init_toHex();
  function blobsToCommitments(parameters) {
    const { kzg } = parameters;
    const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
    const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
    const commitments = [];
    for (const blob of blobs)
      commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
    return to === "bytes" ? commitments : commitments.map((x) => bytesToHex(x));
  }

  // node_modules/viem/_esm/utils/blob/blobsToProofs.js
  init_toBytes();
  init_toHex();
  function blobsToProofs(parameters) {
    const { kzg } = parameters;
    const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
    const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
    const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes(x)) : parameters.commitments;
    const proofs = [];
    for (let i20 = 0; i20 < blobs.length; i20++) {
      const blob = blobs[i20];
      const commitment = commitments[i20];
      proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
    }
    return to === "bytes" ? proofs : proofs.map((x) => bytesToHex(x));
  }

  // node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
  init_toHex();

  // node_modules/@noble/hashes/esm/sha256.js
  init_sha2();
  var sha2562 = sha256;

  // node_modules/viem/_esm/utils/hash/sha256.js
  init_isHex();
  init_toBytes();
  init_toHex();
  function sha2563(value, to_) {
    const to = to_ || "hex";
    const bytes = sha2562(isHex(value, { strict: false }) ? toBytes(value) : value);
    if (to === "bytes")
      return bytes;
    return toHex(bytes);
  }

  // node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
  function commitmentToVersionedHash(parameters) {
    const { commitment, version: version4 = 1 } = parameters;
    const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
    const versionedHash = sha2563(commitment, "bytes");
    versionedHash.set([version4], 0);
    return to === "bytes" ? versionedHash : bytesToHex(versionedHash);
  }

  // node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
  function commitmentsToVersionedHashes(parameters) {
    const { commitments, version: version4 } = parameters;
    const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
    const hashes = [];
    for (const commitment of commitments) {
      hashes.push(commitmentToVersionedHash({
        commitment,
        to,
        version: version4
      }));
    }
    return hashes;
  }

  // node_modules/viem/_esm/constants/blob.js
  var blobsPerTransaction = 6;
  var bytesPerFieldElement = 32;
  var fieldElementsPerBlob = 4096;
  var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
  var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
  1 - // zero byte (0x00) appended to each field element.
  1 * fieldElementsPerBlob * blobsPerTransaction;

  // node_modules/viem/_esm/errors/blob.js
  init_base();
  var BlobSizeTooLargeError = class extends BaseError2 {
    constructor({ maxSize, size: size5 }) {
      super("Blob size is too large.", {
        metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size5} bytes`],
        name: "BlobSizeTooLargeError"
      });
    }
  };
  var EmptyBlobError = class extends BaseError2 {
    constructor() {
      super("Blob data must not be empty.", { name: "EmptyBlobError" });
    }
  };

  // node_modules/viem/_esm/utils/blob/toBlobs.js
  init_cursor2();
  init_size();
  init_toBytes();
  init_toHex();
  function toBlobs(parameters) {
    const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
    const data = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
    const size_ = size(data);
    if (!size_)
      throw new EmptyBlobError();
    if (size_ > maxBytesPerTransaction)
      throw new BlobSizeTooLargeError({
        maxSize: maxBytesPerTransaction,
        size: size_
      });
    const blobs = [];
    let active = true;
    let position = 0;
    while (active) {
      const blob = createCursor(new Uint8Array(bytesPerBlob));
      let size5 = 0;
      while (size5 < fieldElementsPerBlob) {
        const bytes = data.slice(position, position + (bytesPerFieldElement - 1));
        blob.pushByte(0);
        blob.pushBytes(bytes);
        if (bytes.length < 31) {
          blob.pushByte(128);
          active = false;
          break;
        }
        size5++;
        position += 31;
      }
      blobs.push(blob);
    }
    return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex(x.bytes));
  }

  // node_modules/viem/_esm/utils/blob/toBlobSidecars.js
  function toBlobSidecars(parameters) {
    const { data, kzg, to } = parameters;
    const blobs = parameters.blobs ?? toBlobs({ data, to });
    const commitments = parameters.commitments ?? blobsToCommitments({ blobs, kzg, to });
    const proofs = parameters.proofs ?? blobsToProofs({ blobs, commitments, kzg, to });
    const sidecars = [];
    for (let i20 = 0; i20 < blobs.length; i20++)
      sidecars.push({
        blob: blobs[i20],
        commitment: commitments[i20],
        proof: proofs[i20]
      });
    return sidecars;
  }

  // node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
  init_lru();
  init_assertRequest();

  // node_modules/viem/_esm/utils/transaction/getTransactionType.js
  init_transaction();
  function getTransactionType(transaction) {
    if (transaction.type)
      return transaction.type;
    if (typeof transaction.authorizationList !== "undefined")
      return "eip7702";
    if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
      return "eip4844";
    if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
      return "eip1559";
    }
    if (typeof transaction.gasPrice !== "undefined") {
      if (typeof transaction.accessList !== "undefined")
        return "eip2930";
      return "legacy";
    }
    throw new InvalidSerializableTransactionError({ transaction });
  }

  // node_modules/viem/_esm/actions/public/fillTransaction.js
  init_parseAccount();

  // node_modules/viem/_esm/utils/errors/getTransactionError.js
  init_node();
  init_transaction();
  init_getNodeError();
  function getTransactionError(err, { docsPath: docsPath8, ...args }) {
    const cause = (() => {
      const cause2 = getNodeError(err, args);
      if (cause2 instanceof UnknownNodeError)
        return err;
      return cause2;
    })();
    return new TransactionExecutionError(cause, {
      docsPath: docsPath8,
      ...args
    });
  }

  // node_modules/viem/_esm/actions/public/fillTransaction.js
  init_extract();
  init_transactionRequest();
  init_assertRequest();

  // node_modules/viem/_esm/actions/public/getChainId.js
  init_fromHex();
  async function getChainId(client) {
    const chainIdHex = await client.request({
      method: "eth_chainId"
    }, { dedupe: true });
    return hexToNumber(chainIdHex);
  }

  // node_modules/viem/_esm/actions/public/fillTransaction.js
  async function fillTransaction(client, parameters) {
    const { account = client.account, accessList, authorizationList, chain: chain2 = client.chain, blobVersionedHashes, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce: nonce_, nonceManager, to, type, value, ...rest } = parameters;
    const nonce = await (async () => {
      if (!account)
        return nonce_;
      if (!nonceManager)
        return nonce_;
      if (typeof nonce_ !== "undefined")
        return nonce_;
      const account_ = parseAccount(account);
      const chainId = chain2 ? chain2.id : await getAction(client, getChainId, "getChainId")({});
      return await nonceManager.consume({
        address: account_.address,
        chainId,
        client
      });
    })();
    assertRequest(parameters);
    const chainFormat = chain2?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format: chainFormat }),
      account: account ? parseAccount(account) : void 0,
      accessList,
      authorizationList,
      blobs,
      blobVersionedHashes,
      data,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      type,
      value
    }, "fillTransaction");
    try {
      const response = await client.request({
        method: "eth_fillTransaction",
        params: [request]
      });
      const format2 = chain2?.formatters?.transaction?.format || formatTransaction;
      const transaction = format2(response.tx);
      delete transaction.blockHash;
      delete transaction.blockNumber;
      delete transaction.r;
      delete transaction.s;
      delete transaction.transactionIndex;
      delete transaction.v;
      delete transaction.yParity;
      transaction.data = transaction.input;
      if (transaction.gas)
        transaction.gas = parameters.gas ?? transaction.gas;
      if (transaction.gasPrice)
        transaction.gasPrice = parameters.gasPrice ?? transaction.gasPrice;
      if (transaction.maxFeePerBlobGas)
        transaction.maxFeePerBlobGas = parameters.maxFeePerBlobGas ?? transaction.maxFeePerBlobGas;
      if (transaction.maxFeePerGas)
        transaction.maxFeePerGas = parameters.maxFeePerGas ?? transaction.maxFeePerGas;
      if (transaction.maxPriorityFeePerGas)
        transaction.maxPriorityFeePerGas = parameters.maxPriorityFeePerGas ?? transaction.maxPriorityFeePerGas;
      if (transaction.nonce)
        transaction.nonce = parameters.nonce ?? transaction.nonce;
      const feeMultiplier = await (async () => {
        if (typeof chain2?.fees?.baseFeeMultiplier === "function") {
          const block = await getAction(client, getBlock, "getBlock")({});
          return chain2.fees.baseFeeMultiplier({
            block,
            client,
            request: parameters
          });
        }
        return chain2?.fees?.baseFeeMultiplier ?? 1.2;
      })();
      if (feeMultiplier < 1)
        throw new BaseFeeScalarError();
      const decimals = feeMultiplier.toString().split(".")[1]?.length ?? 0;
      const denominator = 10 ** decimals;
      const multiplyFee = (base) => base * BigInt(Math.ceil(feeMultiplier * denominator)) / BigInt(denominator);
      if (transaction.maxFeePerGas && !parameters.maxFeePerGas)
        transaction.maxFeePerGas = multiplyFee(transaction.maxFeePerGas);
      if (transaction.gasPrice && !parameters.gasPrice)
        transaction.gasPrice = multiplyFee(transaction.gasPrice);
      return {
        raw: response.raw,
        transaction: {
          from: request.from,
          ...transaction
        }
      };
    } catch (err) {
      throw getTransactionError(err, {
        ...parameters,
        chain: client.chain
      });
    }
  }

  // node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
  var defaultParameters = [
    "blobVersionedHashes",
    "chainId",
    "fees",
    "gas",
    "nonce",
    "type"
  ];
  var eip1559NetworkCache = /* @__PURE__ */ new Map();
  var supportsFillTransaction = /* @__PURE__ */ new LruMap(128);
  async function prepareTransactionRequest(client, args) {
    let request = args;
    request.account ?? (request.account = client.account);
    request.parameters ?? (request.parameters = defaultParameters);
    const { account: account_, chain: chain2 = client.chain, nonceManager, parameters } = request;
    const prepareTransactionRequest2 = (() => {
      if (typeof chain2?.prepareTransactionRequest === "function")
        return {
          fn: chain2.prepareTransactionRequest,
          runAt: ["beforeFillTransaction"]
        };
      if (Array.isArray(chain2?.prepareTransactionRequest))
        return {
          fn: chain2.prepareTransactionRequest[0],
          runAt: chain2.prepareTransactionRequest[1].runAt
        };
      return void 0;
    })();
    let chainId;
    async function getChainId2() {
      if (chainId)
        return chainId;
      if (typeof request.chainId !== "undefined")
        return request.chainId;
      if (chain2)
        return chain2.id;
      const chainId_ = await getAction(client, getChainId, "getChainId")({});
      chainId = chainId_;
      return chainId;
    }
    const account = account_ ? parseAccount(account_) : account_;
    let nonce = request.nonce;
    if (parameters.includes("nonce") && typeof nonce === "undefined" && account && nonceManager) {
      const chainId2 = await getChainId2();
      nonce = await nonceManager.consume({
        address: account.address,
        chainId: chainId2,
        client
      });
    }
    if (prepareTransactionRequest2?.fn && prepareTransactionRequest2.runAt?.includes("beforeFillTransaction")) {
      request = await prepareTransactionRequest2.fn({ ...request, chain: chain2 }, {
        phase: "beforeFillTransaction"
      });
      nonce ?? (nonce = request.nonce);
    }
    const attemptFill = (() => {
      if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && request.kzg && request.blobs)
        return false;
      if (supportsFillTransaction.get(client.uid) === false)
        return false;
      const shouldAttempt = ["fees", "gas"].some((parameter) => parameters.includes(parameter));
      if (!shouldAttempt)
        return false;
      if (parameters.includes("chainId") && typeof request.chainId !== "number")
        return true;
      if (parameters.includes("nonce") && typeof nonce !== "number")
        return true;
      if (parameters.includes("fees") && typeof request.gasPrice !== "bigint" && (typeof request.maxFeePerGas !== "bigint" || typeof request.maxPriorityFeePerGas !== "bigint"))
        return true;
      if (parameters.includes("gas") && typeof request.gas !== "bigint")
        return true;
      return false;
    })();
    const fillResult = attemptFill ? await getAction(client, fillTransaction, "fillTransaction")({ ...request, nonce }).then((result) => {
      const { chainId: chainId2, from: from14, gas: gas2, gasPrice, nonce: nonce2, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, type: type2, ...rest } = result.transaction;
      supportsFillTransaction.set(client.uid, true);
      return {
        ...request,
        ...from14 ? { from: from14 } : {},
        ...type2 && !request.type ? { type: type2 } : {},
        ...typeof chainId2 !== "undefined" ? { chainId: chainId2 } : {},
        ...typeof gas2 !== "undefined" ? { gas: gas2 } : {},
        ...typeof gasPrice !== "undefined" ? { gasPrice } : {},
        ...typeof nonce2 !== "undefined" ? { nonce: nonce2 } : {},
        ...typeof maxFeePerBlobGas !== "undefined" && request.type !== "legacy" && request.type !== "eip2930" ? { maxFeePerBlobGas } : {},
        ...typeof maxFeePerGas !== "undefined" && request.type !== "legacy" && request.type !== "eip2930" ? { maxFeePerGas } : {},
        ...typeof maxPriorityFeePerGas !== "undefined" && request.type !== "legacy" && request.type !== "eip2930" ? { maxPriorityFeePerGas } : {},
        ..."nonceKey" in rest && typeof rest.nonceKey !== "undefined" ? { nonceKey: rest.nonceKey } : {},
        ..."keyAuthorization" in rest && typeof rest.keyAuthorization !== "undefined" && rest.keyAuthorization !== null && !("keyAuthorization" in request) ? { keyAuthorization: rest.keyAuthorization } : {},
        ..."feePayerSignature" in rest && typeof rest.feePayerSignature !== "undefined" && rest.feePayerSignature !== null ? { feePayerSignature: rest.feePayerSignature } : {}
      };
    }).catch((e42) => {
      const error = e42;
      if (error.name !== "TransactionExecutionError")
        return request;
      const executionReverted = error.walk?.((e43) => {
        const error2 = e43;
        return error2.name === "ExecutionRevertedError";
      });
      if (executionReverted)
        throw e42;
      const unsupported = error.walk?.((e43) => {
        const error2 = e43;
        return error2.name === "MethodNotFoundRpcError" || error2.name === "MethodNotSupportedRpcError" || error2.message?.includes("eth_fillTransaction is not available");
      });
      if (unsupported)
        supportsFillTransaction.set(client.uid, false);
      return request;
    }) : request;
    nonce ?? (nonce = fillResult.nonce);
    request = {
      ...fillResult,
      ...account ? { from: account?.address } : {},
      ...nonce ? { nonce } : {}
    };
    const { blobs, gas, kzg, type } = request;
    if (prepareTransactionRequest2?.fn && prepareTransactionRequest2.runAt?.includes("beforeFillParameters")) {
      request = await prepareTransactionRequest2.fn({ ...request, chain: chain2 }, {
        phase: "beforeFillParameters"
      });
    }
    let block;
    async function getBlock2() {
      if (block)
        return block;
      block = await getAction(client, getBlock, "getBlock")({ blockTag: "latest" });
      return block;
    }
    if (parameters.includes("nonce") && typeof nonce === "undefined" && account && !nonceManager)
      request.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
        address: account.address,
        blockTag: "pending"
      });
    if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && blobs && kzg) {
      const commitments = blobsToCommitments({ blobs, kzg });
      if (parameters.includes("blobVersionedHashes")) {
        const versionedHashes = commitmentsToVersionedHashes({
          commitments,
          to: "hex"
        });
        request.blobVersionedHashes = versionedHashes;
      }
      if (parameters.includes("sidecars")) {
        const proofs = blobsToProofs({ blobs, commitments, kzg });
        const sidecars = toBlobSidecars({
          blobs,
          commitments,
          proofs,
          to: "hex"
        });
        request.sidecars = sidecars;
      }
    }
    if (parameters.includes("chainId"))
      request.chainId = await getChainId2();
    if ((parameters.includes("fees") || parameters.includes("type")) && typeof type === "undefined") {
      try {
        request.type = getTransactionType(request);
      } catch {
        let isEip1559Network = eip1559NetworkCache.get(client.uid);
        if (typeof isEip1559Network === "undefined") {
          const block2 = await getBlock2();
          isEip1559Network = typeof block2?.baseFeePerGas === "bigint";
          eip1559NetworkCache.set(client.uid, isEip1559Network);
        }
        request.type = isEip1559Network ? "eip1559" : "legacy";
      }
    }
    if (parameters.includes("fees")) {
      if (request.type !== "legacy" && request.type !== "eip2930") {
        if (typeof request.maxFeePerGas === "undefined" || typeof request.maxPriorityFeePerGas === "undefined") {
          const block2 = await getBlock2();
          const { maxFeePerGas, maxPriorityFeePerGas } = await internal_estimateFeesPerGas(client, {
            block: block2,
            chain: chain2,
            request
          });
          if (typeof request.maxPriorityFeePerGas === "undefined" && request.maxFeePerGas && request.maxFeePerGas < maxPriorityFeePerGas)
            throw new MaxFeePerGasTooLowError({
              maxPriorityFeePerGas
            });
          request.maxPriorityFeePerGas = maxPriorityFeePerGas;
          request.maxFeePerGas = maxFeePerGas;
        }
      } else {
        if (typeof request.maxFeePerGas !== "undefined" || typeof request.maxPriorityFeePerGas !== "undefined")
          throw new Eip1559FeesNotSupportedError();
        if (typeof request.gasPrice === "undefined") {
          const block2 = await getBlock2();
          const { gasPrice: gasPrice_ } = await internal_estimateFeesPerGas(client, {
            block: block2,
            chain: chain2,
            request,
            type: "legacy"
          });
          request.gasPrice = gasPrice_;
        }
      }
    }
    if (parameters.includes("gas") && typeof gas === "undefined")
      request.gas = await getAction(client, estimateGas, "estimateGas")({
        ...request,
        account,
        prepare: account?.type === "local" ? [] : ["blobVersionedHashes"]
      });
    if (prepareTransactionRequest2?.fn && prepareTransactionRequest2.runAt?.includes("afterFillParameters"))
      request = await prepareTransactionRequest2.fn({ ...request, chain: chain2 }, {
        phase: "afterFillParameters"
      });
    assertRequest(request);
    delete request.parameters;
    return request;
  }

  // node_modules/viem/_esm/actions/public/estimateGas.js
  async function estimateGas(client, args) {
    const { account: account_ = client.account, prepare = true } = args;
    const account = account_ ? parseAccount(account_) : void 0;
    const parameters = (() => {
      if (Array.isArray(prepare))
        return prepare;
      if (account?.type !== "local")
        return ["blobVersionedHashes"];
      return void 0;
    })();
    try {
      const to = await (async () => {
        if (args.to)
          return args.to;
        if (args.authorizationList && args.authorizationList.length > 0)
          return await recoverAuthorizationAddress({
            authorization: args.authorizationList[0]
          }).catch(() => {
            throw new BaseError2("`to` is required. Could not infer from `authorizationList`");
          });
        return void 0;
      })();
      const { accessList, authorizationList, blobs, blobVersionedHashes, blockNumber, blockTag, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, stateOverride, ...rest } = prepare ? await prepareTransactionRequest(client, {
        ...args,
        parameters,
        to
      }) : args;
      if (gas && args.gas !== gas)
        return gas;
      const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
      const block = blockNumberHex || blockTag;
      const rpcStateOverride = serializeStateOverride(stateOverride);
      assertRequest(args);
      const chainFormat = client.chain?.formatters?.transactionRequest?.format;
      const format = chainFormat || formatTransactionRequest;
      const request = format({
        // Pick out extra data that might exist on the chain's transaction request type.
        ...extract(rest, { format: chainFormat }),
        account,
        accessList,
        authorizationList,
        blobs,
        blobVersionedHashes,
        data,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to,
        value
      }, "estimateGas");
      return BigInt(await client.request({
        method: "eth_estimateGas",
        params: rpcStateOverride ? [
          request,
          block ?? client.experimental_blockTag ?? "latest",
          rpcStateOverride
        ] : block ? [request, block] : [request]
      }));
    } catch (err) {
      throw getEstimateGasError(err, {
        ...args,
        account,
        chain: client.chain
      });
    }
  }

  // node_modules/viem/_esm/actions/public/estimateContractGas.js
  async function estimateContractGas(client, parameters) {
    const { abi: abi2, address, args, functionName, dataSuffix = typeof client.dataSuffix === "string" ? client.dataSuffix : client.dataSuffix?.value, ...request } = parameters;
    const data = encodeFunctionData({
      abi: abi2,
      args,
      functionName
    });
    try {
      const gas = await getAction(client, estimateGas, "estimateGas")({
        data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
        to: address,
        ...request
      });
      return gas;
    } catch (error) {
      const account = request.account ? parseAccount(request.account) : void 0;
      throw getContractError(error, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/estimateContractGas",
        functionName,
        sender: account?.address
      });
    }
  }

  // node_modules/viem/_esm/actions/public/getContractEvents.js
  init_getAbiItem();

  // node_modules/viem/_esm/utils/abi/parseEventLogs.js
  init_isAddressEqual();
  init_toBytes();

  // node_modules/viem/_esm/utils/formatters/log.js
  function formatLog(log, { args, eventName } = {}) {
    return {
      ...log,
      blockHash: log.blockHash ? log.blockHash : null,
      blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
      blockTimestamp: log.blockTimestamp ? BigInt(log.blockTimestamp) : log.blockTimestamp === null ? null : void 0,
      logIndex: log.logIndex ? Number(log.logIndex) : null,
      transactionHash: log.transactionHash ? log.transactionHash : null,
      transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
      ...eventName ? { args, eventName } : {}
    };
  }

  // node_modules/viem/_esm/utils/abi/parseEventLogs.js
  init_keccak256();
  init_toEventSelector();

  // node_modules/viem/_esm/utils/abi/decodeEventLog.js
  init_abi();
  init_cursor();
  init_size();
  init_toEventSelector();
  init_decodeAbiParameters();
  init_formatAbiItem2();
  var docsPath3 = "/docs/contract/decodeEventLog";
  function decodeEventLog(parameters) {
    const { abi: abi2, data, strict: strict_, topics } = parameters;
    const strict = strict_ ?? true;
    const [signature, ...argTopics] = topics;
    if (!signature)
      throw new AbiEventSignatureEmptyTopicsError({ docsPath: docsPath3 });
    const abiItem = abi2.find((x) => x.type === "event" && signature === toEventSelector(formatAbiItem2(x)));
    if (!(abiItem && "name" in abiItem) || abiItem.type !== "event")
      throw new AbiEventSignatureNotFoundError(signature, { docsPath: docsPath3 });
    const { name, inputs } = abiItem;
    const isUnnamed = inputs?.some((x) => !("name" in x && x.name));
    const args = isUnnamed ? [] : {};
    const indexedInputs = inputs.map((x, i20) => [x, i20]).filter(([x]) => "indexed" in x && x.indexed);
    const missingIndexedInputs = [];
    for (let i20 = 0; i20 < indexedInputs.length; i20++) {
      const [param, argIndex] = indexedInputs[i20];
      const topic = argTopics[i20];
      if (!topic) {
        if (strict)
          throw new DecodeLogTopicsMismatch({
            abiItem,
            param
          });
        missingIndexedInputs.push([param, argIndex]);
        continue;
      }
      args[isUnnamed ? argIndex : param.name || argIndex] = decodeTopic({
        param,
        value: topic
      });
    }
    const nonIndexedInputs = inputs.filter((x) => !("indexed" in x && x.indexed));
    const inputsToDecode = strict ? nonIndexedInputs : [...missingIndexedInputs.map(([param]) => param), ...nonIndexedInputs];
    if (inputsToDecode.length > 0) {
      if (data && data !== "0x") {
        try {
          const decodedData = decodeAbiParameters(inputsToDecode, data);
          if (decodedData) {
            let dataIndex = 0;
            if (!strict) {
              for (const [param, argIndex] of missingIndexedInputs) {
                args[isUnnamed ? argIndex : param.name || argIndex] = decodedData[dataIndex++];
              }
            }
            if (isUnnamed) {
              for (let i20 = 0; i20 < inputs.length; i20++)
                if (args[i20] === void 0 && dataIndex < decodedData.length)
                  args[i20] = decodedData[dataIndex++];
            } else
              for (let i20 = 0; i20 < nonIndexedInputs.length; i20++)
                args[nonIndexedInputs[i20].name] = decodedData[dataIndex++];
          }
        } catch (err) {
          if (strict) {
            if (err instanceof AbiDecodingDataSizeTooSmallError || err instanceof PositionOutOfBoundsError)
              throw new DecodeLogDataMismatch({
                abiItem,
                data,
                params: inputsToDecode,
                size: size(data)
              });
            throw err;
          }
        }
      } else if (strict) {
        throw new DecodeLogDataMismatch({
          abiItem,
          data: "0x",
          params: inputsToDecode,
          size: 0
        });
      }
    }
    return {
      eventName: name,
      args: Object.values(args).length > 0 ? args : void 0
    };
  }
  function decodeTopic({ param, value }) {
    if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
      return value;
    const decodedArg = decodeAbiParameters([param], value) || [];
    return decodedArg[0];
  }

  // node_modules/viem/_esm/utils/abi/parseEventLogs.js
  function parseEventLogs(parameters) {
    const { abi: abi2, args, logs, strict = true } = parameters;
    const eventName = (() => {
      if (!parameters.eventName)
        return void 0;
      if (Array.isArray(parameters.eventName))
        return parameters.eventName;
      return [parameters.eventName];
    })();
    const abiTopics = abi2.filter((abiItem) => abiItem.type === "event").map((abiItem) => ({
      abi: abiItem,
      selector: toEventSelector(abiItem)
    }));
    return logs.map((log) => {
      const formattedLog = typeof log.blockNumber === "string" ? formatLog(log) : log;
      const abiItems = abiTopics.filter((abiTopic) => formattedLog.topics[0] === abiTopic.selector);
      if (abiItems.length === 0)
        return null;
      let event;
      let abiItem;
      for (const item of abiItems) {
        try {
          event = decodeEventLog({
            ...formattedLog,
            abi: [item.abi],
            strict: true
          });
          abiItem = item;
          break;
        } catch {
        }
      }
      if (!event && !strict) {
        abiItem = abiItems[0];
        try {
          event = decodeEventLog({
            data: formattedLog.data,
            topics: formattedLog.topics,
            abi: [abiItem.abi],
            strict: false
          });
        } catch {
          const isUnnamed = abiItem.abi.inputs?.some((x) => !("name" in x && x.name));
          return {
            ...formattedLog,
            args: isUnnamed ? [] : {},
            eventName: abiItem.abi.name
          };
        }
      }
      if (!event || !abiItem)
        return null;
      if (eventName && !eventName.includes(event.eventName))
        return null;
      if (!includesArgs({
        args: event.args,
        inputs: abiItem.abi.inputs,
        matchArgs: args
      }))
        return null;
      return { ...event, ...formattedLog };
    }).filter(Boolean);
  }
  function includesArgs(parameters) {
    const { args, inputs, matchArgs } = parameters;
    if (!matchArgs)
      return true;
    if (!args)
      return false;
    function isEqual2(input, value, arg) {
      try {
        if (input.type === "address")
          return isAddressEqual(value, arg);
        if (input.type === "string" || input.type === "bytes")
          return keccak256(toBytes(value)) === arg;
        return value === arg;
      } catch {
        return false;
      }
    }
    if (Array.isArray(args) && Array.isArray(matchArgs)) {
      return matchArgs.every((value, index2) => {
        if (value === null || value === void 0)
          return true;
        const input = inputs[index2];
        if (!input)
          return false;
        const value_ = Array.isArray(value) ? value : [value];
        return value_.some((value2) => isEqual2(input, value2, args[index2]));
      });
    }
    if (typeof args === "object" && !Array.isArray(args) && typeof matchArgs === "object" && !Array.isArray(matchArgs))
      return Object.entries(matchArgs).every(([key, value]) => {
        if (value === null || value === void 0)
          return true;
        const input = inputs.find((input2) => input2.name === key);
        if (!input)
          return false;
        const value_ = Array.isArray(value) ? value : [value];
        return value_.some((value2) => isEqual2(input, value2, args[key]));
      });
    return false;
  }

  // node_modules/viem/_esm/actions/public/getLogs.js
  init_toHex();
  async function getLogs(client, { address, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_ } = {}) {
    const strict = strict_ ?? false;
    const events = events_ ?? (event ? [event] : void 0);
    let topics = [];
    if (events) {
      const encoded = events.flatMap((event2) => encodeEventTopics({
        abi: [event2],
        eventName: event2.name,
        args: events_ ? void 0 : args
      }));
      topics = [encoded];
      if (event)
        topics = topics[0];
    }
    let logs;
    if (blockHash) {
      logs = await client.request({
        method: "eth_getLogs",
        params: [{ address, topics, blockHash }]
      });
    } else {
      logs = await client.request({
        method: "eth_getLogs",
        params: [
          {
            address,
            topics,
            fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
            toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock
          }
        ]
      });
    }
    const formattedLogs = logs.map((log) => formatLog(log));
    if (!events)
      return formattedLogs;
    return parseEventLogs({
      abi: events,
      args,
      logs: formattedLogs,
      strict
    });
  }

  // node_modules/viem/_esm/actions/public/getContractEvents.js
  async function getContractEvents(client, parameters) {
    const { abi: abi2, address, args, blockHash, eventName, fromBlock, toBlock, strict } = parameters;
    const event = eventName ? getAbiItem({ abi: abi2, name: eventName }) : void 0;
    const events = !event ? abi2.filter((x) => x.type === "event") : void 0;
    return getAction(client, getLogs, "getLogs")({
      address,
      args,
      blockHash,
      event,
      events,
      fromBlock,
      toBlock,
      strict
    });
  }

  // node_modules/viem/_esm/actions/public/readContract.js
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_call();
  async function readContract(client, parameters) {
    const { abi: abi2, address, args, functionName, ...rest } = parameters;
    const calldata = encodeFunctionData({
      abi: abi2,
      args,
      functionName
    });
    try {
      const { data } = await getAction(client, call, "call")({
        ...rest,
        data: calldata,
        to: address
      });
      return decodeFunctionResult({
        abi: abi2,
        args,
        functionName,
        data: data || "0x"
      });
    } catch (error) {
      throw getContractError(error, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/readContract",
        functionName
      });
    }
  }

  // node_modules/viem/_esm/actions/public/simulateContract.js
  init_parseAccount();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_call();
  async function simulateContract(client, parameters) {
    const { abi: abi2, address, args, functionName, dataSuffix = typeof client.dataSuffix === "string" ? client.dataSuffix : client.dataSuffix?.value, ...callRequest } = parameters;
    const account = callRequest.account ? parseAccount(callRequest.account) : client.account;
    const calldata = encodeFunctionData({ abi: abi2, args, functionName });
    try {
      const { data } = await getAction(client, call, "call")({
        batch: false,
        data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
        to: address,
        ...callRequest,
        account
      });
      const result = decodeFunctionResult({
        abi: abi2,
        args,
        functionName,
        data: data || "0x"
      });
      const minimizedAbi = abi2.filter((abiItem) => "name" in abiItem && abiItem.name === parameters.functionName);
      return {
        result,
        request: {
          abi: minimizedAbi,
          address,
          args,
          dataSuffix,
          functionName,
          ...callRequest,
          account
        }
      };
    } catch (error) {
      throw getContractError(error, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/simulateContract",
        functionName,
        sender: account?.address
      });
    }
  }

  // node_modules/viem/_esm/actions/public/watchContractEvent.js
  init_abi();
  init_rpc();

  // node_modules/viem/_esm/utils/observe.js
  var listenersCache = /* @__PURE__ */ new Map();
  var cleanupCache = /* @__PURE__ */ new Map();
  var callbackCount = 0;
  function observe(observerId, callbacks, fn) {
    const callbackId = ++callbackCount;
    const getListeners = () => listenersCache.get(observerId) || [];
    const unsubscribe = () => {
      const listeners2 = getListeners();
      listenersCache.set(observerId, listeners2.filter((cb) => cb.id !== callbackId));
    };
    const unwatch = () => {
      const listeners2 = getListeners();
      if (!listeners2.some((cb) => cb.id === callbackId))
        return;
      const cleanup2 = cleanupCache.get(observerId);
      if (listeners2.length === 1 && cleanup2) {
        const p14 = cleanup2();
        if (p14 instanceof Promise)
          p14.catch(() => {
          });
      }
      unsubscribe();
    };
    const listeners = getListeners();
    listenersCache.set(observerId, [
      ...listeners,
      { id: callbackId, fns: callbacks }
    ]);
    if (listeners && listeners.length > 0)
      return unwatch;
    const emit = {};
    for (const key in callbacks) {
      emit[key] = ((...args) => {
        const listeners2 = getListeners();
        if (listeners2.length === 0)
          return;
        for (const listener of listeners2)
          listener.fns[key]?.(...args);
      });
    }
    const cleanup = fn(emit);
    if (typeof cleanup === "function")
      cleanupCache.set(observerId, cleanup);
    return unwatch;
  }

  // node_modules/viem/_esm/utils/wait.js
  async function wait(time) {
    return new Promise((res) => setTimeout(res, time));
  }

  // node_modules/viem/_esm/utils/poll.js
  function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
    let active = true;
    const unwatch = () => active = false;
    const watch = async () => {
      let data;
      if (emitOnBegin)
        data = await fn({ unpoll: unwatch });
      const initialWait = await initialWaitTime?.(data) ?? interval;
      await wait(initialWait);
      const poll2 = async () => {
        if (!active)
          return;
        await fn({ unpoll: unwatch });
        await wait(interval);
        poll2();
      };
      poll2();
    };
    watch();
    return unwatch;
  }

  // node_modules/viem/_esm/actions/public/watchContractEvent.js
  init_stringify();

  // node_modules/viem/_esm/utils/promise/withCache.js
  var promiseCache = /* @__PURE__ */ new Map();
  var responseCache = /* @__PURE__ */ new Map();
  function getCache(cacheKey2) {
    const buildCache = (cacheKey3, cache) => ({
      clear: () => cache.delete(cacheKey3),
      get: () => cache.get(cacheKey3),
      set: (data) => cache.set(cacheKey3, data)
    });
    const promise = buildCache(cacheKey2, promiseCache);
    const response = buildCache(cacheKey2, responseCache);
    return {
      clear: () => {
        promise.clear();
        response.clear();
      },
      promise,
      response
    };
  }
  async function withCache(fn, { cacheKey: cacheKey2, cacheTime = Number.POSITIVE_INFINITY }) {
    const cache = getCache(cacheKey2);
    const response = cache.response.get();
    if (response && cacheTime > 0) {
      const age = Date.now() - response.created.getTime();
      if (age < cacheTime)
        return response.data;
    }
    let promise = cache.promise.get();
    if (!promise) {
      promise = fn();
      cache.promise.set(promise);
    }
    try {
      const data = await promise;
      cache.response.set({ created: /* @__PURE__ */ new Date(), data });
      return data;
    } finally {
      cache.promise.clear();
    }
  }

  // node_modules/viem/_esm/actions/public/getBlockNumber.js
  var cacheKey = (id) => `blockNumber.${id}`;
  async function getBlockNumber(client, { cacheTime = client.cacheTime } = {}) {
    const blockNumberHex = await withCache(() => client.request({
      method: "eth_blockNumber"
    }), { cacheKey: cacheKey(client.uid), cacheTime });
    return BigInt(blockNumberHex);
  }

  // node_modules/viem/_esm/actions/public/getFilterChanges.js
  async function getFilterChanges(_client, { filter }) {
    const strict = "strict" in filter && filter.strict;
    const logs = await filter.request({
      method: "eth_getFilterChanges",
      params: [filter.id]
    });
    if (typeof logs[0] === "string")
      return logs;
    const formattedLogs = logs.map((log) => formatLog(log));
    if (!("abi" in filter) || !filter.abi)
      return formattedLogs;
    return parseEventLogs({
      abi: filter.abi,
      logs: formattedLogs,
      strict
    });
  }

  // node_modules/viem/_esm/actions/public/uninstallFilter.js
  async function uninstallFilter(_client, { filter }) {
    return filter.request({
      method: "eth_uninstallFilter",
      params: [filter.id]
    });
  }

  // node_modules/viem/_esm/actions/public/watchContractEvent.js
  function watchContractEvent(client, parameters) {
    const { abi: abi2, address, args, batch = true, eventName, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ } = parameters;
    const enablePolling = (() => {
      if (typeof poll_ !== "undefined")
        return poll_;
      if (typeof fromBlock === "bigint")
        return true;
      if (client.transport.type === "webSocket" || client.transport.type === "ipc")
        return false;
      if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
        return false;
      return true;
    })();
    const pollContractEvent = () => {
      const strict = strict_ ?? false;
      const observerId = stringify([
        "watchContractEvent",
        address,
        args,
        batch,
        client.uid,
        eventName,
        pollingInterval,
        strict,
        fromBlock
      ]);
      return observe(observerId, { onLogs, onError }, (emit) => {
        let previousBlockNumber;
        if (fromBlock !== void 0)
          previousBlockNumber = fromBlock - 1n;
        let filter;
        let initialized = false;
        const unwatch = poll(async () => {
          if (!initialized) {
            try {
              filter = await getAction(client, createContractEventFilter, "createContractEventFilter")({
                abi: abi2,
                address,
                args,
                eventName,
                strict,
                fromBlock
              });
            } catch {
            }
            initialized = true;
            return;
          }
          try {
            let logs;
            if (filter) {
              logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
            } else {
              const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
              if (previousBlockNumber && previousBlockNumber < blockNumber) {
                logs = await getAction(client, getContractEvents, "getContractEvents")({
                  abi: abi2,
                  address,
                  args,
                  eventName,
                  fromBlock: previousBlockNumber + 1n,
                  toBlock: blockNumber,
                  strict
                });
              } else {
                logs = [];
              }
              previousBlockNumber = blockNumber;
            }
            if (logs.length === 0)
              return;
            if (batch)
              emit.onLogs(logs);
            else
              for (const log of logs)
                emit.onLogs([log]);
          } catch (err) {
            if (filter && err instanceof InvalidInputRpcError)
              initialized = false;
            emit.onError?.(err);
          }
        }, {
          emitOnBegin: true,
          interval: pollingInterval
        });
        return async () => {
          if (filter)
            await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
          unwatch();
        };
      });
    };
    const subscribeContractEvent = () => {
      const strict = strict_ ?? false;
      const observerId = stringify([
        "watchContractEvent",
        address,
        args,
        batch,
        client.uid,
        eventName,
        pollingInterval,
        strict
      ]);
      let active = true;
      let unsubscribe = () => active = false;
      return observe(observerId, { onLogs, onError }, (emit) => {
        ;
        (async () => {
          try {
            const transport = (() => {
              if (client.transport.type === "fallback") {
                const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
                if (!transport2)
                  return client.transport;
                return transport2.value;
              }
              return client.transport;
            })();
            const topics = eventName ? encodeEventTopics({
              abi: abi2,
              eventName,
              args
            }) : [];
            const { unsubscribe: unsubscribe_ } = await transport.subscribe({
              params: ["logs", { address, topics }],
              onData(data) {
                if (!active)
                  return;
                const log = data.result;
                try {
                  const { eventName: eventName2, args: args2 } = decodeEventLog({
                    abi: abi2,
                    data: log.data,
                    topics: log.topics,
                    strict: strict_
                  });
                  const formatted = formatLog(log, {
                    args: args2,
                    eventName: eventName2
                  });
                  emit.onLogs([formatted]);
                } catch (err) {
                  let eventName2;
                  let isUnnamed;
                  if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                    if (strict_)
                      return;
                    eventName2 = err.abiItem.name;
                    isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
                  }
                  const formatted = formatLog(log, {
                    args: isUnnamed ? [] : {},
                    eventName: eventName2
                  });
                  emit.onLogs([formatted]);
                }
              },
              onError(error) {
                emit.onError?.(error);
              }
            });
            unsubscribe = unsubscribe_;
            if (!active)
              unsubscribe();
          } catch (err) {
            onError?.(err);
          }
        })();
        return () => unsubscribe();
      });
    };
    return enablePolling ? pollContractEvent() : subscribeContractEvent();
  }

  // node_modules/viem/_esm/actions/wallet/sendRawTransaction.js
  async function sendRawTransaction(client, { serializedTransaction }) {
    return client.request({
      method: "eth_sendRawTransaction",
      params: [serializedTransaction]
    }, { retryCount: 0 });
  }

  // node_modules/viem/_esm/utils/promise/withRetry.js
  function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry: shouldRetry2 = () => true } = {}) {
    return new Promise((resolve, reject) => {
      const attemptRetry = async ({ count = 0 } = {}) => {
        const retry = async ({ error }) => {
          const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
          if (delay)
            await wait(delay);
          attemptRetry({ count: count + 1 });
        };
        try {
          const data = await fn();
          resolve(data);
        } catch (err) {
          if (count < retryCount && await shouldRetry2({ count, error: err }))
            return retry({ error: err });
          reject(err);
        }
      };
      attemptRetry();
    });
  }

  // node_modules/viem/_esm/utils/formatters/transactionReceipt.js
  init_fromHex();
  var receiptStatuses = {
    "0x0": "reverted",
    "0x1": "success"
  };
  function formatTransactionReceipt(transactionReceipt, _4) {
    const receipt = {
      ...transactionReceipt,
      blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
      contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
      cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
      effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
      gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
      logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
      to: transactionReceipt.to ? transactionReceipt.to : null,
      transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
      status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
      type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
    };
    if (transactionReceipt.blobGasPrice)
      receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
    if (transactionReceipt.blobGasUsed)
      receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
    return receipt;
  }

  // node_modules/viem/_esm/clients/createClient.js
  init_parseAccount();

  // node_modules/viem/_esm/utils/uid.js
  var size4 = 256;
  var index = size4;
  var buffer;
  function uid(length = 11) {
    if (!buffer || index + length > size4 * 2) {
      buffer = "";
      index = 0;
      for (let i20 = 0; i20 < size4; i20++) {
        buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
      }
    }
    return buffer.substring(index, index++ + length);
  }

  // node_modules/viem/_esm/clients/createClient.js
  function createClient(parameters) {
    const { batch, chain: chain2, ccipRead, dataSuffix, key = "base", name = "Base Client", type = "base" } = parameters;
    const experimental_blockTag = parameters.experimental_blockTag ?? (typeof chain2?.experimental_preconfirmationTime === "number" ? "pending" : void 0);
    const blockTime = chain2?.blockTime ?? 12e3;
    const defaultPollingInterval = Math.min(Math.max(Math.floor(blockTime / 2), 500), 4e3);
    const pollingInterval = parameters.pollingInterval ?? defaultPollingInterval;
    const cacheTime = parameters.cacheTime ?? pollingInterval;
    const account = parameters.account ? parseAccount(parameters.account) : void 0;
    const { config, request, value } = parameters.transport({
      account,
      chain: chain2,
      pollingInterval
    });
    const transport = { ...config, ...value };
    const client = {
      account,
      batch,
      cacheTime,
      ccipRead,
      chain: chain2,
      dataSuffix,
      key,
      name,
      pollingInterval,
      request,
      transport,
      type,
      uid: uid(),
      ...experimental_blockTag ? { experimental_blockTag } : {}
    };
    function extend(base) {
      return (extendFn) => {
        const extended = extendFn(base);
        for (const key2 in client)
          delete extended[key2];
        const combined = { ...base, ...extended };
        return Object.assign(combined, { extend: extend(combined) });
      };
    }
    return Object.assign(client, { extend: extend(client) });
  }

  // node_modules/viem/_esm/actions/ens/getEnsAddress.js
  init_abis();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_getChainContractAddress();
  init_trim();
  init_toHex();

  // node_modules/viem/_esm/utils/ens/errors.js
  init_base();
  init_contract();
  function isNullUniversalResolverError(err) {
    if (!(err instanceof BaseError2))
      return false;
    const cause = err.walk((e42) => e42 instanceof ContractFunctionRevertedError);
    if (!(cause instanceof ContractFunctionRevertedError))
      return false;
    if (cause.data?.errorName === "HttpError")
      return true;
    if (cause.data?.errorName === "ResolverError")
      return true;
    if (cause.data?.errorName === "ResolverNotContract")
      return true;
    if (cause.data?.errorName === "ResolverNotFound")
      return true;
    if (cause.data?.errorName === "ReverseAddressMismatch")
      return true;
    if (cause.data?.errorName === "UnsupportedResolverProfile")
      return true;
    return false;
  }

  // node_modules/viem/_esm/actions/ens/getEnsAddress.js
  init_localBatchGatewayRequest();

  // node_modules/viem/_esm/utils/ens/namehash.js
  init_concat();
  init_toBytes();
  init_toHex();
  init_keccak256();

  // node_modules/viem/_esm/utils/ens/encodedLabelToLabelhash.js
  init_isHex();
  function encodedLabelToLabelhash(label) {
    if (label.length !== 66)
      return null;
    if (label.indexOf("[") !== 0)
      return null;
    if (label.indexOf("]") !== 65)
      return null;
    const hash3 = `0x${label.slice(1, 65)}`;
    if (!isHex(hash3))
      return null;
    return hash3;
  }

  // node_modules/viem/_esm/utils/ens/namehash.js
  function namehash(name) {
    let result = new Uint8Array(32).fill(0);
    if (!name)
      return bytesToHex(result);
    const labels = name.split(".");
    for (let i20 = labels.length - 1; i20 >= 0; i20 -= 1) {
      const hashFromEncodedLabel = encodedLabelToLabelhash(labels[i20]);
      const hashed = hashFromEncodedLabel ? toBytes(hashFromEncodedLabel) : keccak256(stringToBytes(labels[i20]), "bytes");
      result = keccak256(concat([result, hashed]), "bytes");
    }
    return bytesToHex(result);
  }

  // node_modules/viem/_esm/utils/ens/packetToBytes.js
  init_toBytes();

  // node_modules/viem/_esm/utils/ens/encodeLabelhash.js
  function encodeLabelhash(hash3) {
    return `[${hash3.slice(2)}]`;
  }

  // node_modules/viem/_esm/utils/ens/labelhash.js
  init_toBytes();
  init_toHex();
  init_keccak256();
  function labelhash(label) {
    const result = new Uint8Array(32).fill(0);
    if (!label)
      return bytesToHex(result);
    return encodedLabelToLabelhash(label) || keccak256(stringToBytes(label));
  }

  // node_modules/viem/_esm/utils/ens/packetToBytes.js
  function packetToBytes(packet) {
    const value = packet.replace(/^\.|\.$/gm, "");
    if (value.length === 0)
      return new Uint8Array(1);
    const bytes = new Uint8Array(stringToBytes(value).byteLength + 2);
    let offset = 0;
    const list = value.split(".");
    for (let i20 = 0; i20 < list.length; i20++) {
      let encoded = stringToBytes(list[i20]);
      if (encoded.byteLength > 255)
        encoded = stringToBytes(encodeLabelhash(labelhash(list[i20])));
      bytes[offset] = encoded.length;
      bytes.set(encoded, offset + 1);
      offset += encoded.length + 1;
    }
    if (bytes.byteLength !== offset + 1)
      return bytes.slice(0, offset + 1);
    return bytes;
  }

  // node_modules/viem/_esm/actions/ens/getEnsAddress.js
  async function getEnsAddress(client, parameters) {
    const { blockNumber, blockTag, coinType, name, gatewayUrls, strict } = parameters;
    const { chain: chain2 } = client;
    const universalResolverAddress = (() => {
      if (parameters.universalResolverAddress)
        return parameters.universalResolverAddress;
      if (!chain2)
        throw new Error("client chain not configured. universalResolverAddress is required.");
      return getChainContractAddress({
        blockNumber,
        chain: chain2,
        contract: "ensUniversalResolver"
      });
    })();
    const tlds = chain2?.ensTlds;
    if (tlds && !tlds.some((tld) => name.endsWith(tld)))
      return null;
    const args = (() => {
      if (coinType != null)
        return [namehash(name), BigInt(coinType)];
      return [namehash(name)];
    })();
    try {
      const functionData = encodeFunctionData({
        abi: addressResolverAbi,
        functionName: "addr",
        args
      });
      const readContractParameters = {
        address: universalResolverAddress,
        abi: universalResolverResolveAbi,
        functionName: "resolveWithGateways",
        args: [
          toHex(packetToBytes(name)),
          functionData,
          gatewayUrls ?? [localBatchGatewayUrl]
        ],
        blockNumber,
        blockTag
      };
      const readContractAction = getAction(client, readContract, "readContract");
      const res = await readContractAction(readContractParameters);
      if (res[0] === "0x")
        return null;
      const address = decodeFunctionResult({
        abi: addressResolverAbi,
        args,
        functionName: "addr",
        data: res[0]
      });
      if (address === "0x")
        return null;
      if (trim(address) === "0x00")
        return null;
      return address;
    } catch (err) {
      if (strict)
        throw err;
      if (isNullUniversalResolverError(err))
        return null;
      throw err;
    }
  }

  // node_modules/viem/_esm/errors/ens.js
  init_base();
  var EnsAvatarInvalidMetadataError = class extends BaseError2 {
    constructor({ data }) {
      super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
        metaMessages: [
          "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
          "",
          `Provided data: ${JSON.stringify(data)}`
        ],
        name: "EnsAvatarInvalidMetadataError"
      });
    }
  };
  var EnsAvatarInvalidNftUriError = class extends BaseError2 {
    constructor({ reason }) {
      super(`ENS NFT avatar URI is invalid. ${reason}`, {
        name: "EnsAvatarInvalidNftUriError"
      });
    }
  };
  var EnsAvatarUriResolutionError = class extends BaseError2 {
    constructor({ uri }) {
      super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`, { name: "EnsAvatarUriResolutionError" });
    }
  };
  var EnsAvatarUnsupportedNamespaceError = class extends BaseError2 {
    constructor({ namespace }) {
      super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`, { name: "EnsAvatarUnsupportedNamespaceError" });
    }
  };

  // node_modules/viem/_esm/utils/ens/avatar/utils.js
  var networkRegex = /(?<protocol>https?:\/\/[^/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/;
  var ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/;
  var base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
  var dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
  async function isImageUri(uri) {
    try {
      const res = await fetch(uri, { method: "HEAD" });
      if (res.status === 200) {
        const contentType = res.headers.get("content-type");
        return contentType?.startsWith("image/");
      }
      return false;
    } catch (error) {
      if (typeof error === "object" && typeof error.response !== "undefined") {
        return false;
      }
      if (!Object.hasOwn(globalThis, "Image"))
        return false;
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve(true);
        };
        img.onerror = () => {
          resolve(false);
        };
        img.src = uri;
      });
    }
  }
  function getGateway(custom, defaultGateway) {
    if (!custom)
      return defaultGateway;
    if (custom.endsWith("/"))
      return custom.slice(0, -1);
    return custom;
  }
  function resolveAvatarUri({ uri, gatewayUrls }) {
    const isEncoded = base64Regex.test(uri);
    if (isEncoded)
      return { uri, isOnChain: true, isEncoded };
    const ipfsGateway = getGateway(gatewayUrls?.ipfs, "https://ipfs.io");
    const arweaveGateway = getGateway(gatewayUrls?.arweave, "https://arweave.net");
    const networkRegexMatch = uri.match(networkRegex);
    const { protocol, subpath, target, subtarget = "" } = networkRegexMatch?.groups || {};
    const isIPNS = protocol === "ipns:/" || subpath === "ipns/";
    const isIPFS = protocol === "ipfs:/" || subpath === "ipfs/" || ipfsHashRegex.test(uri);
    if (uri.startsWith("http") && !isIPNS && !isIPFS) {
      let replacedUri = uri;
      if (gatewayUrls?.arweave)
        replacedUri = uri.replace(/https:\/\/arweave.net/g, gatewayUrls?.arweave);
      return { uri: replacedUri, isOnChain: false, isEncoded: false };
    }
    if ((isIPNS || isIPFS) && target) {
      return {
        uri: `${ipfsGateway}/${isIPNS ? "ipns" : "ipfs"}/${target}${subtarget}`,
        isOnChain: false,
        isEncoded: false
      };
    }
    if (protocol === "ar:/" && target) {
      return {
        uri: `${arweaveGateway}/${target}${subtarget || ""}`,
        isOnChain: false,
        isEncoded: false
      };
    }
    let parsedUri = uri.replace(dataURIRegex, "");
    if (parsedUri.startsWith("<svg")) {
      parsedUri = `data:image/svg+xml;base64,${btoa(parsedUri)}`;
    }
    if (parsedUri.startsWith("data:") || parsedUri.startsWith("{")) {
      return {
        uri: parsedUri,
        isOnChain: true,
        isEncoded: false
      };
    }
    throw new EnsAvatarUriResolutionError({ uri });
  }
  function getJsonImage(data) {
    if (typeof data !== "object" || !("image" in data) && !("image_url" in data) && !("image_data" in data)) {
      throw new EnsAvatarInvalidMetadataError({ data });
    }
    return data.image || data.image_url || data.image_data;
  }
  async function getMetadataAvatarUri({ gatewayUrls, uri }) {
    try {
      const res = await fetch(uri).then((res2) => res2.json());
      const image = await parseAvatarUri({
        gatewayUrls,
        uri: getJsonImage(res)
      });
      return image;
    } catch {
      throw new EnsAvatarUriResolutionError({ uri });
    }
  }
  async function parseAvatarUri({ gatewayUrls, uri }) {
    const { uri: resolvedURI, isOnChain } = resolveAvatarUri({ uri, gatewayUrls });
    if (isOnChain)
      return resolvedURI;
    const isImage = await isImageUri(resolvedURI);
    if (isImage)
      return resolvedURI;
    throw new EnsAvatarUriResolutionError({ uri });
  }
  function parseNftUri(uri_) {
    let uri = uri_;
    if (uri.startsWith("did:nft:")) {
      uri = uri.replace("did:nft:", "").replace(/_/g, "/");
    }
    const [reference, asset_namespace, tokenID] = uri.split("/");
    const [eip_namespace, chainID] = reference.split(":");
    const [erc_namespace, contractAddress] = asset_namespace.split(":");
    if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155")
      throw new EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
    if (!chainID)
      throw new EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
    if (!contractAddress)
      throw new EnsAvatarInvalidNftUriError({
        reason: "Contract address not found"
      });
    if (!tokenID)
      throw new EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
    if (!erc_namespace)
      throw new EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
    return {
      chainID: Number.parseInt(chainID, 10),
      namespace: erc_namespace.toLowerCase(),
      contractAddress,
      tokenID
    };
  }
  async function getNftTokenUri(client, { nft }) {
    if (nft.namespace === "erc721") {
      return readContract(client, {
        address: nft.contractAddress,
        abi: [
          {
            name: "tokenURI",
            type: "function",
            stateMutability: "view",
            inputs: [{ name: "tokenId", type: "uint256" }],
            outputs: [{ name: "", type: "string" }]
          }
        ],
        functionName: "tokenURI",
        args: [BigInt(nft.tokenID)]
      });
    }
    if (nft.namespace === "erc1155") {
      return readContract(client, {
        address: nft.contractAddress,
        abi: [
          {
            name: "uri",
            type: "function",
            stateMutability: "view",
            inputs: [{ name: "_id", type: "uint256" }],
            outputs: [{ name: "", type: "string" }]
          }
        ],
        functionName: "uri",
        args: [BigInt(nft.tokenID)]
      });
    }
    throw new EnsAvatarUnsupportedNamespaceError({ namespace: nft.namespace });
  }

  // node_modules/viem/_esm/utils/ens/avatar/parseAvatarRecord.js
  async function parseAvatarRecord(client, { gatewayUrls, record }) {
    if (/eip155:/i.test(record))
      return parseNftAvatarUri(client, { gatewayUrls, record });
    return parseAvatarUri({ uri: record, gatewayUrls });
  }
  async function parseNftAvatarUri(client, { gatewayUrls, record }) {
    const nft = parseNftUri(record);
    const nftUri = await getNftTokenUri(client, { nft });
    const { uri: resolvedNftUri, isOnChain, isEncoded } = resolveAvatarUri({ uri: nftUri, gatewayUrls });
    if (isOnChain && (resolvedNftUri.includes("data:application/json;base64,") || resolvedNftUri.startsWith("{"))) {
      const encodedJson = isEncoded ? (
        // if it is encoded, decode it
        atob(resolvedNftUri.replace("data:application/json;base64,", ""))
      ) : (
        // if it isn't encoded assume it is a JSON string, but it could be anything (it will error if it is)
        resolvedNftUri
      );
      const decoded = JSON.parse(encodedJson);
      return parseAvatarUri({ uri: getJsonImage(decoded), gatewayUrls });
    }
    let uriTokenId = nft.tokenID;
    if (nft.namespace === "erc1155")
      uriTokenId = uriTokenId.replace("0x", "").padStart(64, "0");
    return getMetadataAvatarUri({
      gatewayUrls,
      uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId)
    });
  }

  // node_modules/viem/_esm/actions/ens/getEnsText.js
  init_abis();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_getChainContractAddress();
  init_toHex();
  init_localBatchGatewayRequest();
  async function getEnsText(client, parameters) {
    const { blockNumber, blockTag, key, name, gatewayUrls, strict } = parameters;
    const { chain: chain2 } = client;
    const universalResolverAddress = (() => {
      if (parameters.universalResolverAddress)
        return parameters.universalResolverAddress;
      if (!chain2)
        throw new Error("client chain not configured. universalResolverAddress is required.");
      return getChainContractAddress({
        blockNumber,
        chain: chain2,
        contract: "ensUniversalResolver"
      });
    })();
    const tlds = chain2?.ensTlds;
    if (tlds && !tlds.some((tld) => name.endsWith(tld)))
      return null;
    try {
      const readContractParameters = {
        address: universalResolverAddress,
        abi: universalResolverResolveAbi,
        args: [
          toHex(packetToBytes(name)),
          encodeFunctionData({
            abi: textResolverAbi,
            functionName: "text",
            args: [namehash(name), key]
          }),
          gatewayUrls ?? [localBatchGatewayUrl]
        ],
        functionName: "resolveWithGateways",
        blockNumber,
        blockTag
      };
      const readContractAction = getAction(client, readContract, "readContract");
      const res = await readContractAction(readContractParameters);
      if (res[0] === "0x")
        return null;
      const record = decodeFunctionResult({
        abi: textResolverAbi,
        functionName: "text",
        data: res[0]
      });
      return record === "" ? null : record;
    } catch (err) {
      if (strict)
        throw err;
      if (isNullUniversalResolverError(err))
        return null;
      throw err;
    }
  }

  // node_modules/viem/_esm/actions/ens/getEnsAvatar.js
  async function getEnsAvatar(client, { blockNumber, blockTag, assetGatewayUrls, name, gatewayUrls, strict, universalResolverAddress }) {
    const record = await getAction(client, getEnsText, "getEnsText")({
      blockNumber,
      blockTag,
      key: "avatar",
      name,
      universalResolverAddress,
      gatewayUrls,
      strict
    });
    if (!record)
      return null;
    try {
      return await parseAvatarRecord(client, {
        record,
        gatewayUrls: assetGatewayUrls
      });
    } catch {
      return null;
    }
  }

  // node_modules/viem/_esm/actions/ens/getEnsName.js
  init_abis();
  init_getChainContractAddress();
  init_localBatchGatewayRequest();
  async function getEnsName(client, parameters) {
    const { address, blockNumber, blockTag, coinType = 60n, gatewayUrls, strict } = parameters;
    const { chain: chain2 } = client;
    const universalResolverAddress = (() => {
      if (parameters.universalResolverAddress)
        return parameters.universalResolverAddress;
      if (!chain2)
        throw new Error("client chain not configured. universalResolverAddress is required.");
      return getChainContractAddress({
        blockNumber,
        chain: chain2,
        contract: "ensUniversalResolver"
      });
    })();
    try {
      const readContractParameters = {
        address: universalResolverAddress,
        abi: universalResolverReverseAbi,
        args: [address, coinType, gatewayUrls ?? [localBatchGatewayUrl]],
        functionName: "reverseWithGateways",
        blockNumber,
        blockTag
      };
      const readContractAction = getAction(client, readContract, "readContract");
      const [name] = await readContractAction(readContractParameters);
      return name || null;
    } catch (err) {
      if (strict)
        throw err;
      if (isNullUniversalResolverError(err))
        return null;
      throw err;
    }
  }

  // node_modules/viem/_esm/actions/ens/getEnsResolver.js
  init_getChainContractAddress();
  init_toHex();
  async function getEnsResolver(client, parameters) {
    const { blockNumber, blockTag, name } = parameters;
    const { chain: chain2 } = client;
    const universalResolverAddress = (() => {
      if (parameters.universalResolverAddress)
        return parameters.universalResolverAddress;
      if (!chain2)
        throw new Error("client chain not configured. universalResolverAddress is required.");
      return getChainContractAddress({
        blockNumber,
        chain: chain2,
        contract: "ensUniversalResolver"
      });
    })();
    const tlds = chain2?.ensTlds;
    if (tlds && !tlds.some((tld) => name.endsWith(tld)))
      throw new Error(`${name} is not a valid ENS TLD (${tlds?.join(", ")}) for chain "${chain2.name}" (id: ${chain2.id}).`);
    const [resolverAddress] = await getAction(client, readContract, "readContract")({
      address: universalResolverAddress,
      abi: [
        {
          inputs: [{ type: "bytes" }],
          name: "findResolver",
          outputs: [
            { type: "address" },
            { type: "bytes32" },
            { type: "uint256" }
          ],
          stateMutability: "view",
          type: "function"
        }
      ],
      functionName: "findResolver",
      args: [toHex(packetToBytes(name))],
      blockNumber,
      blockTag
    });
    return resolverAddress;
  }

  // node_modules/viem/_esm/clients/decorators/public.js
  init_call();

  // node_modules/viem/_esm/actions/public/createAccessList.js
  init_parseAccount();
  init_toHex();
  init_getCallError();
  init_extract();
  init_transactionRequest();
  init_assertRequest();
  async function createAccessList(client, args) {
    const { account: account_ = client.account, blockNumber, blockTag = "latest", blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, to, value, ...rest } = args;
    const account = account_ ? parseAccount(account_) : void 0;
    try {
      assertRequest(args);
      const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
      const block = blockNumberHex || blockTag;
      const chainFormat = client.chain?.formatters?.transactionRequest?.format;
      const format = chainFormat || formatTransactionRequest;
      const request = format({
        // Pick out extra data that might exist on the chain's transaction request type.
        ...extract(rest, { format: chainFormat }),
        account,
        blobs,
        data,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        to,
        value
      }, "createAccessList");
      const response = await client.request({
        method: "eth_createAccessList",
        params: [request, block]
      });
      return {
        accessList: response.accessList,
        gasUsed: BigInt(response.gasUsed)
      };
    } catch (err) {
      throw getCallError(err, {
        ...args,
        account,
        chain: client.chain
      });
    }
  }

  // node_modules/viem/_esm/actions/public/createBlockFilter.js
  async function createBlockFilter(client) {
    const getRequest = createFilterRequestScope(client, {
      method: "eth_newBlockFilter"
    });
    const id = await client.request({
      method: "eth_newBlockFilter"
    });
    return { id, request: getRequest(id), type: "block" };
  }

  // node_modules/viem/_esm/actions/public/createEventFilter.js
  init_toHex();
  async function createEventFilter(client, { address, args, event, events: events_, fromBlock, strict, toBlock } = {}) {
    const events = events_ ?? (event ? [event] : void 0);
    const getRequest = createFilterRequestScope(client, {
      method: "eth_newFilter"
    });
    let topics = [];
    if (events) {
      const encoded = events.flatMap((event2) => encodeEventTopics({
        abi: [event2],
        eventName: event2.name,
        args
      }));
      topics = [encoded];
      if (event)
        topics = topics[0];
    }
    const id = await client.request({
      method: "eth_newFilter",
      params: [
        {
          address,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
          ...topics.length ? { topics } : {}
        }
      ]
    });
    return {
      abi: events,
      args,
      eventName: event ? event.name : void 0,
      fromBlock,
      id,
      request: getRequest(id),
      strict: Boolean(strict),
      toBlock,
      type: "event"
    };
  }

  // node_modules/viem/_esm/actions/public/createPendingTransactionFilter.js
  async function createPendingTransactionFilter(client) {
    const getRequest = createFilterRequestScope(client, {
      method: "eth_newPendingTransactionFilter"
    });
    const id = await client.request({
      method: "eth_newPendingTransactionFilter"
    });
    return { id, request: getRequest(id), type: "transaction" };
  }

  // node_modules/viem/_esm/actions/public/getBalance.js
  init_abis();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_toHex();
  init_call();
  async function getBalance(client, { address, blockNumber, blockTag = client.experimental_blockTag ?? "latest" }) {
    if (client.batch?.multicall && client.chain?.contracts?.multicall3) {
      const multicall3Address = client.chain.contracts.multicall3.address;
      const calldata = encodeFunctionData({
        abi: multicall3Abi,
        functionName: "getEthBalance",
        args: [address]
      });
      const { data } = await getAction(client, call, "call")({
        to: multicall3Address,
        data: calldata,
        blockNumber,
        blockTag
      });
      return decodeFunctionResult({
        abi: multicall3Abi,
        functionName: "getEthBalance",
        args: [address],
        data: data || "0x"
      });
    }
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const balance = await client.request({
      method: "eth_getBalance",
      params: [address, blockNumberHex || blockTag]
    });
    return BigInt(balance);
  }

  // node_modules/viem/_esm/actions/public/getBlobBaseFee.js
  async function getBlobBaseFee(client) {
    const baseFee = await client.request({
      method: "eth_blobBaseFee"
    });
    return BigInt(baseFee);
  }

  // node_modules/viem/_esm/actions/public/getBlockTransactionCount.js
  init_fromHex();
  init_toHex();
  async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = "latest" } = {}) {
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    let count;
    if (blockHash) {
      count = await client.request({
        method: "eth_getBlockTransactionCountByHash",
        params: [blockHash]
      }, { dedupe: true });
    } else {
      count = await client.request({
        method: "eth_getBlockTransactionCountByNumber",
        params: [blockNumberHex || blockTag]
      }, { dedupe: Boolean(blockNumberHex) });
    }
    return hexToNumber(count);
  }

  // node_modules/viem/_esm/actions/public/getCode.js
  init_toHex();
  async function getCode(client, { address, blockNumber, blockTag = "latest" }) {
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    const hex2 = await client.request({
      method: "eth_getCode",
      params: [address, blockNumberHex || blockTag]
    }, { dedupe: Boolean(blockNumberHex) });
    if (hex2 === "0x")
      return void 0;
    return hex2;
  }

  // node_modules/viem/_esm/actions/public/getDelegation.js
  init_getAddress();
  init_size();
  init_slice();
  async function getDelegation(client, { address, blockNumber, blockTag = "latest" }) {
    const code = await getCode(client, {
      address,
      ...blockNumber !== void 0 ? { blockNumber } : { blockTag }
    });
    if (!code)
      return void 0;
    if (size(code) !== 23)
      return void 0;
    if (!code.startsWith("0xef0100"))
      return void 0;
    return getAddress(slice(code, 3, 23));
  }

  // node_modules/viem/_esm/errors/eip712.js
  init_base();
  var Eip712DomainNotFoundError = class extends BaseError2 {
    constructor({ address }) {
      super(`No EIP-712 domain found on contract "${address}".`, {
        metaMessages: [
          "Ensure that:",
          `- The contract is deployed at the address "${address}".`,
          "- `eip712Domain()` function exists on the contract.",
          "- `eip712Domain()` function matches signature to ERC-5267 specification."
        ],
        name: "Eip712DomainNotFoundError"
      });
    }
  };

  // node_modules/viem/_esm/actions/public/getEip712Domain.js
  async function getEip712Domain(client, parameters) {
    const { address, factory, factoryData } = parameters;
    try {
      const [fields, name, version4, chainId, verifyingContract, salt, extensions] = await getAction(client, readContract, "readContract")({
        abi,
        address,
        functionName: "eip712Domain",
        factory,
        factoryData
      });
      return {
        domain: {
          name,
          version: version4,
          chainId: Number(chainId),
          verifyingContract,
          salt
        },
        extensions,
        fields
      };
    } catch (e42) {
      const error = e42;
      if (error.name === "ContractFunctionExecutionError" && error.cause.name === "ContractFunctionZeroDataError") {
        throw new Eip712DomainNotFoundError({ address });
      }
      throw error;
    }
  }
  var abi = [
    {
      inputs: [],
      name: "eip712Domain",
      outputs: [
        { name: "fields", type: "bytes1" },
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
        { name: "salt", type: "bytes32" },
        { name: "extensions", type: "uint256[]" }
      ],
      stateMutability: "view",
      type: "function"
    }
  ];

  // node_modules/viem/_esm/actions/public/getFeeHistory.js
  init_toHex();

  // node_modules/viem/_esm/utils/formatters/feeHistory.js
  function formatFeeHistory(feeHistory) {
    return {
      baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
      gasUsedRatio: feeHistory.gasUsedRatio,
      oldestBlock: BigInt(feeHistory.oldestBlock),
      reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value)))
    };
  }

  // node_modules/viem/_esm/actions/public/getFeeHistory.js
  async function getFeeHistory(client, { blockCount, blockNumber, blockTag = "latest", rewardPercentiles }) {
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const feeHistory = await client.request({
      method: "eth_feeHistory",
      params: [
        numberToHex(blockCount),
        blockNumberHex || blockTag,
        rewardPercentiles
      ]
    }, { dedupe: Boolean(blockNumberHex) });
    return formatFeeHistory(feeHistory);
  }

  // node_modules/viem/_esm/actions/public/getFilterLogs.js
  async function getFilterLogs(_client, { filter }) {
    const strict = filter.strict ?? false;
    const logs = await filter.request({
      method: "eth_getFilterLogs",
      params: [filter.id]
    });
    const formattedLogs = logs.map((log) => formatLog(log));
    if (!filter.abi)
      return formattedLogs;
    return parseEventLogs({
      abi: filter.abi,
      logs: formattedLogs,
      strict
    });
  }

  // node_modules/viem/_esm/actions/public/getProof.js
  init_toHex();

  // node_modules/viem/_esm/utils/authorization/verifyAuthorization.js
  init_getAddress();
  init_isAddressEqual();
  async function verifyAuthorization({ address, authorization, signature }) {
    return isAddressEqual(getAddress(address), await recoverAuthorizationAddress({
      authorization,
      signature
    }));
  }

  // node_modules/viem/_esm/utils/buildRequest.js
  init_base();
  init_request();
  init_rpc();
  init_toHex();

  // node_modules/viem/_esm/utils/promise/withDedupe.js
  init_lru();
  var promiseCache2 = /* @__PURE__ */ new LruMap(8192);
  function withDedupe(fn, { enabled = true, id }) {
    if (!enabled || !id)
      return fn();
    if (promiseCache2.get(id))
      return promiseCache2.get(id);
    const promise = fn().finally(() => promiseCache2.delete(id));
    promiseCache2.set(id, promise);
    return promise;
  }

  // node_modules/viem/_esm/utils/buildRequest.js
  init_stringify();
  function buildRequest(request, options = {}) {
    return async (args, overrideOptions = {}) => {
      const { dedupe = false, methods, retryDelay = 150, retryCount = 3, uid: uid2 } = {
        ...options,
        ...overrideOptions
      };
      const { method } = args;
      if (methods?.exclude?.includes(method))
        throw new MethodNotSupportedRpcError(new Error("method not supported"), {
          method
        });
      if (methods?.include && !methods.include.includes(method))
        throw new MethodNotSupportedRpcError(new Error("method not supported"), {
          method
        });
      const requestId = dedupe ? stringToHex(`${uid2}.${stringify(args)}`) : void 0;
      return withDedupe(() => withRetry(async () => {
        try {
          return await request(args);
        } catch (err_) {
          const err = err_;
          switch (err.code) {
            // -32700
            case ParseRpcError.code:
              throw new ParseRpcError(err);
            // -32600
            case InvalidRequestRpcError.code:
              throw new InvalidRequestRpcError(err);
            // -32601
            case MethodNotFoundRpcError.code:
              throw new MethodNotFoundRpcError(err, { method: args.method });
            // -32602
            case InvalidParamsRpcError.code:
              throw new InvalidParamsRpcError(err);
            // -32603
            case InternalRpcError.code:
              throw new InternalRpcError(err);
            // -32000
            case InvalidInputRpcError.code:
              throw new InvalidInputRpcError(err);
            // -32001
            case ResourceNotFoundRpcError.code:
              throw new ResourceNotFoundRpcError(err);
            // -32002
            case ResourceUnavailableRpcError.code:
              throw new ResourceUnavailableRpcError(err);
            // -32003
            case TransactionRejectedRpcError.code:
              throw new TransactionRejectedRpcError(err);
            // -32004
            case MethodNotSupportedRpcError.code:
              throw new MethodNotSupportedRpcError(err, {
                method: args.method
              });
            // -32005
            case LimitExceededRpcError.code:
              throw new LimitExceededRpcError(err);
            // -32006
            case JsonRpcVersionUnsupportedError.code:
              throw new JsonRpcVersionUnsupportedError(err);
            // 4001
            case UserRejectedRequestError.code:
              throw new UserRejectedRequestError(err);
            // 4100
            case UnauthorizedProviderError.code:
              throw new UnauthorizedProviderError(err);
            // 4200
            case UnsupportedProviderMethodError.code:
              throw new UnsupportedProviderMethodError(err);
            // 4900
            case ProviderDisconnectedError.code:
              throw new ProviderDisconnectedError(err);
            // 4901
            case ChainDisconnectedError.code:
              throw new ChainDisconnectedError(err);
            // 4902
            case SwitchChainError.code:
              throw new SwitchChainError(err);
            // 5700
            case UnsupportedNonOptionalCapabilityError.code:
              throw new UnsupportedNonOptionalCapabilityError(err);
            // 5710
            case UnsupportedChainIdError.code:
              throw new UnsupportedChainIdError(err);
            // 5720
            case DuplicateIdError.code:
              throw new DuplicateIdError(err);
            // 5730
            case UnknownBundleIdError.code:
              throw new UnknownBundleIdError(err);
            // 5740
            case BundleTooLargeError.code:
              throw new BundleTooLargeError(err);
            // 5750
            case AtomicReadyWalletRejectedUpgradeError.code:
              throw new AtomicReadyWalletRejectedUpgradeError(err);
            // 5760
            case AtomicityNotSupportedError.code:
              throw new AtomicityNotSupportedError(err);
            // CAIP-25: User Rejected Error
            // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
            case 5e3:
              throw new UserRejectedRequestError(err);
            // WalletConnect: Session Settlement Failed
            // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes
            case WalletConnectSessionSettlementError.code:
              throw new WalletConnectSessionSettlementError(err);
            default:
              if (err_ instanceof BaseError2)
                throw err_;
              throw new UnknownRpcError(err);
          }
        }
      }, {
        delay: ({ count, error }) => {
          if (error && error instanceof HttpRequestError) {
            const retryAfter = error?.headers?.get("Retry-After");
            if (retryAfter?.match(/\d/))
              return Number.parseInt(retryAfter, 10) * 1e3;
          }
          return ~~(1 << count) * retryDelay;
        },
        retryCount,
        shouldRetry: ({ error }) => shouldRetry(error)
      }), { enabled: dedupe, id: requestId });
    };
  }
  function shouldRetry(error) {
    if ("code" in error && typeof error.code === "number") {
      if (error.code === -1)
        return true;
      if (error.code === LimitExceededRpcError.code)
        return true;
      if (error.code === InternalRpcError.code)
        return true;
      if (error.code === 429)
        return true;
      return false;
    }
    if (error instanceof HttpRequestError && error.status) {
      if (error.status === 403)
        return true;
      if (error.status === 408)
        return true;
      if (error.status === 413)
        return true;
      if (error.status === 429)
        return true;
      if (error.status === 500)
        return true;
      if (error.status === 502)
        return true;
      if (error.status === 503)
        return true;
      if (error.status === 504)
        return true;
      return false;
    }
    return true;
  }

  // node_modules/viem/_esm/utils/index.js
  init_fromHex();

  // node_modules/viem/_esm/utils/rpc/http.js
  init_request();

  // node_modules/viem/_esm/utils/promise/withTimeout.js
  function withTimeout(fn, { errorInstance = new Error("timed out"), timeout, signal }) {
    return new Promise((resolve, reject) => {
      ;
      (async () => {
        let timeoutId;
        try {
          const controller = new AbortController();
          if (timeout > 0) {
            timeoutId = setTimeout(() => {
              if (signal) {
                controller.abort();
              } else {
                reject(errorInstance);
              }
            }, timeout);
          }
          resolve(await fn({ signal: controller?.signal || null }));
        } catch (err) {
          if (err?.name === "AbortError")
            reject(errorInstance);
          reject(err);
        } finally {
          clearTimeout(timeoutId);
        }
      })();
    });
  }

  // node_modules/viem/_esm/utils/rpc/http.js
  init_stringify();

  // node_modules/viem/_esm/utils/rpc/id.js
  function createIdStore() {
    return {
      current: 0,
      take() {
        return this.current++;
      },
      reset() {
        this.current = 0;
      }
    };
  }
  var idCache = /* @__PURE__ */ createIdStore();

  // node_modules/viem/_esm/utils/rpc/http.js
  function getHttpRpcClient(url_, options = {}) {
    const { url, headers: headers_url } = parseUrl(url_);
    return {
      async request(params) {
        const { body, fetchFn = options.fetchFn ?? fetch, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
        const fetchOptions = {
          ...options.fetchOptions ?? {},
          ...params.fetchOptions ?? {}
        };
        const { headers, method, signal: signal_ } = fetchOptions;
        try {
          const response = await withTimeout(async ({ signal }) => {
            const init2 = {
              ...fetchOptions,
              body: Array.isArray(body) ? stringify(body.map((body2) => ({
                jsonrpc: "2.0",
                id: body2.id ?? idCache.take(),
                ...body2
              }))) : stringify({
                jsonrpc: "2.0",
                id: body.id ?? idCache.take(),
                ...body
              }),
              headers: {
                ...headers_url,
                "Content-Type": "application/json",
                ...headers
              },
              method: method || "POST",
              signal: signal_ || (timeout > 0 ? signal : null)
            };
            const request = new Request(url, init2);
            const args = await onRequest?.(request, init2) ?? { ...init2, url };
            const response2 = await fetchFn(args.url ?? url, args);
            return response2;
          }, {
            errorInstance: new TimeoutError({ body, url }),
            timeout,
            signal: true
          });
          if (onResponse)
            await onResponse(response);
          let data;
          if (response.headers.get("Content-Type")?.startsWith("application/json"))
            data = await response.json();
          else {
            data = await response.text();
            try {
              data = JSON.parse(data || "{}");
            } catch (err) {
              if (response.ok)
                throw err;
              data = { error: data };
            }
          }
          if (!response.ok) {
            if (typeof data.error?.code === "number" && typeof data.error?.message === "string")
              return data;
            throw new HttpRequestError({
              body,
              details: stringify(data.error) || response.statusText,
              headers: response.headers,
              status: response.status,
              url
            });
          }
          return data;
        } catch (err) {
          if (err instanceof HttpRequestError)
            throw err;
          if (err instanceof TimeoutError)
            throw err;
          throw new HttpRequestError({
            body,
            cause: err,
            url
          });
        }
      }
    };
  }
  function parseUrl(url_) {
    try {
      const url = new URL(url_);
      const result = (() => {
        if (url.username) {
          const credentials = `${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`;
          url.username = "";
          url.password = "";
          return {
            url: url.toString(),
            headers: { Authorization: `Basic ${btoa(credentials)}` }
          };
        }
        return;
      })();
      return { url: url.toString(), ...result };
    } catch {
      return { url: url_ };
    }
  }

  // node_modules/viem/_esm/utils/signature/hashMessage.js
  init_keccak256();

  // node_modules/viem/_esm/constants/strings.js
  var presignMessagePrefix = "Ethereum Signed Message:\n";

  // node_modules/viem/_esm/utils/signature/toPrefixedMessage.js
  init_concat();
  init_size();
  init_toHex();
  function toPrefixedMessage(message_) {
    const message = (() => {
      if (typeof message_ === "string")
        return stringToHex(message_);
      if (typeof message_.raw === "string")
        return message_.raw;
      return bytesToHex(message_.raw);
    })();
    const prefix = stringToHex(`${presignMessagePrefix}${size(message)}`);
    return concat([prefix, message]);
  }

  // node_modules/viem/_esm/utils/signature/hashMessage.js
  function hashMessage(message, to_) {
    return keccak256(toPrefixedMessage(message), to_);
  }

  // node_modules/viem/_esm/utils/signature/hashTypedData.js
  init_encodeAbiParameters();
  init_concat();
  init_toHex();
  init_keccak256();

  // node_modules/viem/_esm/utils/typedData.js
  init_abi();
  init_address();

  // node_modules/viem/_esm/errors/typedData.js
  init_stringify();
  init_base();
  var InvalidDomainError = class extends BaseError2 {
    constructor({ domain }) {
      super(`Invalid domain "${stringify(domain)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."]
      });
    }
  };
  var InvalidPrimaryTypeError = class extends BaseError2 {
    constructor({ primaryType, types }) {
      super(`Invalid primary type \`${primaryType}\` must be one of \`${JSON.stringify(Object.keys(types))}\`.`, {
        docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
        metaMessages: ["Check that the primary type is a key in `types`."]
      });
    }
  };
  var InvalidStructTypeError = class extends BaseError2 {
    constructor({ type }) {
      super(`Struct type "${type}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError"
      });
    }
  };

  // node_modules/viem/_esm/utils/typedData.js
  init_isAddress();
  init_size();
  init_toHex();
  init_regex2();
  function validateTypedData(parameters) {
    const { domain, message, primaryType, types } = parameters;
    const validateData = (struct, data) => {
      for (const param of struct) {
        const { name, type } = param;
        const value = data[name];
        const integerMatch = type.match(integerRegex2);
        if (integerMatch && (typeof value === "number" || typeof value === "bigint")) {
          const [_type, base, size_] = integerMatch;
          numberToHex(value, {
            signed: base === "int",
            size: Number.parseInt(size_, 10) / 8
          });
        }
        if (type === "address" && typeof value === "string" && !isAddress(value))
          throw new InvalidAddressError({ address: value });
        const bytesMatch = type.match(bytesRegex2);
        if (bytesMatch) {
          const [_type, size_] = bytesMatch;
          if (size_ && size(value) !== Number.parseInt(size_, 10))
            throw new BytesSizeMismatchError({
              expectedSize: Number.parseInt(size_, 10),
              givenSize: size(value)
            });
        }
        const struct2 = types[type];
        if (struct2) {
          validateReference(type);
          validateData(struct2, value);
        }
      }
    };
    if (types.EIP712Domain && domain) {
      if (typeof domain !== "object")
        throw new InvalidDomainError({ domain });
      validateData(types.EIP712Domain, domain);
    }
    if (primaryType !== "EIP712Domain") {
      if (types[primaryType])
        validateData(types[primaryType], message);
      else
        throw new InvalidPrimaryTypeError({ primaryType, types });
    }
  }
  function getTypesForEIP712Domain({ domain }) {
    return [
      typeof domain?.name === "string" && { name: "name", type: "string" },
      domain?.version && { name: "version", type: "string" },
      (typeof domain?.chainId === "number" || typeof domain?.chainId === "bigint") && {
        name: "chainId",
        type: "uint256"
      },
      domain?.verifyingContract && {
        name: "verifyingContract",
        type: "address"
      },
      domain?.salt && { name: "salt", type: "bytes32" }
    ].filter(Boolean);
  }
  function validateReference(type) {
    if (type === "address" || type === "bool" || type === "string" || type.startsWith("bytes") || type.startsWith("uint") || type.startsWith("int"))
      throw new InvalidStructTypeError({ type });
  }

  // node_modules/viem/_esm/utils/signature/hashTypedData.js
  function hashTypedData(parameters) {
    const { domain = {}, message, primaryType } = parameters;
    const types = {
      EIP712Domain: getTypesForEIP712Domain({ domain }),
      ...parameters.types
    };
    validateTypedData({
      domain,
      message,
      primaryType,
      types
    });
    const parts = ["0x1901"];
    if (domain)
      parts.push(hashDomain({
        domain,
        types
      }));
    if (primaryType !== "EIP712Domain")
      parts.push(hashStruct({
        data: message,
        primaryType,
        types
      }));
    return keccak256(concat(parts));
  }
  function hashDomain({ domain, types }) {
    return hashStruct({
      data: domain,
      primaryType: "EIP712Domain",
      types
    });
  }
  function hashStruct({ data, primaryType, types }) {
    const encoded = encodeData({
      data,
      primaryType,
      types
    });
    return keccak256(encoded);
  }
  function encodeData({ data, primaryType, types }) {
    const encodedTypes = [{ type: "bytes32" }];
    const encodedValues = [hashType({ primaryType, types })];
    for (const field of types[primaryType]) {
      const [type, value] = encodeField({
        types,
        name: field.name,
        type: field.type,
        value: data[field.name]
      });
      encodedTypes.push(type);
      encodedValues.push(value);
    }
    return encodeAbiParameters(encodedTypes, encodedValues);
  }
  function hashType({ primaryType, types }) {
    const encodedHashType = toHex(encodeType({ primaryType, types }));
    return keccak256(encodedHashType);
  }
  function encodeType({ primaryType, types }) {
    let result = "";
    const unsortedDeps = findTypeDependencies({ primaryType, types });
    unsortedDeps.delete(primaryType);
    const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
    for (const type of deps) {
      result += `${type}(${types[type].map(({ name, type: t45 }) => `${t45} ${name}`).join(",")})`;
    }
    return result;
  }
  function findTypeDependencies({ primaryType: primaryType_, types }, results = /* @__PURE__ */ new Set()) {
    const match = primaryType_.match(/^\w*/u);
    const primaryType = match?.[0];
    if (results.has(primaryType) || types[primaryType] === void 0) {
      return results;
    }
    results.add(primaryType);
    for (const field of types[primaryType]) {
      findTypeDependencies({ primaryType: field.type, types }, results);
    }
    return results;
  }
  function encodeField({ types, name, type, value }) {
    if (types[type] !== void 0) {
      return [
        { type: "bytes32" },
        keccak256(encodeData({ data: value, primaryType: type, types }))
      ];
    }
    if (type === "bytes")
      return [{ type: "bytes32" }, keccak256(value)];
    if (type === "string")
      return [{ type: "bytes32" }, keccak256(toHex(value))];
    if (type.lastIndexOf("]") === type.length - 1) {
      const parsedType = type.slice(0, type.lastIndexOf("["));
      const typeValuePairs = value.map((item) => encodeField({
        name,
        type: parsedType,
        types,
        value: item
      }));
      return [
        { type: "bytes32" },
        keccak256(encodeAbiParameters(typeValuePairs.map(([t45]) => t45), typeValuePairs.map(([, v]) => v)))
      ];
    }
    return [{ type }, value];
  }

  // node_modules/ox/_esm/erc8010/SignatureErc8010.js
  var SignatureErc8010_exports = {};
  __export(SignatureErc8010_exports, {
    InvalidWrappedSignatureError: () => InvalidWrappedSignatureError,
    assert: () => assert6,
    from: () => from9,
    magicBytes: () => magicBytes,
    suffixParameters: () => suffixParameters,
    unwrap: () => unwrap,
    validate: () => validate4,
    wrap: () => wrap
  });

  // node_modules/ox/_esm/core/AbiParameters.js
  init_exports();

  // node_modules/ox/_esm/core/Address.js
  init_Bytes();

  // node_modules/ox/_esm/core/internal/lru.js
  var LruMap2 = class extends Map {
    constructor(size5) {
      super();
      Object.defineProperty(this, "maxSize", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.maxSize = size5;
    }
    get(key) {
      const value = super.get(key);
      if (super.has(key) && value !== void 0) {
        this.delete(key);
        super.set(key, value);
      }
      return value;
    }
    set(key, value) {
      super.set(key, value);
      if (this.maxSize && this.size > this.maxSize) {
        const firstKey = this.keys().next().value;
        if (firstKey)
          this.delete(firstKey);
      }
      return this;
    }
  };

  // node_modules/ox/_esm/core/Caches.js
  var caches = {
    checksum: /* @__PURE__ */ new LruMap2(8192)
  };
  var checksum = caches.checksum;

  // node_modules/ox/_esm/core/Address.js
  init_Errors();

  // node_modules/ox/_esm/core/Hash.js
  init_sha3();
  init_Bytes();
  init_Hex();
  function keccak2562(value, options = {}) {
    const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
    const bytes = keccak_256(from(value));
    if (as === "Bytes")
      return bytes;
    return fromBytes(bytes);
  }

  // node_modules/ox/_esm/core/PublicKey.js
  init_Bytes();
  init_Errors();
  init_Hex();
  init_Json();
  function assert3(publicKey, options = {}) {
    const { compressed } = options;
    const { prefix, x, y: y3 } = publicKey;
    if (compressed === false || typeof x === "bigint" && typeof y3 === "bigint") {
      if (prefix !== 4)
        throw new InvalidPrefixError({
          prefix,
          cause: new InvalidUncompressedPrefixError()
        });
      return;
    }
    if (compressed === true || typeof x === "bigint" && typeof y3 === "undefined") {
      if (prefix !== 3 && prefix !== 2)
        throw new InvalidPrefixError({
          prefix,
          cause: new InvalidCompressedPrefixError()
        });
      return;
    }
    throw new InvalidError({ publicKey });
  }
  function from3(value) {
    const publicKey = (() => {
      if (validate2(value))
        return fromHex2(value);
      if (validate(value))
        return fromBytes2(value);
      const { prefix, x, y: y3 } = value;
      if (typeof x === "bigint" && typeof y3 === "bigint")
        return { prefix: prefix ?? 4, x, y: y3 };
      return { prefix, x };
    })();
    assert3(publicKey);
    return publicKey;
  }
  function fromBytes2(publicKey) {
    return fromHex2(fromBytes(publicKey));
  }
  function fromHex2(publicKey) {
    if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
      throw new InvalidSerializedSizeError({ publicKey });
    if (publicKey.length === 130) {
      const x2 = BigInt(slice3(publicKey, 0, 32));
      const y3 = BigInt(slice3(publicKey, 32, 64));
      return {
        prefix: 4,
        x: x2,
        y: y3
      };
    }
    if (publicKey.length === 132) {
      const prefix2 = Number(slice3(publicKey, 0, 1));
      const x2 = BigInt(slice3(publicKey, 1, 33));
      const y3 = BigInt(slice3(publicKey, 33, 65));
      return {
        prefix: prefix2,
        x: x2,
        y: y3
      };
    }
    const prefix = Number(slice3(publicKey, 0, 1));
    const x = BigInt(slice3(publicKey, 1, 33));
    return {
      prefix,
      x
    };
  }
  function toHex2(publicKey, options = {}) {
    assert3(publicKey);
    const { prefix, x, y: y3 } = publicKey;
    const { includePrefix = true } = options;
    const publicKey_ = concat2(
      includePrefix ? fromNumber(prefix, { size: 1 }) : "0x",
      fromNumber(x, { size: 32 }),
      // If the public key is not compressed, add the y coordinate.
      typeof y3 === "bigint" ? fromNumber(y3, { size: 32 }) : "0x"
    );
    return publicKey_;
  }
  var InvalidError = class extends BaseError3 {
    constructor({ publicKey }) {
      super(`Value \`${stringify2(publicKey)}\` is not a valid public key.`, {
        metaMessages: [
          "Public key must contain:",
          "- an `x` and `prefix` value (compressed)",
          "- an `x`, `y`, and `prefix` value (uncompressed)"
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidError"
      });
    }
  };
  var InvalidPrefixError = class extends BaseError3 {
    constructor({ prefix, cause }) {
      super(`Prefix "${prefix}" is invalid.`, {
        cause
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidPrefixError"
      });
    }
  };
  var InvalidCompressedPrefixError = class extends BaseError3 {
    constructor() {
      super("Prefix must be 2 or 3 for compressed public keys.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidCompressedPrefixError"
      });
    }
  };
  var InvalidUncompressedPrefixError = class extends BaseError3 {
    constructor() {
      super("Prefix must be 4 for uncompressed public keys.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidUncompressedPrefixError"
      });
    }
  };
  var InvalidSerializedSizeError = class extends BaseError3 {
    constructor({ publicKey }) {
      super(`Value \`${publicKey}\` is an invalid public key size.`, {
        metaMessages: [
          "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
          `Received ${size3(from2(publicKey))} bytes.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "PublicKey.InvalidSerializedSizeError"
      });
    }
  };

  // node_modules/ox/_esm/core/Address.js
  var addressRegex2 = /^0x[a-fA-F0-9]{40}$/;
  function assert4(value, options = {}) {
    const { strict = true } = options;
    if (!addressRegex2.test(value))
      throw new InvalidAddressError2({
        address: value,
        cause: new InvalidInputError()
      });
    if (strict) {
      if (value.toLowerCase() === value)
        return;
      if (checksum2(value) !== value)
        throw new InvalidAddressError2({
          address: value,
          cause: new InvalidChecksumError()
        });
    }
  }
  function checksum2(address) {
    if (checksum.has(address))
      return checksum.get(address);
    assert4(address, { strict: false });
    const hexAddress = address.substring(2).toLowerCase();
    const hash3 = keccak2562(fromString(hexAddress), { as: "Bytes" });
    const characters = hexAddress.split("");
    for (let i20 = 0; i20 < 40; i20 += 2) {
      if (hash3[i20 >> 1] >> 4 >= 8 && characters[i20]) {
        characters[i20] = characters[i20].toUpperCase();
      }
      if ((hash3[i20 >> 1] & 15) >= 8 && characters[i20 + 1]) {
        characters[i20 + 1] = characters[i20 + 1].toUpperCase();
      }
    }
    const result = `0x${characters.join("")}`;
    checksum.set(address, result);
    return result;
  }
  function from4(address, options = {}) {
    const { checksum: checksumVal = false } = options;
    assert4(address);
    if (checksumVal)
      return checksum2(address);
    return address;
  }
  function fromPublicKey(publicKey, options = {}) {
    const address = keccak2562(`0x${toHex2(publicKey).slice(4)}`).substring(26);
    return from4(`0x${address}`, options);
  }
  function validate3(address, options = {}) {
    const { strict = true } = options ?? {};
    try {
      assert4(address, { strict });
      return true;
    } catch {
      return false;
    }
  }
  var InvalidAddressError2 = class extends BaseError3 {
    constructor({ address, cause }) {
      super(`Address "${address}" is invalid.`, {
        cause
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Address.InvalidAddressError"
      });
    }
  };
  var InvalidInputError = class extends BaseError3 {
    constructor() {
      super("Address is not a 20 byte (40 hexadecimal character) value.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Address.InvalidInputError"
      });
    }
  };
  var InvalidChecksumError = class extends BaseError3 {
    constructor() {
      super("Address does not match its checksum counterpart.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Address.InvalidChecksumError"
      });
    }
  };

  // node_modules/ox/_esm/core/AbiParameters.js
  init_Bytes();
  init_Errors();
  init_Hex();

  // node_modules/ox/_esm/core/internal/abiParameters.js
  init_Bytes();
  init_Errors();
  init_Hex();

  // node_modules/ox/_esm/core/Solidity.js
  var arrayRegex = /^(.*)\[([0-9]*)\]$/;
  var bytesRegex3 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
  var integerRegex3 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  var maxInt82 = 2n ** (8n - 1n) - 1n;
  var maxInt162 = 2n ** (16n - 1n) - 1n;
  var maxInt242 = 2n ** (24n - 1n) - 1n;
  var maxInt322 = 2n ** (32n - 1n) - 1n;
  var maxInt402 = 2n ** (40n - 1n) - 1n;
  var maxInt482 = 2n ** (48n - 1n) - 1n;
  var maxInt562 = 2n ** (56n - 1n) - 1n;
  var maxInt642 = 2n ** (64n - 1n) - 1n;
  var maxInt722 = 2n ** (72n - 1n) - 1n;
  var maxInt802 = 2n ** (80n - 1n) - 1n;
  var maxInt882 = 2n ** (88n - 1n) - 1n;
  var maxInt962 = 2n ** (96n - 1n) - 1n;
  var maxInt1042 = 2n ** (104n - 1n) - 1n;
  var maxInt1122 = 2n ** (112n - 1n) - 1n;
  var maxInt1202 = 2n ** (120n - 1n) - 1n;
  var maxInt1282 = 2n ** (128n - 1n) - 1n;
  var maxInt1362 = 2n ** (136n - 1n) - 1n;
  var maxInt1442 = 2n ** (144n - 1n) - 1n;
  var maxInt1522 = 2n ** (152n - 1n) - 1n;
  var maxInt1602 = 2n ** (160n - 1n) - 1n;
  var maxInt1682 = 2n ** (168n - 1n) - 1n;
  var maxInt1762 = 2n ** (176n - 1n) - 1n;
  var maxInt1842 = 2n ** (184n - 1n) - 1n;
  var maxInt1922 = 2n ** (192n - 1n) - 1n;
  var maxInt2002 = 2n ** (200n - 1n) - 1n;
  var maxInt2082 = 2n ** (208n - 1n) - 1n;
  var maxInt2162 = 2n ** (216n - 1n) - 1n;
  var maxInt2242 = 2n ** (224n - 1n) - 1n;
  var maxInt2322 = 2n ** (232n - 1n) - 1n;
  var maxInt2402 = 2n ** (240n - 1n) - 1n;
  var maxInt2482 = 2n ** (248n - 1n) - 1n;
  var maxInt2562 = 2n ** (256n - 1n) - 1n;
  var minInt82 = -(2n ** (8n - 1n));
  var minInt162 = -(2n ** (16n - 1n));
  var minInt242 = -(2n ** (24n - 1n));
  var minInt322 = -(2n ** (32n - 1n));
  var minInt402 = -(2n ** (40n - 1n));
  var minInt482 = -(2n ** (48n - 1n));
  var minInt562 = -(2n ** (56n - 1n));
  var minInt642 = -(2n ** (64n - 1n));
  var minInt722 = -(2n ** (72n - 1n));
  var minInt802 = -(2n ** (80n - 1n));
  var minInt882 = -(2n ** (88n - 1n));
  var minInt962 = -(2n ** (96n - 1n));
  var minInt1042 = -(2n ** (104n - 1n));
  var minInt1122 = -(2n ** (112n - 1n));
  var minInt1202 = -(2n ** (120n - 1n));
  var minInt1282 = -(2n ** (128n - 1n));
  var minInt1362 = -(2n ** (136n - 1n));
  var minInt1442 = -(2n ** (144n - 1n));
  var minInt1522 = -(2n ** (152n - 1n));
  var minInt1602 = -(2n ** (160n - 1n));
  var minInt1682 = -(2n ** (168n - 1n));
  var minInt1762 = -(2n ** (176n - 1n));
  var minInt1842 = -(2n ** (184n - 1n));
  var minInt1922 = -(2n ** (192n - 1n));
  var minInt2002 = -(2n ** (200n - 1n));
  var minInt2082 = -(2n ** (208n - 1n));
  var minInt2162 = -(2n ** (216n - 1n));
  var minInt2242 = -(2n ** (224n - 1n));
  var minInt2322 = -(2n ** (232n - 1n));
  var minInt2402 = -(2n ** (240n - 1n));
  var minInt2482 = -(2n ** (248n - 1n));
  var minInt2562 = -(2n ** (256n - 1n));
  var maxUint82 = 2n ** 8n - 1n;
  var maxUint162 = 2n ** 16n - 1n;
  var maxUint242 = 2n ** 24n - 1n;
  var maxUint322 = 2n ** 32n - 1n;
  var maxUint402 = 2n ** 40n - 1n;
  var maxUint482 = 2n ** 48n - 1n;
  var maxUint562 = 2n ** 56n - 1n;
  var maxUint642 = 2n ** 64n - 1n;
  var maxUint722 = 2n ** 72n - 1n;
  var maxUint802 = 2n ** 80n - 1n;
  var maxUint882 = 2n ** 88n - 1n;
  var maxUint962 = 2n ** 96n - 1n;
  var maxUint1042 = 2n ** 104n - 1n;
  var maxUint1122 = 2n ** 112n - 1n;
  var maxUint1202 = 2n ** 120n - 1n;
  var maxUint1282 = 2n ** 128n - 1n;
  var maxUint1362 = 2n ** 136n - 1n;
  var maxUint1442 = 2n ** 144n - 1n;
  var maxUint1522 = 2n ** 152n - 1n;
  var maxUint1602 = 2n ** 160n - 1n;
  var maxUint1682 = 2n ** 168n - 1n;
  var maxUint1762 = 2n ** 176n - 1n;
  var maxUint1842 = 2n ** 184n - 1n;
  var maxUint1922 = 2n ** 192n - 1n;
  var maxUint2002 = 2n ** 200n - 1n;
  var maxUint2082 = 2n ** 208n - 1n;
  var maxUint2162 = 2n ** 216n - 1n;
  var maxUint2242 = 2n ** 224n - 1n;
  var maxUint2322 = 2n ** 232n - 1n;
  var maxUint2402 = 2n ** 240n - 1n;
  var maxUint2482 = 2n ** 248n - 1n;
  var maxUint2562 = 2n ** 256n - 1n;

  // node_modules/ox/_esm/core/internal/abiParameters.js
  function decodeParameter2(cursor, param, options) {
    const { checksumAddress: checksumAddress2, staticPosition } = options;
    const arrayComponents = getArrayComponents2(param.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return decodeArray2(cursor, { ...param, type }, { checksumAddress: checksumAddress2, length, staticPosition });
    }
    if (param.type === "tuple")
      return decodeTuple2(cursor, param, {
        checksumAddress: checksumAddress2,
        staticPosition
      });
    if (param.type === "address")
      return decodeAddress2(cursor, { checksum: checksumAddress2 });
    if (param.type === "bool")
      return decodeBool2(cursor);
    if (param.type.startsWith("bytes"))
      return decodeBytes2(cursor, param, { staticPosition });
    if (param.type.startsWith("uint") || param.type.startsWith("int"))
      return decodeNumber2(cursor, param);
    if (param.type === "string")
      return decodeString2(cursor, { staticPosition });
    throw new InvalidTypeError(param.type);
  }
  var sizeOfLength2 = 32;
  var sizeOfOffset2 = 32;
  function decodeAddress2(cursor, options = {}) {
    const { checksum: checksum3 = false } = options;
    const value = cursor.readBytes(32);
    const wrap3 = (address) => checksum3 ? checksum2(address) : address;
    return [wrap3(fromBytes(slice2(value, -20))), 32];
  }
  function decodeArray2(cursor, param, options) {
    const { checksumAddress: checksumAddress2, length, staticPosition } = options;
    if (!length) {
      const offset = toNumber2(cursor.readBytes(sizeOfOffset2));
      const start = staticPosition + offset;
      const startOfData = start + sizeOfLength2;
      cursor.setPosition(start);
      const length2 = toNumber2(cursor.readBytes(sizeOfLength2));
      const dynamicChild = hasDynamicChild2(param);
      let consumed2 = 0;
      const value2 = [];
      for (let i20 = 0; i20 < length2; ++i20) {
        cursor.setPosition(startOfData + (dynamicChild ? i20 * 32 : consumed2));
        const [data, consumed_] = decodeParameter2(cursor, param, {
          checksumAddress: checksumAddress2,
          staticPosition: startOfData
        });
        consumed2 += consumed_;
        value2.push(data);
      }
      cursor.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    if (hasDynamicChild2(param)) {
      const offset = toNumber2(cursor.readBytes(sizeOfOffset2));
      const start = staticPosition + offset;
      const value2 = [];
      for (let i20 = 0; i20 < length; ++i20) {
        cursor.setPosition(start + i20 * 32);
        const [data] = decodeParameter2(cursor, param, {
          checksumAddress: checksumAddress2,
          staticPosition: start
        });
        value2.push(data);
      }
      cursor.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    let consumed = 0;
    const value = [];
    for (let i20 = 0; i20 < length; ++i20) {
      const [data, consumed_] = decodeParameter2(cursor, param, {
        checksumAddress: checksumAddress2,
        staticPosition: staticPosition + consumed
      });
      consumed += consumed_;
      value.push(data);
    }
    return [value, consumed];
  }
  function decodeBool2(cursor) {
    return [toBoolean(cursor.readBytes(32), { size: 32 }), 32];
  }
  function decodeBytes2(cursor, param, { staticPosition }) {
    const [_4, size5] = param.type.split("bytes");
    if (!size5) {
      const offset = toNumber2(cursor.readBytes(32));
      cursor.setPosition(staticPosition + offset);
      const length = toNumber2(cursor.readBytes(32));
      if (length === 0) {
        cursor.setPosition(staticPosition + 32);
        return ["0x", 32];
      }
      const data = cursor.readBytes(length);
      cursor.setPosition(staticPosition + 32);
      return [fromBytes(data), 32];
    }
    const value = fromBytes(cursor.readBytes(Number.parseInt(size5, 10), 32));
    return [value, 32];
  }
  function decodeNumber2(cursor, param) {
    const signed = param.type.startsWith("int");
    const size5 = Number.parseInt(param.type.split("int")[1] || "256", 10);
    const value = cursor.readBytes(32);
    return [
      size5 > 48 ? toBigInt2(value, { signed }) : toNumber2(value, { signed }),
      32
    ];
  }
  function decodeTuple2(cursor, param, options) {
    const { checksumAddress: checksumAddress2, staticPosition } = options;
    const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
    const value = hasUnnamedChild ? [] : {};
    let consumed = 0;
    if (hasDynamicChild2(param)) {
      const offset = toNumber2(cursor.readBytes(sizeOfOffset2));
      const start = staticPosition + offset;
      for (let i20 = 0; i20 < param.components.length; ++i20) {
        const component = param.components[i20];
        cursor.setPosition(start + consumed);
        const [data, consumed_] = decodeParameter2(cursor, component, {
          checksumAddress: checksumAddress2,
          staticPosition: start
        });
        consumed += consumed_;
        value[hasUnnamedChild ? i20 : component?.name] = data;
      }
      cursor.setPosition(staticPosition + 32);
      return [value, 32];
    }
    for (let i20 = 0; i20 < param.components.length; ++i20) {
      const component = param.components[i20];
      const [data, consumed_] = decodeParameter2(cursor, component, {
        checksumAddress: checksumAddress2,
        staticPosition
      });
      value[hasUnnamedChild ? i20 : component?.name] = data;
      consumed += consumed_;
    }
    return [value, consumed];
  }
  function decodeString2(cursor, { staticPosition }) {
    const offset = toNumber2(cursor.readBytes(32));
    const start = staticPosition + offset;
    cursor.setPosition(start);
    const length = toNumber2(cursor.readBytes(32));
    if (length === 0) {
      cursor.setPosition(staticPosition + 32);
      return ["", 32];
    }
    const data = cursor.readBytes(length, 32);
    const value = toString(trimLeft(data));
    cursor.setPosition(staticPosition + 32);
    return [value, 32];
  }
  function prepareParameters({ checksumAddress: checksumAddress2, parameters, values }) {
    const preparedParameters = [];
    for (let i20 = 0; i20 < parameters.length; i20++) {
      preparedParameters.push(prepareParameter({
        checksumAddress: checksumAddress2,
        parameter: parameters[i20],
        value: values[i20]
      }));
    }
    return preparedParameters;
  }
  function prepareParameter({ checksumAddress: checksumAddress2 = false, parameter: parameter_, value }) {
    const parameter = parameter_;
    const arrayComponents = getArrayComponents2(parameter.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return encodeArray2(value, {
        checksumAddress: checksumAddress2,
        length,
        parameter: {
          ...parameter,
          type
        }
      });
    }
    if (parameter.type === "tuple") {
      return encodeTuple2(value, {
        checksumAddress: checksumAddress2,
        parameter
      });
    }
    if (parameter.type === "address") {
      return encodeAddress2(value, {
        checksum: checksumAddress2
      });
    }
    if (parameter.type === "bool") {
      return encodeBoolean(value);
    }
    if (parameter.type.startsWith("uint") || parameter.type.startsWith("int")) {
      const signed = parameter.type.startsWith("int");
      const [, , size5 = "256"] = integerRegex3.exec(parameter.type) ?? [];
      return encodeNumber2(value, {
        signed,
        size: Number(size5)
      });
    }
    if (parameter.type.startsWith("bytes")) {
      return encodeBytes2(value, { type: parameter.type });
    }
    if (parameter.type === "string") {
      return encodeString2(value);
    }
    throw new InvalidTypeError(parameter.type);
  }
  function encode3(preparedParameters) {
    let staticSize = 0;
    for (let i20 = 0; i20 < preparedParameters.length; i20++) {
      const { dynamic, encoded } = preparedParameters[i20];
      if (dynamic)
        staticSize += 32;
      else
        staticSize += size3(encoded);
    }
    const staticParameters = [];
    const dynamicParameters = [];
    let dynamicSize = 0;
    for (let i20 = 0; i20 < preparedParameters.length; i20++) {
      const { dynamic, encoded } = preparedParameters[i20];
      if (dynamic) {
        staticParameters.push(fromNumber(staticSize + dynamicSize, { size: 32 }));
        dynamicParameters.push(encoded);
        dynamicSize += size3(encoded);
      } else {
        staticParameters.push(encoded);
      }
    }
    return concat2(...staticParameters, ...dynamicParameters);
  }
  function encodeAddress2(value, options) {
    const { checksum: checksum3 = false } = options;
    assert4(value, { strict: checksum3 });
    return {
      dynamic: false,
      encoded: padLeft(value.toLowerCase())
    };
  }
  function encodeArray2(value, options) {
    const { checksumAddress: checksumAddress2, length, parameter } = options;
    const dynamic = length === null;
    if (!Array.isArray(value))
      throw new InvalidArrayError2(value);
    if (!dynamic && value.length !== length)
      throw new ArrayLengthMismatchError({
        expectedLength: length,
        givenLength: value.length,
        type: `${parameter.type}[${length}]`
      });
    let dynamicChild = false;
    const preparedParameters = [];
    for (let i20 = 0; i20 < value.length; i20++) {
      const preparedParam = prepareParameter({
        checksumAddress: checksumAddress2,
        parameter,
        value: value[i20]
      });
      if (preparedParam.dynamic)
        dynamicChild = true;
      preparedParameters.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
      const data = encode3(preparedParameters);
      if (dynamic) {
        const length2 = fromNumber(preparedParameters.length, { size: 32 });
        return {
          dynamic: true,
          encoded: preparedParameters.length > 0 ? concat2(length2, data) : length2
        };
      }
      if (dynamicChild)
        return { dynamic: true, encoded: data };
    }
    return {
      dynamic: false,
      encoded: concat2(...preparedParameters.map(({ encoded }) => encoded))
    };
  }
  function encodeBytes2(value, { type }) {
    const [, parametersize] = type.split("bytes");
    const bytesSize = size3(value);
    if (!parametersize) {
      let value_ = value;
      if (bytesSize % 32 !== 0)
        value_ = padRight(value_, Math.ceil((value.length - 2) / 2 / 32) * 32);
      return {
        dynamic: true,
        encoded: concat2(padLeft(fromNumber(bytesSize, { size: 32 })), value_)
      };
    }
    if (bytesSize !== Number.parseInt(parametersize, 10))
      throw new BytesSizeMismatchError2({
        expectedSize: Number.parseInt(parametersize, 10),
        value
      });
    return { dynamic: false, encoded: padRight(value) };
  }
  function encodeBoolean(value) {
    if (typeof value !== "boolean")
      throw new BaseError3(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
    return { dynamic: false, encoded: padLeft(fromBoolean(value)) };
  }
  function encodeNumber2(value, { signed, size: size5 }) {
    if (typeof size5 === "number") {
      const max = 2n ** (BigInt(size5) - (signed ? 1n : 0n)) - 1n;
      const min = signed ? -max - 1n : 0n;
      if (value > max || value < min)
        throw new IntegerOutOfRangeError2({
          max: max.toString(),
          min: min.toString(),
          signed,
          size: size5 / 8,
          value: value.toString()
        });
    }
    return {
      dynamic: false,
      encoded: fromNumber(value, {
        size: 32,
        signed
      })
    };
  }
  function encodeString2(value) {
    const hexValue = fromString2(value);
    const partsLength = Math.ceil(size3(hexValue) / 32);
    const parts = [];
    for (let i20 = 0; i20 < partsLength; i20++) {
      parts.push(padRight(slice3(hexValue, i20 * 32, (i20 + 1) * 32)));
    }
    return {
      dynamic: true,
      encoded: concat2(padRight(fromNumber(size3(hexValue), { size: 32 })), ...parts)
    };
  }
  function encodeTuple2(value, options) {
    const { checksumAddress: checksumAddress2, parameter } = options;
    let dynamic = false;
    const preparedParameters = [];
    for (let i20 = 0; i20 < parameter.components.length; i20++) {
      const param_ = parameter.components[i20];
      const index2 = Array.isArray(value) ? i20 : param_.name;
      const preparedParam = prepareParameter({
        checksumAddress: checksumAddress2,
        parameter: param_,
        value: value[index2]
      });
      preparedParameters.push(preparedParam);
      if (preparedParam.dynamic)
        dynamic = true;
    }
    return {
      dynamic,
      encoded: dynamic ? encode3(preparedParameters) : concat2(...preparedParameters.map(({ encoded }) => encoded))
    };
  }
  function getArrayComponents2(type) {
    const matches = type.match(/^(.*)\[(\d+)?\]$/);
    return matches ? (
      // Return `null` if the array is dynamic.
      [matches[2] ? Number(matches[2]) : null, matches[1]]
    ) : void 0;
  }
  function hasDynamicChild2(param) {
    const { type } = param;
    if (type === "string")
      return true;
    if (type === "bytes")
      return true;
    if (type.endsWith("[]"))
      return true;
    if (type === "tuple")
      return param.components?.some(hasDynamicChild2);
    const arrayComponents = getArrayComponents2(param.type);
    if (arrayComponents && hasDynamicChild2({
      ...param,
      type: arrayComponents[1]
    }))
      return true;
    return false;
  }

  // node_modules/ox/_esm/core/internal/cursor.js
  init_Errors();
  var staticCursor2 = {
    bytes: new Uint8Array(),
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: /* @__PURE__ */ new Map(),
    recursiveReadCount: 0,
    recursiveReadLimit: Number.POSITIVE_INFINITY,
    assertReadLimit() {
      if (this.recursiveReadCount >= this.recursiveReadLimit)
        throw new RecursiveReadLimitExceededError2({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit
        });
    },
    assertPosition(position) {
      if (position < 0 || position > this.bytes.length - 1)
        throw new PositionOutOfBoundsError2({
          length: this.bytes.length,
          position
        });
    },
    decrementPosition(offset) {
      if (offset < 0)
        throw new NegativeOffsetError2({ offset });
      const position = this.position - offset;
      this.assertPosition(position);
      this.position = position;
    },
    getReadCount(position) {
      return this.positionReadCount.get(position || this.position) || 0;
    },
    incrementPosition(offset) {
      if (offset < 0)
        throw new NegativeOffsetError2({ offset });
      const position = this.position + offset;
      this.assertPosition(position);
      this.position = position;
    },
    inspectByte(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position);
      return this.bytes[position];
    },
    inspectBytes(length, position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + length - 1);
      return this.bytes.subarray(position, position + length);
    },
    inspectUint8(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position);
      return this.bytes[position];
    },
    inspectUint16(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 1);
      return this.dataView.getUint16(position);
    },
    inspectUint24(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 2);
      return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
    },
    inspectUint32(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 3);
      return this.dataView.getUint32(position);
    },
    pushByte(byte) {
      this.assertPosition(this.position);
      this.bytes[this.position] = byte;
      this.position++;
    },
    pushBytes(bytes) {
      this.assertPosition(this.position + bytes.length - 1);
      this.bytes.set(bytes, this.position);
      this.position += bytes.length;
    },
    pushUint8(value) {
      this.assertPosition(this.position);
      this.bytes[this.position] = value;
      this.position++;
    },
    pushUint16(value) {
      this.assertPosition(this.position + 1);
      this.dataView.setUint16(this.position, value);
      this.position += 2;
    },
    pushUint24(value) {
      this.assertPosition(this.position + 2);
      this.dataView.setUint16(this.position, value >> 8);
      this.dataView.setUint8(this.position + 2, value & ~4294967040);
      this.position += 3;
    },
    pushUint32(value) {
      this.assertPosition(this.position + 3);
      this.dataView.setUint32(this.position, value);
      this.position += 4;
    },
    readByte() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectByte();
      this.position++;
      return value;
    },
    readBytes(length, size5) {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectBytes(length);
      this.position += size5 ?? length;
      return value;
    },
    readUint8() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint8();
      this.position += 1;
      return value;
    },
    readUint16() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint16();
      this.position += 2;
      return value;
    },
    readUint24() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint24();
      this.position += 3;
      return value;
    },
    readUint32() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint32();
      this.position += 4;
      return value;
    },
    get remaining() {
      return this.bytes.length - this.position;
    },
    setPosition(position) {
      const oldPosition = this.position;
      this.assertPosition(position);
      this.position = position;
      return () => this.position = oldPosition;
    },
    _touch() {
      if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
        return;
      const count = this.getReadCount();
      this.positionReadCount.set(this.position, count + 1);
      if (count > 0)
        this.recursiveReadCount++;
    }
  };
  function create(bytes, { recursiveReadLimit = 8192 } = {}) {
    const cursor = Object.create(staticCursor2);
    cursor.bytes = bytes;
    cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    cursor.positionReadCount = /* @__PURE__ */ new Map();
    cursor.recursiveReadLimit = recursiveReadLimit;
    return cursor;
  }
  var NegativeOffsetError2 = class extends BaseError3 {
    constructor({ offset }) {
      super(`Offset \`${offset}\` cannot be negative.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Cursor.NegativeOffsetError"
      });
    }
  };
  var PositionOutOfBoundsError2 = class extends BaseError3 {
    constructor({ length, position }) {
      super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Cursor.PositionOutOfBoundsError"
      });
    }
  };
  var RecursiveReadLimitExceededError2 = class extends BaseError3 {
    constructor({ count, limit }) {
      super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Cursor.RecursiveReadLimitExceededError"
      });
    }
  };

  // node_modules/ox/_esm/core/AbiParameters.js
  function decode3(parameters, data, options = {}) {
    const { as = "Array", checksumAddress: checksumAddress2 = false } = options;
    const bytes = typeof data === "string" ? fromHex(data) : data;
    const cursor = create(bytes);
    if (size2(bytes) === 0 && parameters.length > 0)
      throw new ZeroDataError();
    if (size2(bytes) && size2(bytes) < 32)
      throw new DataSizeTooSmallError({
        data: typeof data === "string" ? data : fromBytes(data),
        parameters,
        size: size2(bytes)
      });
    let consumed = 0;
    const values = as === "Array" ? [] : {};
    for (let i20 = 0; i20 < parameters.length; ++i20) {
      const param = parameters[i20];
      cursor.setPosition(consumed);
      const [data2, consumed_] = decodeParameter2(cursor, param, {
        checksumAddress: checksumAddress2,
        staticPosition: 0
      });
      consumed += consumed_;
      if (as === "Array")
        values.push(data2);
      else
        values[param.name ?? i20] = data2;
    }
    return values;
  }
  function encode4(parameters, values, options) {
    const { checksumAddress: checksumAddress2 = false } = options ?? {};
    if (parameters.length !== values.length)
      throw new LengthMismatchError({
        expectedLength: parameters.length,
        givenLength: values.length
      });
    const preparedParameters = prepareParameters({
      checksumAddress: checksumAddress2,
      parameters,
      values
    });
    const data = encode3(preparedParameters);
    if (data.length === 0)
      return "0x";
    return data;
  }
  function encodePacked(types, values) {
    if (types.length !== values.length)
      throw new LengthMismatchError({
        expectedLength: types.length,
        givenLength: values.length
      });
    const data = [];
    for (let i20 = 0; i20 < types.length; i20++) {
      const type = types[i20];
      const value = values[i20];
      data.push(encodePacked.encode(type, value));
    }
    return concat2(...data);
  }
  (function(encodePacked2) {
    function encode6(type, value, isArray = false) {
      if (type === "address") {
        const address = value;
        assert4(address);
        return padLeft(address.toLowerCase(), isArray ? 32 : 0);
      }
      if (type === "string")
        return fromString2(value);
      if (type === "bytes")
        return value;
      if (type === "bool")
        return padLeft(fromBoolean(value), isArray ? 32 : 1);
      const intMatch = type.match(integerRegex3);
      if (intMatch) {
        const [_type, baseType, bits = "256"] = intMatch;
        const size5 = Number.parseInt(bits, 10) / 8;
        return fromNumber(value, {
          size: isArray ? 32 : size5,
          signed: baseType === "int"
        });
      }
      const bytesMatch = type.match(bytesRegex3);
      if (bytesMatch) {
        const [_type, size5] = bytesMatch;
        if (Number.parseInt(size5, 10) !== (value.length - 2) / 2)
          throw new BytesSizeMismatchError2({
            expectedSize: Number.parseInt(size5, 10),
            value
          });
        return padRight(value, isArray ? 32 : 0);
      }
      const arrayMatch = type.match(arrayRegex);
      if (arrayMatch && Array.isArray(value)) {
        const [_type, childType] = arrayMatch;
        const data = [];
        for (let i20 = 0; i20 < value.length; i20++) {
          data.push(encode6(childType, value[i20], true));
        }
        if (data.length === 0)
          return "0x";
        return concat2(...data);
      }
      throw new InvalidTypeError(type);
    }
    encodePacked2.encode = encode6;
  })(encodePacked || (encodePacked = {}));
  function from5(parameters) {
    if (Array.isArray(parameters) && typeof parameters[0] === "string")
      return parseAbiParameters(parameters);
    if (typeof parameters === "string")
      return parseAbiParameters(parameters);
    return parameters;
  }
  var DataSizeTooSmallError = class extends BaseError3 {
    constructor({ data, parameters, size: size5 }) {
      super(`Data size of ${size5} bytes is too small for given parameters.`, {
        metaMessages: [
          `Params: (${formatAbiParameters(parameters)})`,
          `Data:   ${data} (${size5} bytes)`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.DataSizeTooSmallError"
      });
    }
  };
  var ZeroDataError = class extends BaseError3 {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.');
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.ZeroDataError"
      });
    }
  };
  var ArrayLengthMismatchError = class extends BaseError3 {
    constructor({ expectedLength, givenLength, type }) {
      super(`Array length mismatch for type \`${type}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.ArrayLengthMismatchError"
      });
    }
  };
  var BytesSizeMismatchError2 = class extends BaseError3 {
    constructor({ expectedSize, value }) {
      super(`Size of bytes "${value}" (bytes${size3(value)}) does not match expected size (bytes${expectedSize}).`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.BytesSizeMismatchError"
      });
    }
  };
  var LengthMismatchError = class extends BaseError3 {
    constructor({ expectedLength, givenLength }) {
      super([
        "ABI encoding parameters/values length mismatch.",
        `Expected length (parameters): ${expectedLength}`,
        `Given length (values): ${givenLength}`
      ].join("\n"));
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.LengthMismatchError"
      });
    }
  };
  var InvalidArrayError2 = class extends BaseError3 {
    constructor(value) {
      super(`Value \`${value}\` is not a valid array.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.InvalidArrayError"
      });
    }
  };
  var InvalidTypeError = class extends BaseError3 {
    constructor(type) {
      super(`Type \`${type}\` is not a valid ABI Type.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiParameters.InvalidTypeError"
      });
    }
  };

  // node_modules/ox/_esm/core/Authorization.js
  init_Hex();

  // node_modules/ox/_esm/core/Rlp.js
  init_Bytes();
  init_Errors();
  init_Hex();
  function from6(value, options) {
    const { as } = options;
    const encodable = getEncodable2(value);
    const cursor = create(new Uint8Array(encodable.length));
    encodable.encode(cursor);
    if (as === "Hex")
      return fromBytes(cursor.bytes);
    return cursor.bytes;
  }
  function fromHex3(hex2, options = {}) {
    const { as = "Hex" } = options;
    return from6(hex2, { as });
  }
  function getEncodable2(bytes) {
    if (Array.isArray(bytes))
      return getEncodableList2(bytes.map((x) => getEncodable2(x)));
    return getEncodableBytes2(bytes);
  }
  function getEncodableList2(list) {
    const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
    const sizeOfBodyLength = getSizeOfLength2(bodyLength);
    const length = (() => {
      if (bodyLength <= 55)
        return 1 + bodyLength;
      return 1 + sizeOfBodyLength + bodyLength;
    })();
    return {
      length,
      encode(cursor) {
        if (bodyLength <= 55) {
          cursor.pushByte(192 + bodyLength);
        } else {
          cursor.pushByte(192 + 55 + sizeOfBodyLength);
          if (sizeOfBodyLength === 1)
            cursor.pushUint8(bodyLength);
          else if (sizeOfBodyLength === 2)
            cursor.pushUint16(bodyLength);
          else if (sizeOfBodyLength === 3)
            cursor.pushUint24(bodyLength);
          else
            cursor.pushUint32(bodyLength);
        }
        for (const { encode: encode6 } of list) {
          encode6(cursor);
        }
      }
    };
  }
  function getEncodableBytes2(bytesOrHex) {
    const bytes = typeof bytesOrHex === "string" ? fromHex(bytesOrHex) : bytesOrHex;
    const sizeOfBytesLength = getSizeOfLength2(bytes.length);
    const length = (() => {
      if (bytes.length === 1 && bytes[0] < 128)
        return 1;
      if (bytes.length <= 55)
        return 1 + bytes.length;
      return 1 + sizeOfBytesLength + bytes.length;
    })();
    return {
      length,
      encode(cursor) {
        if (bytes.length === 1 && bytes[0] < 128) {
          cursor.pushBytes(bytes);
        } else if (bytes.length <= 55) {
          cursor.pushByte(128 + bytes.length);
          cursor.pushBytes(bytes);
        } else {
          cursor.pushByte(128 + 55 + sizeOfBytesLength);
          if (sizeOfBytesLength === 1)
            cursor.pushUint8(bytes.length);
          else if (sizeOfBytesLength === 2)
            cursor.pushUint16(bytes.length);
          else if (sizeOfBytesLength === 3)
            cursor.pushUint24(bytes.length);
          else
            cursor.pushUint32(bytes.length);
          cursor.pushBytes(bytes);
        }
      }
    };
  }
  function getSizeOfLength2(length) {
    if (length <= 255)
      return 1;
    if (length <= 65535)
      return 2;
    if (length <= 16777215)
      return 3;
    if (length <= 4294967295)
      return 4;
    throw new BaseError3("Length is too large.");
  }

  // node_modules/ox/_esm/core/Signature.js
  init_Errors();
  init_Hex();
  init_Json();
  function assert5(signature, options = {}) {
    const { recovered } = options;
    if (typeof signature.r === "undefined")
      throw new MissingPropertiesError({ signature });
    if (typeof signature.s === "undefined")
      throw new MissingPropertiesError({ signature });
    if (recovered && typeof signature.yParity === "undefined")
      throw new MissingPropertiesError({ signature });
    if (signature.r < 0n || signature.r > maxUint2562)
      throw new InvalidRError({ value: signature.r });
    if (signature.s < 0n || signature.s > maxUint2562)
      throw new InvalidSError({ value: signature.s });
    if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
      throw new InvalidYParityError({ value: signature.yParity });
  }
  function fromBytes3(signature) {
    return fromHex4(fromBytes(signature));
  }
  function fromHex4(signature) {
    if (signature.length !== 130 && signature.length !== 132)
      throw new InvalidSerializedSizeError2({ signature });
    const r20 = BigInt(slice3(signature, 0, 32));
    const s12 = BigInt(slice3(signature, 32, 64));
    const yParity = (() => {
      const yParity2 = Number(`0x${signature.slice(130)}`);
      if (Number.isNaN(yParity2))
        return void 0;
      try {
        return vToYParity(yParity2);
      } catch {
        throw new InvalidYParityError({ value: yParity2 });
      }
    })();
    if (typeof yParity === "undefined")
      return {
        r: r20,
        s: s12
      };
    return {
      r: r20,
      s: s12,
      yParity
    };
  }
  function extract2(value) {
    if (typeof value.r === "undefined")
      return void 0;
    if (typeof value.s === "undefined")
      return void 0;
    return from7(value);
  }
  function from7(signature) {
    const signature_ = (() => {
      if (typeof signature === "string")
        return fromHex4(signature);
      if (signature instanceof Uint8Array)
        return fromBytes3(signature);
      if (typeof signature.r === "string")
        return fromRpc2(signature);
      if (signature.v)
        return fromLegacy(signature);
      return {
        r: signature.r,
        s: signature.s,
        ...typeof signature.yParity !== "undefined" ? { yParity: signature.yParity } : {}
      };
    })();
    assert5(signature_);
    return signature_;
  }
  function fromLegacy(signature) {
    return {
      r: signature.r,
      s: signature.s,
      yParity: vToYParity(signature.v)
    };
  }
  function fromRpc2(signature) {
    const yParity = (() => {
      const v = signature.v ? Number(signature.v) : void 0;
      let yParity2 = signature.yParity ? Number(signature.yParity) : void 0;
      if (typeof v === "number" && typeof yParity2 !== "number")
        yParity2 = vToYParity(v);
      if (typeof yParity2 !== "number")
        throw new InvalidYParityError({ value: signature.yParity });
      return yParity2;
    })();
    return {
      r: BigInt(signature.r),
      s: BigInt(signature.s),
      yParity
    };
  }
  function toTuple(signature) {
    const { r: r20, s: s12, yParity } = signature;
    return [
      yParity ? "0x01" : "0x",
      r20 === 0n ? "0x" : trimLeft2(fromNumber(r20)),
      s12 === 0n ? "0x" : trimLeft2(fromNumber(s12))
    ];
  }
  function vToYParity(v) {
    if (v === 0 || v === 27)
      return 0;
    if (v === 1 || v === 28)
      return 1;
    if (v >= 35)
      return v % 2 === 0 ? 1 : 0;
    throw new InvalidVError({ value: v });
  }
  var InvalidSerializedSizeError2 = class extends BaseError3 {
    constructor({ signature }) {
      super(`Value \`${signature}\` is an invalid signature size.`, {
        metaMessages: [
          "Expected: 64 bytes or 65 bytes.",
          `Received ${size3(from2(signature))} bytes.`
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidSerializedSizeError"
      });
    }
  };
  var MissingPropertiesError = class extends BaseError3 {
    constructor({ signature }) {
      super(`Signature \`${stringify2(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.MissingPropertiesError"
      });
    }
  };
  var InvalidRError = class extends BaseError3 {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidRError"
      });
    }
  };
  var InvalidSError = class extends BaseError3 {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidSError"
      });
    }
  };
  var InvalidYParityError = class extends BaseError3 {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidYParityError"
      });
    }
  };
  var InvalidVError = class extends BaseError3 {
    constructor({ value }) {
      super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "Signature.InvalidVError"
      });
    }
  };

  // node_modules/ox/_esm/core/Authorization.js
  function from8(authorization, options = {}) {
    if (typeof authorization.chainId === "string")
      return fromRpc3(authorization);
    return { ...authorization, ...options.signature };
  }
  function fromRpc3(authorization) {
    const { address, chainId, nonce } = authorization;
    const signature = extract2(authorization);
    return {
      address,
      chainId: Number(chainId),
      nonce: BigInt(nonce),
      ...signature
    };
  }
  function getSignPayload(authorization) {
    return hash2(authorization, { presign: true });
  }
  function hash2(authorization, options = {}) {
    const { presign } = options;
    return keccak2562(concat2("0x05", fromHex3(toTuple2(presign ? {
      address: authorization.address,
      chainId: authorization.chainId,
      nonce: authorization.nonce
    } : authorization))));
  }
  function toTuple2(authorization) {
    const { address, chainId, nonce } = authorization;
    const signature = extract2(authorization);
    return [
      chainId ? fromNumber(chainId) : "0x",
      address,
      nonce ? fromNumber(nonce) : "0x",
      ...signature ? toTuple(signature) : []
    ];
  }

  // node_modules/ox/_esm/erc8010/SignatureErc8010.js
  init_Errors();
  init_Hex();

  // node_modules/ox/_esm/core/Secp256k1.js
  init_secp256k1();
  init_Hex();
  function recoverAddress2(options) {
    return fromPublicKey(recoverPublicKey2(options));
  }
  function recoverPublicKey2(options) {
    const { payload, signature } = options;
    const { r: r20, s: s12, yParity } = signature;
    const signature_ = new secp256k1.Signature(BigInt(r20), BigInt(s12)).addRecoveryBit(yParity);
    const point = signature_.recoverPublicKey(from2(payload).substring(2));
    return from3(point);
  }

  // node_modules/ox/_esm/erc8010/SignatureErc8010.js
  var magicBytes = "0x8010801080108010801080108010801080108010801080108010801080108010";
  var suffixParameters = from5("(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data");
  function assert6(value) {
    if (typeof value === "string") {
      if (slice3(value, -32) !== magicBytes)
        throw new InvalidWrappedSignatureError(value);
    } else
      assert5(value.authorization);
  }
  function from9(value) {
    if (typeof value === "string")
      return unwrap(value);
    return value;
  }
  function unwrap(wrapped) {
    assert6(wrapped);
    const suffixLength = toNumber(slice3(wrapped, -64, -32));
    const suffix = slice3(wrapped, -suffixLength - 64, -64);
    const signature = slice3(wrapped, 0, -suffixLength - 64);
    const [auth, to, data] = decode3(suffixParameters, suffix);
    const authorization = from8({
      address: auth.delegation,
      chainId: Number(auth.chainId),
      nonce: auth.nonce,
      yParity: auth.yParity,
      r: auth.r,
      s: auth.s
    });
    return {
      authorization,
      signature,
      ...data && data !== "0x" ? { data, to } : {}
    };
  }
  function wrap(value) {
    const { data, signature } = value;
    assert6(value);
    const self2 = recoverAddress2({
      payload: getSignPayload(value.authorization),
      signature: from7(value.authorization)
    });
    const suffix = encode4(suffixParameters, [
      {
        ...value.authorization,
        delegation: value.authorization.address,
        chainId: BigInt(value.authorization.chainId)
      },
      value.to ?? self2,
      data ?? "0x"
    ]);
    const suffixLength = fromNumber(size3(suffix), { size: 32 });
    return concat2(signature, suffix, suffixLength, magicBytes);
  }
  function validate4(value) {
    try {
      assert6(value);
      return true;
    } catch {
      return false;
    }
  }
  var InvalidWrappedSignatureError = class extends BaseError3 {
    constructor(wrapped) {
      super(`Value \`${wrapped}\` is an invalid ERC-8010 wrapped signature.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "SignatureErc8010.InvalidWrappedSignatureError"
      });
    }
  };

  // node_modules/viem/_esm/utils/formatters/proof.js
  function formatStorageProof(storageProof) {
    return storageProof.map((proof) => ({
      ...proof,
      value: BigInt(proof.value)
    }));
  }
  function formatProof(proof) {
    return {
      ...proof,
      balance: proof.balance ? BigInt(proof.balance) : void 0,
      nonce: proof.nonce ? hexToNumber(proof.nonce) : void 0,
      storageProof: proof.storageProof ? formatStorageProof(proof.storageProof) : void 0
    };
  }

  // node_modules/viem/_esm/actions/public/getProof.js
  async function getProof(client, { address, blockNumber, blockTag: blockTag_, storageKeys }) {
    const blockTag = blockTag_ ?? "latest";
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    const proof = await client.request({
      method: "eth_getProof",
      params: [address, storageKeys, blockNumberHex || blockTag]
    });
    return formatProof(proof);
  }

  // node_modules/viem/_esm/actions/public/getStorageAt.js
  init_toHex();
  async function getStorageAt(client, { address, blockNumber, blockTag = "latest", slot }) {
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    const data = await client.request({
      method: "eth_getStorageAt",
      params: [address, slot, blockNumberHex || blockTag]
    });
    return data;
  }

  // node_modules/viem/_esm/actions/public/getTransaction.js
  init_transaction();
  init_toHex();
  async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash: hash3, index: index2, sender, nonce }) {
    const blockTag = blockTag_ || "latest";
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    let transaction = null;
    if (hash3) {
      transaction = await client.request({
        method: "eth_getTransactionByHash",
        params: [hash3]
      }, { dedupe: true });
    } else if (blockHash) {
      transaction = await client.request({
        method: "eth_getTransactionByBlockHashAndIndex",
        params: [blockHash, numberToHex(index2)]
      }, { dedupe: true });
    } else if ((blockNumberHex || blockTag) && typeof index2 === "number") {
      transaction = await client.request({
        method: "eth_getTransactionByBlockNumberAndIndex",
        params: [blockNumberHex || blockTag, numberToHex(index2)]
      }, { dedupe: Boolean(blockNumberHex) });
    } else if (sender && typeof nonce === "number") {
      transaction = await client.request({
        method: "eth_getTransactionBySenderAndNonce",
        params: [sender, numberToHex(nonce)]
      }, { dedupe: true });
    }
    if (!transaction)
      throw new TransactionNotFoundError({
        blockHash,
        blockNumber,
        blockTag,
        hash: hash3,
        index: index2
      });
    const format = client.chain?.formatters?.transaction?.format || formatTransaction;
    return format(transaction, "getTransaction");
  }

  // node_modules/viem/_esm/actions/public/getTransactionConfirmations.js
  async function getTransactionConfirmations(client, { hash: hash3, transactionReceipt }) {
    const [blockNumber, transaction] = await Promise.all([
      getAction(client, getBlockNumber, "getBlockNumber")({}),
      hash3 ? getAction(client, getTransaction, "getTransaction")({ hash: hash3 }) : void 0
    ]);
    const transactionBlockNumber = transactionReceipt?.blockNumber || transaction?.blockNumber;
    if (!transactionBlockNumber)
      return 0n;
    return blockNumber - transactionBlockNumber + 1n;
  }

  // node_modules/viem/_esm/actions/public/getTransactionReceipt.js
  init_transaction();
  async function getTransactionReceipt(client, { hash: hash3 }) {
    const receipt = await client.request({
      method: "eth_getTransactionReceipt",
      params: [hash3]
    }, { dedupe: true });
    if (!receipt)
      throw new TransactionReceiptNotFoundError({ hash: hash3 });
    const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
    return format(receipt, "getTransactionReceipt");
  }

  // node_modules/viem/_esm/actions/public/multicall.js
  init_abis();
  init_contracts();
  init_abi();
  init_base();
  init_contract();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_getChainContractAddress();
  async function multicall(client, parameters) {
    const { account, authorizationList, allowFailure = true, blockNumber, blockOverrides, blockTag, stateOverride } = parameters;
    const contracts = parameters.contracts;
    const { batchSize = parameters.batchSize ?? 1024, deployless = parameters.deployless ?? false } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
    const multicallAddress = (() => {
      if (parameters.multicallAddress)
        return parameters.multicallAddress;
      if (deployless)
        return null;
      if (client.chain) {
        return getChainContractAddress({
          blockNumber,
          chain: client.chain,
          contract: "multicall3"
        });
      }
      throw new Error("client chain not configured. multicallAddress is required.");
    })();
    const chunkedCalls = [[]];
    let currentChunk = 0;
    let currentChunkSize = 0;
    for (let i20 = 0; i20 < contracts.length; i20++) {
      const { abi: abi2, address, args, functionName } = contracts[i20];
      try {
        const callData = encodeFunctionData({ abi: abi2, args, functionName });
        currentChunkSize += (callData.length - 2) / 2;
        if (
          // Check if batching is enabled.
          batchSize > 0 && // Check if the current size of the batch exceeds the size limit.
          currentChunkSize > batchSize && // Check if the current chunk is not already empty.
          chunkedCalls[currentChunk].length > 0
        ) {
          currentChunk++;
          currentChunkSize = (callData.length - 2) / 2;
          chunkedCalls[currentChunk] = [];
        }
        chunkedCalls[currentChunk] = [
          ...chunkedCalls[currentChunk],
          {
            allowFailure: true,
            callData,
            target: address
          }
        ];
      } catch (err) {
        const error = getContractError(err, {
          abi: abi2,
          address,
          args,
          docsPath: "/docs/contract/multicall",
          functionName,
          sender: account
        });
        if (!allowFailure)
          throw error;
        chunkedCalls[currentChunk] = [
          ...chunkedCalls[currentChunk],
          {
            allowFailure: true,
            callData: "0x",
            target: address
          }
        ];
      }
    }
    const aggregate3Results = await Promise.allSettled(chunkedCalls.map((calls) => getAction(client, readContract, "readContract")({
      ...multicallAddress === null ? { code: multicall3Bytecode } : { address: multicallAddress },
      abi: multicall3Abi,
      account,
      args: [calls],
      authorizationList,
      blockNumber,
      blockOverrides,
      blockTag,
      functionName: "aggregate3",
      stateOverride
    })));
    const results = [];
    for (let i20 = 0; i20 < aggregate3Results.length; i20++) {
      const result = aggregate3Results[i20];
      if (result.status === "rejected") {
        if (!allowFailure)
          throw result.reason;
        for (let j = 0; j < chunkedCalls[i20].length; j++) {
          results.push({
            status: "failure",
            error: result.reason,
            result: void 0
          });
        }
        continue;
      }
      const aggregate3Result = result.value;
      for (let j = 0; j < aggregate3Result.length; j++) {
        const { returnData, success } = aggregate3Result[j];
        const { callData } = chunkedCalls[i20][j];
        const { abi: abi2, address, functionName, args } = contracts[results.length];
        try {
          if (callData === "0x")
            throw new AbiDecodingZeroDataError();
          if (!success)
            throw new RawContractError({ data: returnData });
          const result2 = decodeFunctionResult({
            abi: abi2,
            args,
            data: returnData,
            functionName
          });
          results.push(allowFailure ? { result: result2, status: "success" } : result2);
        } catch (err) {
          const error = getContractError(err, {
            abi: abi2,
            address,
            args,
            docsPath: "/docs/contract/multicall",
            functionName
          });
          if (!allowFailure)
            throw error;
          results.push({ error, result: void 0, status: "failure" });
        }
      }
    }
    if (results.length !== contracts.length)
      throw new BaseError2("multicall results mismatch");
    return results;
  }

  // node_modules/viem/_esm/actions/public/simulateBlocks.js
  init_BlockOverrides();
  init_parseAccount();
  init_abi();
  init_contract();
  init_node();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_concat();
  init_toHex();
  init_getNodeError();
  init_transactionRequest();
  init_stateOverride2();
  init_assertRequest();
  async function simulateBlocks(client, parameters) {
    const { blockNumber, blockTag = client.experimental_blockTag ?? "latest", blocks, returnFullTransactions, traceTransfers, validation } = parameters;
    try {
      const blockStateCalls = [];
      for (const block2 of blocks) {
        const blockOverrides = block2.blockOverrides ? toRpc2(block2.blockOverrides) : void 0;
        const calls = block2.calls.map((call_) => {
          const call2 = call_;
          const account = call2.account ? parseAccount(call2.account) : void 0;
          const data = call2.abi ? encodeFunctionData(call2) : call2.data;
          const request = {
            ...call2,
            account,
            data: call2.dataSuffix ? concat([data || "0x", call2.dataSuffix]) : data,
            from: call2.from ?? account?.address
          };
          assertRequest(request);
          return formatTransactionRequest(request);
        });
        const stateOverrides = block2.stateOverrides ? serializeStateOverride(block2.stateOverrides) : void 0;
        blockStateCalls.push({
          blockOverrides,
          calls,
          stateOverrides
        });
      }
      const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
      const block = blockNumberHex || blockTag;
      const result = await client.request({
        method: "eth_simulateV1",
        params: [
          { blockStateCalls, returnFullTransactions, traceTransfers, validation },
          block
        ]
      });
      return result.map((block2, i20) => ({
        ...formatBlock(block2),
        calls: block2.calls.map((call2, j) => {
          const { abi: abi2, args, functionName, to } = blocks[i20].calls[j];
          const data = call2.error?.data ?? call2.returnData;
          const gasUsed = BigInt(call2.gasUsed);
          const logs = call2.logs?.map((log) => formatLog(log));
          const status = call2.status === "0x1" ? "success" : "failure";
          const result2 = abi2 && status === "success" && data !== "0x" ? decodeFunctionResult({
            abi: abi2,
            data,
            functionName
          }) : null;
          const error = (() => {
            if (status === "success")
              return void 0;
            let error2;
            if (data === "0x")
              error2 = new AbiDecodingZeroDataError();
            else if (data)
              error2 = new RawContractError({ data });
            if (!error2)
              return void 0;
            return getContractError(error2, {
              abi: abi2 ?? [],
              address: to ?? "0x",
              args,
              functionName: functionName ?? "<unknown>"
            });
          })();
          return {
            data,
            gasUsed,
            logs,
            status,
            ...status === "success" ? {
              result: result2
            } : {
              error
            }
          };
        })
      }));
    } catch (e42) {
      const cause = e42;
      const error = getNodeError(cause, {});
      if (error instanceof UnknownNodeError)
        throw cause;
      throw error;
    }
  }

  // node_modules/ox/_esm/core/AbiItem.js
  init_exports();
  init_Errors();
  init_Hex();

  // node_modules/ox/_esm/core/internal/abiItem.js
  init_Errors();
  function normalizeSignature2(signature) {
    let active = true;
    let current = "";
    let level = 0;
    let result = "";
    let valid = false;
    for (let i20 = 0; i20 < signature.length; i20++) {
      const char = signature[i20];
      if (["(", ")", ","].includes(char))
        active = true;
      if (char === "(")
        level++;
      if (char === ")")
        level--;
      if (!active)
        continue;
      if (level === 0) {
        if (char === " " && ["event", "function", "error", ""].includes(result))
          result = "";
        else {
          result += char;
          if (char === ")") {
            valid = true;
            break;
          }
        }
        continue;
      }
      if (char === " ") {
        if (signature[i20 - 1] !== "," && current !== "," && current !== ",(") {
          current = "";
          active = false;
        }
        continue;
      }
      result += char;
      current += char;
    }
    if (!valid)
      throw new BaseError3("Unable to normalize signature.");
    return result;
  }
  function isArgOfType2(arg, abiParameter) {
    const argType = typeof arg;
    const abiParameterType = abiParameter.type;
    switch (abiParameterType) {
      case "address":
        return validate3(arg, { strict: false });
      case "bool":
        return argType === "boolean";
      case "function":
        return argType === "string";
      case "string":
        return argType === "string";
      default: {
        if (abiParameterType === "tuple" && "components" in abiParameter)
          return Object.values(abiParameter.components).every((component, index2) => {
            return isArgOfType2(Object.values(arg)[index2], component);
          });
        if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
          return argType === "number" || argType === "bigint";
        if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
          return argType === "string" || arg instanceof Uint8Array;
        if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
          return Array.isArray(arg) && arg.every((x) => isArgOfType2(x, {
            ...abiParameter,
            // Pop off `[]` or `[M]` from end of type
            type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
          }));
        }
        return false;
      }
    }
  }
  function getAmbiguousTypes2(sourceParameters, targetParameters, args) {
    for (const parameterIndex in sourceParameters) {
      const sourceParameter = sourceParameters[parameterIndex];
      const targetParameter = targetParameters[parameterIndex];
      if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
        return getAmbiguousTypes2(sourceParameter.components, targetParameter.components, args[parameterIndex]);
      const types = [sourceParameter.type, targetParameter.type];
      const ambiguous = (() => {
        if (types.includes("address") && types.includes("bytes20"))
          return true;
        if (types.includes("address") && types.includes("string"))
          return validate3(args[parameterIndex], {
            strict: false
          });
        if (types.includes("address") && types.includes("bytes"))
          return validate3(args[parameterIndex], {
            strict: false
          });
        return false;
      })();
      if (ambiguous)
        return types;
    }
    return;
  }

  // node_modules/ox/_esm/core/AbiItem.js
  function from10(abiItem, options = {}) {
    const { prepare = true } = options;
    const item = (() => {
      if (Array.isArray(abiItem))
        return parseAbiItem(abiItem);
      if (typeof abiItem === "string")
        return parseAbiItem(abiItem);
      return abiItem;
    })();
    return {
      ...item,
      ...prepare ? { hash: getSignatureHash(item) } : {}
    };
  }
  function fromAbi(abi2, name, options) {
    const { args = [], prepare = true } = options ?? {};
    const isSelector = validate2(name, { strict: false });
    const abiItems = abi2.filter((abiItem2) => {
      if (isSelector) {
        if (abiItem2.type === "function" || abiItem2.type === "error")
          return getSelector(abiItem2) === slice3(name, 0, 4);
        if (abiItem2.type === "event")
          return getSignatureHash(abiItem2) === name;
        return false;
      }
      return "name" in abiItem2 && abiItem2.name === name;
    });
    if (abiItems.length === 0)
      throw new NotFoundError({ name });
    if (abiItems.length === 1)
      return {
        ...abiItems[0],
        ...prepare ? { hash: getSignatureHash(abiItems[0]) } : {}
      };
    let matchedAbiItem;
    for (const abiItem2 of abiItems) {
      if (!("inputs" in abiItem2))
        continue;
      if (!args || args.length === 0) {
        if (!abiItem2.inputs || abiItem2.inputs.length === 0)
          return {
            ...abiItem2,
            ...prepare ? { hash: getSignatureHash(abiItem2) } : {}
          };
        continue;
      }
      if (!abiItem2.inputs)
        continue;
      if (abiItem2.inputs.length === 0)
        continue;
      if (abiItem2.inputs.length !== args.length)
        continue;
      const matched = args.every((arg, index2) => {
        const abiParameter = "inputs" in abiItem2 && abiItem2.inputs[index2];
        if (!abiParameter)
          return false;
        return isArgOfType2(arg, abiParameter);
      });
      if (matched) {
        if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
          const ambiguousTypes = getAmbiguousTypes2(abiItem2.inputs, matchedAbiItem.inputs, args);
          if (ambiguousTypes)
            throw new AmbiguityError({
              abiItem: abiItem2,
              type: ambiguousTypes[0]
            }, {
              abiItem: matchedAbiItem,
              type: ambiguousTypes[1]
            });
        }
        matchedAbiItem = abiItem2;
      }
    }
    const abiItem = (() => {
      if (matchedAbiItem)
        return matchedAbiItem;
      const [abiItem2, ...overloads] = abiItems;
      return { ...abiItem2, overloads };
    })();
    if (!abiItem)
      throw new NotFoundError({ name });
    return {
      ...abiItem,
      ...prepare ? { hash: getSignatureHash(abiItem) } : {}
    };
  }
  function getSelector(...parameters) {
    const abiItem = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name] = parameters;
        return fromAbi(abi2, name);
      }
      return parameters[0];
    })();
    return slice3(getSignatureHash(abiItem), 0, 4);
  }
  function getSignature(...parameters) {
    const abiItem = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name] = parameters;
        return fromAbi(abi2, name);
      }
      return parameters[0];
    })();
    const signature = (() => {
      if (typeof abiItem === "string")
        return abiItem;
      return formatAbiItem(abiItem);
    })();
    return normalizeSignature2(signature);
  }
  function getSignatureHash(...parameters) {
    const abiItem = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name] = parameters;
        return fromAbi(abi2, name);
      }
      return parameters[0];
    })();
    if (typeof abiItem !== "string" && "hash" in abiItem && abiItem.hash)
      return abiItem.hash;
    return keccak2562(fromString2(getSignature(abiItem)));
  }
  var AmbiguityError = class extends BaseError3 {
    constructor(x, y3) {
      super("Found ambiguous types in overloaded ABI Items.", {
        metaMessages: [
          // TODO: abitype to add support for signature-formatted ABI items.
          `\`${x.type}\` in \`${normalizeSignature2(formatAbiItem(x.abiItem))}\`, and`,
          `\`${y3.type}\` in \`${normalizeSignature2(formatAbiItem(y3.abiItem))}\``,
          "",
          "These types encode differently and cannot be distinguished at runtime.",
          "Remove one of the ambiguous items in the ABI."
        ]
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiItem.AmbiguityError"
      });
    }
  };
  var NotFoundError = class extends BaseError3 {
    constructor({ name, data, type = "item" }) {
      const selector = (() => {
        if (name)
          return ` with name "${name}"`;
        if (data)
          return ` with data "${data}"`;
        return "";
      })();
      super(`ABI ${type}${selector} not found.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "AbiItem.NotFoundError"
      });
    }
  };

  // node_modules/ox/_esm/core/AbiConstructor.js
  init_Hex();
  function encode5(...parameters) {
    const [abiConstructor, options] = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, options2] = parameters;
        return [fromAbi2(abi2), options2];
      }
      return parameters;
    })();
    const { bytecode, args } = options;
    return concat2(bytecode, abiConstructor.inputs?.length && args?.length ? encode4(abiConstructor.inputs, args) : "0x");
  }
  function from11(abiConstructor) {
    return from10(abiConstructor);
  }
  function fromAbi2(abi2) {
    const item = abi2.find((item2) => item2.type === "constructor");
    if (!item)
      throw new NotFoundError({ name: "constructor" });
    return item;
  }

  // node_modules/ox/_esm/core/AbiFunction.js
  init_Hex();
  function encodeData2(...parameters) {
    const [abiFunction, args = []] = (() => {
      if (Array.isArray(parameters[0])) {
        const [abi2, name, args3] = parameters;
        return [fromAbi3(abi2, name, { args: args3 }), args3];
      }
      const [abiFunction2, args2] = parameters;
      return [abiFunction2, args2];
    })();
    const { overloads } = abiFunction;
    const item = overloads ? fromAbi3([abiFunction, ...overloads], abiFunction.name, {
      args
    }) : abiFunction;
    const selector = getSelector2(item);
    const data = args.length > 0 ? encode4(item.inputs, args) : void 0;
    return data ? concat2(selector, data) : selector;
  }
  function from12(abiFunction, options = {}) {
    return from10(abiFunction, options);
  }
  function fromAbi3(abi2, name, options) {
    const item = fromAbi(abi2, name, options);
    if (item.type !== "function")
      throw new NotFoundError({ name, type: "function" });
    return item;
  }
  function getSelector2(abiItem) {
    return getSelector(abiItem);
  }

  // node_modules/viem/_esm/actions/public/simulateCalls.js
  init_parseAccount();

  // node_modules/viem/_esm/constants/address.js
  var ethAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  var zeroAddress = "0x0000000000000000000000000000000000000000";

  // node_modules/viem/_esm/actions/public/simulateCalls.js
  init_contracts();
  init_base();
  init_encodeFunctionData();
  var getBalanceCode = "0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033";
  async function simulateCalls(client, parameters) {
    const { blockNumber, blockTag, calls, stateOverrides, traceAssetChanges, traceTransfers, validation } = parameters;
    const account = parameters.account ? parseAccount(parameters.account) : void 0;
    if (traceAssetChanges && !account)
      throw new BaseError2("`account` is required when `traceAssetChanges` is true");
    const getBalanceData = account ? encode5(from11("constructor(bytes, bytes)"), {
      bytecode: deploylessCallViaBytecodeBytecode,
      args: [
        getBalanceCode,
        encodeData2(from12("function getBalance(address)"), [account.address])
      ]
    }) : void 0;
    const assetAddresses = traceAssetChanges ? await Promise.all(parameters.calls.map(async (call2) => {
      if (!call2.data && !call2.abi)
        return;
      const { accessList } = await createAccessList(client, {
        account: account.address,
        ...call2,
        data: call2.abi ? encodeFunctionData(call2) : call2.data
      });
      return accessList.map(({ address, storageKeys }) => storageKeys.length > 0 ? address : null);
    })).then((x) => x.flat().filter(Boolean)) : [];
    const blocks = await simulateBlocks(client, {
      blockNumber,
      blockTag,
      blocks: [
        ...traceAssetChanges ? [
          // ETH pre balances
          {
            calls: [{ data: getBalanceData }],
            stateOverrides
          },
          // Asset pre balances
          {
            calls: assetAddresses.map((address, i20) => ({
              abi: [
                from12("function balanceOf(address) returns (uint256)")
              ],
              functionName: "balanceOf",
              args: [account.address],
              to: address,
              from: zeroAddress,
              nonce: i20
            })),
            stateOverrides: [
              {
                address: zeroAddress,
                nonce: 0
              }
            ]
          }
        ] : [],
        {
          calls: [...calls, { to: zeroAddress }].map((call2) => ({
            ...call2,
            from: account?.address
          })),
          stateOverrides
        },
        ...traceAssetChanges ? [
          // ETH post balances
          {
            calls: [{ data: getBalanceData }]
          },
          // Asset post balances
          {
            calls: assetAddresses.map((address, i20) => ({
              abi: [
                from12("function balanceOf(address) returns (uint256)")
              ],
              functionName: "balanceOf",
              args: [account.address],
              to: address,
              from: zeroAddress,
              nonce: i20
            })),
            stateOverrides: [
              {
                address: zeroAddress,
                nonce: 0
              }
            ]
          },
          // Decimals
          {
            calls: assetAddresses.map((address, i20) => ({
              to: address,
              abi: [
                from12("function decimals() returns (uint256)")
              ],
              functionName: "decimals",
              from: zeroAddress,
              nonce: i20
            })),
            stateOverrides: [
              {
                address: zeroAddress,
                nonce: 0
              }
            ]
          },
          // Token URI
          {
            calls: assetAddresses.map((address, i20) => ({
              to: address,
              abi: [
                from12("function tokenURI(uint256) returns (string)")
              ],
              functionName: "tokenURI",
              args: [0n],
              from: zeroAddress,
              nonce: i20
            })),
            stateOverrides: [
              {
                address: zeroAddress,
                nonce: 0
              }
            ]
          },
          // Symbols
          {
            calls: assetAddresses.map((address, i20) => ({
              to: address,
              abi: [from12("function symbol() returns (string)")],
              functionName: "symbol",
              from: zeroAddress,
              nonce: i20
            })),
            stateOverrides: [
              {
                address: zeroAddress,
                nonce: 0
              }
            ]
          }
        ] : []
      ],
      traceTransfers,
      validation
    });
    const block_results = traceAssetChanges ? blocks[2] : blocks[0];
    const [block_ethPre, block_assetsPre, , block_ethPost, block_assetsPost, block_decimals, block_tokenURI, block_symbols] = traceAssetChanges ? blocks : [];
    const { calls: block_calls, ...block } = block_results;
    const results = block_calls.slice(0, -1) ?? [];
    const ethPre = block_ethPre?.calls ?? [];
    const assetsPre = block_assetsPre?.calls ?? [];
    const balancesPre = [...ethPre, ...assetsPre].map((call2) => call2.status === "success" ? hexToBigInt(call2.data) : null);
    const ethPost = block_ethPost?.calls ?? [];
    const assetsPost = block_assetsPost?.calls ?? [];
    const balancesPost = [...ethPost, ...assetsPost].map((call2) => call2.status === "success" ? hexToBigInt(call2.data) : null);
    const decimals = (block_decimals?.calls ?? []).map((x) => x.status === "success" ? x.result : null);
    const symbols = (block_symbols?.calls ?? []).map((x) => x.status === "success" ? x.result : null);
    const tokenURI = (block_tokenURI?.calls ?? []).map((x) => x.status === "success" ? x.result : null);
    const changes = [];
    for (const [i20, balancePost] of balancesPost.entries()) {
      const balancePre = balancesPre[i20];
      if (typeof balancePost !== "bigint")
        continue;
      if (typeof balancePre !== "bigint")
        continue;
      const decimals_ = decimals[i20 - 1];
      const symbol_ = symbols[i20 - 1];
      const tokenURI_ = tokenURI[i20 - 1];
      const token = (() => {
        if (i20 === 0)
          return {
            address: ethAddress,
            decimals: 18,
            symbol: "ETH"
          };
        return {
          address: assetAddresses[i20 - 1],
          decimals: tokenURI_ || decimals_ ? Number(decimals_ ?? 1) : void 0,
          symbol: symbol_ ?? void 0
        };
      })();
      if (changes.some((change) => change.token.address === token.address))
        continue;
      changes.push({
        token,
        value: {
          pre: balancePre,
          post: balancePost,
          diff: balancePost - balancePre
        }
      });
    }
    return {
      assetChanges: changes,
      block,
      results
    };
  }

  // node_modules/ox/_esm/erc6492/SignatureErc6492.js
  var SignatureErc6492_exports = {};
  __export(SignatureErc6492_exports, {
    InvalidWrappedSignatureError: () => InvalidWrappedSignatureError2,
    assert: () => assert7,
    from: () => from13,
    magicBytes: () => magicBytes2,
    universalSignatureValidatorAbi: () => universalSignatureValidatorAbi,
    universalSignatureValidatorBytecode: () => universalSignatureValidatorBytecode,
    unwrap: () => unwrap2,
    validate: () => validate5,
    wrap: () => wrap2
  });
  init_Errors();
  init_Hex();
  var magicBytes2 = "0x6492649264926492649264926492649264926492649264926492649264926492";
  var universalSignatureValidatorBytecode = "0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
  var universalSignatureValidatorAbi = [
    {
      inputs: [
        {
          name: "_signer",
          type: "address"
        },
        {
          name: "_hash",
          type: "bytes32"
        },
        {
          name: "_signature",
          type: "bytes"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      inputs: [
        {
          name: "_signer",
          type: "address"
        },
        {
          name: "_hash",
          type: "bytes32"
        },
        {
          name: "_signature",
          type: "bytes"
        }
      ],
      outputs: [
        {
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function",
      name: "isValidSig"
    }
  ];
  function assert7(wrapped) {
    if (slice3(wrapped, -32) !== magicBytes2)
      throw new InvalidWrappedSignatureError2(wrapped);
  }
  function from13(wrapped) {
    if (typeof wrapped === "string")
      return unwrap2(wrapped);
    return wrapped;
  }
  function unwrap2(wrapped) {
    assert7(wrapped);
    const [to, data, signature] = decode3(from5("address, bytes, bytes"), wrapped);
    return { data, signature, to };
  }
  function wrap2(value) {
    const { data, signature, to } = value;
    return concat2(encode4(from5("address, bytes, bytes"), [
      to,
      data,
      signature
    ]), magicBytes2);
  }
  function validate5(wrapped) {
    try {
      assert7(wrapped);
      return true;
    } catch {
      return false;
    }
  }
  var InvalidWrappedSignatureError2 = class extends BaseError3 {
    constructor(wrapped) {
      super(`Value \`${wrapped}\` is an invalid ERC-6492 wrapped signature.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "SignatureErc6492.InvalidWrappedSignatureError"
      });
    }
  };

  // node_modules/viem/_esm/actions/public/verifyHash.js
  init_abis();
  init_contracts();
  init_contract();
  init_encodeDeployData();
  init_encodeFunctionData();
  init_getAddress();
  init_isAddressEqual();
  init_concat();
  init_isHex();
  init_fromHex();
  init_toHex();

  // node_modules/viem/_esm/utils/signature/serializeSignature.js
  init_secp256k1();
  init_fromHex();
  init_toBytes();
  function serializeSignature({ r: r20, s: s12, to = "hex", v, yParity }) {
    const yParity_ = (() => {
      if (yParity === 0 || yParity === 1)
        return yParity;
      if (v && (v === 27n || v === 28n || v >= 35n))
        return v % 2n === 0n ? 1 : 0;
      throw new Error("Invalid `v` or `yParity` value");
    })();
    const signature = `0x${new secp256k1.Signature(hexToBigInt(r20), hexToBigInt(s12)).toCompactHex()}${yParity_ === 0 ? "1b" : "1c"}`;
    if (to === "hex")
      return signature;
    return hexToBytes(signature);
  }

  // node_modules/viem/_esm/actions/public/verifyHash.js
  init_call();
  async function verifyHash(client, parameters) {
    const { address, chain: chain2 = client.chain, hash: hash3, erc6492VerifierAddress: verifierAddress = parameters.universalSignatureVerifierAddress ?? chain2?.contracts?.erc6492Verifier?.address, multicallAddress = parameters.multicallAddress ?? chain2?.contracts?.multicall3?.address, mode = "auto" } = parameters;
    if (chain2?.verifyHash)
      return await chain2.verifyHash(client, parameters);
    const signature = (() => {
      const signature2 = parameters.signature;
      if (isHex(signature2))
        return signature2;
      if (typeof signature2 === "object" && "r" in signature2 && "s" in signature2)
        return serializeSignature(signature2);
      return bytesToHex(signature2);
    })();
    try {
      if (mode === "eoa") {
        try {
          const verified = isAddressEqual(getAddress(address), await recoverAddress({ hash: hash3, signature }));
          if (verified)
            return true;
        } catch {
        }
      }
      if (SignatureErc8010_exports.validate(signature))
        return await verifyErc8010(client, {
          ...parameters,
          multicallAddress,
          signature
        });
      return await verifyErc6492(client, {
        ...parameters,
        verifierAddress,
        signature
      });
    } catch (error) {
      if (mode !== "eoa") {
        try {
          const verified = isAddressEqual(getAddress(address), await recoverAddress({ hash: hash3, signature }));
          if (verified)
            return true;
        } catch {
        }
      }
      if (error instanceof VerificationError) {
        return false;
      }
      throw error;
    }
  }
  async function verifyErc8010(client, parameters) {
    const { address, blockNumber, blockTag, hash: hash3, multicallAddress } = parameters;
    const { authorization: authorization_ox, data: initData, signature, to } = SignatureErc8010_exports.unwrap(parameters.signature);
    const code = await getCode(client, {
      address,
      blockNumber,
      blockTag
    });
    if (code === concatHex(["0xef0100", authorization_ox.address]))
      return await verifyErc1271(client, {
        address,
        blockNumber,
        blockTag,
        hash: hash3,
        signature
      });
    const authorization = {
      address: authorization_ox.address,
      chainId: Number(authorization_ox.chainId),
      nonce: Number(authorization_ox.nonce),
      r: numberToHex(authorization_ox.r, { size: 32 }),
      s: numberToHex(authorization_ox.s, { size: 32 }),
      yParity: authorization_ox.yParity
    };
    const valid = await verifyAuthorization({
      address,
      authorization
    });
    if (!valid)
      throw new VerificationError();
    const results = await getAction(client, readContract, "readContract")({
      ...multicallAddress ? { address: multicallAddress } : { code: multicall3Bytecode },
      authorizationList: [authorization],
      abi: multicall3Abi,
      blockNumber,
      blockTag: "pending",
      functionName: "aggregate3",
      args: [
        [
          ...initData ? [
            {
              allowFailure: true,
              target: to ?? address,
              callData: initData
            }
          ] : [],
          {
            allowFailure: true,
            target: address,
            callData: encodeFunctionData({
              abi: erc1271Abi,
              functionName: "isValidSignature",
              args: [hash3, signature]
            })
          }
        ]
      ]
    });
    const data = results[results.length - 1]?.returnData;
    if (data?.startsWith("0x1626ba7e"))
      return true;
    throw new VerificationError();
  }
  async function verifyErc6492(client, parameters) {
    const { address, factory, factoryData, hash: hash3, signature, verifierAddress, ...rest } = parameters;
    const wrappedSignature = await (async () => {
      if (!factory && !factoryData)
        return signature;
      if (SignatureErc6492_exports.validate(signature))
        return signature;
      return SignatureErc6492_exports.wrap({
        data: factoryData,
        signature,
        to: factory
      });
    })();
    const args = verifierAddress ? {
      to: verifierAddress,
      data: encodeFunctionData({
        abi: erc6492SignatureValidatorAbi,
        functionName: "isValidSig",
        args: [address, hash3, wrappedSignature]
      }),
      ...rest
    } : {
      data: encodeDeployData({
        abi: erc6492SignatureValidatorAbi,
        args: [address, hash3, wrappedSignature],
        bytecode: erc6492SignatureValidatorByteCode
      }),
      ...rest
    };
    const { data } = await getAction(client, call, "call")(args).catch((error) => {
      if (error instanceof CallExecutionError)
        throw new VerificationError();
      throw error;
    });
    if (hexToBool(data ?? "0x0"))
      return true;
    throw new VerificationError();
  }
  async function verifyErc1271(client, parameters) {
    const { address, blockNumber, blockTag, hash: hash3, signature } = parameters;
    const result = await getAction(client, readContract, "readContract")({
      address,
      abi: erc1271Abi,
      args: [hash3, signature],
      blockNumber,
      blockTag,
      functionName: "isValidSignature"
    }).catch((error) => {
      if (error instanceof ContractFunctionExecutionError)
        throw new VerificationError();
      throw error;
    });
    if (result.startsWith("0x1626ba7e"))
      return true;
    throw new VerificationError();
  }
  var VerificationError = class extends Error {
  };

  // node_modules/viem/_esm/actions/public/verifyMessage.js
  async function verifyMessage(client, { address, message, factory, factoryData, signature, ...callRequest }) {
    const hash3 = hashMessage(message);
    return getAction(client, verifyHash, "verifyHash")({
      address,
      factory,
      factoryData,
      hash: hash3,
      signature,
      ...callRequest
    });
  }

  // node_modules/viem/_esm/actions/public/verifyTypedData.js
  async function verifyTypedData(client, parameters) {
    const { address, factory, factoryData, signature, message, primaryType, types, domain, ...callRequest } = parameters;
    const hash3 = hashTypedData({ message, primaryType, types, domain });
    return getAction(client, verifyHash, "verifyHash")({
      address,
      factory,
      factoryData,
      hash: hash3,
      signature,
      ...callRequest
    });
  }

  // node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
  init_transaction();
  init_withResolvers();
  init_stringify();

  // node_modules/viem/_esm/actions/public/watchBlockNumber.js
  init_fromHex();
  init_stringify();
  function watchBlockNumber(client, { emitOnBegin = false, emitMissed = false, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval }) {
    const enablePolling = (() => {
      if (typeof poll_ !== "undefined")
        return poll_;
      if (client.transport.type === "webSocket" || client.transport.type === "ipc")
        return false;
      if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
        return false;
      return true;
    })();
    let prevBlockNumber;
    const pollBlockNumber = () => {
      const observerId = stringify([
        "watchBlockNumber",
        client.uid,
        emitOnBegin,
        emitMissed,
        pollingInterval
      ]);
      return observe(observerId, { onBlockNumber, onError }, (emit) => poll(async () => {
        try {
          const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
          if (prevBlockNumber !== void 0) {
            if (blockNumber === prevBlockNumber)
              return;
            if (blockNumber - prevBlockNumber > 1 && emitMissed) {
              for (let i20 = prevBlockNumber + 1n; i20 < blockNumber; i20++) {
                emit.onBlockNumber(i20, prevBlockNumber);
                prevBlockNumber = i20;
              }
            }
          }
          if (prevBlockNumber === void 0 || blockNumber > prevBlockNumber) {
            emit.onBlockNumber(blockNumber, prevBlockNumber);
            prevBlockNumber = blockNumber;
          }
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin,
        interval: pollingInterval
      }));
    };
    const subscribeBlockNumber = () => {
      const observerId = stringify([
        "watchBlockNumber",
        client.uid,
        emitOnBegin,
        emitMissed
      ]);
      return observe(observerId, { onBlockNumber, onError }, (emit) => {
        let active = true;
        let unsubscribe = () => active = false;
        (async () => {
          try {
            const transport = (() => {
              if (client.transport.type === "fallback") {
                const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
                if (!transport2)
                  return client.transport;
                return transport2.value;
              }
              return client.transport;
            })();
            const { unsubscribe: unsubscribe_ } = await transport.subscribe({
              params: ["newHeads"],
              onData(data) {
                if (!active)
                  return;
                const blockNumber = hexToBigInt(data.result?.number);
                emit.onBlockNumber(blockNumber, prevBlockNumber);
                prevBlockNumber = blockNumber;
              },
              onError(error) {
                emit.onError?.(error);
              }
            });
            unsubscribe = unsubscribe_;
            if (!active)
              unsubscribe();
          } catch (err) {
            onError?.(err);
          }
        })();
        return () => unsubscribe();
      });
    };
    return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
  }

  // node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
  async function waitForTransactionReceipt(client, parameters) {
    const {
      checkReplacement = true,
      confirmations = 1,
      hash: hash3,
      onReplaced,
      retryCount = 6,
      retryDelay = ({ count }) => ~~(1 << count) * 200,
      // exponential backoff
      timeout = 18e4
    } = parameters;
    const observerId = stringify(["waitForTransactionReceipt", client.uid, hash3]);
    const pollingInterval = (() => {
      if (parameters.pollingInterval)
        return parameters.pollingInterval;
      if (client.chain?.experimental_preconfirmationTime)
        return client.chain.experimental_preconfirmationTime;
      return client.pollingInterval;
    })();
    let transaction;
    let replacedTransaction;
    let receipt;
    let retrying = false;
    let _unobserve;
    let _unwatch;
    const { promise, resolve, reject } = withResolvers();
    const timer = timeout ? setTimeout(() => {
      _unwatch?.();
      _unobserve?.();
      reject(new WaitForTransactionReceiptTimeoutError({ hash: hash3 }));
    }, timeout) : void 0;
    _unobserve = observe(observerId, { onReplaced, resolve, reject }, async (emit) => {
      receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: hash3 }).catch(() => void 0);
      if (receipt && confirmations <= 1) {
        clearTimeout(timer);
        emit.resolve(receipt);
        _unobserve?.();
        return;
      }
      _unwatch = getAction(client, watchBlockNumber, "watchBlockNumber")({
        emitMissed: true,
        emitOnBegin: true,
        poll: true,
        pollingInterval,
        async onBlockNumber(blockNumber_) {
          const done = (fn) => {
            clearTimeout(timer);
            _unwatch?.();
            fn();
            _unobserve?.();
          };
          let blockNumber = blockNumber_;
          if (retrying)
            return;
          try {
            if (receipt) {
              if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                return;
              done(() => emit.resolve(receipt));
              return;
            }
            if (checkReplacement && !transaction) {
              retrying = true;
              await withRetry(async () => {
                transaction = await getAction(client, getTransaction, "getTransaction")({ hash: hash3 });
                if (transaction.blockNumber)
                  blockNumber = transaction.blockNumber;
              }, {
                delay: retryDelay,
                retryCount
              });
              retrying = false;
            }
            receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: hash3 });
            if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
              return;
            done(() => emit.resolve(receipt));
          } catch (err) {
            if (err instanceof TransactionNotFoundError || err instanceof TransactionReceiptNotFoundError) {
              if (!transaction) {
                retrying = false;
                return;
              }
              try {
                replacedTransaction = transaction;
                retrying = true;
                const block = await withRetry(() => getAction(client, getBlock, "getBlock")({
                  blockNumber,
                  includeTransactions: true
                }), {
                  delay: retryDelay,
                  retryCount,
                  shouldRetry: ({ error }) => error instanceof BlockNotFoundError
                });
                retrying = false;
                const replacementTransaction = block.transactions.find(({ from: from14, nonce }) => from14 === replacedTransaction.from && nonce === replacedTransaction.nonce);
                if (!replacementTransaction)
                  return;
                receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({
                  hash: replacementTransaction.hash
                });
                if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                  return;
                let reason = "replaced";
                if (replacementTransaction.to === replacedTransaction.to && replacementTransaction.value === replacedTransaction.value && replacementTransaction.input === replacedTransaction.input) {
                  reason = "repriced";
                } else if (replacementTransaction.from === replacementTransaction.to && replacementTransaction.value === 0n) {
                  reason = "cancelled";
                }
                done(() => {
                  emit.onReplaced?.({
                    reason,
                    replacedTransaction,
                    transaction: replacementTransaction,
                    transactionReceipt: receipt
                  });
                  emit.resolve(receipt);
                });
              } catch (err_) {
                done(() => emit.reject(err_));
              }
            } else {
              done(() => emit.reject(err));
            }
          }
        }
      });
    });
    return promise;
  }

  // node_modules/viem/_esm/actions/public/watchBlocks.js
  init_stringify();
  function watchBlocks(client, { blockTag = client.experimental_blockTag ?? "latest", emitMissed = false, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval }) {
    const enablePolling = (() => {
      if (typeof poll_ !== "undefined")
        return poll_;
      if (client.transport.type === "webSocket" || client.transport.type === "ipc")
        return false;
      if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
        return false;
      return true;
    })();
    const includeTransactions = includeTransactions_ ?? false;
    let prevBlock;
    const pollBlocks = () => {
      const observerId = stringify([
        "watchBlocks",
        client.uid,
        blockTag,
        emitMissed,
        emitOnBegin,
        includeTransactions,
        pollingInterval
      ]);
      return observe(observerId, { onBlock, onError }, (emit) => poll(async () => {
        try {
          const block = await getAction(client, getBlock, "getBlock")({
            blockTag,
            includeTransactions
          });
          if (block.number !== null && prevBlock?.number != null) {
            if (block.number === prevBlock.number)
              return;
            if (block.number - prevBlock.number > 1 && emitMissed) {
              for (let i20 = prevBlock?.number + 1n; i20 < block.number; i20++) {
                const block2 = await getAction(client, getBlock, "getBlock")({
                  blockNumber: i20,
                  includeTransactions
                });
                emit.onBlock(block2, prevBlock);
                prevBlock = block2;
              }
            }
          }
          if (
            // If no previous block exists, emit.
            prevBlock?.number == null || // If the block tag is "pending" with no block number, emit.
            blockTag === "pending" && block?.number == null || // If the next block number is greater than the previous block number, emit.
            // We don't want to emit blocks in the past.
            block.number !== null && block.number > prevBlock.number
          ) {
            emit.onBlock(block, prevBlock);
            prevBlock = block;
          }
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin,
        interval: pollingInterval
      }));
    };
    const subscribeBlocks = () => {
      let active = true;
      let emitFetched = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          if (emitOnBegin) {
            getAction(client, getBlock, "getBlock")({
              blockTag,
              includeTransactions
            }).then((block) => {
              if (!active)
                return;
              if (!emitFetched)
                return;
              onBlock(block, void 0);
              emitFetched = false;
            }).catch(onError);
          }
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["newHeads"],
            async onData(data) {
              if (!active)
                return;
              const block = await getAction(client, getBlock, "getBlock")({
                blockNumber: data.result?.number,
                includeTransactions
              }).catch(() => {
              });
              if (!active)
                return;
              onBlock(block, prevBlock);
              emitFetched = false;
              prevBlock = block;
            },
            onError(error) {
              onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    };
    return enablePolling ? pollBlocks() : subscribeBlocks();
  }

  // node_modules/viem/_esm/actions/public/watchEvent.js
  init_abi();
  init_rpc();
  init_stringify();
  function watchEvent(client, { address, args, batch = true, event, events, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
    const enablePolling = (() => {
      if (typeof poll_ !== "undefined")
        return poll_;
      if (typeof fromBlock === "bigint")
        return true;
      if (client.transport.type === "webSocket" || client.transport.type === "ipc")
        return false;
      if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
        return false;
      return true;
    })();
    const strict = strict_ ?? false;
    const pollEvent = () => {
      const observerId = stringify([
        "watchEvent",
        address,
        args,
        batch,
        client.uid,
        event,
        pollingInterval,
        fromBlock
      ]);
      return observe(observerId, { onLogs, onError }, (emit) => {
        let previousBlockNumber;
        if (fromBlock !== void 0)
          previousBlockNumber = fromBlock - 1n;
        let filter;
        let initialized = false;
        const unwatch = poll(async () => {
          if (!initialized) {
            try {
              filter = await getAction(client, createEventFilter, "createEventFilter")({
                address,
                args,
                event,
                events,
                strict,
                fromBlock
              });
            } catch {
            }
            initialized = true;
            return;
          }
          try {
            let logs;
            if (filter) {
              logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
            } else {
              const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
              if (previousBlockNumber && previousBlockNumber !== blockNumber) {
                logs = await getAction(client, getLogs, "getLogs")({
                  address,
                  args,
                  event,
                  events,
                  fromBlock: previousBlockNumber + 1n,
                  toBlock: blockNumber
                });
              } else {
                logs = [];
              }
              previousBlockNumber = blockNumber;
            }
            if (logs.length === 0)
              return;
            if (batch)
              emit.onLogs(logs);
            else
              for (const log of logs)
                emit.onLogs([log]);
          } catch (err) {
            if (filter && err instanceof InvalidInputRpcError)
              initialized = false;
            emit.onError?.(err);
          }
        }, {
          emitOnBegin: true,
          interval: pollingInterval
        });
        return async () => {
          if (filter)
            await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
          unwatch();
        };
      });
    };
    const subscribeEvent = () => {
      let active = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const events_ = events ?? (event ? [event] : void 0);
          let topics = [];
          if (events_) {
            const encoded = events_.flatMap((event2) => encodeEventTopics({
              abi: [event2],
              eventName: event2.name,
              args
            }));
            topics = [encoded];
            if (event)
              topics = topics[0];
          }
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["logs", { address, topics }],
            onData(data) {
              if (!active)
                return;
              const log = data.result;
              try {
                const { eventName, args: args2 } = decodeEventLog({
                  abi: events_ ?? [],
                  data: log.data,
                  topics: log.topics,
                  strict
                });
                const formatted = formatLog(log, { args: args2, eventName });
                onLogs([formatted]);
              } catch (err) {
                let eventName;
                let isUnnamed;
                if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                  if (strict_)
                    return;
                  eventName = err.abiItem.name;
                  isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
                }
                const formatted = formatLog(log, {
                  args: isUnnamed ? [] : {},
                  eventName
                });
                onLogs([formatted]);
              }
            },
            onError(error) {
              onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    };
    return enablePolling ? pollEvent() : subscribeEvent();
  }

  // node_modules/viem/_esm/actions/public/watchPendingTransactions.js
  init_stringify();
  function watchPendingTransactions(client, { batch = true, onError, onTransactions, poll: poll_, pollingInterval = client.pollingInterval }) {
    const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket" && client.transport.type !== "ipc";
    const pollPendingTransactions = () => {
      const observerId = stringify([
        "watchPendingTransactions",
        client.uid,
        batch,
        pollingInterval
      ]);
      return observe(observerId, { onTransactions, onError }, (emit) => {
        let filter;
        const unwatch = poll(async () => {
          try {
            if (!filter) {
              try {
                filter = await getAction(client, createPendingTransactionFilter, "createPendingTransactionFilter")({});
                return;
              } catch (err) {
                unwatch();
                throw err;
              }
            }
            const hashes = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
            if (hashes.length === 0)
              return;
            if (batch)
              emit.onTransactions(hashes);
            else
              for (const hash3 of hashes)
                emit.onTransactions([hash3]);
          } catch (err) {
            emit.onError?.(err);
          }
        }, {
          emitOnBegin: true,
          interval: pollingInterval
        });
        return async () => {
          if (filter)
            await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
          unwatch();
        };
      });
    };
    const subscribePendingTransactions = () => {
      let active = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
            params: ["newPendingTransactions"],
            onData(data) {
              if (!active)
                return;
              const transaction = data.result;
              onTransactions([transaction]);
            },
            onError(error) {
              onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    };
    return enablePolling ? pollPendingTransactions() : subscribePendingTransactions();
  }

  // node_modules/viem/_esm/utils/siwe/parseSiweMessage.js
  function parseSiweMessage(message) {
    const { scheme, statement, ...prefix } = message.match(prefixRegex)?.groups ?? {};
    const { chainId, expirationTime, issuedAt, notBefore, requestId, ...suffix } = message.match(suffixRegex)?.groups ?? {};
    const resources = message.split("Resources:")[1]?.split("\n- ").slice(1);
    return {
      ...prefix,
      ...suffix,
      ...chainId ? { chainId: Number(chainId) } : {},
      ...expirationTime ? { expirationTime: new Date(expirationTime) } : {},
      ...issuedAt ? { issuedAt: new Date(issuedAt) } : {},
      ...notBefore ? { notBefore: new Date(notBefore) } : {},
      ...requestId ? { requestId } : {},
      ...resources ? { resources } : {},
      ...scheme ? { scheme } : {},
      ...statement ? { statement } : {}
    };
  }
  var prefixRegex = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/;
  var suffixRegex = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;

  // node_modules/viem/_esm/utils/siwe/validateSiweMessage.js
  init_isAddress();
  init_isAddressEqual();
  function validateSiweMessage(parameters) {
    const { address, domain, message, nonce, scheme, time = /* @__PURE__ */ new Date() } = parameters;
    if (domain && message.domain !== domain)
      return false;
    if (nonce && message.nonce !== nonce)
      return false;
    if (scheme && message.scheme !== scheme)
      return false;
    if (message.expirationTime && time >= message.expirationTime)
      return false;
    if (message.notBefore && time < message.notBefore)
      return false;
    try {
      if (!message.address)
        return false;
      if (!isAddress(message.address, { strict: false }))
        return false;
      if (address && !isAddressEqual(message.address, address))
        return false;
    } catch {
      return false;
    }
    return true;
  }

  // node_modules/viem/_esm/actions/siwe/verifySiweMessage.js
  async function verifySiweMessage(client, parameters) {
    const { address, domain, message, nonce, scheme, signature, time = /* @__PURE__ */ new Date(), ...callRequest } = parameters;
    const parsed = parseSiweMessage(message);
    if (!parsed.address)
      return false;
    const isValid = validateSiweMessage({
      address,
      domain,
      message: parsed,
      nonce,
      scheme,
      time
    });
    if (!isValid)
      return false;
    const hash3 = hashMessage(message);
    return verifyHash(client, {
      address: parsed.address,
      hash: hash3,
      signature,
      ...callRequest
    });
  }

  // node_modules/viem/_esm/actions/wallet/sendRawTransactionSync.js
  init_transaction();
  async function sendRawTransactionSync(client, { serializedTransaction, throwOnReceiptRevert, timeout }) {
    const receipt = await client.request({
      method: "eth_sendRawTransactionSync",
      params: timeout ? [serializedTransaction, timeout] : [serializedTransaction]
    }, { retryCount: 0 });
    const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
    const formatted = format(receipt);
    if (formatted.status === "reverted" && throwOnReceiptRevert)
      throw new TransactionReceiptRevertedError({ receipt: formatted });
    return formatted;
  }

  // node_modules/viem/_esm/clients/decorators/public.js
  function publicActions(client) {
    return {
      call: (args) => call(client, args),
      createAccessList: (args) => createAccessList(client, args),
      createBlockFilter: () => createBlockFilter(client),
      createContractEventFilter: (args) => createContractEventFilter(client, args),
      createEventFilter: (args) => createEventFilter(client, args),
      createPendingTransactionFilter: () => createPendingTransactionFilter(client),
      estimateContractGas: (args) => estimateContractGas(client, args),
      estimateGas: (args) => estimateGas(client, args),
      getBalance: (args) => getBalance(client, args),
      getBlobBaseFee: () => getBlobBaseFee(client),
      getBlock: (args) => getBlock(client, args),
      getBlockNumber: (args) => getBlockNumber(client, args),
      getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
      getBytecode: (args) => getCode(client, args),
      getChainId: () => getChainId(client),
      getCode: (args) => getCode(client, args),
      getContractEvents: (args) => getContractEvents(client, args),
      getDelegation: (args) => getDelegation(client, args),
      getEip712Domain: (args) => getEip712Domain(client, args),
      getEnsAddress: (args) => getEnsAddress(client, args),
      getEnsAvatar: (args) => getEnsAvatar(client, args),
      getEnsName: (args) => getEnsName(client, args),
      getEnsResolver: (args) => getEnsResolver(client, args),
      getEnsText: (args) => getEnsText(client, args),
      getFeeHistory: (args) => getFeeHistory(client, args),
      estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
      getFilterChanges: (args) => getFilterChanges(client, args),
      getFilterLogs: (args) => getFilterLogs(client, args),
      getGasPrice: () => getGasPrice(client),
      getLogs: (args) => getLogs(client, args),
      getProof: (args) => getProof(client, args),
      estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
      fillTransaction: (args) => fillTransaction(client, args),
      getStorageAt: (args) => getStorageAt(client, args),
      getTransaction: (args) => getTransaction(client, args),
      getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
      getTransactionCount: (args) => getTransactionCount(client, args),
      getTransactionReceipt: (args) => getTransactionReceipt(client, args),
      multicall: (args) => multicall(client, args),
      prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
      readContract: (args) => readContract(client, args),
      sendRawTransaction: (args) => sendRawTransaction(client, args),
      sendRawTransactionSync: (args) => sendRawTransactionSync(client, args),
      simulate: (args) => simulateBlocks(client, args),
      simulateBlocks: (args) => simulateBlocks(client, args),
      simulateCalls: (args) => simulateCalls(client, args),
      simulateContract: (args) => simulateContract(client, args),
      verifyHash: (args) => verifyHash(client, args),
      verifyMessage: (args) => verifyMessage(client, args),
      verifySiweMessage: (args) => verifySiweMessage(client, args),
      verifyTypedData: (args) => verifyTypedData(client, args),
      uninstallFilter: (args) => uninstallFilter(client, args),
      waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
      watchBlocks: (args) => watchBlocks(client, args),
      watchBlockNumber: (args) => watchBlockNumber(client, args),
      watchContractEvent: (args) => watchContractEvent(client, args),
      watchEvent: (args) => watchEvent(client, args),
      watchPendingTransactions: (args) => watchPendingTransactions(client, args)
    };
  }

  // node_modules/viem/_esm/clients/createPublicClient.js
  function createPublicClient(parameters) {
    const { key = "public", name = "Public Client" } = parameters;
    const client = createClient({
      ...parameters,
      key,
      name,
      type: "publicClient"
    });
    return client.extend(publicActions);
  }

  // node_modules/viem/_esm/clients/transports/createTransport.js
  function createTransport({ key, methods, name, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
    const uid2 = uid();
    return {
      config: {
        key,
        methods,
        name,
        request,
        retryCount,
        retryDelay,
        timeout,
        type
      },
      request: buildRequest(request, { methods, retryCount, retryDelay, uid: uid2 }),
      value
    };
  }

  // node_modules/viem/_esm/clients/transports/http.js
  init_request();

  // node_modules/viem/_esm/errors/transport.js
  init_base();
  var UrlRequiredError = class extends BaseError2 {
    constructor() {
      super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
        docsPath: "/docs/clients/intro",
        name: "UrlRequiredError"
      });
    }
  };

  // node_modules/viem/_esm/clients/transports/http.js
  init_createBatchScheduler();
  function http(url, config = {}) {
    const { batch, fetchFn, fetchOptions, key = "http", methods, name = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay, raw } = config;
    return ({ chain: chain2, retryCount: retryCount_, timeout: timeout_ }) => {
      const { batchSize = 1e3, wait: wait2 = 0 } = typeof batch === "object" ? batch : {};
      const retryCount = config.retryCount ?? retryCount_;
      const timeout = timeout_ ?? config.timeout ?? 1e4;
      const url_ = url || chain2?.rpcUrls.default.http[0];
      if (!url_)
        throw new UrlRequiredError();
      const rpcClient = getHttpRpcClient(url_, {
        fetchFn,
        fetchOptions,
        onRequest: onFetchRequest,
        onResponse: onFetchResponse,
        timeout
      });
      return createTransport({
        key,
        methods,
        name,
        async request({ method, params }) {
          const body = { method, params };
          const { schedule } = createBatchScheduler({
            id: url_,
            wait: wait2,
            shouldSplitBatch(requests) {
              return requests.length > batchSize;
            },
            fn: (body2) => rpcClient.request({
              body: body2
            }),
            sort: (a20, b) => a20.id - b.id
          });
          const fn = async (body2) => batch ? schedule(body2) : [
            await rpcClient.request({
              body: body2
            })
          ];
          const [{ error, result }] = await fn(body);
          if (raw)
            return { error, result };
          if (error)
            throw new RpcRequestError({
              body,
              error,
              url: url_
            });
          return result;
        },
        retryCount,
        retryDelay,
        timeout,
        type: "http"
      }, {
        fetchOptions,
        url: url_
      });
    };
  }

  // node_modules/viem/_esm/index.js
  init_isHex();
  init_toHex();

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/utils/index.mjs
  var p11 = (p14, i20, c4, s12) => {
    let l7 = Number(p14), n10 = i20.find(((r20) => r20.id === l7));
    if (!n10) throw new i9(`Unsupported chainId ${p14}`, 4901);
    return createPublicClient({ transport: http(o10(n10, c4, s12.appId)), chain: n10 });
  };
  var o10 = (r20, e42, p14) => {
    let o26, i20 = r20.id, c4 = Number(r20.id);
    if (r20.rpcUrls.privyWalletOverride && r20.rpcUrls.privyWalletOverride.http[0]) o26 = r20.rpcUrls.privyWalletOverride.http[0];
    else if (e42.rpcUrls && e42.rpcUrls[c4]) o26 = e42.rpcUrls[c4];
    else if (r20.rpcUrls.privy?.http[0]) {
      let e43 = new URL(r20.rpcUrls.privy.http[0]);
      e43.searchParams.append("privyAppId", p14), o26 = e43.toString();
    } else o26 = r20.rpcUrls.public?.http[0] ? r20.rpcUrls.public.http[0] : r20.rpcUrls.default?.http[0];
    if (!o26) throw new i9(`No RPC url found for ${i20}`);
    return o26;
  };
  function i10({ currentRecoveryMethod: r20, upgradeToRecoveryMethod: e42 }) {
    switch (r20) {
      case "privy":
      case "user-passcode":
      case "recovery-encryption-key":
        return true;
      case "icloud":
      case "google-drive":
        if (r20 === e42) throw Error("Cannot upgrade to the existing cloud platform");
        return true;
      default:
        throw Error("Unknown recovery method");
    }
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/sleep.mjs
  function e26(e42) {
    return new Promise(((t45) => {
      setTimeout((() => {
        t45();
      }), e42);
    }));
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EventCallbackQueue.mjs
  var e27 = class {
    enqueue(e42, a20) {
      this.callbacks[e42] = a20;
    }
    dequeue(e42, a20) {
      let r20 = this.callbacks[a20];
      if (!r20) throw Error(`cannot dequeue ${e42} event: no event found for id ${a20}`);
      switch (delete this.callbacks[a20], e42) {
        case "privy:iframe:ready":
        case "privy:wallets:create":
        case "privy:user-signer:sign":
        case "privy:wallets:add":
        case "privy:wallets:set-recovery":
        case "privy:wallets:connect":
        case "privy:wallets:recover":
        case "privy:wallets:rpc":
        case "privy:wallet:create":
        case "privy:wallet:connect":
        case "privy:wallet:recover":
        case "privy:wallet:rpc":
        case "privy:solana-wallet:create":
        case "privy:solana-wallet:create-additional":
        case "privy:solana-wallet:connect":
        case "privy:solana-wallet:recover":
        case "privy:solana-wallet:rpc":
        case "privy:delegated-actions:consent":
        case "privy:mfa:verify":
        case "privy:mfa:init-enrollment":
        case "privy:mfa:submit-enrollment":
        case "privy:mfa:unenroll":
        case "privy:mfa:clear":
          return r20;
        default:
          throw Error(`invalid wallet event type ${e42}`);
      }
    }
    constructor() {
      this.callbacks = {};
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/withMfa.mjs
  async function r10(r20, t45, i20, a20, n10 = false, o26, c4) {
    let m3 = n10, s12 = async (o27) => {
      if (m3) {
        o27 === (n10 ? 0 : 1) ? a20() : i20.current?.reject(new o9("missing_or_invalid_mfa", "MFA verification failed, retry."));
        let m4 = await new Promise(((r21, a21) => {
          t45.current = { resolve: r21, reject: a21 }, setTimeout((() => {
            let r22 = new o9("mfa_timeout", "Timed out waiting for MFA code");
            i20.current?.reject(r22), a21(r22);
          }), c4);
        }));
        return await r20(m4);
      }
      return await r20();
    }, f2 = null;
    for (let e42 = 0; e42 < o26; e42++) try {
      f2 = await s12(e42), i20.current?.resolve(void 0);
      break;
    } catch (e43) {
      if ("missing_or_invalid_mfa" !== e43.type) throw i20.current?.resolve(void 0), e43;
      m3 = true;
    }
    if (null === f2) {
      let r21 = new o9("mfa_verification_max_attempts_reached", "Max MFA verification attempts reached");
      throw i20.current?.reject(r21), r21;
    }
    return f2;
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedWalletProxy.mjs
  var a16;
  var s7 = (a16 = 0, () => "id-" + a16++);
  var n3 = (e42, t45) => "bigint" == typeof t45 ? t45.toString() : t45;
  var l2 = async (e42, { ms: t45, msg: i20 }) => {
    let r20, a20 = new Promise(((e43, a21) => {
      r20 = setTimeout((() => {
        a21(Error(i20));
      }), t45 ?? 15e3);
    }));
    try {
      return await Promise.race([e42, a20]);
    } finally {
      void 0 !== r20 && clearTimeout(r20);
    }
  };
  var m = new e27();
  var h8 = class {
    invokeWithMfa(e42, t45) {
      return l2(r10(((i20) => l2(this.waitForReady().then((() => e42(i20))), { msg: t45.timeoutMsg, ms: t45.timeoutMs })), this.mfa.rootPromise, this.mfa.submitPromise, (() => this.mfa.emit("mfaRequired")), t45.mfaAlwaysRequired ?? false, 4, 3e5), { msg: "Operation reached timeout: MFA verification", ms: 126e4 });
    }
    reload() {
      return this.ready = false, this._embeddedWalletMessagePoster.reload();
    }
    ping(e42 = 15e3) {
      return l2(this.invoke("privy:iframe:ready", {}), { msg: "Ping reached timeout", ms: e42 });
    }
    create(e42) {
      return l2(this.waitForReady().then((() => this.invoke("privy:wallet:create", e42))), { msg: "Operation reached timeout: create" });
    }
    rpc(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:wallet:rpc", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: rpc" });
    }
    createSolana(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:solana-wallet:create", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: create", timeoutMs: 6e4 });
    }
    createAdditionalSolana(e42) {
      return l2(this.waitForReady().then((() => this.invoke("privy:solana-wallet:create-additional", e42))), { msg: "Operation reached timeout: create" });
    }
    solanaRpc(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:solana-wallet:rpc", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: solana-rpc" });
    }
    delegateWallets(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:delegated-actions:consent", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: delegated-actions:consent" });
    }
    verifyMfa(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:mfa:verify", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: mfa:verify", mfaAlwaysRequired: true });
    }
    initEnrollMfa(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:mfa:init-enrollment", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: mfa:init-enrollment" });
    }
    submitEnrollMfa(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:mfa:submit-enrollment", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: mfa:submit-enrollment" });
    }
    unenrollMfa(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:mfa:unenroll", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: mfa:unenroll", mfaAlwaysRequired: true });
    }
    clearMfa(e42) {
      return l2(this.waitForReady().then((() => this.invoke("privy:mfa:clear", e42))), { msg: "Operation reached timeout: mfa:clear" });
    }
    createWallet(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:wallets:create", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: create", timeoutMs: 6e4 });
    }
    signWithUserSigner(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:user-signer:sign", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: user-signer:sign" });
    }
    addWallet(e42) {
      return l2(this.waitForReady().then((() => this.invoke("privy:wallets:add", e42))), { msg: "Operation reached timeout: wallets:add" });
    }
    setRecovery(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:wallets:set-recovery", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: wallets:set-recovery", timeoutMs: 6e4 });
    }
    connect(e42) {
      return l2(this.waitForReady().then((() => this.invoke("privy:wallets:connect", e42))), { msg: "Operation reached timeout: wallets:connect" });
    }
    recover(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:wallets:recover", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: wallets:recover", timeoutMs: 6e4 });
    }
    rpcWallet(e42) {
      return this.invokeWithMfa(((t45) => this.invoke("privy:wallets:rpc", { ...t45, ...e42 })), { timeoutMsg: "Operation reached timeout: wallets:rpc" });
    }
    handleEmbeddedWalletMessages(e42) {
      if (!e42.event.startsWith("privy:")) return void console.warn(`Unsupported event type: ${e42.event}`);
      let { reject: t45, resolve: r20 } = m.dequeue(e42.event, e42.id);
      return void 0 !== e42.error ? t45(new o9(e42.error.type, e42.error.message)) : r20(e42.data);
    }
    waitForReady() {
      return this.ready ? Promise.resolve() : new Promise((async (t45, i20) => {
        for (; !this.ready; ) this.invoke("privy:iframe:ready", {}).then((() => {
          this.ready = true, t45();
        })).catch(i20), await e26(150);
      }));
    }
    invoke(e42, t45) {
      let i20 = ((e43, t46) => `${e43}${JSON.stringify(t46, n3)}`)(e42, t45);
      if ("privy:wallet:create" === e42 || "privy:solana-wallet:create" === e42) {
        let e43 = this.cache.get(i20);
        if (e43) return e43;
      }
      let r20 = new Promise(((i21, r21) => {
        let a20 = s7();
        m.enqueue(a20, { resolve: i21, reject: r21 }), this._embeddedWalletMessagePoster.postMessage(JSON.stringify({ id: a20, event: e42, data: t45 }), "*");
      })).finally((() => {
        this.cache.delete(i20);
      }));
      return this.cache.set(i20, r20), r20;
    }
    constructor(e42, t45) {
      this.ready = false, this.cache = /* @__PURE__ */ new Map(), this._embeddedWalletMessagePoster = e42, this.mfa = t45;
    }
  };

  // node_modules/eventemitter3/index.mjs
  var import_index = __toESM(require_eventemitter3(), 1);
  var eventemitter3_default = import_index.default;

  // node_modules/@privy-io/ethereum/dist/esm/to-viem-transaction-serializable.mjs
  var r11 = { 0: "legacy", 1: "eip2930", 2: "eip1559", 3: "eip4844", 4: "eip7702" };
  var i11 = { legacy: 0, eip2930: 1, eip1559: 2, eip4844: 3, eip7702: 4 };
  var s8 = (e42) => void 0 !== e42 ? BigInt(e42) : void 0;
  function t32(i20) {
    let t45, { type: c4 = 2, ...o26 } = "string" == typeof i20 ? JSON.parse(i20) : i20;
    o26.accessList && Array.isArray(o26.accessList) ? t45 = o26.accessList.map(((e42) => Array.isArray(e42) ? { address: e42[0], storageKeys: e42[1] } : e42)) : o26.accessList && (t45 = Object.entries(o26.accessList).map(((e42) => ({ address: e42[0], storageKeys: e42[1] }))));
    let d8 = Number(o26.chainId ?? 1), n10 = isHex(o26.data) ? o26.data : o26.data ? toHex(Uint8Array.from(o26.data)) : void 0, p14 = o26.nonce ? Number(o26.nonce) : void 0, m3 = { chainId: d8, data: n10, nonce: p14, value: s8(o26.value), gas: s8(o26.gas ?? o26.gasLimit) }, y3 = Number(c4);
    if (0 === y3) return { ...o26, type: r11[y3], ...m3, gasPrice: s8(o26.gasPrice), accessList: void 0, maxFeePerGas: void 0, maxPriorityFeePerGas: void 0 };
    if (1 === y3) return { ...o26, type: r11[y3], ...m3, gasPrice: s8(o26.gasPrice), accessList: t45, maxFeePerGas: void 0, maxPriorityFeePerGas: void 0 };
    if (2 === y3) return { ...o26, type: r11[y3], ...m3, nonce: p14, accessList: t45, maxFeePerGas: s8(o26.maxFeePerGas), maxPriorityFeePerGas: s8(o26.maxPriorityFeePerGas), gasPrice: void 0, maxFeePerBlobGas: void 0 };
    throw Error(`Unsupported transaction type: ${c4}`);
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/encodings.mjs
  var t33 = (t45) => /^0x[0-9a-fA-F]*$/.test(t45);
  var f = (t45) => Buffer.from(t45, "utf8");
  var e28 = (t45) => `0x${t45.toString("hex")}`;

  // node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/generate-authorization-signature.mjs
  var import_canonicalize = __toESM(require_canonicalize(), 1);

  // node_modules/@scure/base/lib/esm/index.js
  function isBytes3(a20) {
    return a20 instanceof Uint8Array || ArrayBuffer.isView(a20) && a20.constructor.name === "Uint8Array";
  }
  function abytes3(b, ...lengths) {
    if (!isBytes3(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function isArrayOf(isString, arr) {
    if (!Array.isArray(arr))
      return false;
    if (arr.length === 0)
      return true;
    if (isString) {
      return arr.every((item) => typeof item === "string");
    } else {
      return arr.every((item) => Number.isSafeInteger(item));
    }
  }
  function afn(input) {
    if (typeof input !== "function")
      throw new Error("function expected");
    return true;
  }
  function astr(label, input) {
    if (typeof input !== "string")
      throw new Error(`${label}: string expected`);
    return true;
  }
  function anumber2(n10) {
    if (!Number.isSafeInteger(n10))
      throw new Error(`invalid integer: ${n10}`);
  }
  function aArr(input) {
    if (!Array.isArray(input))
      throw new Error("array expected");
  }
  function astrArr(label, input) {
    if (!isArrayOf(true, input))
      throw new Error(`${label}: array of strings expected`);
  }
  function anumArr(label, input) {
    if (!isArrayOf(false, input))
      throw new Error(`${label}: array of numbers expected`);
  }
  // @__NO_SIDE_EFFECTS__
  function chain(...args) {
    const id = (a20) => a20;
    const wrap3 = (a20, b) => (c4) => a20(b(c4));
    const encode6 = args.map((x) => x.encode).reduceRight(wrap3, id);
    const decode4 = args.map((x) => x.decode).reduce(wrap3, id);
    return { encode: encode6, decode: decode4 };
  }
  // @__NO_SIDE_EFFECTS__
  function alphabet(letters) {
    const lettersA = typeof letters === "string" ? letters.split("") : letters;
    const len = lettersA.length;
    astrArr("alphabet", lettersA);
    const indexes = new Map(lettersA.map((l7, i20) => [l7, i20]));
    return {
      encode: (digits) => {
        aArr(digits);
        return digits.map((i20) => {
          if (!Number.isSafeInteger(i20) || i20 < 0 || i20 >= len)
            throw new Error(`alphabet.encode: digit index outside alphabet "${i20}". Allowed: ${letters}`);
          return lettersA[i20];
        });
      },
      decode: (input) => {
        aArr(input);
        return input.map((letter) => {
          astr("alphabet.decode", letter);
          const i20 = indexes.get(letter);
          if (i20 === void 0)
            throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
          return i20;
        });
      }
    };
  }
  // @__NO_SIDE_EFFECTS__
  function join(separator = "") {
    astr("join", separator);
    return {
      encode: (from14) => {
        astrArr("join.decode", from14);
        return from14.join(separator);
      },
      decode: (to) => {
        astr("join.decode", to);
        return to.split(separator);
      }
    };
  }
  // @__NO_SIDE_EFFECTS__
  function padding(bits, chr = "=") {
    anumber2(bits);
    astr("padding", chr);
    return {
      encode(data) {
        astrArr("padding.encode", data);
        while (data.length * bits % 8)
          data.push(chr);
        return data;
      },
      decode(input) {
        astrArr("padding.decode", input);
        let end = input.length;
        if (end * bits % 8)
          throw new Error("padding: invalid, string should have whole number of bytes");
        for (; end > 0 && input[end - 1] === chr; end--) {
          const last = end - 1;
          const byte = last * bits;
          if (byte % 8 === 0)
            throw new Error("padding: invalid, string has too much padding");
        }
        return input.slice(0, end);
      }
    };
  }
  // @__NO_SIDE_EFFECTS__
  function normalize(fn) {
    afn(fn);
    return { encode: (from14) => from14, decode: (to) => fn(to) };
  }
  var gcd = (a20, b) => b === 0 ? a20 : gcd(b, a20 % b);
  var radix2carry = /* @__NO_SIDE_EFFECTS__ */ (from14, to) => from14 + (to - gcd(from14, to));
  var powers = /* @__PURE__ */ (() => {
    let res = [];
    for (let i20 = 0; i20 < 40; i20++)
      res.push(2 ** i20);
    return res;
  })();
  function convertRadix2(data, from14, to, padding2) {
    aArr(data);
    if (from14 <= 0 || from14 > 32)
      throw new Error(`convertRadix2: wrong from=${from14}`);
    if (to <= 0 || to > 32)
      throw new Error(`convertRadix2: wrong to=${to}`);
    if (/* @__PURE__ */ radix2carry(from14, to) > 32) {
      throw new Error(`convertRadix2: carry overflow from=${from14} to=${to} carryBits=${/* @__PURE__ */ radix2carry(from14, to)}`);
    }
    let carry = 0;
    let pos = 0;
    const max = powers[from14];
    const mask = powers[to] - 1;
    const res = [];
    for (const n10 of data) {
      anumber2(n10);
      if (n10 >= max)
        throw new Error(`convertRadix2: invalid data word=${n10} from=${from14}`);
      carry = carry << from14 | n10;
      if (pos + from14 > 32)
        throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from14}`);
      pos += from14;
      for (; pos >= to; pos -= to)
        res.push((carry >> pos - to & mask) >>> 0);
      const pow = powers[pos];
      if (pow === void 0)
        throw new Error("invalid carry");
      carry &= pow - 1;
    }
    carry = carry << to - pos & mask;
    if (!padding2 && pos >= from14)
      throw new Error("Excess padding");
    if (!padding2 && carry > 0)
      throw new Error(`Non-zero padding: ${carry}`);
    if (padding2 && pos > 0)
      res.push(carry >>> 0);
    return res;
  }
  // @__NO_SIDE_EFFECTS__
  function radix2(bits, revPadding = false) {
    anumber2(bits);
    if (bits <= 0 || bits > 32)
      throw new Error("radix2: bits should be in (0..32]");
    if (/* @__PURE__ */ radix2carry(8, bits) > 32 || /* @__PURE__ */ radix2carry(bits, 8) > 32)
      throw new Error("radix2: carry overflow");
    return {
      encode: (bytes) => {
        if (!isBytes3(bytes))
          throw new Error("radix2.encode input should be Uint8Array");
        return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
      },
      decode: (digits) => {
        anumArr("radix2.decode", digits);
        return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
      }
    };
  }
  var hasBase64Builtin = /* @__PURE__ */ (() => typeof Uint8Array.from([]).toBase64 === "function" && typeof Uint8Array.fromBase64 === "function")();
  var decodeBase64Builtin = (s12, isUrl) => {
    astr("base64", s12);
    const re = isUrl ? /^[A-Za-z0-9=_-]+$/ : /^[A-Za-z0-9=+/]+$/;
    const alphabet2 = isUrl ? "base64url" : "base64";
    if (s12.length > 0 && !re.test(s12))
      throw new Error("invalid base64");
    return Uint8Array.fromBase64(s12, { alphabet: alphabet2, lastChunkHandling: "strict" });
  };
  var base64 = hasBase64Builtin ? {
    encode(b) {
      abytes3(b);
      return b.toBase64();
    },
    decode(s12) {
      return decodeBase64Builtin(s12, false);
    }
  } : /* @__PURE__ */ chain(/* @__PURE__ */ radix2(6), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), /* @__PURE__ */ padding(6), /* @__PURE__ */ join(""));
  var base64nopad = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(6), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), /* @__PURE__ */ join(""));
  var base64url = hasBase64Builtin ? {
    encode(b) {
      abytes3(b);
      return b.toBase64({ alphabet: "base64url" });
    },
    decode(s12) {
      return decodeBase64Builtin(s12, true);
    }
  } : /* @__PURE__ */ chain(/* @__PURE__ */ radix2(6), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), /* @__PURE__ */ padding(6), /* @__PURE__ */ join(""));
  var hasHexBuiltin2 = /* @__PURE__ */ (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")();
  var hexBuiltin = {
    encode(data) {
      abytes3(data);
      return data.toHex();
    },
    decode(s12) {
      astr("hex", s12);
      return Uint8Array.fromHex(s12);
    }
  };
  var hex = hasHexBuiltin2 ? hexBuiltin : /* @__PURE__ */ chain(/* @__PURE__ */ radix2(4), /* @__PURE__ */ alphabet("0123456789abcdef"), /* @__PURE__ */ join(""), /* @__PURE__ */ normalize((s12) => {
    if (typeof s12 !== "string" || s12.length % 2 !== 0)
      throw new TypeError(`hex.decode: expected string, got ${typeof s12} with length ${s12.length}`);
    return s12.toLowerCase();
  }));

  // node_modules/@privy-io/encoding/dist/esm/base64/to-base64-string-from-bytes.mjs
  var o11 = (o26) => base64.encode(o26);

  // node_modules/@privy-io/encoding/dist/esm/base64/to-bytes-from-base64-string.mjs
  var o12 = (o26) => {
    try {
      return Uint8Array.from(base64.decode(o26));
    } catch (r20) {
      if (r20 instanceof Error && r20.message.includes("string should have whole number of bytes")) return Uint8Array.from(base64nopad.decode(o26));
      throw r20;
    }
  };

  // node_modules/@privy-io/encoding/dist/esm/base64url/to-base64url-string-from-bytes.mjs
  var o13 = (o26) => base64url.encode(o26);

  // node_modules/@privy-io/encoding/dist/esm/base64url/to-bytes-from-base64url-string.mjs
  var o14 = (o26) => Uint8Array.from(base64url.decode(o26));

  // node_modules/@privy-io/encoding/dist/esm/hex/to-bytes-from-hex-string.mjs
  var o15 = (o26) => Uint8Array.from(hex.decode(o26));

  // node_modules/@privy-io/encoding/dist/esm/hex/to-hex-string-from-bytes.mjs
  var o16 = (o26) => hex.encode(o26);

  // node_modules/@privy-io/encoding/dist/esm/utf8/to-bytes-from-utf8-string.mjs
  var e29 = new TextEncoder();
  var n4 = (n10) => Uint8Array.from(e29.encode(n10));

  // node_modules/@privy-io/encoding/dist/esm/utf8/to-utf8-string-from-bytes.mjs
  var e30 = new TextDecoder();
  var o17 = (o26) => e30.decode(o26);

  // node_modules/@privy-io/encoding/dist/esm/index.mjs
  var y = { utf8: { fromBytes: o17, toBytes: n4 }, base64: { fromBytes: o11, toBytes: o12 }, base64url: { fromBytes: o13, toBytes: o14 }, hex: { fromBytes: o16, toBytes: o15 } };

  // node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/generate-authorization-signature.mjs
  async function o18(o26, t45) {
    let n10;
    if (t45 instanceof Uint8Array) n10 = y.base64.fromBytes(t45);
    else {
      let o27 = (0, import_canonicalize.default)(t45);
      if (void 0 === o27) throw new e24({ error: "Failed to prepare the payload for signing", code: "invalid_input" });
      n10 = y.base64.fromBytes(y.utf8.toBytes(o27));
    }
    let { signature: a20 } = await o26({ message: n10 });
    return { signature: a20 };
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/types.mjs
  var e32 = "privy-request-expiry";
  var r12 = 18e5;

  // node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/rpc.mjs
  var import_canonicalize2 = __toESM(require_canonicalize(), 1);
  async function o19(o26, e42, { wallet_id: p14, ...m3 }) {
    let n10 = o26.getCompiledPath(p9, { params: { wallet_id: p14 } }), s12 = String(Date.now() + r12), d8 = { version: 1, url: n10, method: p9.method, headers: { "privy-app-id": o26.app.appId, [e32]: s12 }, body: { ...m3 } }, { signature: l7 } = await o18(e42, d8);
    return await o26.fetchPrivyRoute(p9, { body: m3, params: { wallet_id: p14 }, headers: { "privy-authorization-signature": l7, [e32]: s12 } });
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/wallet-api-eth-transaction.mjs
  function t34(t45) {
    return { from: t45.from, to: t45.to ?? void 0, nonce: n5(t45.nonce), chain_id: n5(t45.chainId), data: (function(t46) {
      if (void 0 !== t46) return "string" == typeof t46 ? t33(t46) ? t46 : e28(f(t46)) : e28(Buffer.from(Uint8Array.from(t46)));
    })(t45.data), value: n5(t45.value), type: t45.type, gas_limit: n5(t45.gasLimit), gas_price: n5(t45.gasPrice), max_fee_per_gas: n5(t45.maxFeePerGas), max_priority_fee_per_gas: n5(t45.maxPriorityFeePerGas) };
  }
  function n5(t45) {
    if ("number" == typeof t45 || "bigint" == typeof t45) {
      return `0x${BigInt(t45).toString(16)}`;
    }
    if ("string" == typeof t45) return t33(t45) ? t45 : e28(f(t45));
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/wallet-api-eth-typed-data.mjs
  function e33(e42) {
    return "string" == typeof e42 && (e42 = JSON.parse(e42)), { types: e42.types, primary_type: String(e42.primaryType), domain: e42.domain, message: e42.message };
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/walletRpc.mjs
  var import_canonicalize3 = __toESM(require_canonicalize(), 1);
  async function r13({ context: r20, account: o26, rpcRequest: c4 }) {
    switch (c4.chainType) {
      case "ethereum":
        return (async function({ context: r21, account: o27, rpcRequest: c5 }) {
          switch (c5.method) {
            case "personal_sign": {
              let [e42] = c5.params, t45 = await o19(r21, r21.signRequest, { chain_type: "ethereum", method: "personal_sign", wallet_id: o27.id, params: e42.startsWith("0x") ? { message: e42.slice(2), encoding: "hex" } : { message: e42, encoding: "utf-8" } });
              if ("personal_sign" !== t45.method) throw Error("Unable to sign message");
              return { data: t45.data.signature };
            }
            case "eth_signTransaction": {
              let [e42] = c5.params, t45 = await o19(r21, r21.signRequest, { chain_type: "ethereum", method: "eth_signTransaction", wallet_id: o27.id, params: { transaction: t34(e42) } });
              if ("eth_signTransaction" !== t45.method) throw Error("Unable to sign transaction");
              return { data: t45.data.signed_transaction };
            }
            case "eth_signTypedData_v4": {
              let [, e42] = c5.params, t45 = await o19(r21, r21.signRequest, { chain_type: "ethereum", method: c5.method, wallet_id: o27.id, params: { typed_data: e33(e42) } });
              if ("eth_signTypedData_v4" !== t45.method) throw Error("Unable to sign typed data");
              return { data: t45.data.signature };
            }
            case "eth_sign": {
              let [, n10] = c5.params, i20 = await o19(r21, r21.signRequest, { chain_type: "ethereum", method: "secp256k1_sign", wallet_id: o27.id, params: { hash: t33(n10) ? n10 : e28(f(n10)) } });
              if ("secp256k1_sign" !== i20.method) throw Error("Unable to sign message");
              return { data: i20.data.signature };
            }
            case "secp256k1_sign": {
              let [n10] = c5.params, i20 = await o19(r21, r21.signRequest, { chain_type: "ethereum", method: "secp256k1_sign", wallet_id: o27.id, params: { hash: t33(n10) ? n10 : e28(f(n10)) } });
              if ("secp256k1_sign" !== i20.method) throw Error("Unable to sign message");
              return { data: i20.data.signature };
            }
            case "csw_signUserOperation":
            case "eth_sendTransaction":
            case "eth_populateTransactionRequest":
              throw Error(`This wallet does not support the method: ${c5.method}`);
          }
        })({ context: r20, account: o26, rpcRequest: c4.request });
      case "solana":
        return (async function({ context: e42, account: t45, rpcRequest: a20 }) {
          if ("signMessage" === a20.method) {
            let { message: n10 } = a20.params, i20 = await o19(e42, e42.signRequest, { chain_type: "solana", method: "signMessage", wallet_id: t45.id, params: { message: n10, encoding: "base64" } });
            if ("signMessage" !== i20.method) throw Error("Unable to sign message");
            return { data: i20.data.signature };
          }
        })({ context: r20, account: o26, rpcRequest: c4.request });
    }
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedWalletProvider.mjs
  var import_canonicalize4 = __toESM(require_canonicalize(), 1);
  var d3 = /* @__PURE__ */ new Set(["eth_sign", "personal_sign", "eth_signTypedData_v4", "csw_signUserOperation", "secp256k1_sign"]);
  var p12 = class extends eventemitter3_default {
    async request(e42) {
      if (d3.has(e42.method)) return this.handleIFrameRpc(e42);
      switch (e42.method) {
        case "eth_accounts":
        case "eth_requestAccounts":
          return this._account.address ? [this._account.address] : [];
        case "eth_chainId":
          return `0x${this._chainId.toString(16)}`;
        case "wallet_switchEthereumChain":
          return this.handleSwitchEthereumChain(e42);
        case "eth_estimateGas":
          return this.handleEstimateGas(e42);
        case "eth_signTransaction": {
          let t45 = e42.params?.[0];
          return this.handleSignTransaction(t45);
        }
        case "eth_sendTransaction": {
          let t45 = e42.params?.[0];
          return this.handleSendTransaction(t45);
        }
        case "eth_populateTransactionRequest": {
          let t45 = e42.params?.[0];
          return this.handlePopulateTransaction(t45);
        }
        default:
          return this.handleJsonRpc(e42);
      }
    }
    ensureChainId(e42) {
      let t45 = { chainId: this._chainId, ...e42 };
      return this.internalSwitchEthereumChain(t45.chainId), t45;
    }
    internalSwitchEthereumChain(e42) {
      e42 && Number(e42) !== this._chainId && (this._chainId = Number(e42), this._client = p11(this._chainId, this._chains, { rpcUrls: [] }, { appId: this._privyInternal.appId }), this.emit("chainChanged", e42));
    }
    async handlePopulateTransaction(e42) {
      let t45 = this.ensureChainId(e42), i20 = t32(t45), { type: s12, ...n10 } = await this._client.prepareTransactionRequest({ account: t45.from ?? this._account.address, ...i20 });
      return { ...n10, type: i11[s12] };
    }
    async handleSignTransaction(e42) {
      let r20 = { ...e42 };
      for (let e43 of Object.keys(r20)) {
        let a20 = r20[e43];
        a20 && "bigint" == typeof a20 && (r20[e43] = toHex(a20));
      }
      return await this.handleIFrameRpc({ method: "eth_signTransaction", params: [r20] });
    }
    async handleSendTransaction(e42) {
      let t45 = await this.handlePopulateTransaction(e42), r20 = await this.handleSignTransaction(t45);
      return await this.handleJsonRpc({ method: "eth_sendRawTransaction", params: [r20] });
    }
    async handleEstimateGas(e42) {
      if (!e42.params || !Array.isArray(e42.params)) throw Error("Invalid params for eth_estimateGas");
      let t45 = e42.params?.[0], a20 = this.ensureChainId(t45), i20 = t32(a20);
      return await this._client.estimateGas({ account: a20.from ?? this._account.address, ...i20 });
    }
    handleSwitchEthereumChain(e42) {
      let t45;
      if (!e42.params || !Array.isArray(e42.params)) throw new d2(`Invalid params for ${e42.method}`, 4200);
      if ("string" == typeof e42.params[0]) t45 = e42.params[0];
      else {
        if (!("chainId" in e42.params[0]) || "string" != typeof e42.params[0].chainId) throw new d2(`Invalid params for ${e42.method}`, 4200);
        t45 = e42.params[0].chainId;
      }
      this.internalSwitchEthereumChain(t45);
    }
    async handleIFrameRpc(e42) {
      try {
        let t45 = await this._privyInternal.getAccessTokenInternal();
        if (!t45) throw Error("Missing privy token. User must be logged in");
        this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", { method: e42.method, address: this._account.address });
        let r20 = this._account;
        if (e25(r20)) {
          let { data: a20 } = await r13({ context: { app: this._appApi, fetchPrivyRoute: (...e43) => this._privyInternal.fetch(...e43), getCompiledPath: (...e43) => this._privyInternal.getPath(...e43), signRequest: ({ message: e43 }) => this._walletProxy.signWithUserSigner({ accessToken: t45, message: e43 }) }, account: r20, rpcRequest: { chainType: "ethereum", request: e42 } });
          return a20;
        }
        try {
          await this._walletProxy.connect({ entropyId: this._entropyId, entropyIdVerifier: this._entropyIdVerifier, accessToken: t45 });
        } catch (e43) {
          let r21 = E(e43);
          if (r21 && "privy" === this._account.recovery_method) await this._walletProxy.recover({ entropyId: this._entropyId, entropyIdVerifier: this._entropyIdVerifier, accessToken: t45 });
          else {
            if (!r21 || !this._onNeedsRecovery) throw e43;
            {
              let e44;
              await new Promise((async (t46, r22) => {
                e44 = setTimeout((() => r22(new e24({ code: "embedded_wallet_recovery_error", error: "User-owned recovery timed out" }))), 12e4), await this._onNeedsRecovery?.({ recoveryMethod: this._account.recovery_method, onRecovered: () => t46(true) });
              })).finally((() => clearTimeout(e44)));
            }
          }
        }
        return (await this._walletProxy.rpcWallet({ accessToken: t45, request: e42, entropyId: this._entropyId, entropyIdVerifier: this._entropyIdVerifier, hdWalletIndex: this._account.wallet_index, chainType: "ethereum" })).response.data;
      } catch (t45) {
        console.error(t45);
        let r20 = t45 instanceof Error ? t45.message : "Unable to make wallet request";
        throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", { method: e42.method, address: this._account.address, error: r20 }), new e24({ code: "embedded_wallet_request_error", error: r20 });
      }
    }
    async handleJsonRpc(e42) {
      return this._client.request(e42);
    }
    toJSON() {
      return `PrivyEIP1193Provider { address: '${this._account.address}', chainId: ${this._chainId}, request: [Function] }`;
    }
    constructor({ walletProxy: e42, privyInternal: t45, account: r20, entropyId: a20, entropyIdVerifier: i20, chains: s12, onNeedsRecovery: n10, chainId: o26 = s12[0].id, appApi: h10 }) {
      super(), this._walletProxy = e42, this._privyInternal = t45, this._account = r20, this._entropyId = a20, this._entropyIdVerifier = i20, this._chainId = o26, this._chains = s12, this._onNeedsRecovery = n10, this._client = p11(o26, s12, { rpcUrls: [] }, { appId: h10.appId }), this._appApi = h10;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/solana/isVersionedTransaction.mjs
  function n6(n10) {
    return "version" in n10;
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/solana/getWalletPublicKeyFromTransaction.mjs
  function e34(e42, t45) {
    let n10 = (n6(e42) ? e42.message : e42.compileMessage()).staticAccountKeys.find(((o26) => o26.toBase58() === t45));
    if (!n10) throw Error(`Transaction does not contain public key ${t45}`);
    return n10;
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedSolanaWalletProvider.mjs
  var import_canonicalize5 = __toESM(require_canonicalize(), 1);
  var i12 = class {
    async request(t45) {
      if (!await this._privyInternal.getAccessTokenInternal()) throw new e24({ error: "Missing access token", code: "attempted_rpc_call_before_logged_in" });
      switch (t45.method) {
        case "signAndSendTransaction":
          return await this.handleSignAndSendTransaction(t45);
        case "signTransaction":
          return await this.handleSignTransaction(t45);
        default:
          return await this.handleIFrameRpc(t45);
      }
    }
    get _publicKey() {
      return this._account.address;
    }
    async connectAndRecover(t45) {
      if ("privy-v2" !== this._account.recovery_method) try {
        await this._proxy.connect({ entropyId: this._entropyId, entropyIdVerifier: this._entropyIdVerifier, accessToken: t45 });
      } catch (r20) {
        let a20 = E(r20);
        if (a20 && "privy" === this._account.recovery_method) await this._proxy.recover({ entropyId: this._entropyId, entropyIdVerifier: this._entropyIdVerifier, accessToken: t45 });
        else {
          if (!a20 || !this._onNeedsRecovery) throw r20;
          {
            let t46;
            await new Promise((async (r21, a21) => {
              t46 = setTimeout((() => a21(new e24({ code: "embedded_wallet_recovery_error", error: "User-owned recovery timed out" }))), 12e4), await this._onNeedsRecovery?.({ recoveryMethod: this._account.recovery_method, onRecovered: () => r21(true) });
            })).finally((() => clearTimeout(t46)));
          }
        }
      }
    }
    async signMessageRpc(e42, t45) {
      let r20 = this._account;
      if (!e25(r20)) return (await this._proxy.rpcWallet({ accessToken: t45, request: e42, chainType: "solana", hdWalletIndex: this._account.wallet_index, entropyId: this._entropyId, entropyIdVerifier: this._entropyIdVerifier })).response.data;
      {
        let { data: a20 } = await r13({ context: { app: this._app, fetchPrivyRoute: (...e43) => this._privyInternal.fetch(...e43), getCompiledPath: (...e43) => this._privyInternal.getPath(...e43), signRequest: ({ message: e43 }) => this._proxy.signWithUserSigner({ accessToken: t45, message: e43 }) }, account: r20, rpcRequest: { chainType: "solana", request: e42 } });
        return { signature: a20 };
      }
    }
    async handleIFrameRpc(t45) {
      try {
        let e42 = await this._privyInternal.getAccessTokenInternal();
        if (!e42) throw Error("Missing privy token. User must be logged in");
        return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", { method: t45.method, address: this._account.address }), await this.connectAndRecover(e42), await this.signMessageRpc(t45, e42);
      } catch (r20) {
        console.error(r20);
        let a20 = r20 instanceof Error ? r20.message : "Unable to make wallet request";
        throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", { method: t45.method, address: this._account.address, error: a20 }), new e24({ code: "embedded_wallet_request_error", error: a20 });
      }
    }
    async handleSignAndSendTransaction(a20) {
      try {
        let e42 = await this._privyInternal.getAccessTokenInternal();
        if (!e42) throw Error("Missing privy token. User must be logged in");
        this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", { method: a20.method, address: this._account.address }), await this.connectAndRecover(e42);
        let { transaction: s12, connection: n10, options: i20 } = a20.params, o26 = e34(s12, this._account.address), c4 = n6(s12) ? Buffer.from(s12.message.serialize()) : s12.serializeMessage(), { signature: d8 } = await this.signMessageRpc({ method: "signMessage", params: { message: c4.toString("base64") } }, e42);
        return s12.addSignature(o26, Buffer.from(d8, "base64")), { signature: await n10.sendRawTransaction(s12.serialize(), i20) };
      } catch (t45) {
        console.error(t45);
        let r20 = t45 instanceof Error ? t45.message : "Unable to make wallet request";
        throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", { method: a20.method, address: this._account.address, error: r20 }), new e24({ code: "embedded_wallet_request_error", error: r20 });
      }
    }
    async handleSignTransaction(a20) {
      try {
        let e42 = await this._privyInternal.getAccessTokenInternal();
        if (!e42) throw Error("Missing privy token. User must be logged in");
        this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", { method: a20.method, address: this._account.address }), await this.connectAndRecover(e42);
        let { transaction: s12 } = a20.params, n10 = e34(s12, this._account.address), i20 = n6(s12) ? Buffer.from(s12.message.serialize()) : s12.serializeMessage(), { signature: o26 } = await this.signMessageRpc({ method: "signMessage", params: { message: i20.toString("base64") } }, e42);
        return s12.addSignature(n10, Buffer.from(o26, "base64")), { signedTransaction: s12 };
      } catch (t45) {
        console.error(t45);
        let r20 = t45 instanceof Error ? t45.message : "Unable to make wallet request";
        throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", { method: a20.method, address: this._account.wallet_index, error: r20 }), new e24({ code: "embedded_wallet_request_error", error: r20 });
      }
    }
    toJSON() {
      return `PrivyEmbeddedSolanaProvider { address: '${this._account.address}', request: [Function] }`;
    }
    constructor({ proxy: e42, privyInternal: t45, account: r20, entropyId: a20, entropyIdVerifier: s12, onNeedsRecovery: n10, app: i20 }) {
      this._proxy = e42, this._privyInternal = t45, this._account = r20, this._entropyId = a20, this._entropyIdVerifier = s12, this._onNeedsRecovery = n10, this._app = i20;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/EmbeddedWalletApi.mjs
  var import_canonicalize6 = __toESM(require_canonicalize(), 1);
  var y2 = class {
    setMessagePoster(e42) {
      this._proxy = new h8(e42, this._mfaPromises), this._mfa.setProxy(this._proxy);
    }
    async signWithUserSigner(e42) {
      if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
      let r20 = await this._privyInternal.getAccessTokenInternal();
      if (!r20) throw new e24({ error: "User must be logged in to sign a message with the user signer", code: "user_signer_sign_error" });
      let { signature: o26 } = await this._proxy.signWithUserSigner({ accessToken: r20, message: e42.message });
      return { signature: o26 };
    }
    async add(e42) {
      if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
      if ("user-controlled-server-wallets-only" === this._privyInternal.config?.embedded_wallet_config.mode) await t31({ context: { app: this._appApi, fetchPrivyRoute: (...e43) => this._privyInternal.fetch(...e43), getCompiledPath: (...e43) => this._privyInternal.getPath(...e43) }, chainType: e42.chainType });
      else {
        let r21 = await this._privyInternal.getAccessTokenInternal();
        if (!r21) throw new e24({ error: "User must be logged in to create an embedded wallet", code: "embedded_wallet_creation_error" });
        await this._proxy.addWallet({ accessToken: r21, ...e42 });
      }
      let { user: r20 } = await this._privyInternal.refreshSession();
      return { user: r20 };
    }
    async getBitcoinProvider({ wallet: e42, entropyId: r20, entropyIdVerifier: t45, recoveryPassword: i20, recoveryAccessToken: d8, recoverySecretOverride: a20 }) {
      if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
      if (!await this._privyInternal.getAccessTokenInternal()) throw Error("User must be logged in to create an embedded wallet");
      return e25(e42) || await this._load({ entropyId: r20, entropyIdVerifier: t45, wallet: e42, recoveryPassword: i20, recoveryAccessToken: d8, recoverySecretOverride: a20 }), new r7({ account: e42, privyInternal: this._privyInternal, proxy: this._proxy, entropyId: r20, entropyIdVerifier: t45 });
    }
    async create({ password: e42, recoveryMethod: r20, recoveryToken: o26, recoveryKey: i20, recoverySecretOverride: a20, iCloudRecordNameOverride: s12, solanaAccount: n10, skipCallbacks: c4, idempotencyKey: l7 }) {
      if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
      if ("user-controlled-server-wallets-only" === this._privyInternal.config?.embedded_wallet_config.mode) {
        if (r20 && !r20.startsWith("privy")) throw new e24({ error: "User-controlled server wallets do not support custom recovery methods", code: "embedded_wallet_creation_error" });
        await t31({ context: { app: this._appApi, fetchPrivyRoute: (...e43) => this._privyInternal.fetch(...e43), getCompiledPath: (...e43) => this._privyInternal.getPath(...e43) }, chainType: "ethereum", idempotencyKey: l7 });
      } else {
        let t45;
        if (t45 = r20 || (e42 ? "user-passcode" : "privy"), e42 && "string" != typeof e42) throw Error("Invalid recovery password, must be a string");
        if ("privy" === t45 && this._privyInternal.config?.embedded_wallet_config.require_user_password_on_create) throw Error("Password not provided yet is required by App configuration");
        let d8 = await this._privyInternal.getAccessTokenInternal();
        if (!d8) throw Error("User must be logged in to create an embedded wallet");
        let { address: c5 } = await this._proxy.create({ accessToken: d8, recoveryMethod: t45, recoveryKey: i20, recoveryPassword: e42, recoveryAccessToken: o26, recoverySecretOverride: a20, iCloudRecordNameOverride: s12, solanaAddress: n10?.address });
        if (!c5) throw Error("Failed to create wallet");
      }
      return await this._privyInternal.refreshSession(c4);
    }
    async createSolana(e42) {
      if (!this._proxy) throw new e24({ error: "Embedded wallet proxy not initialized", code: "embedded_wallet_creation_error" });
      if ("user-controlled-server-wallets-only" === this._privyInternal.config?.embedded_wallet_config.mode) await t31({ context: { app: this._appApi, fetchPrivyRoute: (...e43) => this._privyInternal.fetch(...e43), getCompiledPath: (...e43) => this._privyInternal.getPath(...e43) }, chainType: "solana", idempotencyKey: e42?.idempotencyKey });
      else {
        let r20 = await this._privyInternal.getAccessTokenInternal();
        if (!r20) throw new e24({ error: "User must be logged in to create an embedded wallet", code: "embedded_wallet_creation_error" });
        e42?.ethereumAccount && await this.getProvider(e42.ethereumAccount);
        let { publicKey: o26 } = await this._proxy.createSolana({ accessToken: r20, ethereumAddress: e42?.ethereumAccount?.address });
        if (!o26) throw new e24({ error: "Failed to create wallet", code: "embedded_wallet_creation_error" });
      }
      return await this._privyInternal.refreshSession();
    }
    async delegateWallets({ delegatedWallets: e42, rootWallet: r20 }) {
      if (!this._proxy) throw new e24({ error: "Embedded wallet proxy not initialized", code: "embedded_wallet_creation_error" });
      let o26 = await this._privyInternal.getAccessTokenInternal();
      if (!o26) throw new e24({ error: "User must be logged in to create an embedded wallet", code: "embedded_wallet_creation_error" });
      await this._proxy.delegateWallets({ accessToken: o26, delegatedWallets: e42, rootWallet: r20 });
    }
    async getProvider(e42, r20, t45, o26, i20) {
      if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
      return e25(e42) || await this._load({ wallet: e42, entropyId: e42.address, entropyIdVerifier: "ethereum-address-verifier", recoveryPassword: r20, recoveryKey: i20, recoveryAccessToken: t45, recoverySecretOverride: o26 }), new p12({ account: e42, entropyId: e42.address, entropyIdVerifier: "ethereum-address-verifier", privyInternal: this._privyInternal, chains: this._chains, walletProxy: this._proxy, appApi: this._appApi });
    }
    async getEthereumProvider({ wallet: e42, entropyId: r20, entropyIdVerifier: t45, recoveryPassword: o26, recoveryAccessToken: i20, recoverySecretOverride: d8, recoveryKey: a20, onNeedsRecovery: n10 }) {
      if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
      if (!await this._privyInternal.getAccessTokenInternal()) throw Error("User must be logged in to create an embedded wallet");
      return e25(e42) || (!n10 || o26 || i20 || d8 || a20) && await this._load({ entropyId: r20, entropyIdVerifier: t45, wallet: e42, recoveryPassword: o26, recoveryAccessToken: i20, recoverySecretOverride: d8, recoveryKey: a20 }), new p12({ account: e42, entropyId: r20, entropyIdVerifier: "ethereum-address-verifier", privyInternal: this._privyInternal, chains: this._chains, walletProxy: this._proxy, onNeedsRecovery: n10, appApi: this._appApi });
    }
    async getSolanaProvider(e42, r20, o26, i20, d8, a20, n10) {
      if (!this._proxy) throw new e24({ error: "Embedded wallet proxy not initialized", code: "embedded_wallet_webview_not_loaded" });
      return e25(e42) || (!n10 || i20 || d8 || a20) && await this._load({ wallet: e42, entropyId: r20, entropyIdVerifier: o26, recoveryPassword: i20, recoveryAccessToken: d8, recoverySecretOverride: a20 }), new i12({ account: e42, privyInternal: this._privyInternal, proxy: this._proxy, entropyId: r20, entropyIdVerifier: o26, onNeedsRecovery: n10, app: this._appApi });
    }
    async setRecovery(e42) {
      let { wallet: r20, ...o26 } = e42;
      if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
      if (e25(r20)) throw new e24({ error: "This wallet does not support setting recovery methods", code: "unsupported_recovery_method" });
      i10({ currentRecoveryMethod: r20.recovery_method, upgradeToRecoveryMethod: "icloud-native" === o26.recoveryMethod ? "icloud" : o26.recoveryMethod }), await this._load("solana" === r20.chain_type ? { wallet: r20, entropyId: r20.address, entropyIdVerifier: "solana-address-verifier" } : { wallet: r20, entropyId: r20.address, entropyIdVerifier: "ethereum-address-verifier" });
      let i20 = await this._privyInternal.getAccessTokenInternal();
      if (!i20) throw Error("User must be logged in to interact with embedded wallets");
      let d8 = r20.recovery_method;
      this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_set_recovery_started", { address: r20.address, target_recovery_method: o26.recoveryMethod, existing_recovery_method: d8 });
      try {
        let e43;
        if ("user-passcode" === o26.recoveryMethod) e43 = { recoveryMethod: "user-passcode", recoveryPassword: o26.password };
        else if ("google-drive" === o26.recoveryMethod) e43 = { recoveryMethod: "google-drive", recoveryAccessToken: o26.recoveryAccessToken };
        else if ("icloud" === o26.recoveryMethod) e43 = { recoveryMethod: "icloud", recoveryAccessToken: o26.recoveryAccessToken };
        else if ("icloud-native" === o26.recoveryMethod) e43 = { recoveryMethod: "icloud-native", iCloudRecordNameOverride: o26.iCloudRecordNameOverride, recoverySecretOverride: o26.recoverySecretOverride };
        else if ("recovery-encryption-key" === o26.recoveryMethod) e43 = { recoveryMethod: "recovery-encryption-key", recoveryKey: o26.recoveryKey };
        else {
          if ("privy" !== o26.recoveryMethod) throw Error(`Unknown recovery method: ${o26.recoveryMethod}`);
          e43 = { recoveryMethod: "privy" };
        }
        await this._proxy.setRecovery({ accessToken: i20, entropyId: r20.address, entropyIdVerifier: "solana" === r20.chain_type ? "solana-address-verifier" : "ethereum-address-verifier", ...e43 }), this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_set_recovery_completed", { address: r20.address, target_recovery_method: o26.recoveryMethod, existing_recovery_method: d8 });
        let { user: t45 } = await this._privyInternal.refreshSession();
        return { user: t45, provider: "ethereum" !== r20.chain_type ? null : new p12({ account: r20, entropyId: r20.address, entropyIdVerifier: "ethereum-address-verifier", privyInternal: this._privyInternal, chains: this._chains, walletProxy: this._proxy, appApi: this._appApi }) };
      } catch (e43) {
        throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_set_recovery_failed", { address: r20.address, recovery_method: r20.recovery_method, error: e43 instanceof Error ? e43.message : "Unable to recover wallet" }), e43;
      }
    }
    getURL() {
      let e42 = new URL(`${this._privyInternal.baseUrl}/apps/${this._privyInternal.appId}/embedded-wallets`);
      return this._privyInternal.caid && e42.searchParams.append("caid", this._privyInternal.caid), this._privyInternal.appClientId && e42.searchParams.append("client_id", this._privyInternal.appClientId), e42.href;
    }
    get chains() {
      return this._chains;
    }
    onMessage(e42) {
      if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
      return this._proxy.handleEmbeddedWalletMessages(e42);
    }
    reload() {
      this._proxy ? this._proxy.reload() : this._privyInternal.logger.warn("Attempted to reload proxy before initialized");
    }
    async ping(e42) {
      try {
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        return await this._proxy.ping(e42), true;
      } catch (e43) {
        return this._privyInternal.logger.debug(e43), false;
      }
    }
    async _load({ entropyId: e42, entropyIdVerifier: r20, wallet: t45, recoveryPassword: o26, recoveryKey: d8, recoveryAccessToken: a20, recoverySecretOverride: s12 }) {
      if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
      let n10 = await this._privyInternal.getAccessTokenInternal();
      if (!n10) throw Error("User must be logged in to interact with embedded wallets");
      try {
        return await this._proxy.connect({ accessToken: n10, entropyId: e42, entropyIdVerifier: r20 }), e42;
      } catch (c4) {
        if (E(c4)) try {
          if ("privy" === t45.recovery_method) {
            this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", { address: t45.address, recovery_method: t45.recovery_method });
            let o27 = await this._proxy.recover({ accessToken: n10, entropyId: e42, entropyIdVerifier: r20 });
            return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", { address: t45.address, recovery_method: t45.recovery_method }), o27.entropyId;
          }
          if ("user-passcode" === t45.recovery_method && o26) {
            this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", { address: t45.address, recovery_method: t45.recovery_method });
            let i20 = await this._proxy.recover({ accessToken: n10, recoveryPassword: o26, entropyId: e42, entropyIdVerifier: r20 });
            return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", { address: t45.address, recovery_method: t45.recovery_method }), i20.entropyId;
          }
          if (["google-drive", "icloud"].includes(t45.recovery_method) && a20) {
            this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", { address: t45.address, recovery_method: t45.recovery_method });
            let o27 = await this._proxy.recover({ accessToken: n10, recoveryAccessToken: a20, entropyId: e42, entropyIdVerifier: r20 });
            return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", { address: t45.address, recovery_method: t45.recovery_method }), o27.entropyId;
          }
          if ("icloud" === t45.recovery_method && s12) {
            this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", { address: t45.address, recovery_method: "icloud-native" });
            let o27 = await this._proxy.recover({ accessToken: n10, recoverySecretOverride: s12, entropyId: e42, entropyIdVerifier: r20 });
            return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", { address: t45.address, recovery_method: "icloud-native" }), o27.entropyId;
          }
          if ("recovery-encryption-key" === t45.recovery_method && d8) {
            this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", { address: t45.address, recovery_method: t45.recovery_method });
            let o27 = await this._proxy.recover({ accessToken: n10, recoveryKey: d8, entropyId: e42, entropyIdVerifier: r20 });
            return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", { address: t45.address, recovery_method: t45.recovery_method }), o27.entropyId;
          }
        } catch (r21) {
          throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_failed", { address: t45.address, recovery_method: t45.recovery_method, error: r21 instanceof Error ? r21.message : `Unable to recover wallet: ${e42}` }), r21;
        }
        throw c4;
      }
    }
    constructor(t45, o26, i20, d8, a20, s12) {
      if (this._chains = Array.from(H), this._privyInternal = t45, o26 && (this._proxy = new h8(o26, a20), d8.setProxy(this._proxy)), i20) {
        let e42 = t27(i20);
        this._chains = e42;
      }
      this._mfa = d8, this._mfaPromises = a20, this._appApi = s12;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/MfaPromises.mjs
  var r14 = class extends eventemitter3_default {
    constructor() {
      super(), this.rootPromise = { current: null }, this.submitPromise = { current: null };
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/PrivyInternal.mjs
  var import_fetch_retry = __toESM(require_fetch_retry_umd(), 1);

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i20 = 0; i20 < 256; ++i20) {
    byteToHex.push((i20 + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  // node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i20 = 0; i20 < 16; ++i20) {
        buf[offset + i20] = rnds[i20];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // node_modules/@privy-io/api-base/dist/esm/constants/error-codes.mjs
  var _2;
  var I = ((_2 = {}).OAUTH_ACCOUNT_SUSPENDED = "oauth_account_suspended", _2.MISSING_OR_INVALID_PRIVY_APP_ID = "missing_or_invalid_privy_app_id", _2.MISSING_OR_INVALID_PRIVY_CLIENT_ID = "missing_or_invalid_privy_client_id", _2.MISSING_OR_INVALID_PRIVY_ACCOUNT_ID = "missing_or_invalid_privy_account_id", _2.MISSING_OR_INVALID_TOKEN = "missing_or_invalid_token", _2.MISSING_MFA_ENROLLMENT = "missing_mfa_enrollment", _2.MISSING_OR_INVALID_MFA = "missing_or_invalid_mfa", _2.EXPIRED_OR_INVALID_MFA_TOKEN = "expired_or_invalid_mfa_token", _2.INVALID_DATA = "invalid_data", _2.INVALID_CREDENTIALS = "invalid_credentials", _2.INVALID_CAPTCHA = "invalid_captcha", _2.LINKED_TO_ANOTHER_USER = "linked_to_another_user", _2.ALLOWLIST_REJECTED = "allowlist_rejected", _2.CANNOT_UNLINK_EMBEDDED_WALLET = "cannot_unlink_embedded_wallet", _2.CANNOT_UNLINK_SOLE_ACCOUNT = "cannot_unlink_sole_account", _2.CANNOT_LINK_MORE_OF_TYPE = "cannot_link_more_of_type", _2.LINKED_ACCOUNT_NOT_FOUND = "linked_account_not_found", _2.TOO_MANY_REQUESTS = "too_many_requests", _2.RESOURCE_CONFLICT = "resource_conflict", _2.INVALID_ORIGIN = "invalid_origin", _2.MISSING_ORIGIN = "missing_origin", _2.INVALID_NATIVE_APP_ID = "invalid_native_app_id", _2.TOKEN_ALREADY_USED = "token_already_used", _2.ALREADY_LOGGED_OUT = "already_logged_out", _2.NOT_SUPPORTED = "not_supported", _2.USER_UNSUBSCRIBED = "user_unsubscribed", _2.MAX_APPS_REACHED = "max_apps_reached", _2.USER_LIMIT_REACHED = "max_accounts_reached", _2.DEVICE_REVOKED = "device_revoked", _2.WALLET_PASSWORD_EXISTS = "wallet_password_exists", _2.OAUTH_STATE_MISMATCH = "oauth_state_mismatch", _2.MAX_DENYLIST_ENTRIES_REACHED = "max_denylist_entries_reached", _2.MAX_TEST_ACCOUNTS_REACHED = "max_test_accounts_reached", _2.DISALLOWED_LOGIN_METHOD = "disallowed_login_method", _2.DISALLOWED_PLUS_EMAIL = "disallowed_plus_email", _2.DISALLOWED_RECOVERY_METHOD = "disallowed_recovery_method", _2.LEGACY_DASHBOARD_LOGIN_CONFIGURATION = "legacy_dashboard_login_configuration", _2.CANNOT_SET_PASSWORD = "cannot_set_password", _2.INVALID_PKCE_PARAMETERS = "invalid_pkce_parameters", _2.INVALID_APP_URL_SCHEME_CONFIGURATION = "invalid_app_url_scheme_configuration", _2.CROSS_APP_CONNECTION_NOT_ALLOWED = "cross_app_connection_not_allowed", _2.USER_DOES_NOT_EXIST = "user_does_not_exist", _2.ALREADY_EXISTS = "resource_already_exists", _2.ACCOUNT_TRANSFER_REQUIRED = "account_transfer_required", _2.USER_HAS_NOT_DELEGATED_WALLET = "user_has_not_delegated_wallet", _2.FEATURE_NOT_ENABLED = "feature_not_enabled", _2.INSUFFICIENT_FUNDS = "insufficient_funds", _2.TRANSACTION_BROADCAST_FAILURE = "transaction_broadcast_failure", _2.TRANSACTION_EXECUTION_FAILURE = "transaction_execution_failure", _2.INVALID_SOLANA_TRANSACTION = "invalid_solana_transaction", _2.INVALID_POLICY_FORMAT = "invalid_policy_format", _2.INVALID_AGGREGATION_FORMAT = "invalid_aggregation_format", _2.POLICY_VIOLATION = "policy_violation", _2.AUTHORIZATION_KEY_HAS_ASSOCIATED_WALLETS = "authorization_key_has_associated_wallets", _2.COMPLIANCE_BLOCKED = "compliance_blocked", _2.INVALID_REQUEST = "invalid_request", _2.SIGNUP_DISABLED = "signup_disabled", _2.INVALID_STATE = "invalid_state", _2);

  // node_modules/js-cookie/dist/js.cookie.mjs
  function assign(target) {
    for (var i20 = 1; i20 < arguments.length; i20++) {
      var source = arguments[i20];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i20 = 0; i20 < cookies.length; i20++) {
        var parts = cookies[i20].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e42) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init(defaultConverter, { path: "/" });

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/allSettled.mjs
  var e35 = Promise.allSettled.bind(Promise) ?? ((e42) => Promise.all(e42.map(((e43) => e43.then(((e44) => ({ status: "fulfilled", value: e44 }))).catch(((e44) => ({ status: "rejected", reason: e44 })))))));

  // node_modules/@privy-io/js-sdk-core/dist/esm/Session.mjs
  var o20 = "privy:token";
  var n7 = "privy-token";
  var a17 = "privy:pat";
  var _3 = "privy:refresh_token";
  var h9 = "privy-refresh-token";
  var g = "privy:id-token";
  var l3 = "privy-id-token";
  var c = "privy-session";
  var k = class extends eventemitter3_default {
    set isUsingServerCookies(e42) {
      this._isUsingServerCookies = e42;
    }
    async getCustomerAccessToken() {
      let e42 = await this._storage.get(o20);
      try {
        return "string" == typeof e42 ? new t13(e42).value : null;
      } catch (e43) {
        return console.error(e43), await this.destroyLocalState({ reason: "getToken_error" }), null;
      }
    }
    async getPrivyAccessToken() {
      let e42 = await this._storage.get(a17);
      try {
        return "string" == typeof e42 ? new t13(e42).value : null;
      } catch (e43) {
        return console.error(e43), await this.destroyLocalState({ reason: "getToken_error" }), null;
      }
    }
    async getRefreshToken() {
      let e42 = await this._storage.get(_3);
      return "string" == typeof e42 ? e42 : null;
    }
    async getIdentityToken() {
      let e42 = await this._storage.get(g);
      return "string" == typeof e42 ? e42 : null;
    }
    get mightHaveServerCookies() {
      try {
        let e42 = api.get(c);
        return void 0 !== e42 && e42.length > 0;
      } catch (e42) {
        console.error(e42);
      }
      return false;
    }
    hasRefreshCredentials(e42, t45) {
      return this.mightHaveServerCookies || "string" == typeof e42 && "string" == typeof t45;
    }
    tokenIsActive(e42) {
      if (!e42) return false;
      let t45 = t13.parse(e42);
      return null !== t45 && !t45.isExpired(30);
    }
    async destroyLocalState(e42) {
      await e35([this._storage.del(o20), this._storage.del(a17), this._storage.del(_3), this._storage.del(g), this._storage.del(this.GUEST_CREDENTIAL_STORAGE_KEY)]), api.remove(n7), api.remove(h9), api.remove(l3), api.remove(c), e42?.reason && this.emit("storage_cleared", { reason: e42.reason });
    }
    async storeCustomerAccessToken(e42) {
      if ("string" == typeof e42) {
        let t45 = await this._storage.get(o20);
        if (await this._storage.put(o20, e42), !this._isUsingServerCookies) {
          let t46 = t13.parse(e42)?.expiration;
          api.set(n7, e42, { sameSite: "Strict", secure: true, expires: t46 ? new Date(1e3 * t46) : void 0 });
        }
        t45 !== e42 && this.emit("token_stored", { cookiesEnabled: this._isUsingServerCookies });
      } else {
        let e43 = await this._storage.get(o20);
        await this._storage.del(o20), api.remove(n7), null !== e43 && this.emit("token_cleared", { reason: "set_with_non_string_value" });
      }
    }
    async storePrivyAccessToken(e42) {
      "string" == typeof e42 ? await this._storage.put(a17, e42) : await this._storage.del(a17);
    }
    async storeRefreshToken(e42) {
      "string" == typeof e42 ? (await this._storage.put(_3, e42), this._isUsingServerCookies || (api.set(c, "t", { sameSite: "Strict", secure: true, expires: 30 }), api.set(h9, e42, { sameSite: "Strict", secure: true, expires: 30 })), this.emit("refresh_token_stored", { cookiesEnabled: this._isUsingServerCookies })) : (await this._storage.del(_3), api.remove(h9), api.remove(c), this.emit("refresh_token_cleared", { reason: "set_with_non_string_value" }));
    }
    async updateWithTokensResponse(e42) {
      let t45 = (await e35([this.storeCustomerAccessToken(e42.token), this.storePrivyAccessToken(e42.privy_access_token), this.storeRefreshToken(e42.refresh_token), this.storeIdentityToken(e42.identity_token), this.processOAuthTokens(e42.oauth_tokens)])).filter(((e43) => "rejected" === e43.status));
      t45.length > 0 && this.emit("error_storing_tokens", t45.map(((e43) => String(e43.reason))).join(", "));
    }
    async processOAuthTokens(e42) {
      e42 && this.emit("oauth_tokens_granted", e42);
    }
    async storeIdentityToken(e42) {
      if ("string" == typeof e42) {
        let t45 = await this._storage.get(g);
        if (await this._storage.put(g, e42), !this._isUsingServerCookies) {
          let t46 = t13.parse(e42)?.expiration;
          api.set(l3, e42, { sameSite: "Strict", secure: true, expires: t46 ? new Date(1e3 * t46) : void 0 });
        }
        t45 !== e42 && this.emit("identity_token_stored", { cookiesEnabled: this._isUsingServerCookies });
      } else {
        let e43 = await this._storage.get(g);
        await this._storage.del(g), api.remove(l3), null !== e43 && this.emit("identity_token_cleared", { reason: "set_with_non_string_value" });
      }
    }
    async getOrCreateGuestCredential() {
      let e42 = await this._storage.get(this.GUEST_CREDENTIAL_STORAGE_KEY);
      if (e42 && "string" == typeof e42) return e42;
      let s12 = base64url_exports.encode(crypto.getRandomValues(new Uint8Array(32)));
      return await this._storage.put(this.GUEST_CREDENTIAL_STORAGE_KEY, s12), s12;
    }
    constructor(e42) {
      super(), this._isUsingServerCookies = false, this._storage = e42.storage, this.GUEST_CREDENTIAL_STORAGE_KEY = `privy:guest:${e42.appId}`;
    }
  };
  k.events = ["storage_cleared", "token_cleared", "refresh_token_cleared", "identity_token_cleared", "token_stored", "refresh_token_stored", "identity_token_stored", "oauth_tokens_granted", "error_storing_tokens"];

  // node_modules/@privy-io/js-sdk-core/dist/esm/toAbortSignalTimeout.mjs
  var t35 = (t45) => {
    let e42 = new AbortController();
    return setTimeout((() => e42.abort()), t45), e42.signal;
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/toSearchParams.mjs
  function r15(r20) {
    let n10 = new URLSearchParams();
    for (let t45 in r20) null != r20[t45] && n10.append(t45, String(r20[t45]));
    return Array.from(n10).length ? "?" + n10.toString() : "";
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/noop.mjs
  var o21 = () => {
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/logger.mjs
  var e36 = { NONE: Number.NEGATIVE_INFINITY, ERROR: 1, WARN: 2, INFO: 3, DEBUG: Number.POSITIVE_INFINITY };
  var N = ({ level: N2, logger: o26 }) => ({ get level() {
    return N2;
  }, error: e36[N2] >= e36.ERROR ? o26.error : o21, warn: e36[N2] >= e36.WARN ? o26.warn : o21, info: e36[N2] >= e36.INFO ? o26.info : o21, debug: e36[N2] >= e36.DEBUG ? o26.debug : o21 });

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/PrivyInternal.mjs
  var p13 = "privy:caid";
  var u = class {
    setCallbacks(e42) {
      this.callbacks = { ...this.callbacks, ...e42 };
    }
    get isReady() {
      return !!this._config;
    }
    get config() {
      return this._config;
    }
    get caid() {
      return this._analyticsId;
    }
    async _initialize() {
      if (this.isReady) this.callbacks?.setIsReady?.(true);
      else {
        if (!await this.isStorageAccessible()) throw new e24({ code: "storage_error", error: "Unable to access storage" });
        this._config = await this.getAppConfig(), this._config?.custom_api_url && (this.baseUrl = this._config.custom_api_url, this.session.isUsingServerCookies = true), this.callbacks?.setIsReady?.(true), this._sdkVersion.startsWith("react-auth:") || this.createAnalyticsEvent("sdk_initialize", {});
      }
    }
    getPath(e42, { params: t45, query: s12 }) {
      return `${this.baseUrl}${e6(e42.path, t45)}${r15(s12)}`;
    }
    async fetch(e42, { body: t45, params: s12, query: i20, headers: r20, onRequest: a20 = this._beforeRequest.bind(this) }) {
      let o26 = new Request(this.getPath(e42, { params: s12, query: i20 }), { method: e42.method, body: JSON.stringify(t45), headers: r20 }), n10 = await a20(o26), c4 = await this._fetch(o26, n10), l7 = await c4.json();
      if (c4.status > 299) throw new r6({ ...l7, status: c4.status });
      return l7;
    }
    async _beforeRequestWithoutInitialize(e42) {
      let t45 = await this.session.getPrivyAccessToken() ?? await this.session.getCustomerAccessToken(), s12 = new Headers(e42.headers);
      s12.set("privy-app-id", this.appId), this.appClientId && s12.set("privy-client-id", this.appClientId), s12.set("privy-client", this._sdkVersion), t45 && s12.set("Authorization", `Bearer ${t45}`), s12.set("Content-Type", "application/json"), s12.set("Accept", "application/json");
      let i20 = await this._getOrGenerateClientAnalyticsId();
      return i20 && s12.set("privy-ca-id", i20), this.nativeAppIdentifier && s12.set("x-native-app-identifier", this.nativeAppIdentifier), { signal: t35(2e4), headers: s12, credentials: "include" };
    }
    async beforeRequestWithoutRefresh(e42) {
      return await this._initialize(), this._beforeRequestWithoutInitialize(e42);
    }
    async _beforeRequest(e42) {
      return await this._initialize(), await this.getAccessTokenInternal(), this.beforeRequestWithoutRefresh(e42);
    }
    async getAppConfig() {
      return await this.fetch(p, { params: { app_id: this.appId }, onRequest: this._beforeRequestWithoutInitialize.bind(this) });
    }
    async _getOrGenerateClientAnalyticsId() {
      if (this._analyticsId) return this._analyticsId;
      try {
        let e42 = await this._storage.get(p13);
        if ("string" == typeof e42 && e42.length > 0) return this._analyticsId = e42, e42;
      } catch (e42) {
        this.logger.error("Unable to load clientId", e42);
      }
      try {
        this._analyticsId = v4_default();
      } catch (e42) {
        this.logger.error("Unable to generate uuidv4", e42);
      }
      if (this._analyticsId) {
        try {
          await this._storage.put(p13, this._analyticsId);
        } catch (e42) {
          this.logger.error(`Unable to store clientId: ${this._analyticsId}`, e42);
        }
        return this._analyticsId;
      }
    }
    async destroyClientAnalyticsId() {
      try {
        return await this._storage.del(p13);
      } catch (e42) {
        this.logger.error("Unable to delete clientId", e42);
      }
    }
    async createAnalyticsEvent(e42, t45) {
      try {
        await this.fetch(t, { body: { event_name: e42, client_id: await this._getOrGenerateClientAnalyticsId(), payload: t45 }, onRequest: this.beforeRequestWithoutRefresh.bind(this) });
      } catch (e43) {
      }
    }
    async refreshSession(e42 = false) {
      if (!await this.isStorageAccessible()) throw new e24({ code: "storage_error", error: "Unable to access storage" });
      let t45 = await this.session.getRefreshToken() ?? void 0, s12 = t45 ?? "key", i20 = this._cache.get(s12);
      if (i20) return this.logger.debug("[privy:refresh] found in-flight session refresh request, deduping"), await i20;
      let r20 = this._refreshSession(t45, e42);
      this._cache.set(s12, r20);
      try {
        return await r20;
      } finally {
        this._cache.delete(s12);
      }
    }
    async _refreshSession(e42, t45) {
      let i20 = await this.session.getCustomerAccessToken();
      if (!this.session.hasRefreshCredentials(i20, e42 ?? null)) throw this.logger.debug("[privy:refresh] missing tokens, skipping request"), await this._initialize(), new r6({ code: I.MISSING_OR_INVALID_TOKEN, error: "No tokens found in storage", status: 401 });
      try {
        this.logger.debug(`[privy:refresh] fetching: ${s4.path}`);
        let s12 = await this.fetch(s4, { body: { refresh_token: e42 }, onRequest: this.beforeRequestWithoutRefresh.bind(this) }), i21 = s12.session_update_action;
        return this.logger.debug(`[privy:refresh] response: ${i21}`), "set" === i21 && (await this.session.updateWithTokensResponse(s12), this.logger.debug("[privy:refresh] tokens stored")), "clear" === i21 && (await this.session.destroyLocalState(), this.logger.debug("[privy:refresh] tokens cleared"), t45 || this.callbacks?.setUser?.(null)), "ignore" === i21 && (s12.token && (await this.session.storeCustomerAccessToken(s12.token), this.logger.debug("[privy:refresh] token stored (CAT)")), s12.privy_access_token && (await this.session.storePrivyAccessToken(s12.privy_access_token), this.logger.debug("[privy:refresh] token stored (PAT)")), s12.identity_token && (this.logger.debug("[privy:refresh] token stored (IDT)"), await this.session.storeIdentityToken(s12.identity_token))), this.logger.debug("[privy:refresh] returning response"), t45 || this.callbacks?.setUser?.(s12.user), s12;
      } catch (e43) {
        throw this.logger.debug(`[privy:refresh] error: ${e43.message ?? "unknown error"}`), e43 instanceof r6 && e43.code === I.MISSING_OR_INVALID_TOKEN && (await this.session.destroyLocalState(), t45 || this.callbacks?.setUser?.(null)), e43;
      }
    }
    async getAccessToken() {
      let [e42, t45] = await Promise.all([this.session.getCustomerAccessToken(), this.session.getRefreshToken()]);
      if (e42 && !this.session.tokenIsActive(e42) && this.session.hasRefreshCredentials(e42, t45)) {
        let t46 = await this.refreshSession(), s12 = await this.session.getCustomerAccessToken();
        return t46.token || this.logger.debug("[privy:getAccessToken] expected token received null"), t46.token === e42 && this.logger.debug("[privy:getAccessToken] expected new token in response received existing"), s12 === e42 && this.logger.debug("[privy:getAccessToken] expected new token in storage received existing"), t46.token ?? s12;
      }
      return e42 && !this.session.tokenIsActive(e42) ? (this.logger.debug("[privy:getAccessToken] unable to refresh inactive token"), this.callbacks?.setUser?.(null), await this.session.destroyLocalState(), null) : e42;
    }
    async getAccessTokenInternal() {
      let e42 = await this.getAccessToken();
      return await this.session.getPrivyAccessToken() ?? e42;
    }
    async getIdentityToken() {
      return await this.session.getIdentityToken();
    }
    async isStorageAccessible() {
      try {
        let e42 = `privy:__storage__test-${v4_default()}`, s12 = "blobby";
        await this._storage.put(e42, s12);
        let i20 = await this._storage.get(e42);
        return await this._storage.del(e42), i20 === s12;
      } catch (e42) {
        return this.logger.error(e42), false;
      }
    }
    constructor(t45) {
      this._sdkVersion = "js-sdk-core:0.61.3", this._cache = /* @__PURE__ */ new Map(), this.logger = N({ level: t45.logger?.level ?? t45.logLevel ?? "ERROR", logger: t45.logger ?? console }), this._storage = t45.storage, this._analyticsId = null, this._getOrGenerateClientAnalyticsId(), this.baseUrl = t45.baseUrl ?? "https://auth.privy.io", this.appId = t45.appId, this.appClientId = t45.appClientId, this._sdkVersion = t45.sdkVersion ?? this._sdkVersion, this.callbacks = t45.callbacks, this.nativeAppIdentifier = t45.nativeAppIdentifier, this.session = new k({ storage: this._storage, isUsingServerCookies: false, appId: t45.appId }), this._fetch = (0, import_fetch_retry.default)(globalThis.fetch, { retries: 3, retryDelay: (e42) => 3 ** e42 * 500, retryOn: [408, 409, 425, 500, 502, 503, 504] }), this.session.on("error_storing_tokens", ((e42) => {
        this.createAnalyticsEvent("error_updating_tokens_in_storage", { reason: e42 });
      }));
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/UserApi.mjs
  var t36 = class {
    async get() {
      let { user: r20 } = await this._privyInternal.refreshSession();
      return { user: r20 };
    }
    async acceptTerms() {
      return { user: await this._privyInternal.fetch(e8, {}) };
    }
    constructor(r20) {
      this._privyInternal = r20;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/embedded-wallets.mjs
  var e38 = (e42) => "wallet" === e42.type && "privy" === e42.wallet_client_type && "embedded" === e42.connector_type;

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/getAllUserEmbeddedEthereumWallets.mjs
  var t37 = (t45) => t45 ? t45.linked_accounts.filter(e38).filter(((e42) => "ethereum" === e42.chain_type)).sort(((e42, t46) => e42.wallet_index - t46.wallet_index)) : [];

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/getUserEmbeddedEthereumWallet.mjs
  var l4 = (l7) => t37(l7).find(((e42) => 0 === e42.wallet_index)) ?? null;

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/getAllUserEmbeddedSolanaWallets.mjs
  var t38 = (t45) => t45 ? t45.linked_accounts.filter(e38).filter(((e42) => "solana" === e42.chain_type)).sort(((e42, t46) => e42.wallet_index - t46.wallet_index)) : [];

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/getUserEmbeddedSolanaWallet.mjs
  var l5 = (l7) => t38(l7).find(((e42) => 0 === e42.wallet_index)) ?? null;

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/shouldCreateEmbeddedEthWallet.mjs
  var t39 = (t45, l7) => !("off" === l7 || t37(t45).length > 0 || t45.linked_accounts.filter(((e42) => "wallet" === e42.type && "ethereum" === e42.chain_type)).length > 0 && "all-users" !== l7);

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/shouldCreateEmbeddedSolWallet.mjs
  var l6 = (l7, t45) => !("off" === t45 || t38(l7).length > 0 || l7.linked_accounts.filter(((e42) => "wallet" === e42.type && "solana" === e42.chain_type)).length > 0 && "all-users" !== t45);

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs
  var o22 = (e42, t45) => ({ ...e42, is_new_user: t45.is_new_user, oauth_tokens: t45.oauth_tokens });
  var s9 = async (s12, l7, m3) => {
    let i20 = t39(l7.user, m3?.ethereum?.createOnLogin ?? "off"), d8 = l6(l7.user, m3?.solana?.createOnLogin ?? "off");
    if (i20 && d8) {
      let t45 = await s12.create({ recoveryMethod: "privy", skipCallbacks: true });
      return o22(await s12.createSolana({ ethereumAccount: l4(t45.user) ?? void 0 }), l7);
    }
    return i20 ? o22(await s12.create({ recoveryMethod: "privy", solanaAccount: l5(l7.user) ?? void 0 }), l7) : d8 ? o22(await s12.createSolana({ ethereumAccount: l4(l7.user) ?? void 0 }), l7) : l7;
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/CustomProviderApi.mjs
  var i13 = class {
    async syncWithToken(t45, i20, r20) {
      let l7 = await this._privyInternal.fetch(t2, { body: { token: t45, mode: r20 } });
      await this._privyInternal.session.updateWithTokensResponse(l7);
      let a20 = await s9(this._embedded, l7, i20?.embedded);
      return this._privyInternal.callbacks?.setUser?.(a20.user), a20;
    }
    async linkWithToken(e42) {
      await this._privyInternal.fetch(a2, { body: { token: e42 } });
      let s12 = await this._privyInternal.refreshSession();
      return { user: s12.user, identity_token: s12.identity_token };
    }
    constructor(e42, t45) {
      this._privyInternal = e42, this._embedded = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/EmailApi.mjs
  var a18 = class {
    async sendCode(t45, s12) {
      return this._privyInternal.fetch(a7, { body: { email: t45, token: s12 } });
    }
    async loginWithCode(e42, s12, i20, r20) {
      let a20 = await this._privyInternal.fetch(s2, { body: { email: e42, code: s12, mode: i20 } });
      await this._privyInternal.session.updateWithTokensResponse(a20);
      let l7 = await s9(this._embedded, a20, r20?.embedded);
      return this._privyInternal.callbacks?.setUser?.(l7.user), l7;
    }
    async linkWithCode(e42, t45) {
      await this._privyInternal.fetch(p6, { body: { email: e42, code: t45 } });
      let i20 = await this._privyInternal.refreshSession();
      return { user: i20.user, identity_token: i20.identity_token };
    }
    async updateEmail({ oldEmailAddress: e42, newEmailAddress: t45, code: s12 }) {
      await this._privyInternal.fetch(e3, { body: { oldAddress: e42, newAddress: t45, code: s12 } });
      let r20 = await this._privyInternal.refreshSession();
      return { user: r20.user, identity_token: r20.identity_token };
    }
    async unlink(e42) {
      await this._privyInternal.fetch(t7, { body: { address: e42 } });
      let t45 = await this._privyInternal.refreshSession();
      return { user: t45.user, identity_token: t45.identity_token };
    }
    constructor(e42, t45) {
      this._privyInternal = e42, this._embedded = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/FarcasterApi.mjs
  var n8 = class {
    async initializeAuth({ relyingParty: t45, redirectUrl: r20, token: i20 }) {
      return await this._privyInternal.fetch(a3, { body: { relying_party: t45, redirect_url: r20, token: i20 } });
    }
    async getFarcasterStatus({ channel_token: e42 }) {
      return await this._privyInternal.fetch(i, { headers: { "farcaster-channel-token": e42 } });
    }
    async authenticate({ channel_token: e42, message: t45, signature: i20, fid: s12, mode: n10 }, l7) {
      let d8 = await this._privyInternal.fetch(t3, { body: { channel_token: e42, message: t45, signature: i20, fid: s12, mode: n10 } });
      await this._privyInternal.session.updateWithTokensResponse(d8);
      let o26 = await s9(this._embedded, d8, l7?.embedded);
      return this._privyInternal.callbacks?.setUser?.(o26.user), o26;
    }
    async link({ channel_token: e42, message: t45, signature: r20, fid: s12 }) {
      await this._privyInternal.fetch(e, { body: { channel_token: e42, message: t45, signature: r20, fid: s12 } });
      let a20 = await this._privyInternal.refreshSession();
      return { user: a20.user, identity_token: a20.identity_token };
    }
    async unlink({ fid: e42 }) {
      await this._privyInternal.fetch(h, { body: { fid: e42 } });
      let t45 = await this._privyInternal.refreshSession();
      return { user: t45.user, identity_token: t45.identity_token };
    }
    constructor(e42, t45) {
      this._privyInternal = e42, this._embedded = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/FarcasterV2Api.mjs
  var i14 = class {
    async initializeAuth() {
      return await this._privyInternal.fetch(p3, { body: {} });
    }
    async authenticate({ message: e42, signature: i20, fid: a20 }, l7) {
      let r20 = await this._privyInternal.fetch(r, { body: { message: e42, signature: i20, fid: a20 } });
      await this._privyInternal.session.updateWithTokensResponse(r20);
      let d8 = await s9(this._embedded, r20, l7?.embedded);
      return this._privyInternal.callbacks?.setUser?.(d8.user), d8;
    }
    constructor(e42, t45) {
      this._privyInternal = e42, this._embedded = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/GuestApi.mjs
  var s10 = class {
    async create(s12) {
      let l7 = await this._privyInternal.session.getOrCreateGuestCredential(), r20 = await this._privyInternal.fetch(t4, { body: { guest_credential: l7 } });
      await this._privyInternal.session.updateWithTokensResponse(r20);
      let a20 = await s9(this._embedded, r20, s12?.embedded);
      return this._privyInternal.callbacks?.setUser?.(a20.user), a20;
    }
    constructor(e42, t45) {
      this._privyInternal = e42, this._embedded = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/pkce.mjs
  var t40 = "privy:state_code";
  var n9 = "privy:code_verifier";
  async function r16(e42, t45) {
    let n10 = new TextEncoder().encode(e42);
    return new Uint8Array(await t45("SHA-256", n10));
  }
  function o23(e42) {
    return crypto.getRandomValues(new Uint8Array(e42));
  }
  function i15() {
    return base64url_exports.encode(o23(36));
  }
  function c2() {
    return i15();
  }
  async function u2({ codeVerifier: t45, method: n10 = "S256", digest: o26 = crypto.subtle.digest.bind(crypto.subtle) }) {
    if ("S256" != n10) return t45;
    {
      let n11 = await r16(t45, o26);
      return base64url_exports.encode(n11);
    }
  }

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/OAuthApi.mjs
  var m2 = class {
    async generateURL(t45, i20) {
      let s12 = i15(), r20 = c2(), h10 = await u2({ codeVerifier: s12, digest: this._crypto?.digest });
      return await Promise.all([this._storage.put(n9, s12), this._storage.put(t40, r20)]), this._privyInternal.fetch(a5, { body: { redirect_to: i20, provider: t45, code_challenge: h10, state_code: r20 } });
    }
    async loginWithCode(e42, i20, s12, a20, o26, l7) {
      let [m3, p14] = await Promise.all([this._storage.get(n9), this._storage.get(t40)]);
      if (p14 !== i20) throw this._privyInternal.createAnalyticsEvent("possible_phishing_attempt", { flow: "oauth", provider: s12, storedStateCode: p14 ?? "", returnedStateCode: i20 ?? "" }), new e24({ code: "pkce_state_code_mismatch", error: "Unexpected auth flow. This may be a phishing attempt." });
      let _4 = await this._privyInternal.fetch(t5, { body: { authorization_code: e42, code_type: a20, state_code: p14, code_verifier: m3, mode: o26 } });
      await this._privyInternal.session.updateWithTokensResponse(_4);
      let c4 = await s9(this._embedded, _4, l7?.embedded);
      return await Promise.all([this._storage.del(n9), this._storage.del(t40)]), this._privyInternal.callbacks?.setUser?.(c4.user), c4;
    }
    async linkWithCode(e42, t45, s12, a20) {
      let [o26, l7] = await Promise.all([this._storage.get(n9), this._storage.get(t40)]);
      if (l7 !== t45) throw this._privyInternal.createAnalyticsEvent("possible_phishing_attempt", { flow: "oauth", provider: s12, storedStateCode: l7 ?? "", returnedStateCode: t45 ?? "" }), new e24({ code: "pkce_state_code_mismatch", error: "Unexpected auth flow. This may be a phishing attempt." });
      let h10 = await this._privyInternal.fetch(h2, { body: { authorization_code: e42, code_type: a20, state_code: l7, code_verifier: o26 } });
      await this._privyInternal.session.processOAuthTokens(h10.oauth_tokens);
      let m3 = await this._privyInternal.refreshSession();
      return await Promise.all([this._storage.del(n9), this._storage.del(t40)]), { user: m3.user, identity_token: m3.identity_token };
    }
    async unlink(e42, t45) {
      await this._privyInternal.fetch(o, { body: { provider: e42, subject: t45 } });
      let i20 = await this._privyInternal.refreshSession();
      return { user: i20.user, identity_token: i20.identity_token };
    }
    constructor(e42, t45, i20, s12) {
      this._privyInternal = e42, this._embedded = t45, this._storage = i20, this._crypto = s12;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/PasskeyApi.mjs
  var o24 = class {
    async generateRegistrationOptions(t45) {
      return await this._privyInternal.fetch(i2, { body: { relying_party: t45 } });
    }
    async generateAuthenticationOptions(e42) {
      return await this._privyInternal.fetch(e2, { body: { relying_party: e42 } });
    }
    async generateSignupOptions(e42) {
      return await this._privyInternal.fetch(p5, { body: { relying_party: e42 } });
    }
    async loginWithPasskey(e42, t45, s12, n10) {
      let i20 = await this._privyInternal.fetch(a6, { body: { relying_party: s12, challenge: t45, authenticator_response: this._transformAuthenticationResponseToSnakeCase(e42) } });
      await this._privyInternal.session.updateWithTokensResponse(i20);
      let o26 = await s9(this._embedded, i20, n10?.embedded);
      return this._privyInternal.callbacks?.setUser?.(o26.user), o26;
    }
    async signupWithPasskey(e42, t45, s12) {
      let a20 = await this._privyInternal.fetch(s, { body: { relying_party: t45, authenticator_response: this._transformRegistrationResponseToSnakeCase(e42) } });
      await this._privyInternal.session.updateWithTokensResponse(a20);
      let i20 = await s9(this._embedded, a20, s12?.embedded);
      return this._privyInternal.callbacks?.setUser?.(i20.user), i20;
    }
    async linkWithPasskey(e42, t45) {
      await this._privyInternal.fetch(t6, { body: { relying_party: t45, authenticator_response: this._transformRegistrationResponseToSnakeCase(e42) } });
      let s12 = await this._privyInternal.refreshSession();
      return { user: s12.user, identity_token: s12.identity_token };
    }
    _transformRegistrationResponseToSnakeCase(e42) {
      return { type: e42.type, id: e42.id, raw_id: e42.rawId, response: { client_data_json: e42.response.clientDataJSON, attestation_object: e42.response.attestationObject, authenticator_data: e42.response.authenticatorData || void 0, transports: e42.response.transports || void 0, public_key: e42.response.publicKey || void 0, public_key_algorithm: e42.response.publicKeyAlgorithm || void 0 }, authenticator_attachment: e42.authenticatorAttachment || void 0, client_extension_results: { app_id: e42.clientExtensionResults.appid || void 0, cred_props: e42.clientExtensionResults.credProps || void 0, hmac_create_secret: e42.clientExtensionResults.hmacCreateSecret || void 0 } };
    }
    _transformAuthenticationResponseToSnakeCase(e42) {
      return { type: e42.type, id: e42.id, raw_id: e42.rawId, response: { signature: e42.response.signature, client_data_json: e42.response.clientDataJSON, authenticator_data: e42.response.authenticatorData, user_handle: e42.response.userHandle || void 0 }, authenticator_attachment: e42.authenticatorAttachment || void 0, client_extension_results: { app_id: e42.clientExtensionResults.appid || void 0, cred_props: e42.clientExtensionResults.credProps || void 0, hmac_create_secret: e42.clientExtensionResults.hmacCreateSecret || void 0 } };
    }
    constructor(e42, t45) {
      this._privyInternal = e42, this._embedded = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/PhoneApi.mjs
  var o25 = class {
    async sendCode(t45, r20) {
      return this._privyInternal.fetch(a8, { body: { phoneNumber: t45, token: r20 } });
    }
    async loginWithCode(e42, r20, i20, n10) {
      let o26 = await this._privyInternal.fetch(s3, { body: { phoneNumber: e42, code: r20, mode: i20 } });
      await this._privyInternal.session.updateWithTokensResponse(o26);
      let a20 = await s9(this._embedded, o26, n10?.embedded);
      return this._privyInternal.callbacks?.setUser?.(a20.user), a20;
    }
    async linkWithCode(e42, t45) {
      await this._privyInternal.fetch(p7, { body: { phoneNumber: e42, code: t45 } });
      let i20 = await this._privyInternal.refreshSession();
      return { user: i20.user, identity_token: i20.identity_token };
    }
    async updatePhone({ oldPhoneNumber: e42, newPhoneNumber: t45, code: r20 }) {
      await this._privyInternal.fetch(e4, { body: { old_phone_number: e42, new_phone_number: t45, code: r20 } });
      let n10 = await this._privyInternal.refreshSession();
      return { user: n10.user, identity_token: n10.identity_token };
    }
    async unlink(e42) {
      await this._privyInternal.fetch(t8, { body: { phoneNumber: e42 } });
      let t45 = await this._privyInternal.refreshSession();
      return { user: t45.user, identity_token: t45.identity_token };
    }
    constructor(e42, t45) {
      this._privyInternal = e42, this._embedded = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/SiweApi.mjs
  var r17 = class {
    async unlinkWallet(t45) {
      await this._privyInternal.fetch(h4, { body: { address: t45 } });
      let i20 = await this._privyInternal.refreshSession();
      return { user: i20.user, identity_token: i20.identity_token };
    }
    async linkWithSiwe(e42, i20, n10) {
      let s12 = i20 || this._wallet, r20 = n10 || this._preparedMessage;
      if (!s12) throw Error("A wallet must be provided in the init step or as an argument to linkWithSiwe");
      if (!r20) throw Error("A message must be generated and signed before being used to link a wallet to privy");
      await this._privyInternal.fetch(a10, { body: { message: r20, signature: e42, chainId: s12.chainId, walletClientType: s12.walletClientType ?? null, connectorType: s12.connectorType ?? null } });
      let a20 = await this._privyInternal.refreshSession();
      return { user: a20.user, identity_token: a20.identity_token };
    }
    async loginWithSiwe(e42, t45, n10, r20, a20) {
      let l7 = t45 || this._wallet, o26 = n10 || this._preparedMessage;
      if (!l7) throw Error("A wallet must be provided in the init step or as an argument to loginWithSiwe");
      if (!o26) throw Error("A message must be generated and signed before being used to login to privy with a wallet");
      let d8 = await this._privyInternal.fetch(i3, { body: { signature: e42, message: o26, chainId: l7.chainId, walletClientType: l7.walletClientType ?? null, connectorType: l7.connectorType ?? null, mode: r20 } });
      await this._privyInternal.session.updateWithTokensResponse(d8);
      let h10 = await s9(this._embedded, d8, a20?.embedded);
      return this._privyInternal.callbacks?.setUser?.(h10.user), h10;
    }
    async init(e42, t45, i20) {
      var s12;
      this._wallet = e42;
      let { nonce: r20 } = await this._privyInternal.fetch(t10, { body: { address: e42.address } }), a20 = `${(s12 = { chainId: e42.chainId.toString().replace("eip155:", ""), address: e42.address, issuedAt: (/* @__PURE__ */ new Date()).toISOString(), statement: "By signing, you are proving you own this wallet and logging in. This does not initiate a transaction or cost any fees.", domain: t45, nonce: r20, uri: i20 }).domain} wants you to sign in with your Ethereum account:
${s12.address}

${s12.statement}

URI: ${s12.uri}
Version: 1
Chain ID: ${s12.chainId}
Nonce: ${s12.nonce}
Issued At: ${s12.issuedAt}
Resources:
- https://privy.io`;
      return this._preparedMessage = a20, { nonce: r20, message: a20 };
    }
    constructor(e42, t45) {
      this._wallet = void 0, this._privyInternal = e42, this._embedded = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/SiwsApi.mjs
  var r18 = class {
    async unlink({ address: t45 }) {
      await this._privyInternal.fetch(h5, { body: { address: t45 } });
      let s12 = await this._privyInternal.refreshSession();
      return { user: s12.user, identity_token: s12.identity_token };
    }
    async link({ message: e42, signature: s12, walletClientType: l7, connectorType: n10 }) {
      await this._privyInternal.fetch(a11, { body: { message: e42, signature: s12, walletClientType: l7 ?? null, connectorType: n10 ?? null } });
      let r20 = await this._privyInternal.refreshSession();
      return { user: r20.user, identity_token: r20.identity_token };
    }
    async login({ mode: e42, message: t45, signature: l7, walletClientType: r20, connectorType: i20, opts: a20 }) {
      let d8 = await this._privyInternal.fetch(i4, { body: { signature: l7, message: t45, walletClientType: r20 ?? null, connectorType: i20 ?? null, mode: e42 } });
      await this._privyInternal.session.updateWithTokensResponse(d8);
      let o26 = await s9(this._embedded, d8, a20?.embedded);
      return this._privyInternal.callbacks?.setUser?.(o26.user), o26;
    }
    async fetchNonce({ address: e42 }) {
      let { nonce: t45 } = await this._privyInternal.fetch(t11, { body: { address: e42 } });
      return { nonce: t45 };
    }
    constructor(e42, t45) {
      this._privyInternal = e42, this._embedded = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/SmartWalletApi.mjs
  var e39 = class {
    async link(t45, e42, i20, s12) {
      await this._privyInternal.fetch(e7, { body: { message: t45, signature: e42, smart_wallet_type: i20, smart_wallet_version: s12 } });
      let a20 = await this._privyInternal.refreshSession();
      return { user: a20.user, identity_token: a20.identity_token };
    }
    async init(n10) {
      var e42;
      let { nonce: i20 } = await this._privyInternal.fetch(t10, { body: { address: n10.address } });
      return { nonce: i20, message: `${(e42 = { chainId: n10.chainId.toString().replace("eip155:", ""), address: n10.address, issuedAt: (/* @__PURE__ */ new Date()).toISOString(), statement: "By signing, you are proving you own this wallet and logging in. This does not initiate a transaction or cost any fees.", domain: "privy.io", uri: "https://auth.privy.io", nonce: i20 }).domain} wants you to sign in with your Ethereum account:
${e42.address}

${e42.statement}

URI: ${e42.uri}
Version: 1
Chain ID: ${e42.chainId}
Nonce: ${e42.nonce}
Issued At: ${e42.issuedAt}
Resources:
- https://privy.io` };
    }
    constructor(n10) {
      this._privyInternal = n10;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/AuthApi.mjs
  var d4 = class {
    async logout(e42) {
      try {
        let e43 = await this._privyInternal.session.getRefreshToken() ?? void 0;
        await this._privyInternal.fetch(o3, { body: { refresh_token: e43 } });
      } catch (t45) {
        console.warn("Error destroying session");
      }
      await Promise.all([this._privyInternal.session.destroyLocalState({ reason: "logout" }), this._privyInternal.destroyClientAnalyticsId(), e42?.userId && this._mfa.clearMfa({ userId: e42.userId })]), this._privyInternal.callbacks?.setUser?.(null);
    }
    constructor(t45, d8, y3, u4, j) {
      this._privyInternal = t45, this._mfa = j, this.customProvider = new i13(this._privyInternal, d8), this.phone = new o25(this._privyInternal, d8), this.email = new a18(this._privyInternal, d8), this.oauth = new m2(this._privyInternal, d8, y3, u4), this.guest = new s10(this._privyInternal, d8), this.siwe = new r17(this._privyInternal, d8), this.siws = new r18(this._privyInternal, d8), this.smartWallet = new e39(this._privyInternal), this.passkey = new o24(this._privyInternal, d8), this.farcaster = new n8(this._privyInternal, d8), this.farcasterV2 = new i14(this._privyInternal, d8);
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/CoinbaseOnRampApi.mjs
  var a19 = class {
    async initOnRampSession(r20) {
      return await this._privyInternal.fetch(n, { body: r20 });
    }
    async getStatus(t45) {
      return await this._privyInternal.fetch(a, { query: { partnerUserId: t45 } });
    }
    constructor(t45) {
      this._privyInternal = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/MoonpayOnRampApi.mjs
  var import_fetch_retry2 = __toESM(require_fetch_retry_umd(), 1);

  // node_modules/@privy-io/js-sdk-core/dist/esm/funding/moonpay.mjs
  var d5 = { prod: { url: "https://api.moonpay.com/v1", key: "pk_live_hirbpu0cVcLHrjktC9l7fbc9ctjv0SL" }, sandbox: { url: "https://api.moonpay.com/v1", key: "pk_test_fqWjXZMSFwloh7orvJsRfjiUHXJqFzI" } };
  var u3 = /* @__PURE__ */ new Set([t23.id, t16.id, e12.id, o6.id, a15.id, e14.id, t28.id]);
  var s11 = /* @__PURE__ */ new Set([t23.id, t16.id, t24.id, e12.id, o6.id, a15.id]);

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/MoonpayOnRampApi.mjs
  var i16 = class {
    async sign(t45) {
      return await this._privyInternal.fetch(o4, { body: t45 });
    }
    async getTransactionStatus({ transactionId: r20, useSandbox: i20 }) {
      let { url: n10, key: s12 } = d5[i20 ? "sandbox" : "prod"], e42 = await (0, import_fetch_retry2.default)(fetch, { retries: 3, retryDelay: 500 })(`${n10}/transactions/ext/${r20}?apiKey=${s12}`);
      if (!e42.ok) throw new o8({ error: `Failed to fetch transaction status for Transaction ${r20}`, code: "failed_to_fetch_moonpay_transaction_status", response: e42 });
      let c4 = await e42.json();
      return Array.isArray(c4) ? c4.at(0) : void 0;
    }
    constructor(t45) {
      this._privyInternal = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/FundingApi.mjs
  var import_fetch_retry3 = __toESM(require_fetch_retry_umd(), 1);
  var i17 = class {
    constructor(i20) {
      this.moonpay = new i16(i20), this.coinbase = new a19(i20);
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/mfa/MfaPasskeyApi.mjs
  var r19 = class {
    async generateAuthenticationOptions(r20) {
      return await this._privyInternal.fetch(a4, { body: r20 });
    }
    constructor(t45) {
      this._privyInternal = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/mfa/MfaSmsApi.mjs
  var t42 = class {
    async sendCode(t45) {
      return await this._privyInternal.fetch(p4, { body: t45 });
    }
    constructor(r20) {
      this._privyInternal = r20;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/mfa/MfaApi.mjs
  var i18 = class {
    setProxy(e42) {
      this.proxy = e42;
    }
    async getAccessTokenInternal() {
      let t45 = await this.privyInternal.getAccessTokenInternal();
      if (!t45) throw new e24({ error: "Missing access token", code: "attempted_rpc_call_before_logged_in" });
      return t45;
    }
    async verifyMfa() {
      if (!this.proxy) throw new e24({ error: "Embedded wallet proxy not initialized", code: "embedded_wallet_webview_not_loaded" });
      return await this.proxy.verifyMfa({ accessToken: await this.getAccessTokenInternal() });
    }
    async initEnrollMfa(t45) {
      if (!this.proxy) throw new e24({ error: "Embedded wallet proxy not initialized", code: "embedded_wallet_webview_not_loaded" });
      return await this.proxy.initEnrollMfa({ ...t45, accessToken: await this.getAccessTokenInternal() });
    }
    async submitEnrollMfa(t45) {
      if (!this.proxy) throw new e24({ error: "Embedded wallet proxy not initialized", code: "embedded_wallet_webview_not_loaded" });
      let r20 = await this.proxy.submitEnrollMfa({ ...t45, accessToken: await this.getAccessTokenInternal() });
      return await this.privyInternal.refreshSession(), r20;
    }
    async unenrollMfa(t45) {
      if (!this.proxy) throw new e24({ error: "Embedded wallet proxy not initialized", code: "embedded_wallet_webview_not_loaded" });
      let r20 = await this.proxy.unenrollMfa({ method: t45, accessToken: await this.getAccessTokenInternal() });
      return await this.privyInternal.refreshSession(), r20;
    }
    async clearMfa(t45) {
      if (!this.proxy) throw new e24({ error: "Embedded wallet proxy not initialized", code: "embedded_wallet_webview_not_loaded" });
      return await this.proxy.clearMfa(t45);
    }
    constructor(e42, i20) {
      this.proxy = i20, this.privyInternal = e42, this.sms = new t42(e42), this.passkey = new r19(e42);
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/recovery/RecoveryICloudApi.mjs
  var e40 = class {
    async init(r20) {
      return this._privyInternal.fetch(o2, { body: { client_type: r20 } });
    }
    async getICloudConfiguration(t45) {
      return this._privyInternal.fetch(h3, { body: { client_type: t45 } });
    }
    constructor(t45) {
      this._privyInternal = t45;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/recovery/RecoveryOAuthApi.mjs
  var c3 = class {
    async generateURL(e42) {
      let r20 = i15(), c4 = c2(), _4 = await u2({ codeVerifier: r20, digest: this._crypto?.digest });
      return await Promise.all([this._storage.put(n9, r20), this._storage.put(t40, c4)]), this._privyInternal.fetch(a9, { body: { redirect_to: e42, code_challenge: _4, state_code: c4 } });
    }
    async authorize(t45, i20) {
      let [o26, a20] = await Promise.all([this._storage.get(n9), this._storage.get(t40)]);
      if (a20 !== i20) throw this._privyInternal.createAnalyticsEvent("possible_phishing_attempt", { flow: "recovery_oauth", storedStateCode: a20 ?? "", returnedStateCode: i20 ?? "" }), new e24({ code: "pkce_state_code_mismatch", error: "Unexpected auth flow. This may be a phishing attempt." });
      let c4 = await this._privyInternal.fetch(t9, { body: { authorization_code: t45, state_code: a20, code_verifier: o26 } });
      return await Promise.all([this._storage.del(n9), this._storage.del(t40)]), c4;
    }
    constructor(t45, e42, r20) {
      this._privyInternal = t45, this._storage = e42, this._crypto = r20;
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/recovery/RecoveryApi.mjs
  var i19 = class {
    async getRecoveryKeyMaterial(t45, e42) {
      return this._privyInternal.fetch(e5, { body: { chain_type: e42 }, params: { address: t45 } });
    }
    constructor(r20, i20, o26) {
      this._privyInternal = r20, this.auth = new c3(this._privyInternal, i20, o26), this.icloudAuth = new e40(this._privyInternal);
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/client/Privy.mjs
  var import_canonicalize7 = __toESM(require_canonicalize(), 1);
  var import_fetch_retry4 = __toESM(require_fetch_retry_umd(), 1);
  var d6 = class {
    async initialize() {
      await this._privyInternal._initialize();
    }
    setMessagePoster(e42) {
      this.embeddedWallet.setMessagePoster(e42);
    }
    addOAuthTokensListener(e42) {
      return this._privyInternal.session.on("oauth_tokens_granted", e42), { unsubscribe: () => {
        this._privyInternal.session.removeListener("oauth_tokens_granted", e42);
      } };
    }
    setCallbacks(e42) {
      this._privyInternal.setCallbacks(e42);
    }
    getAccessToken() {
      return this._privyInternal.getAccessToken();
    }
    getIdentityToken() {
      return this._privyInternal.getIdentityToken();
    }
    getCompiledPath(e42, t45) {
      return this._privyInternal.getPath(e42, t45);
    }
    async fetchPrivyRoute(e42, t45) {
      return this._privyInternal.fetch(e42, t45);
    }
    get logger() {
      return this._privyInternal.logger;
    }
    constructor({ clientId: d8, ...h10 }) {
      this._privyInternal = new u({ ...h10, appClientId: d8 }), this.mfa = new i18(this._privyInternal), this.mfaPromises = new r14(), this.app = new r2(this._privyInternal), this.embeddedWallet = new y2(this._privyInternal, h10.embeddedWalletMessagePoster, h10.supportedChains, this.mfa, this.mfaPromises, this.app), this.user = new t36(this._privyInternal), this.auth = new d4(this._privyInternal, this.embeddedWallet, h10.storage, h10.crypto, this.mfa), this.recovery = new i19(this._privyInternal, h10.storage, h10.crypto), this.funding = new i17(this._privyInternal), this.delegated = new t15(this._privyInternal), this.crossApp = new t14(this._privyInternal, h10.storage);
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/storage/LocalStorage.mjs
  var e41 = class {
    async get(e42) {
      let t45 = localStorage.getItem(e42);
      return null === t45 ? void 0 : JSON.parse(t45);
    }
    put(e42, t45) {
      void 0 !== t45 ? localStorage.setItem(e42, JSON.stringify(t45)) : this.del(e42);
    }
    del(e42) {
      localStorage.removeItem(e42);
    }
    getKeys() {
      return Object.entries(localStorage).map((([e42]) => e42));
    }
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/utils/entropy.mjs
  var t43 = (t45, l7) => {
    if (!t45) return null;
    if (l7?.imported) return d7(l7);
    let m3 = l4(t45) ?? l5(t45);
    return m3 ? d7(m3) : null;
  };
  var d7 = (e42) => {
    if ("ethereum" === e42.chain_type) return { entropyId: e42.address, entropyIdVerifier: "ethereum-address-verifier" };
    if ("solana" === e42.chain_type) return { entropyId: e42.address, entropyIdVerifier: "solana-address-verifier" };
    throw Error("Invalid embedded wallet account type");
  };

  // node_modules/@privy-io/js-sdk-core/dist/esm/index.mjs
  var import_fetch_retry5 = __toESM(require_fetch_retry_umd(), 1);
  var import_canonicalize8 = __toESM(require_canonicalize(), 1);
  return __toCommonJS(privy_wrapper_exports);
})();
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
@noble/curves/esm/abstract/modular.js:
@noble/curves/esm/abstract/curve.js:
@noble/curves/esm/abstract/weierstrass.js:
@noble/curves/esm/_shortw_utils.js:
@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@scure/base/lib/esm/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)
*/
