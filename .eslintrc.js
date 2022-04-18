module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "linebreak-style": 0,
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    quotes: [2, "double", { avoidEscape: true }],
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": [1, { custom: "ignore" }],
    "react/display-name": 0,
    "newline-before-return": "error",
    "import/order": [
      "error",
      {
        groups: ["external", "internal"],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
      },
    ],
    "object-curly-newline": ["error", {
      ObjectExpression: { multiline: true, minProperties: 4 },
      ObjectPattern: { multiline: true, minProperties: 4 },
      ImportDeclaration: { multiline: true, minProperties: 4 },
      ExportDeclaration: { multiline: true, minProperties: 4 },
    }],
    "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["state"] }],
  },
  settings: { react: { version: "detect" } },
  overrides: [{ files: ["*.jsx", "*.js"] }],
};
