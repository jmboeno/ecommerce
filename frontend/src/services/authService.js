import apiService from "./apiService";
import { jwtDecode } from "jwt-decode";

export const checkAuth = () => {
	const token = localStorage.getItem("token");

	if (!token) {
		return false;
	}

	const { exp } = jwtDecode(token);
	const isExpired = Date.now() > (exp * 1000);

	if (isExpired) {
		localStorage.removeItem("token");
	}

	return isExpired;
};

export const login = async(email, password) => {
	const response = await apiService.post("/login", {
		email,
		password,
	});

	return response.data;
}

export const logout = () => {
	localStorage.removeItem("token");
	window.location.href = "/";
};