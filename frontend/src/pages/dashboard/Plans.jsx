import React from 'react'
import { Container } from "react-grid-system";
import Table from '../../components/Table/Table';

const mapping = [
	{
		field: "id",
		title: "Identificador"
	},
	{
		field: "name",
		title: "Nome"
	},
	{
		field: "price",
		title: "Preço",
		type: "money"
	},
	{
		field: "duration_days",
		title: "Duração"
	},
	{
		field: "createdAt",
		title: "Criado em",
		type: "date"
	},
];

const actions = {
	READ: {
		method: "GET",
		route: "dashboard/plans",
		order: { "id": "ASC" },
		fields: ["id", "name", "price", "duration_days", "createdAt"]
	},
	CREATE: {
		method: "POST",
		route: "dashboard/plans",
		fields: ["name", "price", "duration_days"]
	},
	UPDATE: {
		method: "PATCH",
		route: "dashboard/plans",
		fields: ["name", "price", "duration_days"]
	},
	DELETE: {
		method: "DELETE",
		route: "dashboard/plans",
		setAlertMessage: value => `${value.id} - ${value["name"]}`
	}
}

const Plans = () => {
	return (
		<Container fluid>
			<Table
				selectionType={"multi"}
				actions={actions}
				mapping={mapping}
			/>
		</Container>
	)
}

export default Plans;