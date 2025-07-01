import React from 'react'
import { Container } from "react-grid-system";
import TablePresentation from '../../components/Table/Table'

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
		route: "dashboard/permissions",
		order: { "id": "ASC" },
		fields: ["id", "name", "description", "createdAt"]
	},
	CREATE: {
		method: "POST",
		route: "dashboard/permissions",
		fields: ["name", "description"]
	},
	UPDATE: {
		method: "PATCH",
		route: "dashboard/permissions",
		fields: ["name", "description"]
	},
	DELETE: {
		method: "DELETE",
		route: "dashboard/permissions",
		setAlertMessage: value => `${value.id} - ${value["name"]}`
	}
}

const Payments = () => {
	return (
		<Container fluid>
			<TablePresentation
				route={"dashboard/payments"}
				defaultSort={{ payment_method: "ASC" }}
				placeholder={"Buscar por Pagamento"}
				mapping={[
					{ field: "payment_method", title: "Método de pagamento" },
					{ field: "amount", title: "Valor" },
					{ field: "status", title: "Status" },
					{ field: "createdAt", title: "Criado em", type: "date"},
				]}
			/>
		</Container>
	)
}

export default Payments;