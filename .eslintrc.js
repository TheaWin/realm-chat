module.exports = {
  parser: '@babel/eslint-parser',
  plugins:[
    'react'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'no-unused-vars': ['warn'],
    'function-paren-newline': ['error', 'multiline'],
    'array-bracket-newline': ['error', 'consistent'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'prefer-arrow-callback': ['error'],
    'react/jsx-quotes': ['error', 'prefer-single'],
    'react-native/inline-style': 'off',
  },
};
  