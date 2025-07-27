// jmboeno/ecommerce/ecommerce-1452d409c9970bb92bc8d44e563a83479f8fa910/frontend/src/routes/index.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // <--- Adicione useLocation
import { AuthContext } from "../context/AuthContext.jsx";
import LoginPage from "../components/pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../components/pages/RegisterPage/RegisterPage.jsx";
import DashboardPage from "../components/pages/DashboardPage/DashboardPage.jsx"; // Agora é a página de Overview
import ActivationPage from "../components/pages/ActivationPage/ActivationPage.jsx";
import ProfilePage from "../components/pages/ProfilePage/ProfilePage.jsx"; // Página de Perfil

// A simple PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
	const { isAuthenticated } = useContext(AuthContext);
	return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
	const { isAuthenticated, isAuthCheckDone } = useContext(AuthContext); // Obter o estado de autenticação
	const location = useLocation(); // Obtém o objeto de localização atual

	// <--- CRUCIAL: Espera até que a verificação inicial de autenticação esteja completa.
	// Isso evita redirecionamentos prematuros enquanto o estado "isAuthenticated" está sendo determinado.
	if (!isAuthCheckDone) {
		// Você pode retornar um spinner global aqui se o App.jsx não o fizer
		// Ou GlobalLoadingIndicator já está no App.jsx cobrindo isso.
		return null;
	}

	// Função auxiliar para verificar se a rota atual é uma rota de dashboard/perfil válida
	const isDashboardOrProfileRoute = () => {
		const currentPath = location.pathname;
		return currentPath === "/dashboard" || currentPath === "/profile" || currentPath.startsWith("/dashboard/");
	};

	return (
		<Routes>
			<Route
				path="/login"
				element={
					isAuthenticated ? ( // Se já autenticado, redireciona para o local correto
						isDashboardOrProfileRoute() ? (
							<Navigate to={location.pathname} replace /> // Permanece na rota atual se for dashboard/profile
						) : (
							<Navigate to="/dashboard" replace /> // Senão, vai para o dashboard padrão
						)
					) : (
						<LoginPage /> // Não autenticado, mostra a página de login
					)
				}
			/>
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/auth/activate/:token" element={<ActivationPage />} />

			{/* Rota para o Dashboard (Overview) */}
			<Route
				path="/dashboard"
				element={
					<PrivateRoute>
						<DashboardPage /> {/* DashboardPage renderiza diretamente o conteúdo de Overview */}
					</PrivateRoute>
				}
			/>

			{/* Rota para o Perfil (Minha Conta) */}
			<Route
				path="/profile"
				element={
					<PrivateRoute>
						<ProfilePage /> {/* ProfilePage renderiza seu próprio DashboardLayout */}
					</PrivateRoute>
				}
			/>

			{/* Redirecionamento padrão da raiz (/) */}
			<Route
				path="/"
				element={
					isAuthenticated ? ( // Se autenticado, redireciona para dashboard/profile, senão para login
						isDashboardOrProfileRoute() ? (
							<Navigate to={location.pathname} replace />
						) : (
							<Navigate to="/dashboard" replace />
						)
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			{/* O catch-all (*) deve ser o último e também lidar com a permanência na rota */}
			<Route
				path="*"
				element={
					isAuthenticated ? ( // Se autenticado, redireciona para dashboard/profile, senão para login
						isDashboardOrProfileRoute() ? (
							<Navigate to={location.pathname} replace />
						) : (
							<Navigate to="/dashboard" replace />
						)
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
		</Routes>
	);
};

export default AppRoutes;