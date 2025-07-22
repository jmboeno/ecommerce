// src/components/orgs/DashboardStats/DashboardStats.jsx
import React from 'react';
import StatsCard from '../../mols/StatsCard/StatsCard'; // Adjusted path to mols
import './DashboardStats.css'; // Create DashboardStats.css

const DashboardStats = ({ stats }) => {
	// Adicione verificações defensivas para 'stats' e suas propriedades
	// Use o encadeamento opcional (?.) e o operador de coalescência nula (??)
	const currentStats = stats ?? {}; // Garante que 'stats' é pelo menos um objeto vazio

	return (
		<div className="dashboard-stats-grid">
			<StatsCard
				title="Total Users"
				value={(currentStats.totalUsers ?? 0).toLocaleString()} // Fornece 0 como padrão
				percentageChange={currentStats.totalUsersChange ?? 0}
				iconName="users"
				iconBgColor="#8c52ff" /* Purple-ish */
			/>
			<StatsCard
				title="Total Sales"
				value={`$${(currentStats.totalSales ?? 0).toLocaleString()}`} // Fornece 0 como padrão
				percentageChange={currentStats.totalSalesChange ?? 0}
				iconName="sales"
				iconBgColor="#4CAF50" /* Green */
			/>
			<StatsCard
				title="Products"
				value={(currentStats.products ?? 0).toLocaleString()} // Fornece 0 como padrão
				percentageChange={currentStats.productsChange ?? 0}
				iconName="products"
				iconBgColor="#ffc107" /* Amber */
			/>
			<StatsCard
				title="Suppliers"
				value={(currentStats.suppliers ?? 0).toLocaleString()} // Fornece 0 como padrão
				percentageChange={currentStats.suppliersChange ?? 0}
				iconName="suppliers"
				iconBgColor="#ef5350" /* Red */
			/>
		</div>
	);
};

export default DashboardStats;