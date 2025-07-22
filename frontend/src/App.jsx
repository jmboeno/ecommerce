// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import AppRoutes from './routes';
import GlobalLoadingIndicator from './components/atoms/GlobalLoadingIndicator/GlobalLoadingIndicator';

// Importar os componentes e estilos do react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Estilos padrão do Toastify

function App() {
	return (
		<Router>
			<LoadingProvider>
				<AuthProvider>
					<GlobalLoadingIndicator /> {/* Global loading spinner */}
					<AppRoutes />
					{/* Adicionar o ToastContainer aqui, geralmente no topo ou no final do App */}
					<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
				</AuthProvider>
			</LoadingProvider>
		</Router>
	);
}

export default App;