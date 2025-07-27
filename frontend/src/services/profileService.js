// front/src/services/profileService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Mesma base URL do auth.js e dashboard.js

/**
 * Busca o perfil completo do usuário logado no backend.
 * @param {number} userId - ID do usuário.
 * @param {string} token - Access token JWT.
 * @returns {Promise<object>} - { success: boolean, user?: object, message?: string, statusCode?: number }
 */
export const fetchUserProfile = async (userId, token) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/profile/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return { success: true, user: response.data }; // Retorna o objeto de usuário completo
	} catch (error) {
		console.error("Error fetching user profile:", error.response?.data || error.message);
		throw {
			success: false,
			message: error.response?.data?.message || "Falha ao carregar perfil do usuário.",
			statusCode: error.response?.status,
		};
	}
};

/**
 * Atualiza o perfil do usuário logado no backend.
 * @param {number} userId - ID do usuário.
 * @param {object} userData - Dados a serem atualizados (name, email, phone, password, etc.).
 * @param {string} token - Access token JWT.
 * @returns {Promise<object>} - { success: boolean, message?: string, statusCode?: number }
 */
export const updateUserProfile = async (userId, userData, token) => {
	try {
		const response = await axios.patch(`${API_BASE_URL}/profile/${userId}`, userData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return { success: true, message: response.data.message || "Perfil atualizado com sucesso!" };
	} catch (error) {
		console.error("Error updating user profile:", error.response?.data || error.message);
		throw {
			success: false,
			message: error.response?.data?.message || "Falha ao atualizar perfil.",
			statusCode: error.response?.status,
		};
	}
};

/**
 * Atualiza a senha do usuário logado.
 * @param {number} userId - ID do usuário.
 * @param {object} passwordData - { currentPassword, newPassword, confirmNewPassword }.
 * @param {string} token - Access token JWT.
 * @returns {Promise<object>} - Mensagem de sucesso/falha.
 */
export const changeUserPassword = async (userId, passwordData, token) => {
	try {
		// Endpoint POST ou PATCH para alterar senha. Exemplo: /profile/change-password
		const response = await axios.post(`${API_BASE_URL}/profile/change-password`, passwordData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return { success: true, message: response.data.message || "Senha alterada com sucesso!" };
	} catch (error) {
		console.error("Error changing user password:", error.response?.data || error.message);
		throw {
			success: false,
			message: error.response?.data?.message || "Falha ao alterar senha.",
			statusCode: error.response?.status,
		};
	}
};