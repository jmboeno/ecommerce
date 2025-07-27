// src/routes/index.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import LoginPage from '../components/pages/LoginPage/LoginPage.jsx';
import RegisterPage from '../components/pages/RegisterPage/RegisterPage';
import DashboardPage from '../components/pages/DashboardPage/DashboardPage'; // We'll create this next
import ActivationPage from '../components/pages/ActivationPage/ActivationPage';

// A simple PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
	const { isAuthenticated } = useContext(AuthContext);

	return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
	const { isAuthenticated, isAuthCheckDone } = useContext(AuthContext); // Obter o estado de autenticação

	return (
		<Routes>
			<Route
				path="/login"
				element={
					// Se a verificação de autenticação estiver concluída E o usuário estiver autenticado,
					// redirecionar para o dashboard. Caso contrário, mostrar a página de login.
					isAuthCheckDone && isAuthenticated ? (
						<Navigate to="/dashboard/overview" replace />
					) : (
						<LoginPage />
					)
				}
			/>
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/auth/activate/:token" element={<ActivationPage />} />
			<Route
				path="/dashboard/*" // Use /* for nested routes in the dashboard
				element={
					<PrivateRoute>
						<DashboardPage />
					</PrivateRoute>
				}
			/>
			{/* Redirecionamento padrão: se não houver rota específica e o usuário estiver autenticado,
				vá para o dashboard. Caso contrário, vá para o login. */}
			<Route
				path="/"
				element={
					isAuthCheckDone && isAuthenticated ? (
						<Navigate to="/dashboard/overview" replace />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			{/* Catch-all para rotas indefinidas: mesma lógica do redirecionamento padrão */}
			<Route
				path="*"
				element={
					isAuthCheckDone && isAuthenticated ? (
						<Navigate to="/dashboard/overview" replace />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
		</Routes>
	);
};

export default AppRoutes;
