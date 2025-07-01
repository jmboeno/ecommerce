import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import http from '../../http';
import { toast } from 'react-toastify';

export const ZoomContainer = styled.div`
	font-family: Arial, sans-serif;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	max-width: 600px;
	margin: 20px auto;
	box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const ZoomLabel = styled.label`
	display: block;
	margin-bottom: 8px;
	font-weight: bold;
	color: #333;
`;

export const ZoomSelect = styled.select`
	width: 100%;
	padding: 10px;
	margin-bottom: 15px;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 16px;
	background-color: #fff;
	cursor: pointer;

	&:focus {
		border-color: #007bff;
		outline: none;
		box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
	}

	&:disabled {
		background-color: #e9e9e9;
		cursor: not-allowed;
	}
`;

export const SelectedItemsDisplay = styled.div`
	margin-top: 20px;
	padding-top: 15px;
	border-top: 1px solid #eee;

	h3 {
		color: #555;
		margin-bottom: 10px;
	}
`;

export const SelectedItemsList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

export const SelectedItem = styled.li`
	background-color: #e6f7ff;
	border: 1px solid #b3e0ff;
	padding: 8px 12px;
	margin-bottom: 5px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	color: #0056b3;
	font-size: 14px;
`;

export const CheckIcon = styled.span`
	margin-right: 8px;
	color: #28a745;
	font-weight: bold;
`;

export const NoItemsMessage = styled.p`
	color: #888;
	font-style: italic;
	text-align: center;
	padding: 10px;
	border: 1px dashed #ccc;
	border-radius: 4px;
`;

const Zoom = ({
	route,
	primaryKey,
	valueField,
	formatter,
	onChange,
	value
}) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		http.get(route)
			.then(response => {
				setData(response.data.data);
			})
			.catch(error => {
				console.error("Erro ao buscar dados:", error);
				setError("Erro ao carregar dados. Tente novamente.");
				toast.error("Erro ao carregar registros.");
			})
			.finally(() => setLoading(false));
	}, [route]);

	const formatDisplayValue = useCallback((item) => {
		if (formatter && typeof formatter === "function") {
			return formatter(item);
		}
		if (Array.isArray(valueField)) {
			return valueField.map(field => item[field]).filter(Boolean).join(" - ");
		}
		return item[valueField];
	}, [formatter, valueField]);

	const handleSelectChange = useCallback((event) => {
		onChange && onChange(event.target.value);
	}, [onChange]);

	console.log(value);

	return (
		<ZoomSelect
			id={primaryKey}
			onChange={handleSelectChange}
			disabled={loading || error}
			value={value}
		>
			{<option value="">-- Selecione --</option>}
			{data.map(item => (
				<option
					key={item[primaryKey]}
					value={item[primaryKey]}
				>
					{formatDisplayValue(item)}
				</option>
			))}
		</ZoomSelect>
	);
};

export default Zoom;