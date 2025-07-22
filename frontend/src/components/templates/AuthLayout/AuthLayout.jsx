// src/components/templates/AuthLayout/AuthLayout.js
import React from 'react';
import AuthForm from '../../orgs/AuthForm/AuthForm';

const AuthLayout = ({ title, description, children }) => {
	return (
		<AuthForm title={title} description={description}>
			{children}
		</AuthForm>
	);
};

export default AuthLayout;