// src/components/orgs/LoginForm/LoginForm.js
import React, { useState } from 'react';
import FormField from '../../mols/FormField/FormField';
import Button from '../../atoms/Button/Button';
import CheckboxWithLabel from '../../mols/CheckboxWithLabel/CheckboxWithLabel';
import Text from '../../atoms/Text/Text';
import './LoginForm.css'; // Create LoginForm.css

const LoginForm = ({ onSubmit, isLoading }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ email, password, rememberMe });
	};

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<FormField
				label="Email Address"
				type="email"
				placeholder="Enter your email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				iconName="mail"
				id="login-email"
				required
			/>
			<FormField
				label="Password"
				type={showPassword ? 'text' : 'password'}
				placeholder="Enter your password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				iconName={showPassword ? 'eye-slash' : 'eye'}
				iconClickable={true}
				onIconClick={() => setShowPassword(!showPassword)}
				id="login-password"
				required
			/>
			<div className="login-options">
				<CheckboxWithLabel
					id="remember-me"
					label="Remember me"
					checked={rememberMe}
					onChange={() => setRememberMe(!rememberMe)}
				/>
				<Text variant="small" className="forgot-password-link">
					<a href="/forgot-password">Forgot password?</a>
				</Text>
			</div>
			<Button type="submit" variant="primary" className="login-button" disabled={isLoading}>
				{isLoading ? 'Signing In...' : 'Sign In'}
			</Button>
			<Text variant="small" className="signup-link">
				Don't have an account? <a href="/register">Create one</a>
			</Text>
		</form>
	);
};

export default LoginForm;