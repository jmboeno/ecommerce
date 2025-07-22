// src/components/orgs/RegistrationForm/RegistrationForm.js
import React, { useState } from 'react';
import FormField from '../../mols/FormField/FormField';
import Button from '../../atoms/Button/Button';
import CheckboxWithLabel from '../../mols/CheckboxWithLabel/CheckboxWithLabel';
import Text from '../../atoms/Text/Text';
import Icon from '../../atoms/Icon/Icon';
import './RegistrationForm.css'; // Create RegistrationForm.css

const RegistrationForm = ({ onSubmit, isLoading }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [agreeTerms, setAgreeTerms] = useState(false);
	const [receiveUpdates, setReceiveUpdates] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Simple validation state
	const [errors, setErrors] = useState({});

	const validate = () => {
		let newErrors = {};
		if (!firstName) newErrors.firstName = 'First Name is required';
		if (!lastName) newErrors.lastName = 'Last Name is required';
		if (!email) {
			newErrors.email = 'Email Address is required';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Email address is invalid';
		}
		if (!password) {
			newErrors.password = 'Password is required';
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}
		if (!confirmPassword) {
			newErrors.confirmPassword = 'Confirm Password is required';
		} else if (password !== confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}
		if (!agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and privacy policy';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			onSubmit({
				firstName,
				lastName,
				companyName,
				email,
				password,
				agreeTerms,
				receiveUpdates,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="registration-form">
			<div className="name-fields">
				<FormField
					label="First Name"
					type="text"
					placeholder="First name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					iconName="user"
					id="reg-first-name"
					error={errors.firstName}
					required
				/>
				<FormField
					label="Last Name"
					type="text"
					placeholder="Last name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					iconName="user"
					id="reg-last-name"
					error={errors.lastName}
					required
				/>
			</div>
			<FormField
				label="Company Name"
				type="text"
				placeholder="Your company name (optional)"
				value={companyName}
				onChange={(e) => setCompanyName(e.target.value)}
				iconName="company"
				id="reg-company-name"
			/>
			<FormField
				label="Email Address"
				type="email"
				placeholder="Enter your email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				iconName="mail"
				id="reg-email"
				error={errors.email}
				required
			/>
			<FormField
				label="Password"
				type={showPassword ? 'text' : 'password'}
				placeholder="Create a strong password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				iconName={showPassword ? 'eye-slash' : 'eye'}
				iconClickable={true}
				onIconClick={() => setShowPassword(!showPassword)}
				id="reg-password"
				error={errors.password}
				required
			/>
			<FormField
				label="Confirm Password"
				type={showConfirmPassword ? 'text' : 'password'}
				placeholder="Confirm your password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				iconName={showConfirmPassword ? 'eye-slash' : 'eye'}
				iconClickable={true}
				onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
				id="reg-confirm-password"
				error={errors.confirmPassword}
				required
			/>
			<CheckboxWithLabel
				id="agree-terms"
				label={
					<>
						I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
					</>
				}
				checked={agreeTerms}
				onChange={() => {
					setAgreeTerms(!agreeTerms);
					if (errors.agreeTerms) { // Clear error if checked
						setErrors(prev => ({ ...prev, agreeTerms: undefined }));
					}
				}}
			/>
			{errors.agreeTerms && <Text variant="small" className="error-message">{errors.agreeTerms}</Text>}

			<CheckboxWithLabel
				id="receive-updates"
				label="I want to receive updates about new features and improvements"
				checked={receiveUpdates}
				onChange={() => setReceiveUpdates(!receiveUpdates)}
			/>

			<Button type="submit" variant="primary" className="register-button" disabled={isLoading}>
				{isLoading ? 'Creating Account...' : <><Icon name="user" /> Create Account</>}
			</Button>
			<Text variant="small" className="login-link">
				Already have an account? <a href="/login">Sign In</a>
			</Text>
		</form>
	);
};

export default RegistrationForm;