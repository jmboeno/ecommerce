// src/components/orgs/QuickActions/QuickActions.js
import React from 'react';
import Text from '../../atoms/Text/Text';
import QuickActionButton from '../../mols/QuickActionButton/QuickActionButton';
import './QuickActions.css'; // Create QuickActions.css

const QuickActions = () => {
	const handleAddUser = () => alert('Add User clicked!');
	const handleAddProduct = () => alert('Add Product clicked!');
	const handleViewReports = () => alert('View Reports clicked!');
	const handleSettings = () => alert('Settings clicked!');

	return (
		<div className="quick-actions-card">
			<Text variant="h4">Quick Actions</Text>
			<div className="action-buttons-grid">
				<QuickActionButton iconName="add-user" label="Add User" onClick={handleAddUser} bgColor="rgb(238, 238, 255)" />
				<QuickActionButton iconName="add-product" label="Add Product" onClick={handleAddProduct} bgColor="rgb(235, 255, 235)" />
				<QuickActionButton iconName="reports" label="View Reports" onClick={handleViewReports} bgColor="rgb(230, 245, 255)" />
				<QuickActionButton iconName="settings" label="Settings" onClick={handleSettings} bgColor="rgb(255, 250, 230)" />
			</div>
		</div>
	);
};

export default QuickActions;