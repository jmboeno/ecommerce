// src/routes/index.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import LoginPage from '../components/pages/LoginPage/LoginPage.jsx';
import RegisterPage from '../components/pages/RegisterPage/RegisterPage.jsx';
import DashboardPage from '../components/pages/DashboardPage/DashboardPage.jsx'; // We'll create this next

// A simple PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
	const { isAuthenticated, isAuthCheckDone } = useContext(AuthContext);

	if (!isAuthCheckDone) {
		return null; // ou um loading spinner
	}

	return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route
				path="/dashboard/*" // Use /* for nested routes in the dashboard
				element={
					<PrivateRoute>
						<DashboardPage />
					</PrivateRoute>
				}
			/>
			<Route path="/" element={<Navigate to="/login" replace />} /> {/* Default redirect */}
			<Route path="*" element={<Navigate to="/login" replace />} /> {/* Catch-all for undefined routes */}
		</Routes>
	);
};

export default AppRoutes;