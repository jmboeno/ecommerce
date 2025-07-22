// front/src/services/dashboard.js
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

		const response = await axios.get(`${API_BASE_URL}/dashboard/data`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		console.log("Resposta completa da API:", response); // Log completo da resposta do axios
		console.log("Dados da resposta (response.data):", response.data); // Log da propriedade 'data'
		console.log("Stats da resposta (response.data.stats):", response.data.stats); // Log da propriedade 'stats'

		// Estrutura a resposta para corresponder ao que DashboardPage espera
		return {
			stats: {
				// Acesse as propriedades de stats através de 'response.data.stats'
				totalUsers: response.data.stats.totalUsers || 0, // <--- CORREÇÃO AQUI
				totalUsersChange: response.data.stats.totalUsersChange || 0, // <--- CORREÇÃO AQUI
				totalSales: response.data.stats.totalSales || 0, // <--- CORREÇÃO AQUI
				totalSalesChange: response.data.stats.totalSalesChange || 0, // <--- CORREÇÃO AQUI
				products: response.data.stats.products || 0, // <--- CORREÇÃO AQUI
				productsChange: response.data.stats.productsChange || 0, // <--- CORREÇÃO AQUI
				suppliers: response.data.stats.suppliers || 0, // <--- CORREÇÃO AQUI
				suppliersChange: response.data.stats.suppliersChange || 0, // <--- CORREÇÃO AQUI
			},
			// Activities já está correto, pois é uma propriedade direta de response.data
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