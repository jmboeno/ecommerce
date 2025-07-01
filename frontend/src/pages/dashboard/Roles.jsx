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
		field: "description",
		title: "Descrição"
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
		route: "dashboard/roles",
		order: { "id": "ASC" },
		fields: ["id", "name", "description", "createdAt"]
	},
	CREATE: {
		method: "POST",
		route: "dashboard/roles",
		fields: ["name", "description"]
	},
	UPDATE: {
		method: "PATCH",
		route: "dashboard/roles",
		fields: ["name", "description"]
	},
	DELETE: {
		method: "DELETE",
		route: "dashboard/roles",
		setAlertMessage: value => `${value.id} - ${value["name"]}`
	}
}

const Roles = () => {
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

export default Roles;