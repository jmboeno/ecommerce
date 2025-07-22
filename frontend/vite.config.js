// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react({
			// This line explicitly tells Vite to process both .js and .jsx files as JSX
			include: '**/*.{js,jsx}',
		}),
	],
});