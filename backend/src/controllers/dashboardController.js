// backend/src/controllers/dashboardController.js
// Import the necessary functions from your usersService
const { getAllUsers } = require('../services/usersService');
const { Op } = require('sequelize'); // Make sure Op is available if you use it for date range

// Assuming db.Sequelize.Op is available from your models/index.js if needed for date operations
const { sequelize } = require('../models'); 

// Função para buscar dados do dashboard
async function getDashboardData(req, res) {
	try {
		// Use getAllUsers for total user count
		// For total users, you can pass an empty query to get all, or just count them directly from the model
		// If getAllUsers returns an array, you can get its length.
		// However, User.count() is more efficient for just a count.
		// For 'totalUsers', it might be simpler to stick with User.count() directly
		// unless getAllUsers has specific filtering logic you want to reuse.

		// Reusing the User model for specific counts (like isActive, usersToday)
		// because usersService might not expose these specific aggregate counts.
		// If usersService had functions like `getTotalUsersCount()`, `getActiveUsersCount()`,
		// then you would use those. For now, we'll keep the direct model counts for these.

		const totalUsers = await sequelize.models.User.count(); // Use sequelize.models.User
		const activeUsers = await sequelize.models.User.count({ where: { active: true } }); // Use sequelize.models.User
		const usersToday = await sequelize.models.User.count({
			where: {
				createdAt: {
					[Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
				}
			}
		});


		// Dados fictícios para demonstração, substitua pela sua lógica real
		const totalSales = 89247; // Obtenha isso de seus modelos de Pedidos/Vendas
		const products = 1284;	// Obtenha isso de seus modelos de Produtos
		const suppliers = 156;   // Obtenha isso de seus modelos de Fornecedores

		// Calculo de mudanças percentuais (simplificado)
		const totalUsersChange = 12;
		const totalSalesChange = 8;
		const productsChange = 3;
		const suppliersChange = -2;

		const activities = [
			{ id: 1, icon: 'add-user', text: 'New user registered', timeAgo: '2 minutes ago', iconBgColor: '#e0f7fa' },
			{ id: 2, icon: 'sales', text: 'New order received', timeAgo: '5 minutes ago', iconBgColor: '#e8f5e9' },
			{ id: 3, icon: 'products', text: 'Product updated', timeAgo: '10 minutes ago', iconBgColor: '#fffde7' },
			{ id: 4, icon: 'transactions', text: 'Payment processed', timeAgo: '1 hour ago', iconBgColor: '#f3e5f5' },
		];

		res.status(200).json({
			stats: {
				totalUsers: totalUsers,
				totalUsersChange: totalUsersChange,
				totalSales: totalSales,
				totalSalesChange: totalSalesChange,
				products: products,
				productsChange: productsChange,
				suppliers: suppliers,
				suppliersChange: suppliersChange,
			},
			activities: activities,
			message: 'Dashboard data fetched successfully'
		});

	} catch (error) {
		console.error('Erro ao buscar dados do dashboard:', error);
		res.status(500).json({ message: 'Erro interno do servidor ao buscar dados do dashboard.' });
	}
}

module.exports = {
	getDashboardData
};