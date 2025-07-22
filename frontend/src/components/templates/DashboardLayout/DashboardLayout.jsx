// src/components/templates/DashboardLayout/DashboardLayout.js
import React from 'react';
import Sidebar from '../../orgs/Sidebar/Sidebar';
import DashboardHeader from '../../orgs/DashboardHeader/DashboardHeader';
import './DashboardLayout.css'; // Create DashboardLayout.css

const DashboardLayout = ({ children, pageTitle }) => {
	return (
		<div className="dashboard-layout">
			<Sidebar />
			<div className="dashboard-main-content">
				<DashboardHeader pageTitle={pageTitle} />
				<main className="dashboard-content-area">
					{children}
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;