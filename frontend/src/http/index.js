import axios from 'axios'
import { TokenStorage } from '../utils/TokenStorage';

const http = axios.create({
	baseURL: 'http://localhost:8000/'
})

http.interceptors.request.use(function (config) {
	const token = TokenStorage.accessToken;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config;
}, function (error) {
	return Promise.reject(error);
});

const ignoredErrorRoutes = [
	'auth/login',
	'auth/refresh'
];

const tryToRenewToken = async() => {
	const token = TokenStorage.refreshToken;
	return axios.get('http://localhost:8000/auth/refresh', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(response => {
		TokenStorage.setTokens(
			response.data.accessToken,
			response.data.refreshToken
		)
	})
}

const handleError401 = async(erro) => {
	await tryToRenewToken()
		.then(() => http(erro.config))
	return Promise.reject(erro)
}

http.interceptors.response.use(
	(response) => response,
	function (error) {
		if (!ignoredErrorRoutes.includes(error.config.url) && error.response.status === 401) {
			return handleError401(error);
		}

		return Promise.reject(error);
	}
);

export default http