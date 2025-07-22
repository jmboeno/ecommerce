// src/services/auth.js
import axios from 'axios';

// Define the base URL for your authentication endpoints
const API_BASE_URL = 'http://localhost:8000/auth';

/**
 * Handles user login.
 * @param {object} credentials - User credentials (email, password).
 * @returns {Promise<object>} - Response data from the API.
 */
export const loginUser = async (credentials) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/login`, credentials);
		return {
			success: true,
			user: response.data.user, // Se o backend retornar informações do usuário aqui
			token: response.data.accessToken, // <--- Ajuste para accessToken
			refreshToken: response.data.refreshToken, // <--- Adicione esta linha
			message: response.data.message || 'Login successful',
		};
	} catch (error) {
		console.error('Login error:', error.response?.data || error.message);
		throw {
			success: false,
			message: error.response?.data?.message || 'Login failed. Please check your credentials.',
			statusCode: error.response?.status,
		};
	}
};

/**
 * Handles user registration.
 * @param {object} userData - User registration data (firstName, lastName, email, password, etc.).
 * @returns {Promise<object>} - Response data from the API.
 */
export const registerUser = async (userData) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/register`, userData);
		return {
			success: true,
			message: response.data.message || 'Registration successful. Please check your email for activation.',
			userId: response.data.userId, // Assuming backend returns userId
		};
	} catch (error) {
		console.error('Registration error:', error.response?.data || error.message);
		throw {
			success: false,
			message: error.response?.data?.message || 'Registration failed. Please try again.',
			statusCode: error.response?.status,
		};
	}
};

/**
 * Refreshes the user's authentication token.
 * This function will now send a GET request with the refresh token in the Authorization header.
 * @param {string} refreshTokenString - The refresh token string obtained from localStorage.
 * @returns {Promise<object>} - New access token, refresh token, and user data.
 */
export const refreshToken = async (refreshTokenString) => {
	try {
		if (!refreshTokenString) {
			throw new Error('No refresh token found to initiate refresh.');
		}

		// CORREÇÃO AQUI: Mudar para GET e enviar o token no cabeçalho Authorization
		const response = await axios.get(`${API_BASE_URL}/refresh`, { // Endpoint /auth/refresh
			headers: {
				Authorization: `Bearer ${refreshTokenString}` // Envia o refresh token como Bearer
			}
		});

		// Verifique a estrutura da resposta do seu backend para o refresh.
		// O backend deve retornar accessToken, refreshToken e user.
		if (response.data.accessToken && response.data.refreshToken) {
			return {
				success: true,
				accessToken: response.data.accessToken,
				refreshToken: response.data.refreshToken
			};
		} else {
			throw new Error("Invalid response from refresh endpoint.");
		}
	} catch (error) {
		console.error('Refresh token error:', error.response?.data || error.message);
		// Aqui não usamos toast, o AuthContext.jsx cuidará disso
		throw {
			success: false,
			message: error.response?.data?.message || 'Failed to refresh token. Please log in again.',
			statusCode: error.response?.status,
		};
	}
};

/**
 * Handles user logout.
 * @returns {Promise<object>} - Confirmation of logout.
 */
export const logoutUser = async () => {
	try {
		const token = localStorage.getItem('token');
		// Send token for server-side invalidation if necessary
		await axios.post(`${API_BASE_URL}/logout`, {}, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		// Clear tokens from local storage regardless of server response for immediate effect
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		return { success: true, message: 'Logout successful' };
	} catch (error) {
		console.error('Logout error:', error.response?.data || error.message);
		// Even if logout fails on server, clear client-side session for UX
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		throw {
			success: false,
			message: error.response?.data?.message || 'Logout failed on server, but session cleared locally.',
			statusCode: error.response?.status,
		};
	}
};

/**
 * Activates a user account using an activation ID.
 * @param {string} activationId - The activation ID received via email.
 * @returns {Promise<object>} - Response data from the API.
 */
export const activateAccount = async (activationId) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/activate/${activationId}`);
		return {
			success: true,
			message: response.data.message || 'Account activated successfully!',
		};
	} catch (error) {
		console.error('Account activation error:', error.response?.data || error.message);
		throw {
			success: false,
			message: error.response?.data?.message || 'Account activation failed. The link might be invalid or expired.',
			statusCode: error.response?.status,
		};
	}
};

/**
 * Fetches current user details or validates a session.
 * This typically sends the access token to the backend.
 * @returns {Promise<object>} - Current user data.
 */
export const fetchCurrentUser = async () => {
	try {
		const token = localStorage.getItem('token'); // Este é o access token
		if (!token) {
			return { success: false, message: 'No authentication token found.' };
		}
		const response = await axios.get(`${API_BASE_URL}/me`, { // Exemplo: seu backend deve ter um /auth/me
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return {
			success: true,
			user: response.data.user,
			message: 'User data fetched successfully',
		};
	} catch (error) {
		console.error('Fetch current user error:', error.response?.data || error.message);
		if (error.response?.status === 401 || error.response?.status === 403) {
			return { success: false, message: "Access token expirado ou inválido." };
		}
		throw {
			success: false,
			message: error.response?.data?.message || 'Failed to fetch user data or session expired.',
			statusCode: error.response?.status,
		};
	}
};