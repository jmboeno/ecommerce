// src/components/orgs/DashboardHeader/DashboardHeader.js
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext.jsx';
import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import Button from '../../atoms/Button/Button';
import './DashboardHeader.css'; // Create DashboardHeader.css

const DashboardHeader = ({ pageTitle }) => {
	const { user, logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
	};

	return (
		<header className="dashboard-header">
			<Text variant="h3">{pageTitle}</Text>
			<div className="header-right">
				<span className="theme-toggle-icon">🌙</span> {/* Dark mode toggle */}
				<div className="user-profile">
					<div className="user-avatar">JD</div> {/* Simple avatar, could be image */}
					<Text variant="body" className="user-name">
						{user ? `${user.name}` : 'Guest User'}
					</Text>
					<Button onClick={handleLogout} variant="secondary" className="logout-button">
						Logout
					</Button>
				</div>
			</div>
		</header>
	);
};

export default DashboardHeader;