// src/components/orgs/AuthForm/AuthForm.js
import React from 'react';
import Text from '../../atoms/Text/Text';
import Icon from '../../atoms/Icon/Icon';
import './AuthForm.css'; // Create AuthForm.css

const AuthForm = ({ title, description, children }) => {
	return (
		<div className="auth-container">
			<div className="auth-sidebar">
				<div className="sidebar-header">
					<Icon name="business-management-logo" className="logo-icon" /> {/* Placeholder icon */}
					<Text variant="h3" className="logo-text">Business Management</Text>
				</div>
				<Text variant="h2" className="sidebar-title">Business Management</Text>
				<Text variant="body" className="sidebar-description">
					Join thousands of businesses streamlining their operations
				</Text>
				<ul className="feature-list">
					<li><Icon name="check" size="small" /> <Text variant="body">Complete User Management</Text></li>
					<li><Icon name="check" size="small" /> <Text variant="body">Supplier & Product Control</Text></li>
					<li><Icon name="check" size="small" /> <Text variant="body">Sales & Transaction Analytics</Text></li>
					<li><Icon name="check" size="small" /> <Text variant="body">Secure & Scalable</Text></li>
				</ul>
			</div>
			<div className="auth-content">
				<div className="auth-header">
					<span className="theme-toggle-icon">🌙</span> {/* Placeholder for dark mode toggle */}
				</div>
				<div className="auth-form-wrapper">
					<Text variant="h2" className="form-title">{title}</Text>
					<Text variant="body" className="form-description">{description}</Text>
					{children}
				</div>
			</div>
		</div>
	);
};

export default AuthForm;