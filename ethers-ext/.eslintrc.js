module.exports = {
  root: true,

  // rule presets and plugins
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    es2022: true,
    browser: false,
    node: true,
    mocha: true,
  },

  // custom rules
  // see https://eslint.org/docs/latest/rules
  rules: {
    // logic
    "prefer-const": "warn",
    "no-promise-executor-return": "warn",
    "consistent-return": "warn",
    "no-unneeded-ternary": "warn",
    yoda: "warn",

    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",

    // imports
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        pathGroups: [
          { pattern: "@klaytn/**", group: "parent", position: "after" },
        ],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["@klaytn/**"],
      },
    ],
    "import/no-unresolved": [
      "error", // eslint-plugin-import cannot resolve subpaths https://github.com/firebase/firebase-admin-node/discussions/1359
      { ignore: ["^@klaytn/js-ext-core/util$"] },
    ],

    // formatting
    curly: ["warn", "all"],
    "brace-style": ["warn", "1tbs", { allowSingleLine: true }],
    semi: "warn",
    "no-extra-semi": "warn",
    quotes: ["warn", "double", { avoidEscape: true }],
    "comma-dangle": ["warn", "only-multiline"],
    "arrow-parens": "warn",
    "wrap-iife": "warn",

    // formatting about spaces
    "max-len": ["off", 120],
    indent: ["warn", 2],
    "linebreak-style": ["warn", "unix"],

    "no-trailing-spaces": "warn",
    "no-multiple-empty-lines": "warn",
    "no-multi-spaces": "warn",
    "padded-blocks": ["warn", "never", { allowSingleLineBlocks: true }],
    "lines-between-class-members": [
      "warn",
      "always",
      { exceptAfterSingleLine: true },
    ],

    "space-before-blocks": ["warn", "always"],
    "space-before-function-paren": [
      "warn",
      { named: "never", anonymous: "always", asyncArrow: "always" },
    ],
    "space-in-parens": ["warn", "never"],
    "space-infix-ops": "warn",
    "spaced-comment": "warn",
    "no-whitespace-before-property": "warn",

    "array-bracket-spacing": "warn",
    "arrow-spacing": "warn",
    "block-spacing": "warn",
    "comma-spacing": "warn",
    "key-spacing": ["warn", { mode: "minimum" }],
    "keyword-spacing": "warn",
    "semi-spacing": "warn",
  },
  overrides: [
    {
      // examples and tests use relaxed rules
      files: ["example/**/*", "test/**/*"],
      rules: {
        // examples may use require() because they are JS
        "@typescript-eslint/no-var-requires": "off",
        // give some flexibility adding and deleting variables
        "@typescript-eslint/no-unused-vars": "off",
        "prefer-const": "off",
      },
    },
    {
      // browser examples use browser globals
      files: ["example/**/browser-html/*"],
      rules: {
        "no-undef": "off",
        "no-unused-vars": "off",
        "no-constant-condition": "off",
      },
    },
  ],
  ignorePatterns: [
    "example/**/browser-html/ethers-ext.bundle.js",
    "example/**/browser-html/ethers-ext.v6.bundle.js",
    "example/**/browser-react",
  ],
};
