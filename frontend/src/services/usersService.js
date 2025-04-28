import apiService from "./apiService";

export const getUsers = async() => {
	const response = await apiService.get("/users");

	return response.data;
}