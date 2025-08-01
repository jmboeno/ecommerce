import js from '@eslint/js';
import globals from 'globals';
import eslintPluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
	{ ignores: ['dist'] },
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		plugins: {
			react: eslintPluginReact,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...js.configs.recommended.rules,
			...eslintPluginReact.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'no-unused-vars': 'off',
			'react-refresh/only-export-components': 'off',
			// Ajuste a regra 'indent' para aceitar a indentação do 'case'
			'indent': ['error', 'tab', { 'SwitchCase': 1 }], // <--- Adicionada a opção 'SwitchCase'
			'react/jsx-indent': ['error', 'tab'],
			'react/jsx-indent-props': ['error', 'tab'],
			"react/prop-types": "off",
		},
	},
];