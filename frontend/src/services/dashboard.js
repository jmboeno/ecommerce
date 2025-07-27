// jmboeno/ecommerce/ecommerce-1452d409c9970bb92bc8d44e563a83479f8fa910/frontend/src/services/dashboard.js
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the base URL for your authentication endpoints
const API_BASE_URL = 'http://localhost:8000';

/**
 * Fetches dashboard statistics and recent activities.
 * @returns {Promise<object>} - Dashboard data (stats, activities).
 */
export const fetchDashboardData = async () => {
	try {
		const token = localStorage.getItem('token'); // Get access token for authenticated requests
		if (!token) {
			throw new Error('No authentication token found. Please log in.');
		}

		const response = await axios.get(`${API_BASE_URL}/dashboard`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		console.log("Resposta completa da API:", response); // Log completo da resposta do axios
		console.log("Dados da resposta (response.data):", response.data); // Log da propriedade 'data'
		// console.log("Stats da resposta (response.data.stats):", response.data.stats); // Este log pode falhar para clientes

		// Estrutura a resposta para corresponder ao que DashboardPage espera
		// Use encadeamento opcional para acessar stats, e forneça um objeto vazio se stats não existir
		const statsData = response.data.stats || {}; // <--- CORREÇÃO AQUI: Garante que statsData nunca é undefined

		return {
			stats: {
				totalUsers: statsData.totalUsers || 0,
				totalUsersChange: statsData.totalUsersChange || 0,
				totalSales: statsData.totalSales || 0,
				totalSalesChange: statsData.totalSalesChange || 0,
				products: statsData.products || 0,
				productsChange: statsData.productsChange || 0,
				suppliers: statsData.suppliers || 0,
				suppliersChange: statsData.suppliersChange || 0,
			},
			activities: response.data.activities || [],
		};
	} catch (error) {
		console.error('Error fetching dashboard data:', error.response?.data || error.message);
		toast.error(error.response?.data?.message || 'Failed to load dashboard data.');

		throw {
			success: false,
			message: error.response?.data?.message || 'Failed to fetch dashboard data.',
			statusCode: error.response?.status,
		};
	}
};