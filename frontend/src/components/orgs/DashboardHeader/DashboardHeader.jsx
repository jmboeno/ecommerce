import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Icon from "../../atoms/Icon/Icon.jsx";
import Text from "../../atoms/Text/Text.jsx";
import Button from "../../atoms/Button/Button.jsx";
import "./DashboardHeader.css";

const DashboardHeader = ({ pageTitle }) => {
	const { user, logout } = useContext(AuthContext); // Obtenha o objeto user

	const handleLogout = () => {
		logout();
	};

	return (
		<header className="dashboard-header">
			<Text variant="h3">{pageTitle}</Text>
			<div className="header-right">
				<span className="theme-toggle-icon">🌙</span> {/* Dark mode toggle */}
				<div className="user-profile">
					<div className="user-avatar">JD</div>
					<Text variant="body" className="user-name">
						{user ? `${user.name} (${user.role || 'N/A'})` : "Guest User"} {/* <--- Exibindo o nome E a role */}
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