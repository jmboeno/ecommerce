import apiService from "./apiService";

export const getPayments = async() => {
	const response = await apiService.get("/payments");

	return response.data;
}