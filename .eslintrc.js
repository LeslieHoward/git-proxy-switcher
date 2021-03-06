module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    STORAGE_KEY_TOKEN: true,
    STORAGE_KEY_USERINFO: true,
    STORAGE_KEY_PERMISSION: true,
    IS_AUTHORITY: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-empty-pattern': 'off',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
