// src/components/orgs/Sidebar/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import './Sidebar.css'; // Create Sidebar.css

const sidebarItems = [
	{ name: 'Overview', icon: 'home', path: '/dashboard/overview' },
	{ name: 'Users', icon: 'users', path: '/dashboard/users' },
	{ name: 'Suppliers', icon: 'suppliers', path: '/dashboard/suppliers' },
	{ name: 'Products', icon: 'products', path: '/dashboard/products' },
	{ name: 'Sales', icon: 'sales', path: '/dashboard/sales' },
	{ name: 'Transactions', icon: 'transactions', path: '/dashboard/transactions' },
	{ name: 'Categories', icon: 'categories', path: '/dashboard/categories' },
	{ name: 'Roles', icon: 'roles', path: '/dashboard/roles' },
	{ name: 'Permissions', icon: 'permissions', path: '/dashboard/permissions' },
];

const Sidebar = () => {
	const location = useLocation();

	return (
		<aside className="sidebar">
			<div className="sidebar-header">
				<Icon name="business-management-logo" className="logo-icon" />
				<Text variant="body" className="logo-text-dashboard">Business Management</Text>
			</div>
			<nav className="sidebar-nav">
				<ul>
					{sidebarItems.map((item) => (
						<li key={item.name}>
							<Link
								to={item.path}
								className={`sidebar-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
							>
								<Icon name={item.icon} size="large" />
								<Text variant="body">{item.name}</Text>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;