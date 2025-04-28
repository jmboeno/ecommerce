import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './routes/Home';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import { createRoot } from 'react-dom/client';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	li {
		list-style: none;
	}
`;

createRoot(document.getElementById('root')).render(
	<React.Fragment>
		<GlobalStyle />
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	</React.Fragment>,
)
