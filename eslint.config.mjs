import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'plugin:import/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['simple-import-sort', '@next/eslint-plugin-next', 'check-file'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'import/named': 'off',
      'import/no-unresolved': 'off',
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{js,jsx,ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    ignorePatterns: ['node_modules', '.next', '*.md'],
  }),
];

export default eslintConfig;
