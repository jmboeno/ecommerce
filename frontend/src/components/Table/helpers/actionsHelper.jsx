import { toast } from "react-toastify";
import http from "../../../http";

export const fetchData = ({ actions, limit, currentPage, search, onSuccess, onCancel }) => {
	const { route, order, method } = actions.READ;
	const [sortField, sortOrder] = order ? Object.entries(order)[0] : [];

	const queryString = [
		`limit=${limit}`,
		`offset=${(currentPage - 1) * limit}`,
		search.trim() ? `search=${encodeURIComponent(search)}` : null,
		sortField ? `orderBy=${sortField}` : null,
		sortOrder ? `orderDirection=${sortOrder}` : null
	].filter(Boolean).join("&");

	if (method === "GET") {
		return http.get(`${route}?${queryString}`)
			.then(response => onSuccess?.(response))
			.catch(error => onCancel?.(error));
	} else {
		throw new Error(`Método HTTP não suportado: ${method}`);
	}
}

export const createData = ({ formData, actions, onSuccess, onCancel }) => {
	const { route, method } = actions.CREATE;

	if (method === "POST") {
		return http.post(route, formData)
			.then(response => onSuccess?.(response))
			.catch(error => onCancel?.(error));
	} else {
		throw new Error(`Método HTTP não suportado: ${method}`);
	}
};

export const updateData = ({ formData, id, actions, onSuccess, onCancel }) => {
	const { route, method } = actions.UPDATE;

	if (method === "PATCH") {
		return http.patch(`${route}/${id}`, formData)
			.then(response => onSuccess?.(response))
			.catch(error => onCancel?.(error));
	} else {
		throw new Error(`Método HTTP não suportado: ${method}`);
	}
};

export const deleteData = async ({ selectedItems, actions, onSuccess, onCancel }) => {
	const { route, method } = actions.DELETE;

	if (method !== "DELETE") {
		throw new Error(`Método HTTP não suportado: ${method}`);
	}

	const results = [];
	try {
		for (const id of selectedItems) {
			const res = await http.delete(`${route}/${id}`);
			results.push(res);
		}
		onSuccess?.(results);
	} catch (error) {
		onCancel?.(error);
	}
};
