// jmboeno/ecommerce/ecommerce-1452d409c9970bb92bc8d44e563a83479f8fa910/backend/src/controllers/dashboardController.js
// Importe as novas funções do serviço de dashboard
const { getAdminDashboardData, getClientDashboardData } = require('../services/dashboardService');

async function getDashboardData(req, res) {
	try {
        const userRole = req.user_role; // Obtém a role do usuário do req (definido pelo middleware)
        const userId = req.user_id; // Obtém o ID do usuário

        let dashboardData;

        if (userRole === "Administrador") {
            dashboardData = await getAdminDashboardData();
        } else if (userRole === "Cliente") {
            dashboardData = await getClientDashboardData(userId); // Passa o ID do cliente
        } else {
            // Role não reconhecida ou sem permissão para dashboard
            return res.status(403).json({ message: "Sua role não tem acesso ao dashboard." });
        }

		res.status(200).json({
			stats: dashboardData.stats,
			activities: dashboardData.activities,
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