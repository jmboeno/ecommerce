import React from 'react';
import StatsCard from '../../mols/StatsCard/StatsCard';
import './DashboardStats.css';

const DashboardStats = ({ stats }) => {
	const currentStats = stats ?? {};

	return (
		<div className="dashboard-stats-grid">
			<StatsCard
				title="Total Users"
				value={(currentStats.totalUsers ?? 0).toLocaleString()}
				percentageChange={currentStats.totalUsersChange ?? 0}
				iconName="users"
				iconBgColor="#8c52ff"
			/>
			<StatsCard
				title="Total Sales"
				value={`$${(currentStats.totalSales ?? 0).toLocaleString()}`}
				percentageChange={currentStats.totalSalesChange ?? 0}
				iconName="sales"
				iconBgColor="#4CAF50"
			/>
			<StatsCard
				title="Products"
				value={(currentStats.products ?? 0).toLocaleString()}
				percentageChange={currentStats.productsChange ?? 0}
				iconName="products"
				iconBgColor="#ffc107"
			/>
			<StatsCard
				title="Suppliers"
				value={(currentStats.suppliers ?? 0).toLocaleString()}
				percentageChange={currentStats.suppliersChange ?? 0}
				iconName="suppliers"
				iconBgColor="#ef5350"
			/>
		</div>
	);
};

export default DashboardStats;