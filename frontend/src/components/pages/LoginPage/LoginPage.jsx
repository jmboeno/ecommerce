// src/components/pages/LoginPage/LoginPage.js
import React, { useState, useContext } from 'react';
import AuthLayout from '../../templates/AuthLayout/AuthLayout';
import LoginForm from '../../orgs/LoginForm/LoginForm';
import { AuthContext } from '../../../context/AuthContext.jsx'; // We'll create this next
import { LoadingContext } from '../../../context/LoadingContext'; // We'll create this next
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const { login } = useContext(AuthContext);
	const { startLoading, stopLoading, isLoading } = useContext(LoadingContext);
	const navigate = useNavigate();

	const handleLogin = async (credentials) => {
		startLoading();
		try {
			await login(credentials);
			navigate('/dashboard');
		} catch (error) {
			console.error('Login failed:', error);
		} finally {
			stopLoading();
		}
	};

	return (
		<AuthLayout
			title="Welcome Back"
			description="Sign in to access your dashboard"
		>
			<LoginForm onSubmit={handleLogin} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default LoginPage;