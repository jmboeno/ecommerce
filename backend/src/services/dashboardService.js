// backend/src/services/dashboardService.js
// Importe todos os modelos necessários para buscar dados
const { User, Order, Product, OrderItem, Transaction, sequelize } = require("../models");
const { Op } = require('sequelize');

/**
 * Busca dados de dashboard específicos para um administrador.
 * @returns {Promise<object>} Dados do dashboard do administrador.
 */
async function getAdminDashboardData() {
	try {
		const totalUsers = await User.count();
		const activeUsers = await User.count({ where: { active: true } });
		const usersToday = await User.count({
			where: { createdAt: { [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)) } }
		});

		const totalSales = await Order.sum('amount', { where: { status: 'paid' } });
		const totalProducts = await Product.count();
		const totalSuppliers = await sequelize.models.Supplier.count();

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

		return {
			stats: {
				totalUsers, totalUsersChange,
				totalSales: totalSales || 0, totalSalesChange,
				products: totalProducts, productsChange,
				suppliers: totalSuppliers, suppliersChange
			},
			activities: activities,
		};
	} catch (error) {
		console.error("Erro em getAdminDashboardData:", error);
		throw new Error("Falha ao buscar dados do dashboard de administrador.");
	}
}

/**
 * Busca dados de dashboard específicos para um cliente.
 * Retorna apenas as atividades recentes.
 * @param {number} userId - O ID do usuário cliente logado.
 * @returns {Promise<object>} Dados do dashboard do cliente (apenas atividades).
 */
async function getClientDashboardData(userId) {
	try {
		const recentOrders = await Order.findAll({
			where: { user_id: userId },
			limit: 5,
			order: [['order_date', 'DESC']],
			include: [
				{
					model: OrderItem,
					as: 'items',
					attributes: ['quantity', 'price'],
					include: [{ model: Product, as: 'product', attributes: ['name'] }]
				}
			],
			attributes: ['id', 'order_date', 'amount', 'status']
		});

		const clientActivities = recentOrders.map(order => ({
			id: order.id,
			icon: order.status === 'paid' ? 'sales' : 'clock', // Ícone baseado no status
			text: `Seu pedido #${order.id} (${order.status}): R$${order.amount.toFixed(2)}`,
			timeAgo: `${Math.round((new Date() - new Date(order.order_date)) / (1000 * 60 * 60 * 24))} dias atrás`, // Cálculo simples
			iconBgColor: order.status === 'paid' ? '#e8f5e9' : '#f0f0f0'
		}));

		return {
			activities: clientActivities,
		};
	} catch (error) {
		console.error("Erro em getClientDashboardData:", error);
		throw new Error("Falha ao buscar dados do dashboard do cliente.");
	}
}

module.exports = {
	getAdminDashboardData,
	getClientDashboardData
};