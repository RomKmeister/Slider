module.exports =  {
  env: {
    "browser": true,
    "node": true,
    "mocha": true,
    "jquery": true,
    },
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'airbnb/base',
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions:  {
    ecmaVersion:  6,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  rules:  {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
    'linebreak-style': ["error", "windows"],
    'max-len': ["error", { "code": 120 }],
    "@typescript-eslint/no-explicit-any": 0,
    "class-methods-use-this": ["error", { "exceptMethods": ["toggleElement"] }],
    "no-var-requires": 0
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.ts']
      }
    }
  }
};