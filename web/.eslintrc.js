module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [],
  overrides: [],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'only-warn', 'simple-import-sort'],
  rules: {
    'sort-imports': 'warn',
    'import/order': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    'simple-import-sort/imports': 'warn',
  },
};
