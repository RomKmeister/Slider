module.exports = {
  env: {
    'browser': true,
    'node': true,
    'mocha': true,
    'jquery': true,
    },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb/base',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'max-len': ['error', { 'code': 125 }],
    '@typescript-eslint/no-explicit-any': 0,
    'class-methods-use-this': 0,
    'no-new': 0,
    'import/extensions': 0
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.ts']
      }
    }
  }
};