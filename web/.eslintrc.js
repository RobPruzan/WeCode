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
  plugins: ['react', 'only-warn'],
  rules: {},
};
