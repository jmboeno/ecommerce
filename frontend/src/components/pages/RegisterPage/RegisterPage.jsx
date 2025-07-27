// src/components/pages/RegisterPage/RegisterPage.js
import React, { useState, useContext } from 'react';
import AuthLayout from '../../templates/AuthLayout/AuthLayout';
import RegistrationForm from '../../orgs/RegistrationForm/RegistrationForm';
import { AuthContext } from '../../../context/AuthContext';
import { LoadingContext } from '../../../context/LoadingContext';

const RegisterPage = () => {
	const { register } = useContext(AuthContext);
	const { startLoading, stopLoading, isLoading } = useContext(LoadingContext);

	const handleRegister = async (userData) => {
		startLoading();
		try {
			await register(userData);
		} catch (error) {
			console.error('Registration failed:', error);
		} finally {
			stopLoading();
		}
	};

	return (
		<AuthLayout
			title="Create Your Account"
			description="Start managing your business efficiently"
		>
			<RegistrationForm onSubmit={handleRegister} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default RegisterPage;