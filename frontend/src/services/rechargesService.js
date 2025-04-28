import apiService from "./apiService";

export const getRecharges = async() => {
	const response = await apiService.get("/recharges");

	return response.data;
}