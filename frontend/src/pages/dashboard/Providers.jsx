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
		field: "createdAt",
		title: "Criado em",
		type: "date"
	},
];

const actions = {
	READ: {
		method: "GET",
		route: "dashboard/providers",
		order: { "id": "ASC" },
		fields: ["id", "name", "createdAt"]
	},
	CREATE: {
		method: "POST",
		route: "dashboard/providers",
		fields: ["name"]
	},
	UPDATE: {
		method: "PATCH",
		route: "dashboard/providers",
		fields: ["name"]
	},
	DELETE: {
		method: "DELETE",
		route: "dashboard/providers",
		setAlertMessage: value => `${value.id} - ${value["name"]}`
	}
}

const Providers = () => {
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

export default Providers;